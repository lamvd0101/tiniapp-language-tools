import {TextDocument} from 'vscode-languageserver-textdocument';

export function getCurrentWord(
  document: TextDocument,
  offset: number,
  breakCharacter: RegExp | string,
): string | undefined {
  let i = offset - 1;
  const text = document.getText();
  let hasBreakCharacter = false;

  // 1. Find the start of the word
  // 2. Break as soon as there is a character: enter, tab, etc.
  while (i >= 0 && !text.charAt(i).match(new RegExp('\n|\t|\r| '))) {
    if (text.charAt(i).match(breakCharacter)) {
      // 3. Break as soon as we see a break character
      hasBreakCharacter = true;
      break;
    }
    i--;
  }
  const result = hasBreakCharacter ? text.substring(i + 1, offset) : '';
  return result || undefined;
}

export function startsWith(haystack: string, needle: string): boolean {
  if (haystack.length < needle.length) {
    return false;
  }

  for (let i = 0; i < needle.length; i++) {
    if (haystack[i] !== needle[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Determines if haystack ends with needle.
 */
export function endsWith(haystack: string, needle: string): boolean {
  const diff = haystack.length - needle.length;
  if (diff > 0) {
    return haystack.lastIndexOf(needle) === diff;
  } else if (diff === 0) {
    return haystack === needle;
  } else {
    return false;
  }
}

const _a = 'a'.charCodeAt(0);
const _z = 'z'.charCodeAt(0);
const _A = 'A'.charCodeAt(0);
const _Z = 'Z'.charCodeAt(0);
const _0 = '0'.charCodeAt(0);
const _9 = '9'.charCodeAt(0);

export function isLetterOrDigit(text: string, index: number) {
  const c = text.charCodeAt(index);
  return (_a <= c && c <= _z) || (_A <= c && c <= _Z) || (_0 <= c && c <= _9);
}
