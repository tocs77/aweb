import { Project, SyntaxKind, Node, JsxAttribute } from 'ts-morph';

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

if (!removedFeatureName) throw new Error('Feature name is requred');
if (!featureState || (featureState !== 'on' && featureState !== 'off')) throw new Error('Feature state is requred');

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
  for (const child of node.getChildren()) {
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) return true;
  }
  return false;
};
const isToggleComponent = (node: Node) => {
  for (const child of node.getChildren()) {
    console.log(child.getText());
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleComponentName) return true;
  }
  return false;
};

const replaceToggleFucntion = (node: Node) => {
  if (!isToggleFunction(node)) return;
  const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
  if (!objectOptions) return;
  const onFunctionPropery = objectOptions.getProperty('on');
  const offFunctionPropery = objectOptions.getProperty('off');
  const nameProperty = objectOptions.getProperty('name');

  const onFunction = onFunctionPropery?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const offFunction = offFunctionPropery?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const featureName = nameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);
  if (featureName !== removedFeatureName) return;
  if (featureState === 'on') {
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }
  if (featureState === 'off') {
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }
};

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) => {
  return jsxAttributes.find((node) => node.getNameNode()?.getText() === name);
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
  const value = attribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression()?.getText();

  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }

  return value;
};

const replaceToggleComponent = (node: Node) => {
  if (!isToggleComponent(node)) return;
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const onAttribute = getAttributeNodeByName(attributes, 'on');
  const offAttribute = getAttributeNodeByName(attributes, 'off');

  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
  const featureName = featureNameAttribute?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText()?.slice(1, -1);

  if (featureName !== removedFeatureName) return;

  const offValue = getReplacedComponent(offAttribute);
  const onValue = getReplacedComponent(onAttribute);

  if (featureState === 'on' && onValue) {
    node.replaceWithText(onValue);
  }

  if (featureState === 'off' && offValue) {
    node.replaceWithText(offValue);
  }
};

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression)) replaceToggleFucntion(node);
    if (node.isKind(SyntaxKind.JsxSelfClosingElement)) replaceToggleComponent(node);
  });
});

project.save();
