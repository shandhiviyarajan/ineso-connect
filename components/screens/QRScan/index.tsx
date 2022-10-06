import React from "react";
import { View, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
function QRScan() {
  const handleReadQR = (e) => {
    console.log(e);
  };
  return (
    <View>
      <Text>QR Scan</Text>

      <QRCodeScanner
        onRead={handleReadQR}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text>
            Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer and
            scan the QR code.
          </Text>
        }
      />
    </View>
  );
}

export default QRScan;
