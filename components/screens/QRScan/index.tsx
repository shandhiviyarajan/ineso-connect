import { StackActions, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { aesDecrypt } from "../../../core/utils/Backend";
import { Message } from "../../molecules/Toast";
import QRScanner from "./Scanner";
import { apiSearchDevices } from "../../../core/API/apiQR";
import { Button } from "../../atoms/Button";
function QRActivate() {
  const navigation = useNavigation();
  const [type, setCamType] = React.useState("back");

  const client = useSelector((state) => state.client.client.data);

  const clientId = useSelector((state) => state.client.clientId);

  const activate = useSelector((state) => state.qr.activate);
  const [isLoading, setLoading] = React.useState(false);

  const [qr_code, setQRCode] = React.useState(null);

  const handleReadQR = (e) => {
    if (e && e.data && !isLoading) {
      setLoading(true);
    }
    let qr = e.data ? e.data.split("&id=")[1] : null;
    if (qr) {
      setQRCode(aesDecrypt(qr));
      apiSearchDevices({
        clientId,
        qr_code: aesDecrypt(qr),
      })
        .then((response) => {
          if (response && response.data.data[0]) {
            navigation.dispatch(
              StackActions.replace("QRActivation", {
                device: response.data.data[0],
              })
            );
            // navigation.navigate("QRActivation", {
            //   device: response.data.data[0],
            // });
          } else {
            Message(
              "warning",
              "Device not found",
              "QR searched device is not found"
            );

            navigation.navigate("DeviceNotFound");
          }
        })
        .catch((error) => {
          Message(
            "error",
            "QR Code search failed",
            "QR search request failed "
          );
          navigation.dispatch(StackActions.replace("DeviceNotFound"));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const toDevices = () => {
    navigation.navigate("Dashboard");
  };

  const [feedback, setFeedBackModal] = React.useState(false);
  return (
    <>
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <View style={styles.bottomContainer}>
          {!client && (
            <>
              <Text style={styles.bottomContainerText}>
                Please select a Client & Start Scanning the QR Code
              </Text>

              <Button onPress={toDevices}>View Devices</Button>
            </>
          )}
          {isLoading && client && (
            <>
              <ActivityIndicator color="#000" />
            </>
          )}
          {!isLoading && client && (
            <>
              <Text style={styles.bottomContainerText}>
                Activate your device by Scanning the QR code.
              </Text>
            </>
          )}
        </View>
      </View>

      {client && (
        <>
          <View
            style={{
              flex: 4,
              backgroundColor: "#000",
            }}
          >
            <QRScanner type={type} handleReadQR={handleReadQR} />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  customMarker: {
    borderWidth: 0,
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").width / 1.5,
    maxWidth: 380,
    maxHeight: 380,
    backgroundColor: "transparent",
  },
  bottomContainer: {
    padding: 24,
    paddingHorizontal: 24,
    borderRadius: 50,
    color: "#000",
    marginBottom: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  bottomContainerText: {
    color: "#000",
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    width: 240,
  },
});

export default QRActivate;
