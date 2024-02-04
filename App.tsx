import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Value from "./src/componrnt/Value";
import RingProgress from "./src/componrnt/RingProgress";
import appleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthValueOptions,
} from "react-native-health";
import { useEffect, useState } from "react";
import { useHealthData } from "./src/hooks/useHealthData";

const GOAL = 10_000;

export default function App() {
  const { steps, fightsClimbed, distance } = useHealthData(
    new Date(2024, 1, 3)
  );
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RingProgress progress={steps / GOAL} />
      <View style={styles.values}>
        <Value label="Steps" value={steps.toString()} />
        <Value label="Distance" value={(distance / 1000).toFixed(2)} />
        <Value label="Flights Climbed" value={fightsClimbed.toString()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "baseline",
    justifyContent: "center",
    padding: 24,
  },
  values: { flexDirection: "row", columnGap: 25, flexWrap: "wrap", rowGap: 50 },
  valueContainer: {},
  label: { color: "white" },
  value: {
    fontSize: 45,
    color: "#AFB3BE",
    fontWeight: "500",
  },
});
