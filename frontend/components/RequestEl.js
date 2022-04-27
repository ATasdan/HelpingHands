import { View, Text, StyleSheet, TouchableOpacity,Button } from "react-native";
import React from "react";
import theme from "../styles/theme";

export default function RequestEl({ data, onPress, pledged }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.bg, pledged ? styles.greenBg : styles.redBg]}
    >
      <Text style={styles.title}>
        {data.bloodType} blood requested at {data.hospital}
      </Text>
      <Text>Contact: {data.receiver.name}</Text>
      <Text>Distance: {data.distance}</Text>
      <Text>
        Creation Date: {data.creationDate.toLocaleDateString("en-GB")}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bg: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  greenBg: {
    backgroundColor: "#60a832",
  },
  redBg: {
    backgroundColor: theme.primary,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
