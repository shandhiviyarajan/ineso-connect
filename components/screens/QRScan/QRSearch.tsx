import React from "react";
import { View, Text, Modal, Alert, Pressable } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Button } from "../../atoms/Button";
import QRScanner from "./Scanner";
function QRSearch({ open, setQRModal }) {
  const requestClose = () => {};

  const handleReadQR = (e) => {
    console.log(e);
  };
  return (
    <>
      <Modal
        animationType="fade"
        visible={open}
        onRequestClose={requestClose}
        transparent={false}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              elevation: 5,
              backgroundColor: "#000",
              shadowColor: "#666",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.1,
              shadowRadius: 7,
              justifyContent: "center",
              alignContent: "center",
              width: "90%",
              height: "50%",
              borderRadius: 6,
            }}
          >
            <QRScanner
              type="back"
              scannerRef={null}
              handleReadQR={handleReadQR}
            />
            <Button underlayColor="#000" onPress={() => setQRModal(false)}>
              Close Scanner
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default QRSearch;
