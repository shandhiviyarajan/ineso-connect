import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { apiActiveDevice } from "../../../core/API/apiQR";
import { ActionFetchDevice } from "../../../core/redux/actions/deviceActions";
import {
  ActionActivateDevice,
  ActionActivateDeviceSuccess,
} from "../../../core/redux/actions/qrActions";
import { SystemColors } from "../../../core/Styles/theme/colors";
import GenerateImage from "../../../core/utils/GenerateImage";
import { Message } from "../../molecules/Toast";

function QRSearchSuccess({ route, navigation }) {
  const { device } = route.params;

  const clientId = useSelector((state) => state.client.clientId);
  const activate = useSelector((state) => state.qr.activate);

  const dispatchAction = useDispatch();

  const handleViewDevice = () => {
    if (device) {
      navigation.navigate("All devices");
    }
  };

  const redirectToDevice = () => {
    if (device) {
      navigation.navigate("All devices");
    }
  };

  const [progress, setProgress] = React.useState(false);
  const handleActivateDevice = () => {
    setProgress(true);
    apiActiveDevice({
      clientId,
      deviceId: `${device.vendor}:${device.serial}`,
    })
      .then((response) => {
        dispatchAction(ActionActivateDeviceSuccess(response));
        Message(
          "success",
          "Device Activated",
          "QR Code device activation is success"
        );

        dispatchAction(
          ActionFetchDevice({
            clientId,
          })
        );

        navigation.navigate("All devices");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          Message(
            "error",
            "Device already activated",
            "QR code device activation failed"
          );
        } else {
          Message("error", "Error", "QR code device activation failed");
        }
      })
      .finally(() => {
        setProgress(false);
      });
  };
  React.useEffect(() => {
    if (device) {
      dispatchAction(
        ActionFetchDevice({
          clientId,
          deviceId: `${device.vendor}:${device.serial}`,
        })
      );
    }
  }, [device]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "600",
        }}
      >
        Device found
      </Text>

      {device &&
        device.metadata &&
        device.metadata.maintenance.filter((c) => c.state === "in_use").length >
          0 && (
          <>
            <Text
              style={{
                fontSize: 18,
                marginVertical: 24,
                color: "green",
                paddingHorizontal: 12,
              }}
            >
              This device is already commissioned & activated
            </Text>

            <View>
              <Image
                source={GenerateImage(device.metadata.model)}
                style={{
                  width: 120,
                  height: 120,
                }}
              />
              <View>
                <Text style={{ textAlign: "center" }}>
                  {device.metadata.name}
                </Text>
              </View>
            </View>
            {redirectToDevice()}
            <TouchableHighlight underlayColor="transparent">
              <View
                style={{
                  width: 180,
                  height: 44,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 24,
                }}
              >
                <Text> View device</Text>
              </View>
            </TouchableHighlight>
          </>
        )}

      {device &&
        device.metadata &&
        device.metadata.maintenance.filter((c) => c.state === "in_use")
          .length === 0 && (
          <>
            <View>
              <Image
                source={GenerateImage(device.metadata.model)}
                style={{
                  width: 120,
                  height: 120,
                }}
              />
              <View>
                <Text style={{ textAlign: "center" }}>
                  {device.metadata.model}
                </Text>
                <Text style={{ textAlign: "center" }}>
                  {device.metadata.name}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 18,
                marginVertical: 24,
                paddingHorizontal: 24,
                textAlign: "center",
              }}
            >
              {progress && <>Commissioning in progress, please wait</>}
              {!progress && <>Do you want to commission this device ?</>}
            </Text>

            <TouchableHighlight
              underlayColor="transparent"
              onPress={handleActivateDevice}
            >
              <View
                style={{
                  width: 180,
                  height: 44,
                  backgroundColor: "green",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                {activate.isLoading && <ActivityIndicator color="#fff" />}
                {!activate.isLoading && (
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    {!progress && "Yes"}
                    {progress && <ActivityIndicator color="#fff" />}
                  </Text>
                )}
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => {
                navigation.navigate("Devices");
              }}
            >
              <View
                style={{
                  width: 180,
                  height: 44,
                  backgroundColor: "#333",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  No
                </Text>
              </View>
            </TouchableHighlight>

            {device && (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={handleViewDevice}
              >
                <View
                  style={{
                    width: 180,
                    height: 44,
                    backgroundColor: SystemColors.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    View Device
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          </>
        )}
    </View>
  );
}

export default QRSearchSuccess;
