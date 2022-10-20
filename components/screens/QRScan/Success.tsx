import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActionFetchDevice } from "../../../core/redux/actions/deviceActions";

function QRSearchSuccess({ route, navigation }) {
  const { device } = route.params;

  const clientId = useSelector((state) => state.client.clientId);

  const dispatchAction = useDispatch();

  const handleViewDevice = () => {
    if (device) {
      navigation.navigate("All devices");
    }
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

      {device && device.metadata.active && (
        <>
          <Text
            style={{
              fontSize: 24,
            }}
          >
            This device is already activated
          </Text>

          <TouchableHighlight onPress={handleViewDevice}>
            <View>View Device</View>
          </TouchableHighlight>
        </>
      )}

      {device && device.metadata.active && (
        <Text
          style={{
            fontSize: 24,
          }}
        >
          Do you want to link this device ?
        </Text>
      )}
    </View>
  );
}

export default QRSearchSuccess;
