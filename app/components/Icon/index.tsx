import React from 'react';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export type IconName = 'favorite' | 'list';

export interface IconProps {
  fill?: ColorValue;
  accent?: ColorValue;
  size?: number;
  name: IconName;
}

const Component = React.memo<IconProps>(props => {
  const { name, fill = 'none', accent = '#000', size = 24 } = props;

  switch (name) {
    default: return null;

    case 'list': return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <Path
          d="M4 7a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1m5 0a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2h-9a1 1 0 0 1-1-1m-5 5a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m5 0a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2h-9a1 1 0 0 1-1-1m-5 5a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m5 0a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2h-9a1 1 0 0 1-1-1"
          fill={fill}
        />
      </Svg>
    );

    case 'favorite': return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        {...props}
      >
        <Path
          fill={fill}
          stroke={accent}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4 9.22 9.27 3 10.11l4.5 4.1L6.44 20 12 17.27 17.56 20l-1.06-5.79 4.5-4.1-6.22-.84z"
        />
      </Svg>
    );
  }
});

Component.displayName = 'Icon';

export default Component;