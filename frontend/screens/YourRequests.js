import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { api } from "../api/api";
import YourRequestEl from "../components/YourRequestEl";
import LoadingAnim from "../components/LoadingAnim";
import { useNavigation } from "@react-navigation/native";

export default function YourRequests() {
  const navigation = useNavigation();
  const [pledges, setPledges] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      console.log("here");
      const response = await api.get("/bloodRequest/yourRequests");
      const requestData = response.data.data.requests;
      const pledgeData = response.data.data.pledges;
      setLoading(false);
      let i = 0;
      for (const element of pledgeData) {
        element.key = i;
        i++;
      }
      i = 0;
      for (const element of requestData) {
        element.key = i;
        i++;
      }
      setPledges(pledgeData);
      setRequests(requestData);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(async () => {
    getData();
    const willFocusSubscription = navigation.addListener("focus", () => {
      getData();
    });
    return willFocusSubscription;
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <LoadingAnim isLoading={loading}></LoadingAnim>

      <Text style={styles.title}>Your Requests</Text>
      <View style={styles.hr}></View>
      {requests.length > 0 ? (
        <>
          <FlatList
            data={requests}
            renderItem={({ item }) => (
              <YourRequestEl
                data={item}
                refresh={getData}
                pledgees={pledges.filter(
                  (element) => element.requestID === item.requestID
                )}
              />
            )}
            keyExtractor={(item) => item.key}
          />
        </>
      ) : (
        <Text style={{ alignSelf: "center", marginVertical: 20 }}>
          You have no active requests
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
