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
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { ActionActivateDevice } from "../../../core/redux/actions/qrActions";
import { aesDecrypt } from "../../../core/utils/Backend";
import { AppCustomHeader } from "../../molecules/AppHeader";
import { Message } from "../../molecules/Toast";
import QRScanner from "./Scanner";
import { SystemColors } from "../../../core/Styles/theme/colors";
import GenerateImage from "../../../core/utils/GenerateImage";
function QRActivate() {
  const navigation = useNavigation();
  const [type, setCamType] = React.useState("back");

  const clientId = useSelector((state) => state.client.clientId);
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

  useFocusEffect(
    React.useCallback(() => {
      if (clientId) {
        console.log(clientId);
      } else {
        Alert.alert(
          "Please select a Client",
          "Client id not available to perform the QR Scan search",
          [
            {
              text: "Return to Devices",
              onPress: () => navigation.navigate("Devices"),
              style: "cancel",
            },
          ]
        );
      }
    }, [])
  );

  const resetScanner = (scannerRef) => {
    scannerRef.reactivate();
  };

  return (
    <>
      <AppCustomHeader navigation={navigation} />
      <Modal animationType="fade" visible={true} transparent={true}>
        {!isLoading && (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,.85)",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "600",
                  paddingVertical: 24,
                }}
              >
                No Devices found !
              </Text>

              <TouchableHighlight
                onPress={resetScanner}
                style={{
                  backgroundColor: "#000",
                  width: 160,
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                }}
              >
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontSize: 16,
                    }}
                  >
                    RE SCAN
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </>
        )}

        {isLoading && (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,.85)",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "600",
                  paddingVertical: 6,
                }}
              >
                INEPL-S04-02-868
              </Text>
              <Text style={{ fontSize: 16, paddingVertical: 6 }}>
                PM light sensor
              </Text>
              <Image
                source={GenerateImage("INEPL-S04-02-868")}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
              <View
                style={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                }}
              >
                <Text
                  style={{
                    color: "green",
                    fontWeight: "600",
                    paddingVertical: 24,
                    fontSize: 24,
                  }}
                >
                  Device Activated !
                </Text>
              </View>

              <TouchableHighlight
                onPress={resetScanner}
                style={{
                  backgroundColor: "#000",
                  width: 160,
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  marginVertical: 12,
                }}
              >
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontSize: 16,
                    }}
                  >
                    View Device
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </>
        )}
      </Modal>

      {clientId && (
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
            {isLoading && (
              <>
                <ActivityIndicator color="#000" />
              </>
            )}
            {!isLoading && (
              <>
                <Text style={styles.bottomContainerText}>
                  Activate your device by Scanning the QR code.{" "}
                </Text>
              </>
            )}
          </View>
        </View>
      )}
      {clientId && (
        <>
          <View
            style={{
              flex: 6,
              backgroundColor: "#000",
            }}
          >
            <QRScanner
              type={type}
              handleReadQR={handleReadQR}
              resetScanner={resetScanner}
            />
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
