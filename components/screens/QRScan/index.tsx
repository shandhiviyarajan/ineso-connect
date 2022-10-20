import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
  TouchableHighlight,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import {
  ActionActivateDevice,
  ActionSearchDeviceSuccess,
} from "../../../core/redux/actions/qrActions";
import { aesDecrypt } from "../../../core/utils/Backend";
import { AppCustomHeader } from "../../molecules/AppHeader";
import { Message } from "../../molecules/Toast";
import QRScanner from "./Scanner";
import { apiSearchDevices } from "../../../core/API/apiQR";
function QRActivate() {
  const navigation = useNavigation();
  const [type, setCamType] = React.useState("back");

  const client = useSelector((state) => state.client.client.data);

  const clientId = useSelector((state) => state.client.clientId);

  const activate = useSelector((state) => state.qr.activate);
  const [isLoading, setLoading] = React.useState(false);

  const [qr_code, setQRCode] = React.useState(null);

  const dispatchAction = useDispatch();

  const handleReadQR = (e) => {
    setQRCode(null);

    if (e && e.data && !isLoading) {
      setLoading(true);
    }
    let qr = e.data ? e.data.split("&id=")[1] : null;
    if (qr) {
      setQRCode(aesDecrypt(qr));

      apiSearchDevices({
        clientId,
        qr_code: "ineso:d3b48dd3-7b4b-4f19-be88-197aa170eadd",
      })
        .then((response) => {
          setLoading(false);
          if (response && response.data.data[0]) {
            navigation.navigate("QRActivation", {
              device: response.data.data[0],
            });
          } else {
            setFeedBackModal(true);
          }
        })
        .catch((error) => {
          setFeedBackModal(true);
        });
    }
  };

  const [feedback, setFeedBackModal] = React.useState(false);
  const [success, setSuccessModal] = React.useState(false);

  return (
    <>
      <Modal visible={feedback} transparent={false} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 24,
            }}
          >
            Device Not found
          </Text>
          <TouchableHighlight
            style={{
              backgroundColor: "#000",
              width: 160,
              paddingVertical: 12,
              marginVertical: 12,
            }}
            onPress={() => {
              navigation.navigate("Devices");
              setFeedBackModal(false);
            }}
          >
            <View>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Close
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>

      <Modal visible={success} transparent={false} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              color: "green",
              fontSize: 24,
            }}
          >
            Device Activated !
          </Text>
          <TouchableHighlight
            style={{
              backgroundColor: "#000",
              width: 160,
              paddingVertical: 12,
              marginVertical: 12,
            }}
            onPress={() => {
              navigation.navigate("All devices");
              setSuccessModal(false);
            }}
          >
            <View>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Close
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
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
              <TouchableHighlight>
                <View>
                  <Text>View Devices</Text>
                </View>
              </TouchableHighlight>
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
  },
  bottomContainerText: {
    color: "#000",
    paddingTop: 16,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    width: 240,
  },
});

export default QRActivate;
