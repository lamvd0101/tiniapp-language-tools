import {FileExtensions, LanguageIds} from '../../common/languageTypes';

export function getLanguageIdFromUri(uri: string): LanguageIds | undefined {
  if (uri.match(`.${FileExtensions.TXML}$`)) {
    return LanguageIds.TXML;
  } else if (uri.match(`.${FileExtensions.TCSS}$`)) {
    return LanguageIds.TCSS;
  } else if (uri.match(`.${FileExtensions.TS}$`)) {
    return LanguageIds.TS;
  } else if (uri.match(`.${FileExtensions.JS}$`)) {
    return LanguageIds.JS;
  } else if (uri.match(`.${FileExtensions.JSON}$`)) {
    return LanguageIds.JSON;
  }
  return undefined;
}
