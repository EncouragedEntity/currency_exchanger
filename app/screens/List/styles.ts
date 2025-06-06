import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  list: {
    height: '100%',
    width: '100%',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
