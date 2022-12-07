import {
  Disposable,
  Position,
  SnippetString,
  TextDocument,
  TextDocumentChangeEvent,
  TextDocumentChangeReason,
  TextDocumentContentChangeEvent,
  window,
  workspace,
} from 'vscode';

import {AutoInsertKind} from '../common/languageTypes';

const timer = {
  setTimeout(
    callback: (...args: any[]) => void,
    ms: number,
    ...args: any[]
  ): Disposable {
    const handle = setTimeout(callback, ms, ...args);
    return {dispose: () => clearTimeout(handle)};
  },
};

export function activateAutoInsertion(
  provider: (
    kind: AutoInsertKind,
    document: TextDocument,
    position: Position,
  ) => Thenable<string>,
): Disposable {
  const disposables: Disposable[] = [];
  workspace.onDidChangeTextDocument(onDidChangeTextDocument, null, disposables);

  let timeout: Disposable | undefined = undefined;

  disposables.push({
    dispose: () => {
      timeout?.dispose();
    },
  });

  function onDidChangeTextDocument({
    document,
    contentChanges,
    reason,
  }: TextDocumentChangeEvent) {
    if (
      contentChanges.length === 0 ||
      reason === TextDocumentChangeReason.Undo ||
      reason === TextDocumentChangeReason.Redo
    ) {
      return;
    }

    const activeDocument =
      window.activeTextEditor && window.activeTextEditor.document;
    if (document !== activeDocument) {
      return;
    }

    if (timeout) {
      timeout.dispose();
    }

    const lastChange = contentChanges[contentChanges.length - 1];
    const lastCharacter = lastChange.text[lastChange.text.length - 1];
    if (lastChange.rangeLength === 0 && lastCharacter === '=') {
      doAutoInsert('autoQuote', document, lastChange);
    } else if (
      lastChange.rangeLength === 0 &&
      (lastCharacter === '>' || lastCharacter === '/')
    ) {
      doAutoInsert('autoClose', document, lastChange);
    }
  }

  function doAutoInsert(
    kind: AutoInsertKind,
    document: TextDocument,
    lastChange: TextDocumentContentChangeEvent,
  ) {
    const rangeStart = lastChange.range.start;
    const version = document.version;
    timeout = timer.setTimeout(() => {
      const position = new Position(
        rangeStart.line,
        rangeStart.character + lastChange.text.length,
      );
      provider(kind, document, position).then(text => {
        if (text) {
          const activeEditor = window.activeTextEditor;
          if (activeEditor) {
            const activeDocument = activeEditor.document;
            if (
              document === activeDocument &&
              activeDocument.version === version
            ) {
              const selections = activeEditor.selections;
              if (
                selections.length &&
                selections.some(s => s.active.isEqual(position))
              ) {
                activeEditor.insertSnippet(
                  new SnippetString(text),
                  selections.map(s => s.active),
                );
              } else {
                activeEditor.insertSnippet(new SnippetString(text), position);
              }
            }
          }
        }
      });
      timeout = undefined;
    }, 100);
  }

  return Disposable.from(...disposables);
}
