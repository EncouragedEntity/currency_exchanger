import type {  NavigationContainerRef } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import routes from './routes';
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

export type RootStackParams = {
  [routes.root.stack]: undefined
  [routes.root.list]: undefined;
  [routes.root.favorites]: undefined;
};
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

export type RootStack<T extends keyof RootStackParams = keyof RootStackParams> = StackScreenProps<RootStackParams, T>;

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

export type NavigationRef = NavigationContainerRef<RootStackParams>;
