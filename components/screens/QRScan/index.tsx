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
import { ActionActivateDevice } from "../../../core/redux/actions/qrActions";
import { aesDecrypt } from "../../../core/utils/Backend";
import { AppCustomHeader } from "../../molecules/AppHeader";
import { Message } from "../../molecules/Toast";
import QRScanner from "./Scanner";
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
    if (e.type === "QR_CODE" && !isLoading) {
      setLoading(true);
    }
    let qr = e.data ? e.data.split("&id=")[1] : null;
    if (qr) {
      setQRCode(aesDecrypt(qr));
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  React.useEffect(() => {
    if (qr_code) {
      dispatchAction(
        ActionActivateDevice({
          clientId,
          qr_code,
        })
      );
    }
  }, [qr_code]);

  useFocusEffect(React.useCallback(() => {}, []));

  const [feedback, setFeedBackModal] = React.useState(false);
  const [success, setSuccessModal] = React.useState(false);
  React.useEffect(() => {
    console.log(activate);
    if (activate.errors) {
      setFeedBackModal(true);
    }

    if (activate.data) {
      setSuccessModal(true);
    }
  }, [activate]);

  return (
    <>
      <AppCustomHeader navigation={navigation} />

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
              navigation.navigate("Devices");
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
              flex: 6,
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
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    color: "#000",
    marginBottom: 0,
  },
  bottomContainerText: {
    color: "#000",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "500",
    textAlign: "center",
    width: 240,
    color: "#000",
  },
  containerStyle: {
    flex: 2.5,
    justifyContent: "flex-end",
    alignContent: "flex-end",
    backgroundColor: "#000",
  },

  cameraContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QRActivate;
