import {txmlData} from '@tikivn/tiniapp-docs/dist/txml';

import {DataProvider as IDataProvider} from '../languageTypes';
import {DataProvider} from './dataProvider';

export class DataManager {
  private dataProviders: IDataProvider[] = [];

  constructor() {
    this.setDataProviders(true, []);
  }
  setDataProviders(builtIn: boolean, providers: IDataProvider[]) {
    this.dataProviders = [];
    if (builtIn) {
      this.dataProviders.push(new DataProvider('txml', txmlData));
    }
    this.dataProviders.push(...providers);
  }

  getDataProviders() {
    return this.dataProviders;
  }
}
