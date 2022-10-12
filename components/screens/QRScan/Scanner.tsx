import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import QRCodeScanner from "react-native-qrcode-scanner";

function QRScanner({ type, handleReadQR }) {
  return (
    <>
      <TouchableHighlight
        style={{
          position: "relative",
          width: 160,
          padding: 16,
          borderRadius: 6,
        }}
      >
        <View></View>
      </TouchableHighlight>
      <QRCodeScanner
        customMarker={
          <View style={styles.customMarker}>
            <ImageBackground
              source={require("../../../assets/images/qr_code_marker.png")}
              resizeMode="cover"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </View>
        }
        cameraType={type}
        showMarker={true}
        containerStyle={styles.containerStyle}
        cameraContainerStyle={styles.cameraContainer}
        cameraStyle={{
          width: Dimensions.get("window").height / 2.5,
          height: "auto",
        }}
        reactivate={true}
        onRead={handleReadQR}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />
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
  containerStyle: {
    flex: 3,
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },

  cameraContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QRScanner;
