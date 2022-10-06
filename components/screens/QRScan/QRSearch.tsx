import React from "react";
import { View, Text, Modal, Alert, Pressable } from "react-native";
function QRSearch() {
  const requestClose = () => {
    Alert.alert("Modal closed");
  };
  return (
    <>
      <Modal visible={true} onRequestClose={requestClose} transparent={true}>
        <View
          style={{
            width: "80%",
            height: "60%",
            backgroundColor: "#fff",
            borderRadius: 6,
          }}
        >
          <View>
            <Text>QR Search</Text>
          </View>

          <Pressable
            onPress={() => {
              Alert.alert("test");
            }}
          >
            <Text>Close modal</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

export default QRSearch;
