import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Value from "./src/componrnt/Value";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.values}>
        <Value label="Steps" value="1000" />
        <Value label="Distance" value="10 km" />
        <Value label="Flights Climbed" value="11" />
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
