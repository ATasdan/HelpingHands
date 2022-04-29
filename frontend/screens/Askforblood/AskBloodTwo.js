import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

//set a boolean value and have the loading icon rotate until hospresults is not empty else remove it with a conditional operator

import * as Location from "expo-location";
import Theme from "../../styles/theme";

import { Picker } from "@react-native-picker/picker";

const BloodTwo = (props) => {
  const [show, SetShow] = useState(true);
  const [showLoading, SetLoading] = useState(false);

  const [hospResults, setHospResults] = useState([]);
  const [locPerm, setLocPerm] = useState(false);
  const [latitude, setLatitude] = useState(null); //39.872102
  const [longitude, setLongitude] = useState(null); //32.748339
  const [pickerValue, setPickerValue] = useState("");

  useEffect(() => {
    (async () => {
      try {
        console.log("use effect");
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
            maximumAge: 10000,
          });
          setLocPerm(true);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);

          // handleRestaurantSearch();
        } else {
          alert("Location permission not granted");
        }
      } catch (err) {
        setLocPerm(false);
        alert("Location permission not granted");
      }
    })();
  }, []);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });
      setLocPerm(true);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    } else {
      alert("Location permission not granted");
    }
  };

  const handleRestaurantSearch = async () => {
    if (locPerm === false) {
      getLocationAsync();
    }
    const url = "";
    const location = `location=${latitude},${longitude}`;
    const radius = "&radius=10000";
    const type = "&keyword=hospital";
    const key = "&key=AIzaSyAi_c0PFNz8AenR8oFNu8Ovg8lBUt2MkU4";

    const restaurantSearchUrl = url + location + radius + type + key;
    console.log(restaurantSearchUrl);

    await fetch(restaurantSearchUrl)
      .then((res) => res.json())
      .then((res) => {
        var places = []; // This Array WIll contain locations received from google
        for (let googlePlace of res.results) {
          var place = {};
          var lat = googlePlace.geometry.location.lat;
          var lng = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: lat,
            longitude: lng,
          };

          var gallery = [];

          // if (googlePlace.photos) {
          //   for (let photo of googlePlace.photos) {
          //     var photoUrl = Urls.GooglePicBaseUrl + photo.photo_reference;
          //     gallery.push(photoUrl);
          //   }
          // }

          place["placeTypes"] = googlePlace.types;
          place["coordinate"] = coordinate;
          place["placeId"] = googlePlace.place_id;
          place["placeName"] = googlePlace.name;
          place["gallery"] = gallery;

          places.push(place);
        }
        setHospResults(places);

        SetLoading(true);
        setTimeout(() => {
          SetLoading(false);
          SetShow(false);
        }, 2000);
        SetShow(true);

        // Do your work here with places Array
      })
      .catch((e) => console.log(e));

    //cleanHospitalData();
  };

  const { navigation } = props;

  const viewHospitals = () => {
    handleRestaurantSearch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.text}>Get Well Soon!</Text>
        <Text style={{ marginTop: 10, color: "grey" }}>
          Blood Banks Near You That Fit Your Reservation Criteria :
        </Text>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={viewHospitals} style={styles.secondaryBtn}>
          <Text style={{ color: Theme.white, fontWeight: "bold" }}>
            View Nearby Hospitals
          </Text>
        </TouchableOpacity>
      </View>

      {showLoading === true ? (
        <View style={[styles.horizontal]}>
          <ActivityIndicator size="large" color="#FF0000" />
        </View>
      ) : (
        <></>
      )}
      {show === false ? (
        <View style={styles.bodyContainer}>
          <Text style={{ fontSize: Theme.font.medium }}>Please Choose:</Text>

          <View style={styles.inputContainer}>
            <Picker
              selectedValue={pickerValue}
              onValueChange={(value) => {
                setPickerValue(value);
              }}
              mode="dropdown" // Android only */}
            >
              <Picker.Item label="Select Hospitals" value="Unknown" />
              {hospResults.map((objects) => {
                return (
                  <Picker.Item
                    label={objects.placeName}
                    value={objects.placeId}
                    key={objects.placeId}
                  />
                );
              })}
            </Picker>
          </View>

          <View style={styles.divider} />
        </View>
      ) : (
        <></>
      )}

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
};

export default BloodTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  horizontal: {
    justifyContent: "center",
    padding: 10,
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
    backgroundColor: "#34568B",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginTop: 10,
  },
});
