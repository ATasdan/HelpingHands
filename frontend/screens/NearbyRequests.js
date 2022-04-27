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
  Button
} from "react-native";
import React, { useState, useEffect } from "react";
import RequestEl from "../components/RequestEl";
import CheckBox from "react-native-check-box";
import {api} from '../api/api'

export default function NearbyRequests() {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  useEffect(async () => {
    try {
      const requestData = await api.get('/nearbyRequests')
      const pledgeData = await api.get('/pledge')
      setPledges(pledgeData)
      setRequests(requestData)  
    } catch (error) {
      console.log(error);
    }
  })
  const [checked, setChecked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [pledges,setPledges] = useState({})
  const [requests,setRequests] = useState({})
  

  const showBox = (key) => {
    Alert.alert(
      "Do you want to pledge to donate blood to this request?",
      `Request:${data[key].bloodType} blood requested at ${data[key].hospital}\nContact: ${data[key].receiver.name}\nDistance:${data[key].distance}\nCreation Date:${data[key].creationDate.toLocaleDateString()}`,
      [{text:'Yes'},{text:'Cancel'}]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          ></RefreshControl>
        }
      >
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

        <Text style={styles.title}>Pledged Requests</Text>
        <View style={styles.hr}></View>

        <FlatList
          data={pledges}
          renderItem={({ item }) => <RequestEl pledged={true} data={item} onPress={() => showBox(item.key)} />}
          keyExtractor={(item) => item.key}
        />
        <Text style={styles.title}>Nearby Requests</Text>
        <View style={styles.hr}></View>
        <FlatList
          data={pledges}
          renderItem={({ item }) => <RequestEl pledged={false} data={item} onPress={() => showBox(item.key)}/>}
          keyExtractor={(item) => item.key}
        />
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
    padding: 20,
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
