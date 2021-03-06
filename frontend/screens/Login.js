import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Button,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, changeToken } from "../api/api";

// const apiCall = async () => {
//   const response = await Axios.post(
//     "https://helpinghandsproject.herokuapp.com/api/auth/register",
//     {
//       name: "Metehan",
//       email: "mete@gmail.com",
//       password: "123456",
//       bloodType: "AB+",
//       phoneNumber: "032142314",
//       address: "addresstest",
//     }
//   );
//   console.log(response);
// };

import Theme from "../styles/theme";

const logo = "https://cdn-icons-png.flaticon.com/512/205/205916.png";
import { Picker } from "@react-native-picker/picker";
import LoadingAnim from "../components/LoadingAnim";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false); // for spinner
  const [boolval, setBoolVal] = useState(false);

  const { navigation } = props;

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(email, value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(email);

      if (value !== null) {
        if (value === "secondtime") {
          setBoolVal(true);
        }
      }
    } catch (e) {
      // error reading value
    }
  };

  const apiCall = async () => {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      setLoading(false);

      // This is only for register and login
      changeToken(response.data.token);

      navigation.navigate("Home", {
        usrName: response.data.data.name,
        usrPhone: response.data.data.phoneNumber,
        bloodType: response.data.data.bloodType,
        usrEmail: response.data.data.email,
      });
    } catch (error) {
      setLoading(false);
      alert("You have entered incorrect credentials");
      console.log(error.response.data);
    }
  };

  const validateLogin = () => {
    if (email.length == 0 || password.length == 0) {
      alert("Please insert all required fields!");
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.trim()
      )
    ) {
      alert("Email is not valid");
    } else if (password.trim().length < 6) {
      alert("Password must be longer than 5 letters!");
    } else {
      getData();
      console.log(boolval);
      if (!boolval) {
        console.log("im inside bool");
        storeData("firsttime");
      }

      apiCall();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Below is a spinner to indicate loading */}
      <LoadingAnim isLoading={loading}></LoadingAnim>
      <View style={styles.logoContainer}>
        <Image source={{ uri: logo }} style={styles.img}></Image>
        <Text style={styles.text}>Helping Hands</Text>
      </View>
      <View style={styles.bodyContainer}>
        {/* <ScrollView> */}
        <Text style={{ fontSize: Theme.font.medium }}>Email</Text>
        <TextInput
          style={styles.inputContainer}
          onChangeText={(newText) => setEmail(newText.trim())}
          defaultValue={email}
          placeholder="Enter Email"
          autoCapitalize="none"
        />
        <View style={styles.divider} />
        <Text style={{ fontSize: Theme.font.medium }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.inputContainer}
          placeholder="Enter Password"
          onChangeText={(newText) => setPassword(newText)}
          defaultValue={password}
          autoCapitalize="none"
        />
        <View style={styles.divider} />
        {/* <Text style={{ fontSize: Theme.font.medium }}>User Type</Text>
            <View style={styles.inputContainerNoPad}> */}
        {/* <Picker
                            selectedValue={this.state.user}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({user : itemValue})
                            }
                            mode="dropdown" // Android only
                        >
                            <Picker.Item label="Blood Donors" value="bd" />
                            <Picker.Item label="Blood Receivers" value="br" />
                        </Picker> */}
        {/* </View> */}
        {/* </ScrollView> */}
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={validateLogin} style={styles.mainbtn}>
          <Text style={{ color: Theme.white, fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.secondaryBtn}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 120,
    width: 120,
  },
  text: {
    fontSize: Theme.font.extralarge,
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
    paddingHorizontal: 20,
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
