/* eslint-disable import/order */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from './persist';
import { reducer as currency } from 'app/modules/currency';

const reducers = { currency } as const;

export default persistCombineReducers({
  key: require('../../package.json').name,
  blacklist: Object.keys(reducers),
  storage: AsyncStorage,
}, reducers);