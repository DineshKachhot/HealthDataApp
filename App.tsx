import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

interface ValueProps {
  label: string;
  value: string;
}
const Value = ({ label, value }: ValueProps) => (
  <View style={styles.valueContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Value label="Steps" value="1000" />
        <Value label="Distance" value="10 km" />
      </View>
      <Value label="Flights Climbed" value="11" />
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
  valueContainer: { marginRight: 50 },
  label: { color: "white" },
  value: {
    fontSize: 34,
    color: "#AFB3BE",
    fontWeight: "500",
  },
});
