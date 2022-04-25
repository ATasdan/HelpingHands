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
  const { paramKey } = props.route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.headercontainer}>
          <Image source={{ uri: guy }} style={styles.img} />
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.mainHead}>Welcome</Text>
            <Text style={styles.subHead}>{JSON.stringify(paramKey)}</Text>
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
          />
          <MenuItem
            iconName="list"
            itemName="See Nearby Requests"
            navTo="NearbyRequests"
          >
          </MenuItem>
          <MenuItem
            iconName="map-marked"
            itemName="Check on Map"
            navTo="CheckMap"
          />
          <MenuItem
            iconName="grip-lines"
            itemName="My blood Journey"
            navTo="MyBloodJourney"
          />
          <MenuItem
            iconName="history"
            itemName="My History"
            navTo="BloodHistory"
          />
          <MenuItem iconName="medal" itemName="Show Badges" navTo="Badges" />
          <MenuItem iconName="teamspeak" itemName="Teams" navTo="Teams" />
          <MenuItem iconName="smile" itemName="Share Selfie" navTo="Camera" />
          <MenuItem iconName="user" itemName="My Profile" navTo="MyProfile" />
          <MenuItem
            iconName="address-card"
            itemName="My Card"
            navTo="BloodCard"
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
