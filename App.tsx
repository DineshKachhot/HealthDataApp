import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Value from "./src/componrnt/Value";
import RingProgress from "./src/componrnt/RingProgress";
import { useEffect, useState } from "react";
import { useHealthData } from "./src/hooks/useHealthData";
import { AntDesign } from "@expo/vector-icons";

const GOAL = 10_000;

export default function App() {
  const [date, setDate] = useState(new Date());
  const { steps, fightsClimbed, distance } = useHealthData(date);

  const changeDate = (days: number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + days);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.datePicker}>
        <AntDesign
          onPress={() => changeDate(-1)}
          name="left"
          size={24}
          color="#C3FF53"
        />
        <Text style={styles.date}>{date.toDateString()}</Text>
        <AntDesign
          onPress={() => changeDate(1)}
          name="right"
          size={24}
          color="#C3FF53"
        />
      </View>
      <RingProgress progress={steps / GOAL} radius={120} strokeWidth={40} />
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
  values: {
    flexDirection: "row",
    columnGap: 60,
    flexWrap: "wrap",
    rowGap: 30,
  },
  valueContainer: {},
  label: { color: "white" },
  value: {
    fontSize: 45,
    color: "#AFB3BE",
    fontWeight: "500",
  },
  date: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  datePicker: {
    alignItems: "center",
    padding: 24,
    fontWeight: "bold",
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
});
