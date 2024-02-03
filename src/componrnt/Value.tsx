import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface ValueProps {
  label: string;
  value: string;
}
const Value = ({ label, value }: ValueProps) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default Value;

const styles = StyleSheet.create({
  label: { color: "white" },
  value: {
    fontSize: 45,
    color: "#AFB3BE",
    fontWeight: "500",
  },
});
