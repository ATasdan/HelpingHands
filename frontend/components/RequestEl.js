import { View, Text, StyleSheet, TouchableOpacity,Button } from "react-native";
import React from "react";
import theme from "../styles/theme";
import { MaterialIcons } from '@expo/vector-icons';
 
export default function RequestEl({ data, onPress, pledged,onCancel }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.bg, pledged ? styles.greenBg : styles.redBg]}
    >
      <View style={{flex:4}}>
      <Text style={styles.title}>
        {data.bloodType} blood requested at {data.hospital}
      </Text>
      <Text>Contact: {data.receiver.name}</Text>
      <Text>Distance: {data.distance}</Text>
      <Text>
        Creation Date: {data.creationDate.split('T')[0]}
      </Text>
      <Text>
        Expiration Date: {data.expirationDate}
      </Text>
      </View>
      {pledged? <TouchableOpacity onPress={onCancel}><MaterialIcons name="cancel" size={36} color="red" /></TouchableOpacity> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bg: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection:'row',
    alignItems:'center'
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
