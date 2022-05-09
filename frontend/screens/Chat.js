import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { api } from "../api/api";
import ChatEl from "../components/ChatEl";
import theme from "../styles/theme";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Chat(props) {
  const [messages, setMessages] = useState({});
  const [id, setID] = useState("");
  const [text, setText] = useState("");
  const { targetID, targetName, targetType, requestID } = props.route.params;

  const navigation = useNavigation();

  const getMessages = async () => {
    try {
      const response = await api.post("/chat/getAllMessages", {
        targetID: targetID,
      });
      let arr = response.data.data.receivedMessages;
      if (response.data.data.sentMessages.length > 0) {
        for (const msg of response.data.data.sentMessages) {
          arr.push(msg);
        }
      }
      console.log("here");
      arr.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        return 1;
      });
      setMessages(arr);
      setID(response.data.data.yourID);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message) => {
    try {
      const response = await api.post("/chat/sendMessage", {
        targetID: targetID,
        message: message,
      });
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  const removePledge = async () => {
    try {
      const response = await api.delete("/bloodRequest/pledge", {
        data: {
          requestID: requestID,
          donorID: targetID,
        },
      });
      alert("You have accepted the donation!");
      navigation.pop();
    } catch (error) {}
  };

  useEffect(() => {
    var intID = setInterval(() => getMessages(), 1000);
    return () => {
      clearInterval(intID);
    };
  }, []);

  return (
    <View style={styles.container2}>
      <View
        style={{
          backgroundColor: "#60a832",
          height: 40,
          justifyContent: "center",
          paddingHorizontal: 30,
        }}
      >
        <Text>Chat with {targetName}</Text>
        {targetType === "YourRequest" ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={removePledge}>
              <AntDesign
                name="checkcircle"
                style={{ paddingRight: 10 }}
                size={30}
                color="blue"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={removePledge}>
              <Entypo name="circle-with-cross" size={35} color="red" />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={messages}
            renderItem={({ item }) =>
              item.senderID === id ? (
                <ChatEl
                  date={item.createdAt}
                  color="#60a832"
                  align="flex-end"
                  message={item.message}
                />
              ) : (
                <ChatEl
                  date={item.createdAt}
                  color={theme.primary}
                  align="flex-start"
                  message={item.message}
                />
              )
            }
            keyExtractor={(item) => item._id}
          />
        </View>
        <TextInput
          value={text}
          style={styles.input}
          onChangeText={setText}
          placeholder="Send a message"
          onSubmitEditing={() => sendMessage(text)}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  container2: {
    flex: 1,
    paddingTop: 50,
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
  },
});
