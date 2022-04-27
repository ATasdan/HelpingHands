import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import Register from "./screens/Register";
import BloodHistory from "./screens/BloodHistory";
import Home from "./screens/Home";
import Badges from "./screens/Badges";
import AskBloodOne from "./screens/Askforblood/AskBloodOne";
import AskBloodTwo from "./screens/Askforblood/AskBloodTwo";
import MyBloodJourney from "./screens/BloodJourney/MyBloodJourney";
import BloodJourneyView from "./screens/BloodJourney/BloodJourneyView";
import Teams from "./screens/Teams/Teams";
import CreateTeam from "./screens/Teams/CreateTeam";
import MyProfile from "./screens/MyProfile";
import BloodCard from "./screens/BloodCard";
import CheckMap from "./screens/CheckOnMap/CheckMap";
import HospitalView from "./screens/CheckOnMap/HospitalView";
import Camera from "./screens/Camera";
import NearbyRequests from "./screens/NearbyRequests";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Location from "expo-location";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NearbyRequests">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AskBloodOne"
          component={AskBloodOne}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AskBloodTwo"
          component={AskBloodTwo}
        />
        <Stack.Screen
          options={{headerShown:false}}
          name="NearbyRequests"
          component={NearbyRequests}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyBloodJourney"
          component={MyBloodJourney}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BloodJourneyView"
          component={BloodJourneyView}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BloodHistory"
          component={BloodHistory}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Badges"
          component={Badges}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyProfile"
          component={MyProfile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Teams"
          component={Teams}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CreateTeam"
          component={CreateTeam}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BloodCard"
          component={BloodCard}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CheckMap"
          component={CheckMap}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HospitalView"
          component={HospitalView}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Camera"
          component={Camera}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
