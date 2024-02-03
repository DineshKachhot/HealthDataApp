import { View, Text } from "react-native";
import React from "react";
import { Circle, Svg } from "react-native-svg";

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
        <Circle
          r={innerRadius}
          cx={radius}
          cy={radius}
          originX={radius}
          originY={radius}
          rotation={-90}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeDasharray={[circumferance * progress, circumferance]}
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
