import React from "react";
import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";
import styles from "./styles";

type Props = {
  size?: ActivityIndicatorProps['size'];
  style?: ActivityIndicatorProps['style'];
}

export default React.memo<Props>(props => {
  const { size = 'large', style } = props;

  return (
    <View style={styles.container}>
      <ActivityIndicator style={[style, styles.indicator]} size={size} />
    </View>
  );
});