import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
  LogBox,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import RequestEl from "../components/RequestEl";
import CheckBox from "react-native-check-box";
import { api } from "../api/api";
import LoadingAnim from "../components/LoadingAnim";
import { useNavigation } from "@react-navigation/native";

export default function NearbyRequests(props) {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const navigation = useNavigation();
  const getData = async () => {
    try {
      setLoading(true);
      let requestData = await api.get("/bloodRequest/nearbyRequests");
      const pledgeData = await api.get("/bloodRequest/pledge");
      setLoading(false);
      let i = 0;
      const { paramKey } = props.route.params;
      if (!checked) {
        requestData.data.data = requestData.data.data.filter(
          (element) => element.bloodType === paramKey
        );
      }
      for (const element of pledgeData.data.data) {
        element.key = i;
        i++;
      }
      i = 0;
      for (const element of requestData.data.data) {
        element.key = i;
        i++;
      }
      setPledges(pledgeData.data.data);
      setRequests(requestData.data.data);
      setRefreshing(false);
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pledges, setPledges] = useState({});
  const [requests, setRequests] = useState({});

  const showBox = (key) => {
    Alert.alert(
      "Do you want to pledge to donate blood to this request?",
      `Request: ${requests[key].bloodType} blood requested at ${
        requests[key].hospital
      }\nContact: ${requests[key].receiver.name}\nDistance:${
        requests[key].distance
      }\nCreation Date: ${
        requests[key].creationDate.split("T")[0]
      }\nExpiration Date:${requests[key].expirationDate}`,
      [{ text: "Yes", onPress: () => pledge(key) }, { text: "Cancel" }]
    );
  };

  const showInfo = (key) => {
    Alert.alert(
      "Contact information",
      `Contact Name: ${pledges[key].receiver.name}\ne-mail Address: ${pledges[key].receiver.email}\nPhone Number: ${pledges[key].receiver.phoneNumber}\n`
    ,[{text: 'Go to Chat',onPress: () => navigation.navigate("Chat", {
      targetID: pledges[key].receiver.receiverID,
      targetName: pledges[key].receiver.name,
    })},{text:'OK'}]);
  };

  const pledge = async (key) => {
    try {
      setLoading(true);
      const response = await api.post("/bloodRequest/pledge", {
        requestID: requests[key].requestID,
      });
      getData();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const unPledge = async (key) => {
    try {
      setLoading(true);
      const response = await api.delete("/bloodRequest/pledge", {
        data: {
          requestID: pledges[key].requestID,
        },
      });
      getData();
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getData()}
          ></RefreshControl>
        }
      >
        <LoadingAnim isLoading={loading}></LoadingAnim>
        <Text style={[styles.title, { alignSelf: "center" }]}>
          Blood Requests Near Your Location
        </Text>
        <View style={styles.hr}></View>
        <CheckBox
          style={{ flex: 1, padding: 10 }}
          isChecked={checked}
          onClick={() => setChecked(!checked)}
          rightTextView={<Text>See Requests that are not your blood type</Text>}
        ></CheckBox>
        {pledges.length > 0 || requests.length > 0 ? (
          <View>
            <Text style={styles.title}>Pledged Requests</Text>
            <View style={styles.hr}></View>

            <FlatList
              data={pledges}
              renderItem={({ item }) => (
                <RequestEl
                  pledged={true}
                  data={item}
                  onCancel={() => unPledge(item.key)}
                  onPress={() => showInfo(item.key)}
                />
              )}
              keyExtractor={(item) => item.key}
            />
            <Text style={styles.title}>Nearby Requests</Text>
            <View style={styles.hr}></View>
            <FlatList
              data={requests}
              renderItem={({ item }) => (
                <RequestEl
                  pledged={false}
                  data={item}
                  onPress={() => showBox(item.key)}
                />
              )}
              keyExtractor={(item) => item.key}
            />
          </View>
        ) : (
          <Text>No requests were found near your location</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topStyle: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
