import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import styles from './styles';

type Props = {
  title: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
  trailing?: () => React.ReactNode;
  leading?: () =>  React.ReactNode;
};

export default React.memo<Props>(props => {
  const { title, subtitle, style, leading, trailing } = props;

  return (
    <View style={styles.container}>
      <View style={[styles.leading, style]}>
        {leading?.()}
      </View>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View style={styles.trailing}>
          {trailing?.()}
        </View>
      </View>
    </View>
  );
});