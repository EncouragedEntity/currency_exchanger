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

  const favorites = useSelector(CurrencyModule.getFavorites);

  const data = React.useMemo(() => Object.entries(favorites), [favorites]);

  const unfavorite = React.useCallback((currency: string) => {
    dispatch(CurrencyModule.favorites({currency, favorite: false }));
  }, []);

  React.useEffect(() => {
    dispatch(CurrencyModule.list.async({ expand: 1 }));
  }, [dispatch]);

  console.log('Favorites render', data.length);

  return (
    <View style={styles.container}>
      {data.length > 0 &&
        <Text style={styles.title}> 
          Based on USD
        </Text>
      }

      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => {
          const isFavorite = !!favorites[item[0]];

          return (
            <Tile.Currency
              key={item[0]}
              title={item[0]}
              subtitle={item[1]?.rate.toString()}
              leading={() => (
                <FastImage
                  resizeMode='cover'
                  source={{ uri: item[1]?.icon }}
                  style={{ width: 36, height: 36, borderRadius: 12 }}
                />
              )}
              trailing={() => (
                <TouchableOpacity style={styles.favoriteButton} onPress={() => unfavorite(item[0])} activeOpacity={0.8}>
                    <Icon name='favorite' fill={isFavorite ? '#000' : 'none'} />
                </TouchableOpacity>
              )}
            />
          );
        }}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text>
              No favorite currencies.
            </Text>
          </View>
        )}
      />
    </View>
  );
});
