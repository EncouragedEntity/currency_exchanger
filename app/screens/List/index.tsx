import React, { use } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'app/storage/utilities';
import CurrencyModule from 'app/modules/currency';
import Loader from 'app/components/Loader';
import styles from './styles';
import Tile from 'app/components/Tile';
import FastImage from 'react-native-fast-image';
import Icon from 'app/components/Icon';

export default React.memo(() => {
  const dispatch = useDispatch();
  const loading = useSelector(CurrencyModule.getEvent('list'));

  const list = useSelector(CurrencyModule.getList);
  const favorites = useSelector(CurrencyModule.getFavorites);

  const data = React.useMemo(() => Object.entries(list), [list]);

  const toggleFavorite = React.useCallback((currency: string) => {
    const isCurrentlyFavorite = !!favorites[currency];
    dispatch(CurrencyModule.favorites({ currency, favorite: !isCurrentlyFavorite }));
  }, [dispatch, favorites]);


  React.useEffect(() => {
    dispatch(CurrencyModule.list.async({ expand: 1 }));
  }, [dispatch]);

  return loading ? (
    <Loader.Screen /> 
  ) : (
    <View style={styles.container}>
      {data.length > 0 &&
        <Text style={styles.title}> 
          Based on USD
        </Text>
      }

      <FlatList
        style={styles.list}
        data={data}
        extraData={favorites}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => {
          const isFavorite = !!favorites[item[0]];

          return (
            <Tile.Currency
              key={item[0]}
              title={item[0]}
              subtitle={item[1].rate.toString()}
              leading={() => (
                <FastImage
                  resizeMode='cover'
                  source={{ uri: item[1].icon }}
                  style={{ width: 36, height: 36, borderRadius: 8 }}
                />
              )}
              trailing={() => (
                <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item[0])} activeOpacity={0.8}>
                    <Icon name='favorite' fill={isFavorite ? '#000' : 'none'} />
                </TouchableOpacity>
              )}
            />
          );
        }}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text>
              No currencies available.
            </Text>
          </View>
        )}
        onRefresh={() => dispatch(CurrencyModule.list.async({ expand: 1 }))}
        refreshing={loading}
      />
    </View>
  );
});
