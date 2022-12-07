import {
  CompletionList,
  CompletionParams,
  createConnection,
  Definition,
  DefinitionParams,
  Diagnostic,
  DocumentFormattingParams,
  Hover,
  HoverParams,
  InitializeParams,
  Position,
  ProposedFeatures,
  PublishDiagnosticsParams,
  RequestType,
  TextDocumentIdentifier,
  TextDocuments,
  TextDocumentSyncKind,
  TextEdit,
} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';

import {
  AutoInsertId,
  AutoInsertParams,
  LanguageIds,
} from '../common/languageTypes';
import {getLanguageModes, LanguageModes} from './languages/languageModes';
import {getLanguageIdFromUri} from './languages/languageSupport';

namespace AutoInsertRequest {
  export const type: RequestType<
    AutoInsertParams<TextDocumentIdentifier, Position>,
    string,
    any
  > = new RequestType(AutoInsertId);
}

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let languageModes: LanguageModes;

// ===== VSCE LIFECYCLE =====
connection.onInitialize((_params: InitializeParams) => {
  // Setup the language modes support multiple languages in the document
  languageModes = getLanguageModes();

  documents.onDidClose(e => {
    languageModes.onDocumentRemoved(e.document);
  });
  connection.onShutdown(() => {
    languageModes.dispose();
  });

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      // Tell the client that the server supports code completion
      completionProvider: {
        resolveProvider: false,
      },
      hoverProvider: true,
      definitionProvider: true,
      documentFormattingProvider: true,
    },
  };
});

connection.onDidChangeConfiguration(_change => {
  // Revalidate all open text documents
  documents.all().forEach(validationHandler);
});
documents.onDidChangeContent(change => {
  validationHandler(change.document);
});

// Language server features
connection.onRequest(AutoInsertRequest.type, (params, _token) => {
  const str = requestHandler(params);
  return str;
});
connection.onCompletion((textDocumentPosition, _token) => {
  const disposables = completionHandler(textDocumentPosition);
  return disposables;
});
connection.onHover((textDocumentPosition, _token) => {
  const disposables = hoverHandler(textDocumentPosition);
  return disposables;
});
connection.onDefinition((textDocumentPosition, _token) => {
  const disposables = definitionHandler(textDocumentPosition);
  return disposables;
});
connection.onDocumentFormatting((formatParams, _token) => {
  const disposables = formattingHandler(formatParams);
  return disposables;
});

documents.listen(connection);
connection.listen();

// ===== VSCE FEATURES =====
function requestHandler(
  params: AutoInsertParams<TextDocumentIdentifier, Position>,
): string | undefined {
  const document = documents.get(params.textDocument.uri);
  if (document) {
    const pos = params.position;
    if (pos.character > 0) {
      const mode = languageModes.getModeAtPosition(
        document,
        Position.create(pos.line, pos.character - 1),
      );
      if (mode && mode.doAutoInsert) {
        return mode.doAutoInsert(document, pos, params.kind);
      }
    }
  }
  return undefined;
}

// This is the function that handles the validation
async function validationHandler(textDocument: TextDocument) {
  const textDocumentUri = textDocument.uri;

  try {
    const version = textDocument.version;
    const diagnostics: Diagnostic[] = [];

    let params: PublishDiagnosticsParams | undefined;

    if (getLanguageIdFromUri(textDocumentUri)) {
      const modes = languageModes.getAllModesInDocument(textDocument);
      const latestTextDocument = documents.get(textDocumentUri);
      if (latestTextDocument && latestTextDocument.version === version) {
        // Check no new version has come in after in after the async op
        modes.forEach(mode => {
          if (mode.doValidation) {
            mode.doValidation(latestTextDocument)?.forEach(d => {
              diagnostics.push(d);
            });
          }
        });
        params = {uri: latestTextDocument.uri, diagnostics};
        connection.sendDiagnostics(params);
      }
    }
  } catch (e) {
    connection.console.error(`Error while validating ${textDocumentUri}`);
    connection.console.error(String(e));
  }
}

// This is the function that handles the completion
function completionHandler(
  textDocument: CompletionParams,
): CompletionList | undefined {
  const data = getLanguageIdAndDocument(textDocument);
  if (!data) {
    return undefined;
  }

  const mode =
    data.languageId === LanguageIds.TXML
      ? languageModes.getModeAtPosition(data.document, textDocument.position)
      : languageModes.getMode(data.languageId);
  return mode?.doComplete?.(data.document, textDocument.position);
}

// This is the function that handles the hover
function hoverHandler(textDocument: HoverParams): Hover | undefined {
  const data = getLanguageIdAndDocument(textDocument);
  if (!data) {
    return undefined;
  }

  const mode =
    data.languageId === LanguageIds.TXML
      ? languageModes.getModeAtPosition(data.document, textDocument.position)
      : languageModes.getMode(data.languageId);
  return mode?.doHover?.(data.document, textDocument.position);
}

// This is the function that handles the definition
function definitionHandler(
  textDocument: DefinitionParams,
): Definition | undefined {
  const data = getLanguageIdAndDocument(textDocument);
  if (!data) {
    return undefined;
  }

  const mode =
    data.languageId === LanguageIds.TXML
      ? languageModes.getModeAtPosition(data.document, textDocument.position)
      : languageModes.getMode(data.languageId);
  return mode?.findDefinition?.(data.document, textDocument.position);
}

// This is the function that handles the formatting
function formattingHandler(
  textDocument: DocumentFormattingParams,
): TextEdit[] | undefined {
  const data = getLanguageIdAndDocument(textDocument);
  if (!data) {
    return undefined;
  }

  const mode = languageModes.getMode(data.languageId);
  return mode?.formatting?.(data.document);
}

function getLanguageIdAndDocument(
  _document: any,
): {document: TextDocument; languageId: LanguageIds} | undefined {
  if (!_document) {
    return undefined;
  }

  const textDocumentUri = _document.textDocument.uri;
  const languageId = getLanguageIdFromUri(textDocumentUri);

  if (!languageId) {
    return undefined;
  }

  const document = documents.get(textDocumentUri);
  if (!document) {
    return undefined;
  }

  return {document, languageId};
}
