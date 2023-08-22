import { Project, SyntaxKind, Node } from 'ts-morph';

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });

//project.addSourceFileAtPath('./src/**/*.ts');
//project.addSourceFileAtPath('./src/**/*.tsx');

const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

if (!removedFeatureName) throw new Error('Feature name is requred');
if (!featureState || (featureState !== 'on' && featureState !== 'off')) throw new Error('Feature state is requred');

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
  for (const child of node.getChildren()) {
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') return true;
  }
  return false;
};

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (sourceFile.getBaseName() !== 'ArticleDetailsPage.tsx') return;
    if (!node.isKind(SyntaxKind.CallExpression)) return;

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
  });
});

project.save();
