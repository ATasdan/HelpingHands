import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";

import MenuItem from "../components/MenuItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Theme from "../styles/theme";
import { useState, useEffect } from "react";

const guy = "https://randomuser.me/api/portraits/men/42.jpg";

const Home = (props) => {
  const { navigation } = props;
  const { paramKey, usrName, usrPhone, bloodType, usrEmail } =
    props.route.params;

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(usrEmail, value);
    } catch (e) {
      // saving error
    }
  };
  const storeUnique = async (value) => {
    try {
      let unique = usrEmail + "unique";
      console.log(unique);
      await AsyncStorage.setItem(unique, value);
    } catch (e) {
      // saving error
    }
  };
  const storeRequest = async (value) => {
    try {
      let unique = usrEmail + "request";
      console.log(unique);
      await AsyncStorage.setItem(unique, value);
    } catch (e) {
      // saving error
    }
  };

  const getRequest = async () => {
    try {
      let unique = usrEmail + "request";
      const value = await AsyncStorage.getItem(unique);
      // console.log(value);

      if (value !== null) {
        if (value == "firstrequest") {
          alert(
            "Congratulations! You have unlocked a badge. View it in Show Badges"
          );
          storeRequest("secondrequest");
        }
      } else {
        //console.log("get request is empty");
      }
    } catch (e) {
      console.log("error in home screen async");
    }
  };

  useEffect(() => {
    getData();
    getRequest();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(usrEmail);

      if (value !== null) {
        if (value === "firsttime") {
          console.log("yes this is the first time");
          alert(
            "Congratulations! You have unlocked a badge. View it in Show Badges"
          );
          storeData("secondtime");

          storeUnique("showfirstbadge");
        }
      }
    } catch (e) {
      console.log("error in home screen async");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.headercontainer}>
          <Image source={{ uri: guy }} style={styles.img} />
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.mainHead}>Welcome</Text>
            <Text style={styles.subHead}>{usrName}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{ marginTop: 5 }}
            >
              <Text style={{ color: "#fff", textDecorationLine: "underline" }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <ScrollView>
          <MenuItem
            iconName="syringe"
            itemName="Ask for Blood"
            navTo="AskBloodOne"
            userName={usrName}
            userPhone={usrPhone}
            bloodType={bloodType}
            userEmail={usrEmail}
          />
          <MenuItem
            iconName="list"
            itemName="My Requests"
            navTo="YourRequests"
          />
          <MenuItem
            iconName="map-marked"
            itemName="See Nearby Requests"
            navTo="NearbyRequests"
            paramKey={bloodType}
          />
          {/* <MenuItem
            iconName="grip-lines"
            itemName="My blood Journey"
            navTo="MyBloodJourney"
          /> */}

          <MenuItem
            iconName="medal"
            itemName="Show Badges"
            navTo="Badges"
            userEmail={usrEmail}
            userName={usrName}
          />
          <MenuItem iconName="user" itemName="My Profile" navTo="MyProfile" />
          <MenuItem
            iconName="address-card"
            itemName="My Card"
            navTo="BloodCard"
            userName={usrName}
            userPhone={usrPhone}
            bloodType={bloodType}
            userEmail={usrEmail}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  logoContainer: {
    flex: 0.25,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: Theme.primary,
  },
  bodyContainer: {
    flex: 0.8,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  img: {
    backgroundColor: "grey",
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  headercontainer: {
    flexDirection: "row",
    padding: 5,
    marginTop: 25,
  },
  divider: {
    height: 15,
  },
  mainHead: {
    fontSize: Theme.font.medium,
    color: Theme.white,
  },
  subHead: {
    fontSize: 22,
    fontWeight: "bold",
    color: Theme.white,
  },
});
