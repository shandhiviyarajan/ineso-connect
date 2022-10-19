import React from "react";
import { View, Text, Modal, Alert } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  ActionSearchDevice,
  ActionSetQR,
} from "../../../core/redux/actions/qrActions";
import { SystemColors } from "../../../core/Styles/theme/colors";
import { aesDecrypt } from "../../../core/utils/Backend";
import { Button } from "../../atoms/Button";
import { Message } from "../../molecules/Toast";
import QRScanner from "./Scanner";
function QRSearch({ open, setQRModal }) {
  const requestClose = () => {};

  const [progress, setProgress] = React.useState(false);

  const clientId = useSelector((state) => state.client.clientId);

  const dispatchAction = useDispatch();

  const handleReadQR = (e) => {
    // Alert.alert("Scanning");
    let qr_code = null;
    console.log(e.data.split("&id="));
    if (
      e &&
      e.data &&
      e.data.split("&id=") &&
      e.data.split("&id=").length > 0 &&
      e.data.split("&id=")[1]
    ) {
      Message("success", "QR Code valid", "please wait... ");
      //decrypt the data id
      qr_code = aesDecrypt(e.data.split("&id=")[1]);

      setProgress(true);

      console.log(qr_code);
      dispatchAction(ActionSetQR(qr_code));
      dispatchAction(
        ActionSearchDevice({
          clientId,
          qr_code,
        })
      );
      setTimeout(() => {
        setProgress(false);
        setQRModal(false);
      }, 1500);
    } else {
      setQRModal(false);
      Message("error", "QR Code not found", "Not a valid QR code ");
    }
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
            backgroundColor: "#000",
          }}
        >
          <View
            style={{
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
              alignItems: "center",
              width: "90%",
              height: "66%",
              borderRadius: 6,
            }}
          >
            <View style={{ flex: 0.8 }}>
              <QRScanner type="back" handleReadQR={handleReadQR} />
            </View>
            <View style={{ flex: 0.1, width: "80%" }}>
              <Text
                style={{
                  marginTop: 0,
                  textAlign: "center",
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Scan the QR code to search device
              </Text>
            </View>
            <View style={{ flex: 0.1, width: "90%", marginBottom: 24 }}>
              <Button
                underlayColor="#000"
                secondary
                isLoading={progress}
                onPress={() => setQRModal(false)}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default QRSearch;
