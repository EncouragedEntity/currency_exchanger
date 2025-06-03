
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import Api from '../app/services/api';
import ENV from '../app/environments';
import * as actions from '../app/modules/currency/actions';
import currencySaga from '../app/modules/currency/saga';
import { Currency } from '../app/modules/currency/types';

const mockRates: Record<string, Currency> = {
  BTC: {
    rate: 100,
    high: 110,
    low: 90,
    vol: 10000,
    cap: 1000000,
    sup: 21000000,
    change: 5,
    change_pct: 5,
  },
  ETH: {
    rate: 50,
    high: 55,
    low: 45,
    vol: 5000,
    cap: 500000,
    sup: 10000000,
    change: 2,
    change_pct: 4,
  },
};

const mockApiResponse = {
  data: {
    success: true,
    terms: 'terms',
    privacy: 'privacy',
    timestamp: Date.now(),
    target: 'USD',
    rates: mockRates,
  },
};

describe('currencySaga', () => {
  describe('list', () => {
    it('fetches and formats currency list with icons', async () => {
      const expectedList = {
        BTC: {
          ...mockRates.BTC,
          icon: `${ENV.url.assets}icons/BTC.png`,
        },
        ETH: {
          ...mockRates.ETH,
          icon: `${ENV.url.assets}icons/ETH.png`,
        },
      };

     await expectSaga(currencySaga)
      .provide([[matchers.call.fn(Api.mock), mockApiResponse]])
      .put(actions.reduce.events('list', true))         
      .put(actions.reduce.list({ list: expectedList })) 
      .put(actions.reduce.events('list', false))        
      .dispatch(actions.request.list())
      .silentRun();
    });
  });

  describe('favorites', () => {
    const state = {
      currency: {
        favorites: {
          BTC: {
            ...mockRates.BTC,
            icon: `${ENV.url.assets}icons/BTC.png`,
          },
        },
        list: {
          BTC: {
            ...mockRates.BTC,
            icon: `${ENV.url.assets}icons/BTC.png`,
          },
          ETH: {
            ...mockRates.ETH,
            icon: `${ENV.url.assets}icons/ETH.png`,
          },
        },
      },
    };

    it('adds a favorite', async () => {
      await expectSaga(currencySaga)
        .withState(state)
        .put(actions.reduce.events('favorites', true))
        .put(
          actions.reduce.favorites({
            favorites: {
              ...state.currency.favorites,
              ETH: {
                ...mockRates.ETH,
                icon: `${ENV.url.assets}icons/ETH.png`,
              },
            },
          })
        )
        .put(actions.reduce.events('favorites', false))
        .dispatch(actions.request.favorites({ currency: 'ETH', favorite: true }))
        .silentRun();
    });

    it('removes a favorite', async () => {
      await expectSaga(currencySaga)
        .withState(state)
        .put(actions.reduce.events('favorites', true))
        .put(
          actions.reduce.favorites({
            favorites: {},
          })
        )
        .put(actions.reduce.events('favorites', false))
        .dispatch(actions.request.favorites({ currency: 'BTC', favorite: false }))
        .silentRun();
    });
  });
});
