import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Axios = require("axios");

// const func = async () => {
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

const Login = (props) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { navigation } = props;

  const func = async () => {
    const Axios = require("axios");

    console.log(email);
    console.log(password);
    await Axios.post(
      "https://helpinghandsproject.herokuapp.com/api/auth/login",
      {
        email: email,
        password: password,
      }
    )
      .then((res) => {
        console.log(res.data);

        navigation.navigate("Home", { paramKey: email });
      })
      .catch((error) => {
        alert("There was an error in logging in. Please try again!");
        console.log(error);
      });
  };

  const validateLogin = () => {
    if (email.length == 0 || password.length == 0) {
      alert("Please insert all required fields!");
    } else {
      func();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: logo }} style={styles.img}></Image>
        <Text style={styles.text}>Helping Hands</Text>
      </View>
      <View style={styles.bodyContainer}>
        {/* <ScrollView> */}
        <Text style={{ fontSize: Theme.font.medium }}>Email</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Enter Here"
          onChangeText={(newText) => setEmail(newText)}
          defaultValue={email}
        />
        <View style={styles.divider} />
        <Text style={{ fontSize: Theme.font.medium }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.inputContainer}
          placeholder="Enter Here"
          onChangeText={(newText) => setPassword(newText)}
          defaultValue={password}
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
