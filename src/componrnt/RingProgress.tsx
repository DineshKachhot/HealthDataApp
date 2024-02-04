import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Circle, CircleProps, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

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

  const circleDefaultProps: CircleProps = {
    r: innerRadius,
    cx: radius,
    cy: radius,
    originX: radius,
    originY: radius,
    rotation: -90,
    strokeWidth: strokeWidth,
    stroke: color,
    strokeLinecap: "round",
  };

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
        marginVertical: 50,
      }}
    >
      <Svg>
        {/* Foreground */}
        <AnimatedCircle animatedProps={animatedProps} {...circleDefaultProps} />

        {/* Background  */}
        <Circle {...circleDefaultProps} opacity={0.2} />
      </Svg>
      <AntDesign
        name="arrowright"
        size={strokeWidth * 0.8}
        color="black"
        style={{
          position: "absolute",
          top: strokeWidth * 0.1,
          alignSelf: "center",
        }}
      />
    </View>
  );
};

export default RingProgress;
