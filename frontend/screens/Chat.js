import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { api } from "../api/api";
import ChatEl from "../components/ChatEl";
import theme from "../styles/theme";

export default function Chat(props) {
  const [messages, setMessages] = useState({});
  const [id, setID] = useState("");
  const [text, setText] = useState("");
  const { targetID, targetName } = props.route.params;

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
    console.log("here");
    try {
      const response = await api.post("/chat/sendMessage", {
        targetID: targetID,
        message: message,
      });
    } catch (error) {
      console.log(error);
    }
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
});
