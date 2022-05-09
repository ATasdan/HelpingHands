import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ChatEl({ color, align, message, date }) {
  let temp = date.split("T")[0].split("-");
  let hour = date.split("T")[1].split(".")[0];
  let year = temp[0];
  let month = temp[1];
  let day = temp[2];

  return (
    <View>
      <Text
        style={{ alignSelf: align, fontSize: 10 }}
      >{`${day}/${month} - ${hour}`}</Text>
      <View
        style={{
          borderRadius: 20,
          padding: 10,
          minWidth: 70,
          maxWidth: 180,
          alignItems: "center",
          backgroundColor: color,
          alignSelf: align,
          marginVertical: 10,
        }}
      >
        <Text>{message}</Text>
      </View>
    </View>
  );
}
