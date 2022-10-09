import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { Button } from "../../atoms/Button";
import { AppCustomHeader } from "../../molecules/AppHeader";
import QRScanner from "./Scanner";
function QRActivate({ navigation }) {
  const [qr, setQR] = React.useState("test");
  let scannerRef = React.useRef(null);
  const [type, setCamType] = React.useState("back");
  const [isLoading, setLoading] = React.useState(false);
  const handleReadQR = (e) => {
    console.log(e);

    if (e.type === "QR_CODE" && !isLoading) {
      setLoading(true);
    }
    setTimeout(() => {
      let key = e.data ? e.data.split("&id=")[1] : null;
      setQR(key);
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <AppCustomHeader navigation={navigation} />
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#222",
        }}
      >
        <View style={styles.bottomContainer}>
          {isLoading && (
            <>
              <ActivityIndicator color="#fff" />
            </>
          )}
          {!isLoading && (
            <>
              <Text style={styles.bottomContainerText}>
                Scan the QR code to search & activate your device
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: "#222" }}>
        {qr && (
          <Button
            onPress={() => {
              setQR(null);
              scannerRef.reactivate();
            }}
          >
            Scan again ?
          </Button>
        )}
      </View>
      <View
        style={{
          flex: 6,
          backgroundColor: "#000",
        }}
      >
        <QRScanner
          scannerRef={scannerRef}
          type={type}
          handleReadQR={handleReadQR}
        />
      </View>
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
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    width: 240,
    color: "#fff",
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
