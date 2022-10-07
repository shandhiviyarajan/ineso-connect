import React from "react";
import { View, Text, Modal, Alert, Pressable } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { useDispatch } from "react-redux";
import { ActionSetQR } from "../../../core/redux/actions/qrActions";
import { aesDecrypt } from "../../../core/utils/Backend";
import { Button } from "../../atoms/Button";
import QRScanner from "./Scanner";
function QRSearch({ open, setQRModal }) {
  const requestClose = () => {};

  const [value, setValue] = React.useState(null);

  const dispatchAction = useDispatch();

  const handleReadQR = (e) => {
    if (e.data && e.data.split("&id=").length > 0) {
      //decrypt the data id
      let qr_code = aesDecrypt(e.data.split("&id=")[1]);
      //set value to local state
      setValue(qr_code);
      //set value to redux
      dispatchAction(ActionSetQR(qr_code));
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
              width: "60%",
              height: "66%",
              borderRadius: 6,
            }}
          >
            <View style={{ flex: 0.8 }}>
              <QRScanner
                type="back"
                scannerRef={null}
                handleReadQR={handleReadQR}
              />
            </View>
            <View style={{ flex: 0.05, width: "80%" }}>
              <Text
                style={{
                  marginTop: 12,
                  textAlign: "center",
                  fontSize: 18,
                  color: "#fff",
                }}
              >
                Scan the QR code to search device
              </Text>
            </View>
            <View style={{ flex: 0.1, width: "90%" }}>
              <Button
                underlayColor="#000"
                secondary
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
