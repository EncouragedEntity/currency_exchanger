import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationRef, RootStackParams } from './types';
import routes from './routes';

import Favorites from 'app/screens/Favorites';
import List from 'app/screens/List';
import Icon from 'app/components/Icon';


const Tabs = React.memo(() => {
  const BottomTab = React.useMemo(() => createBottomTabNavigator(), []);

  return(
    <BottomTab.Navigator initialRouteName={routes.root.list}>
      <BottomTab.Screen
        name={routes.root.list}
        component={List}
        options={{
          tabBarLabel: 'List',
          headerTitle: 'List',
          tabBarIcon: ({ focused, color }) => <Icon name='list' fill={focused ? color : '#000'} />,
        }}
      />
      <BottomTab.Screen
        name={routes.root.favorites}
        component={Favorites}
        options={{
          headerTitle: 'Favorites',
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ focused, color }) => <Icon name='favorite' accent={focused ? color : '#000'} />,
        }}
      />
    </BottomTab.Navigator>
  );
});

export default React.forwardRef<NavigationRef, {}>((props, ref) => {
  const Stack = React.useMemo(() => createNativeStackNavigator<RootStackParams>(), []);

  const navigation = React.useRef<NavigationRef>(null);

  React.useImperativeHandle<NavigationRef | null, NavigationRef | null>(ref, () => navigation.current);

  return (
    <NavigationContainer ref={navigation} {...props}>
      <Stack.Navigator
        initialRouteName={routes.root.stack}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={routes.root.stack} component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
