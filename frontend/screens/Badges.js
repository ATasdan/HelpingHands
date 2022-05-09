import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import Theme from "../styles/theme";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BJ = (props) => {
  const [data, setData] = useState([]);
  //   let DATA = [
  //     {
  //       id: "1",

  //       badgeImage:
  //         "https://i.pinimg.com/originals/11/5f/0a/115f0ac90dfc685ff3564a27cb9e11d1.png",
  //       badgeName: "Account Created",
  //     },
  //     {
  //       id: "2",
  //       badgeImage:
  //         "https://cdn4.iconfinder.com/data/icons/badges-9/66/31-512.png",
  //       badgeName: "First Request",
  //     },
  //     {
  //       id: "3",
  //       badgeImage: "https://i.dlpng.com/static/png/6718687_preview.png",
  //       badgeName: "First Pledge",
  //     },
  //     //   {
  //     //     id: "4",
  //     //     badgeImage:
  //     //       "https://icons.iconarchive.com/icons/seanau/fresh-web/512/Badge-icon.png",
  //     //     badgeName: "Silver Badge",
  //     //   },
  //   ];
  const { navigation } = props;

  const { userName, userEmail } = props.route.params;

  useEffect(() => {
    getData();
    getDataRequest();
  }, []);

  const getData = async () => {
    try {
      let unique = userEmail + "unique";

      const value = await AsyncStorage.getItem(unique);

      if (value !== null) {
        if (value === "showfirstbadge") {
          console.log("yes value is that");
          setData([
            {
              id: "1",

              badgeImage:
                "https://i.pinimg.com/originals/11/5f/0a/115f0ac90dfc685ff3564a27cb9e11d1.png",
              badgeName: "Account Created",
            },
          ]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDataRequest = async () => {
    try {
      let unique = userEmail + "request";
      console.log(unique);
      const value = await AsyncStorage.getItem(unique);

      if (value !== null) {
        if (value === "secondrequest") {
          console.log(value);
          setData([
            {
              id: "1",

              badgeImage:
                "https://i.pinimg.com/originals/11/5f/0a/115f0ac90dfc685ff3564a27cb9e11d1.png",
              badgeName: "Account Created",
            },
            {
              id: "2",
              badgeImage:
                "https://cdn4.iconfinder.com/data/icons/badges-9/66/31-512.png",
              badgeName: "First Request",
            },
          ]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.text}>My Badges!</Text>
        <Text style={{ marginTop: 10, color: "grey" }}>
          Dear {userName},Your Current Badge is :
        </Text>
      </View>

      <View style={styles.bodyContainer}>
        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Image
                  source={{ uri: item.badgeImage }}
                  style={styles.img}
                ></Image>
                <Text>{item.badgeName}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
export default BJ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bodyContainer: {
    flex: 0.8,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  img: {
    height: 85,
    width: 85,
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
  item: {
    backgroundColor: Theme.seconadry,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: 150,
    padding: 20,
    margin: 10,
  },
  divider: {
    height: 30,
  },
});
