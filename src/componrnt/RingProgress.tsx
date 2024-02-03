import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Circle, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface RingProgressProps {
  radius?: number;
  strokeWidth?: number;
  progress: number;
}

const color = "#EE0F55";
const RingProgress = ({
  radius = 100,
  strokeWidth = 30,
  progress = 0,
}: RingProgressProps) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumferance = 2 * Math.PI * innerRadius;

  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(progress, { duration: 2000 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumferance * fill.value, circumferance],
  }));

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center",
      }}
    >
      <Svg>
        {/* Foreground */}
        <AnimatedCircle
          animatedProps={animatedProps}
          r={innerRadius}
          cx={radius}
          cy={radius}
          originX={radius}
          originY={radius}
          rotation={-90}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
        />

        {/* Background  */}
        <Circle
          r={innerRadius}
          cx={radius}
          cy={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          opacity={0.2}
        />
      </Svg>
    </View>
  );
};

export default RingProgress;
