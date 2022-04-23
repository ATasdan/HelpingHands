import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Theme from "../../styles/theme";

import { Picker } from "@react-native-picker/picker";

class BloodTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: null,
      hasLocationPermission: false,
      latitude: 0,
      longitude: 0,
      restaurantList: [1, 2, 3],
    };
    this.state = this.state.bind(this);
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  async getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        hasLocationPermissions: true,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } else {
      alert("Location permission not granted");
    }
    this.handleRestaurantSearch();
  }

  handleRestaurantSearch = () => {
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    const location = `location=${this.state.latitude},${this.state.longitude}`;
    const radius = "&radius=3000";
    const type = "&keyword=hospitals";
    const key = "&key=AIzaSyDE8VyyAwXe647d0yGsNwiGOdud2Cok9OU";

    const restaurantSearchUrl = url + location + radius + type + key;

    fetch(restaurantSearchUrl)
      .then((response) => response.json())
      .then((result) => this.setState({ restaurantList: result }))
      .catch((e) => console.log(e));
  };

  render() {
    const { navigation } = this.props;
    console.log("im printing");
    console.log(this.state.restaurantList);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.text}>Get Well Soon!</Text>
          <Text style={{ marginTop: 10, color: "grey" }}>
            Blood Banks Near You That Fit Your Reservation Criteria :
          </Text>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={{ fontSize: Theme.font.medium }}>Please Choose:</Text>

          <View style={styles.inputContainer}>
            <Picker
              selectedValue={this.state.group}
              onValueChange={(value) => this.setState({ group: value })}
              mode="dropdown" // Android only
            >
              <Picker.Item label="Select Hospitals" value="Unknown" />
              {this.state.restaurantList.results.map((item, index) => {
                return <Picker.Item label={item} value={index} key={index} />;
              })}
            </Picker>
          </View>

          <View style={styles.divider} />
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.mainbtn}
          >
            <Text style={{ color: Theme.white, fontWeight: "bold" }}>
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
export default BloodTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  logoContainer: {
    flex: 0.3,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  bodyContainer: {
    flex: 0.5,
    paddingHorizontal: 20,
  },
  footerContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    backgroundColor: "black",
    height: 120,
    width: 120,
  },
  text: {
    fontSize: 24,
  },
  inputContainer: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#e6e6e6",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 3,
  },
  inputContainerNoPad: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#e6e6e6",
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  divider: {
    height: 30,
  },
  mainbtn: {
    width: "90%",
    height: 55,
    backgroundColor: Theme.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryBtn: {
    width: "90%",
    height: 55,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginTop: 10,
  },
});
