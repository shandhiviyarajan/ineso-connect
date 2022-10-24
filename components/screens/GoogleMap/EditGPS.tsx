import React from "react";
import { View, Text } from "react-native";
import MapView, { MarkerAnimated } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { ActionFetchDevice } from "../../../core/redux/actions/deviceActions";
import { Button } from "../../atoms/Button";
function EditGPS({ route, navigation }) {
  const { activeDevice } = route.params;
  const clientId = useSelector((state) => state.client.clientId);

  const dispatchAction = useDispatch();

  const handleSaveGPS = () => {
    dispatchAction(
      ActionFetchDevice({
        clientId,
        deviceId: `${activeDevice.vendor}:${activeDevice.serial}`,
      })
    );
    navigation.navigate("All devices");
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit GPS Location</Text>
      <View>
        <MapView
          showsUserLocation={true}
          customMapStyle={[]}
          initialRegion={{
            latitude: activeDevice.metadata.gpsLocation.latitude,
            longitude: activeDevice.metadata.gpsLocation.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          style={{
            height: 160,
            marginBottom: 24,
          }}
        >
          <MarkerAnimated
            coordinate={{
              longitude: activeDevice.metadata.gpsLocation.longitude,
              latitude: activeDevice.metadata.gpsLocation.latitude,
            }}
          />
        </MapView>
      </View>
      <Button secondary onPress={handleSaveGPS}>
        Save GPS coordinates
      </Button>
    </View>
  );
}

export default EditGPS;
