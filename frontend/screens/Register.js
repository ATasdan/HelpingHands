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
} from "react-native";
import { useState } from "react";
import Theme from "../styles/theme";
import { Picker } from "@react-native-picker/picker";

import { api, changeToken } from "../api/api";
import LoadingAnim from "../components/LoadingAnim";

const Register = (props) => {
  const { navigation } = props;
  const [username, setUsername] = useState("");
  const [bloodtype, setBloodtype] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false); // for spinner

  const apiCall = async () => {
    try {
      setLoading(true);
      const response = await api.post("/auth/register", {
        name: username,
        email: email,
        password: password,
        bloodType: bloodtype,
        phoneNumber: phonenumber,
        address: address,
      });
      setLoading(false);

      alert("You have successfully registered your account!");

      // This is only for register and login
      changeToken(response.data.token);

      navigation.navigate("Home", {
        paramKey: response.data.data.name,
        bloodType: response.data.data.bloodType,
      });
    } catch (error) {
      setLoading(false);
      alert("There was an error in the registration. Please try again!");
      console.log(error);
    }
  };

  const validateRegistration = () => {
    if (
      username.length == 0 ||
      password.length == 0 ||
      bloodtype.length == 0 ||
      email.length == 0 ||
      address.length == 0 ||
      phonenumber.length == 0
    ) {
      alert("Please insert all required fields!");
    } else {
      apiCall();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <LoadingAnim isLoading={loading}></LoadingAnim>
      <View style={styles.logoContainer}>
        <Text style={styles.text}>Helping Hands</Text>
      </View>
      <KeyboardAvoidingView behavior="position" style={styles.bodyContainer}>
        <ScrollView>
          <Text style={{ fontSize: Theme.font.medium }}>Name</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="Enter Here"
            onChangeText={(newText) => setUsername(newText)}
            defaultValue={username}
          />

          <View style={styles.divider} />

          <Text style={{ fontSize: Theme.font.medium }}>Blood Type</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="Enter Here"
            onChangeText={(newText) => setBloodtype(newText)}
            defaultValue={bloodtype}
          />

          <View style={styles.divider} />

          <Text style={{ fontSize: Theme.font.medium }}>Email</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="Enter Here"
            onChangeText={(newText) => setEmail(newText)}
            defaultValue={email}
            autoCapitalize="none"
          />

          <View style={styles.divider} />

          <Text style={{ fontSize: Theme.font.medium }}>Phone Number</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder="Enter Here"
            onChangeText={(newText) => setPhonenumber(newText)}
            defaultValue={phonenumber}
          />

          <View style={styles.divider} />

          <Text style={{ fontSize: Theme.font.medium }}>Address</Text>
          <TextInput
            multiline={true}
            style={styles.inputContainerBig}
            placeholder="Enter Here"
            onChangeText={(newText) => setAddress(newText)}
            defaultValue={address}
          />

          <View style={styles.divider} />

          <Text style={{ fontSize: Theme.font.medium }}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputContainer}
            placeholder="Enter Here"
            onChangeText={(newText) => setPassword(newText)}
            defaultValue={password}
            autoCapitalize="none"
          />

          <View style={styles.divider} />
          {/* <Text style={{ fontSize: Theme.font.medium }}>User Type</Text>
                    <View style={styles.inputContainerNoPad}>
                        <Picker
                            selectedValue={this.state.user}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({user : itemValue})
                            }
                            mode="dropdown" // Android only
                        >
                            <Picker.Item label="Blood Donors" value="bd" />
                            <Picker.Item label="Blood Receivers" value="br" />
                        </Picker>
                     </View> */}

          <View style={styles.divider} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={{ flex: 0.4 }}>
        <TouchableOpacity style={styles.mainbtn} onPress={validateRegistration}>
          <Text style={{ color: Theme.white, fontWeight: "bold" }}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.secondaryBtn}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  logoContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    flex: 1.2,
    paddingHorizontal: 20,
  },
  img: {
    backgroundColor: "black",
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
  divider: {
    height: 15,
  },
  mainbtn: {
    width: "90%",
    height: 55,
    backgroundColor: Theme.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
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
    marginLeft: 20,
  },
});
