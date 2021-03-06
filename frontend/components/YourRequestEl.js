import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import theme from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { api } from "../api/api";
import { MaterialIcons } from "@expo/vector-icons";

export default function YourRequestEl({ data, pledgees, refresh }) {
  const navigation = useNavigation();

  const cancelRequest = async () => {
    try {
      const response = await api.delete("/bloodRequest/yourRequests", {
        data: {
          requestID: data.requestID,
        },
      });
      await refresh();
      //it is not refreshing
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Blood Type: {data.bloodType}</Text>
        <Text>Hospital: {data.hospital}</Text>
        <Text>Creation Date: {data.creationDate.split("T")[0]}</Text>
        <Text>Expiration Date: {data.expirationDate}</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={cancelRequest}>
          <MaterialIcons name="cancel" size={36} color="red" />
        </TouchableOpacity>
        {pledgees.length > 0 ? (
          <View>
            <Text></Text>
            <Text>People that have pledged to donate:</Text>
            <FlatList
              data={pledgees}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.touchBg}
                  onPress={() =>
                    navigation.navigate("Chat", {
                      targetID: item.donorData.donorID,
                      targetName: item.donorData.name,
                      targetType: "YourRequest",
                      requestID: data.requestID,
                    })
                  }
                >
                  <Text style={{ fontWeight: "bold" }}>
                    Pledgee {index + 1}
                  </Text>
                  <Text>Pledgee Name: {item.donorData.name}</Text>
                  <Text>Pledgee Mail: {item.donorData.email}</Text>
                  <Text>Pledgee Phone: {item.donorData.phoneNumber}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.donorData.name}
              ItemSeparatorComponent={<View style={styles.separator}></View>}
            />
          </View>
        ) : (
          <View>
            <Text></Text>
            <Text>No one has pledged to donate to this request yet</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.seconadry,
    borderRadius: 20,
    marginVertical: 10,
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  separator: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "90%",
    alignSelf: "center",
  },
  touchBg: {
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    position: "absolute",
    right: 0,
    marginTop: 40,
  },
});
