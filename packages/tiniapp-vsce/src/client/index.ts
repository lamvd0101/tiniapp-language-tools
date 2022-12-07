// The module 'vscode' contains the VS Code extensibility API
import * as path from 'path';
import * as vscode from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  Position,
  RequestType,
  ServerOptions,
  TextDocumentIdentifier,
  TransportKind,
} from 'vscode-languageclient/node';

import {ExtensionConfigFileName, ExtensionInfo} from '../common/extensionInfo';
import {
  AutoInsertId,
  AutoInsertKind,
  AutoInsertParams,
  FileDocs,
} from '../common/languageTypes';
import {activateAutoInsertion} from './autoInsertion';

namespace AutoInsertRequest {
  export const type: RequestType<
    AutoInsertParams<TextDocumentIdentifier, Position>,
    string,
    any
  > = new RequestType(AutoInsertId);
}

let client: LanguageClient;

const serverPath = path.join('dist', 'server', 'index.js');

export async function activate(context: vscode.ExtensionContext) {
  const toDispose = context.subscriptions;

  const serverModule = context.asAbsolutePath(serverPath);
  const debugOptions = {execArgv: ['--nolazy', '--inspect=6009']};

  const serverOptions: ServerOptions = {
    run: {module: serverModule, transport: TransportKind.ipc},
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };
  const clientOptions: LanguageClientOptions = {
    documentSelector: FileDocs,
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher(
        `**/${ExtensionConfigFileName}`,
      ),
    },
  };

  client = new LanguageClient(
    ExtensionInfo.id,
    ExtensionInfo.name,
    serverOptions,
    clientOptions,
  );

  client.start();

  // Auto insert
  const insertRequestor = (
    kind: AutoInsertKind,
    document: vscode.TextDocument,
    position: vscode.Position,
  ): Promise<string> => {
    const param: AutoInsertParams<TextDocumentIdentifier, Position> = {
      kind,
      textDocument:
        client.code2ProtocolConverter.asTextDocumentIdentifier(document),
      position: client.code2ProtocolConverter.asPosition(position),
    };
    return client.sendRequest(AutoInsertRequest.type, param);
  };
  const disposable = activateAutoInsertion(insertRequestor);
  toDispose.push(disposable);

  // Demo command
  const disposable2 = vscode.commands.registerCommand('tiniapp.active', () => {
    vscode.window.showInformationMessage('Tini App!');
  });
  context.subscriptions.push(disposable2);

  // Get the TS extension
  const tsExtension = vscode.extensions.getExtension(
    'vscode.typescript-language-features',
  );
  if (!tsExtension) {
    return;
  }
  await tsExtension.activate();

  if (!tsExtension.exports || !tsExtension.exports.getAPI) {
    return;
  }
  const api = tsExtension.exports.getAPI(0);
  if (!api) {
    return;
  }

  api.configurePlugin('@tikivn/tiniapp-jsapi-plugin', {});

  console.log('Congratulations, your extension "Tini App" is now active!');
}

export function deactivate() {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
