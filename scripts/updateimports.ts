import { Project } from 'ts-morph';

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });

// project.addSourceFileAtPath('./src/**/*.ts');
// project.addSourceFileAtPath('./src/**/*.tsx');

const files = project.getSourceFiles();

const isAbsolutelyImported = (value: string) => {
  const layers = ['app', 'shared', 'entities', 'features', 'pages', 'widgets'];
  if (layers.some((layer) => value.startsWith(layer))) return true;

  return false;
};

files.forEach((file) => {
  const importDeclarations = file.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();
    if (isAbsolutelyImported(value)) {
      importDeclaration.setModuleSpecifier(`@/${value}`);
    }
  });
});

project.save();
