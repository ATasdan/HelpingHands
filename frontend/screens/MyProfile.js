import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Theme from "../styles/theme";
import { Picker } from "@react-native-picker/picker";
import LoadingAnim from "../components/LoadingAnim";
import { api, changeToken } from "../api/api";

const B1 = (props) => {
  const { navigation } = props;

  const [username, setUsername] = useState("");
  const [bloodtype, setBloodtype] = useState("Select Blood Group");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false); // for spinner
  const [password, setPassword] = useState("");

  const { userEmail, userName, userPhone, userBloodType } = props.route.params;

  const apiCall = async () => {
    try {
      setLoading(true);
      const response = await api.patch("/auth/modify", {
        name: username,
        email: email,
        password: password,
        bloodType: bloodtype,
        phoneNumber: phonenumber,
        address: address,
      });
      setLoading(false);

      alert("Successful! Login with your new details");

      // This is only for register and login
      changeToken(response.data.token);

      navigation.navigate("Login");
    } catch (error) {
      setLoading(false);
      alert("The account update failed!");
      console.log(error);
    }
  };

  const validateChanges = () => {
    console.log(bloodtype);
    if (
      username.length == 0 ||
      bloodtype.length == 0 ||
      email.length == 0 ||
      address.length == 0 ||
      password.length == 0 ||
      phonenumber.length == 0
    ) {
      alert("Please insert all required fields!");
    } else if (/[^a-zA-Z]/.test(username)) {
      alert("Your name must only contain alphabets");
    } else if (!/^[0-9]*$/.test(phonenumber)) {
      alert("Phone number is not valid");
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.trim()
      )
    ) {
      alert("Email is not valid");
    } else if (phonenumber.length < 11) {
      alert("Phone number is incomplete");
    } else if (password.trim().length < 6) {
      alert("Password must be longer than 5 letters!");
    } else if (bloodtype === "Select Blood Group") {
      alert("please select a valid blood group");
    } else if (address.trim().length < 5) {
      alert("address cannot be shorter than 5 characters!");
    } else {
      apiCall();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingAnim isLoading={loading}></LoadingAnim>
      <View style={styles.logoContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.img}></View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>My Profile!</Text>
            <TouchableOpacity>
              <Text
                style={{ textDecorationLine: "underline", paddingLeft: 25 }}
              >
                Change Profile Picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <ScrollView>
          <Text style={{ fontSize: Theme.font.medium }}>Name</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="Change your name"
            onChangeText={(newText) => setUsername(newText)}
          />

          <View style={styles.divider} />

          <Text style={{ fontSize: Theme.font.medium }}>Phone number</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.inputContainer}
            placeholder="05538687565"
            maxLength={11}
            onChangeText={(newText) => setPhonenumber(newText)}
          />

          <View style={styles.divider} />
          <Text style={{ fontSize: Theme.font.medium }}>Email</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="xxx@gmail.com"
            onChangeText={(newText) => setEmail(newText)}
          />

          <View style={styles.divider} />
          <Text style={{ fontSize: Theme.font.medium }}>Password</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="Change your password"
            onChangeText={(newText) => setPassword(newText)}
          />

          <View style={styles.divider} />

          <Text style={{ fontSize: Theme.font.medium }}>Address</Text>
          <TextInput
            multiline={true}
            placeholder="Change Address"
            style={styles.inputContainerBig}
            onChangeText={(newText) => setAddress(newText)}
          />

          <View style={styles.divider} />

          <Text style={{ fontSize: Theme.font.medium }}>Blood Type</Text>
          <View style={styles.inputContainerNoPad}>
            <Picker
              selectedValue={bloodtype}
              onValueChange={(itemValue, index) => setBloodtype(itemValue)}
              mode="dropdown" // Android only
            >
              <Picker.Item
                label="Select Blood Group"
                value="Select Blood Group"
              />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="O-" value="O-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
            </Picker>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={validateChanges} style={styles.mainbtn}>
          <Text style={{ color: Theme.white, fontWeight: "bold" }}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default B1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  logoContainer: {
    flex: 0.3,
    justifyContent: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  bodyContainer: {
    flex: 0.6,
    paddingHorizontal: 20,
  },
  footerContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    backgroundColor: "grey",
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  text: {
    fontSize: 24,
    paddingHorizontal: 20,
  },
  inputContainerBig: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#e6e6e6",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 100,
    borderRadius: 3,
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
