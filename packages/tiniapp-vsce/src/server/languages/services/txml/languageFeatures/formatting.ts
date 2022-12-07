import {html_beautify} from 'js-beautify';
import {Range, TextEdit} from 'vscode-languageserver/node';
import {TextDocument} from 'vscode-languageserver-textdocument';

export class TXMLFormatting {
  formatting(document: TextDocument): TextEdit[] | undefined {
    const text = document.getText();
    const fullRange = Range.create(
      document.positionAt(0),
      document.positionAt(text.length),
    );
    const formatted = html_beautify(text, {
      indent_size: 2,
      end_with_newline: true,
    });
    return [
      {
        range: fullRange,
        newText: formatted,
      },
    ];
  }
}
