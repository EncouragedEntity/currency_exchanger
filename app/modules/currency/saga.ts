/* eslint-disable no-console */
import { all, call, put, select, takeLeading } from 'redux-saga/effects';
import Api, { HttpResponse } from 'app/services/api';
import * as actions from './actions';
import { type Currency } from './types';
import ENV from 'app/environments'

function* list(event: ReturnType<typeof actions.request.list>):any {
  const { resolve, reject, payload } = event;

  try {
    yield put(actions.reduce.events('list', true));

    type Response = HttpResponse<{
      success: boolean;
      terms: string;
      privacy: string;
      timestamp: number;
      target: string;
      rates: Record<string, Currency>;
    }>;

    let response: Response;

    if(__DEV__) {
      response = yield call(Api.mock, {
        success: true,
        terms: 'https://example.com/terms',
        privacy: 'https://example.com/privacy',
        timestamp: Date.now(),
        target: 'USD',
        rates: {
          'ABC': {
            'rate': 1.2,
            'high': 1.3,
            'low': 1.1,
            'vol': 1000000,
            'cap': 50000000,
            'sup': 21000000,
            'change': 0.05,
            'change_pct': 4.2,
          },
          '611': {
            'rate': 0.8,
            'high': 0.9,
            'low': 0.7,
            'vol': 500000,
            'cap': 25000000,
            'sup': 15000000,
            'change': -0.02,
            'change_pct': -2.5,
          },
          "ADL": {
            "rate":0.01515,
            "high":0.025,
            "low":0.015,
            "vol":null,
            "cap":null,
            "sup":null,
            "change":0,
            "change_pct":0,
          }
        },
      });
    } else {
      response = yield call(Api.get, 'live', {
        params: {...payload}
      });
    }

    const { rates } = response.data;

    const ratesWithIcons: Record<string, Currency> = Object.entries(rates).reduce((acc, [currency, data]) => {
      const ICON_URL = `${ENV.url.assets}icons/${currency}.png`;

      acc[currency] = {
        ...data,
        icon: ICON_URL,
      };
      return acc;
    }, {} as Record<string, Currency>);

    yield put(actions.reduce.list({list: ratesWithIcons}));

    if (resolve) yield call(resolve);
  } catch (error) {
    if (reject) yield call(reject, { error });
  } finally {
    yield put(actions.reduce.events('list', false));
  }
}


function* favorites(event: ReturnType<typeof actions.request.favorites>): any {
  const { resolve, reject, payload } = event;
  const { currency, favorite } = payload;

  try {
    yield put(actions.reduce.events('favorites', true));

    const favorites: Record<string, Currency> = yield select((state: any) => state.currency.favorites);
    const list: Record<string, Currency> = yield select((state: any) => state.currency.list);

    const updatedFavorites = { ...favorites };

    if (favorite) {
      updatedFavorites[currency] = list[currency];
    } else {
      delete updatedFavorites[currency];
    }

    yield put(actions.reduce.favorites({ favorites: updatedFavorites }));

    if (resolve) yield call(resolve);
  } catch (error) {
    if (reject) yield call(reject, { error });
  } finally {
    yield put(actions.reduce.events('favorites', false));
  }
}

export default function* () {
  yield all([
    takeLeading(actions.request.list, list),
    takeLeading(actions.request.favorites, favorites),
  ]);
}