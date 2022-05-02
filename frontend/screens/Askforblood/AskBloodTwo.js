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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { Picker } from "@react-native-picker/picker";
import { api } from "../../api/api";
import LoadingAnim from "../../components/LoadingAnim";
import { GOOGLE_API, MAPS_API } from "@env";
const BloodTwo = (props) => {
  const { userName, userPhone, userDate, selectedGroup, userGroup, userUnits } =
    props.route.params;

  const [show, SetShow] = useState(true);
  const [showLoading, SetLoading] = useState(false);

  const [hospResults, setHospResults] = useState([]);
  const [locPerm, setLocPerm] = useState(false);
  const [latitude, setLatitude] = useState(0); //39.872102
  const [longitude, setLongitude] = useState(0); //32.748339
  const [loading, setLoading] = useState(false); // for spinner
  const [pickerVal, setPickerVal] = useState("Select Hospitals");
  const [latitudeMarker, setLatitudeMarker] = useState(0);
  const [longitudeMarker, setLongitudeMarker] = useState(0);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (latitude === null || longitude === null) {
      handleHospitalSearchTemp();
    }

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          setLoading(true);
          let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
            maximumAge: 10000,
          });
          setLoading(false);
          setLocPerm(true);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setLatitudeMarker(latitude);
          setLongitudeMarker(longitude);

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

  const createRequest = async () => {
    if (
      latitudeMarker === 0 ||
      longitudeMarker === 0 ||
      pickerVal === "Select Hospitals"
    ) {
      alert("Please select a hospital!");
    } else {
      try {
        const response = await api.post("/bloodRequest/create", {
          latitude: latitudeMarker,
          longitude: longitudeMarker,
          bloodType: selectedGroup,
          hospital: pickerVal,
          expDate: userDate,
        });
        navigation.navigate("Home", {
          usrName: userName,
          usrPhone: userPhone,
          bloodType: userGroup,
        });
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  const getLocationAsync = async () => {
    try {
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
  };

  const handleHospitalSearchTemp = async () => {
    if (locPerm === false) {
      getLocationAsync();
    }
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    const location = `location=${latitude},${longitude}`;
    const radius = "&radius=10000";
    const type = "&keyword=hospital";
    const key = GOOGLE_API;

    const hospitalSearchUrl = url + location + radius + type + key;

    await fetch(hospitalSearchUrl)
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

        // Do your work here with places Array
      })
      .catch((e) => console.log(e));

    //cleanHospitalData();
  };

  const distanceCalculator = async () => {
    //calls distance api here
    const url = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    const origins = `origins=${latitude},${longitude}`;
    const destinations = `&destinations=${latitudeMarker},${longitudeMarker}`;
    const key = GOOGLE_API;

    const distanceUrl = url + origins + destinations + key;

    await fetch(distanceUrl)
      .then((res) => res.json())
      .then((res) => {
        for (let googlePlace of res.rows) {
          for (let elements of googlePlace.elements) {
            setDistance(elements.distance.text);
            setDuration(elements.duration.text);
          }
        }
      })
      .catch((e) => console.log(e));
  };

  const handleHospitalSearch = async () => {
    if (locPerm === false) {
      getLocationAsync();
    }
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    const location = `location=${latitude},${longitude}`;
    const radius = "&radius=10000";
    const type = "&keyword=hospital";
    const key = GOOGLE_API;

    const hospitalSearchUrl = url + location + radius + type + key;
    console.log(hospitalSearchUrl);
    await fetch(hospitalSearchUrl)
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
        }, 1000);
        SetShow(true);

        // Do your work here with places Array
      })
      .catch((e) => console.log(e));

    //cleanHospitalData();
  };

  const { navigation } = props;

  const viewHospitals = () => {
    handleHospitalSearch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingAnim isLoading={loading}></LoadingAnim>
      <View style={styles.logoContainer}>
        <Text style={styles.text}>Get Well Soon!</Text>
        <Text style={{ marginTop: 10, color: "grey" }}>
          Blood Banks Near You That Fit Your Reservation Criteria :
        </Text>
      </View>

      <View style={styles.footerContainer}>
        <Text></Text>
        <Text style={{ marginTop: 10, color: "#FF69B4", fontWeight: "bold" }}>
          Distance: {distance}, Duration: {duration}
        </Text>
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
        <>
          <View style={styles.bodyContainer}>
            <Text style={{ fontSize: Theme.font.medium }}>Please Choose:</Text>

            <View style={styles.inputContainer}>
              <Picker
                selectedValue={pickerVal}
                onValueChange={(itemValue, itemIndex) => {
                  hospResults.map((objects) => {
                    if (objects.placeName.toString() === itemValue.toString()) {
                      setLatitudeMarker(objects.coordinate.latitude);
                      setLongitudeMarker(objects.coordinate.longitude);
                    }
                  }),
                    setPickerVal(itemValue);

                  setLoading(true);
                  distanceCalculator();

                  setLoading(false);
                }}
                dropdownIconColor="black"
                mode="dropdown" // Android only */}
              >
                <Picker.Item
                  label="Select Hospitals"
                  value="Select Hospitals"
                />
                {hospResults.map((objects) => {
                  return (
                    <Picker.Item
                      label={objects.placeName}
                      value={objects.placeName}
                      key={objects.placeId}
                    />
                  );
                })}
              </Picker>
            </View>

            <View style={styles.divider} />
            <MapView
              style={{ flex: 1 }}
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              initialRegion={{
                latitude: 39.872102,
                longitude: 32.748339,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
            >
              <MapViewDirections
                origin={{ latitude: latitude, longitude: longitude }}
                destination={{
                  latitude: latitudeMarker,
                  longitude: longitudeMarker,
                }}
                apikey={MAPS_API}
                strokeWidth={3}
                strokeColor="hotpink"
              />
              <Marker
                coordinate={{
                  latitude: latitudeMarker,
                  longitude: longitudeMarker,
                }}
              />
            </MapView>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={() => {
                createRequest();
              }}
              style={styles.mainbtn}
            >
              <Text style={{ color: Theme.white, fontWeight: "bold" }}>
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}
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
    flex: 0.15,
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
    marginTop: 50,
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
