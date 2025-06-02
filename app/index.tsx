import React from 'react';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation, { NavigationRef } from 'app/navigation';
import store, { persistor, Provider } from 'app/storage';
import { LogBox } from 'react-native';


LogBox.ignoreAllLogs();

export default React.memo(() => {
 const navigation = React.useRef<NavigationRef>(null);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation ref={navigation} />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
});