import * as path from 'path';
import * as _ts from 'typescript/lib/tsserverlibrary';

const libPath = path.join(__dirname, '..', '@types/index.d.ts');

function init(modules: {typescript: typeof _ts}): ts.server.PluginModule {
  const tsModule = modules.typescript;

  return {
    create(info: ts.server.PluginCreateInfo) {
      const host: ts.LanguageServiceHost = info.languageServiceHost;

      const _getScriptFileNames = host.getScriptFileNames.bind(host);
      host.getScriptFileNames = () => {
        const fileNames = _getScriptFileNames();
        return [...fileNames, libPath];
      };

      const ls = tsModule.createLanguageService(host);
      return ls;
    },
  };
}

export = init;
