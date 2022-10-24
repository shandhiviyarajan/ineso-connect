import React from "react";
import { View, Text, Dimensions } from "react-native";
import MapView, { MarkerAnimated } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateGPSCoodinates } from "../../../core/API/apiDevices";
import { ActionFetchDevice } from "../../../core/redux/actions/deviceActions";
import { Button } from "../../atoms/Button";
import { Message } from "../../molecules/Toast";
function EditGPS({ route, navigation }) {
  const { activeDevice } = route.params;
  const clientId = useSelector((state) => state.client.clientId);

  const [newLocation, setNewCoordinates] = React.useState(null);

  const dispatchAction = useDispatch();

  const handleSaveGPS = () => {
    console.log(
      newLocation,
      clientId,
      activeDevice.vendor,
      activeDevice.serial
    );
    if (newLocation) {
      apiUpdateGPSCoodinates({
        clientId,
        gluonId: `${activeDevice.vendor}:${activeDevice.serial}`,
        payload: {
          gpsLocation: {
            latitude: newLocation.latitude,
            longitude: newLocation.longitude,
          },
        },
      })
        .then((response) => {
          Message("success", "GPS Coodinates updated", "");
          dispatchAction(
            ActionFetchDevice({
              clientId,
              deviceId: `${activeDevice.vendor}:${activeDevice.serial}`,
            })
          );
          navigation.navigate("All devices");
        })
        .catch((error) => {
          Message("error", "Coodinates update failed", "");
          console.log(error);
        });
    } else {
      Message(
        "warning",
        "Coodinates not found",
        "Drag the marker to change location"
      );
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: Dimensions.get("screen").width,
        }}
      >
        {activeDevice && (
          <MapView
            scrollEnabled={false}
            showsUserLocation={true}
            customMapStyle={[]}
            initialRegion={{
              latitude: activeDevice.metadata.gpsLocation.latitude,
              longitude: activeDevice.metadata.gpsLocation.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
            style={{
              height: Dimensions.get("screen").height / 1.35,
              marginBottom: 24,
            }}
          >
            <MarkerAnimated
              draggable={true}
              onDragEnd={(e) => setNewCoordinates(e.nativeEvent.coordinate)}
              coordinate={{
                longitude: activeDevice.metadata.gpsLocation.longitude,
                latitude: activeDevice.metadata.gpsLocation.latitude,
              }}
            />
          </MapView>
        )}
      </View>
      <Button secondary onPress={handleSaveGPS}>
        Save GPS coordinates
      </Button>
    </View>
  );
}

export default EditGPS;
