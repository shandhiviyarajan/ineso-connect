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

  const [isSaving, setSaving] = React.useState(false);
  const dispatchAction = useDispatch();

  const handleSaveGPS = () => {
    console.log(
      newLocation,
      clientId,
      activeDevice.vendor,
      activeDevice.serial
    );
    if (newLocation) {
      setSaving(true);
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
          setTimeout(() => {
            navigation.navigate("All devices");
          }, 1000);
        })
        .catch((error) => {
          Message("error", "Coodinates update failed", "");
          console.log(error);
        })
        .finally(() => {
          setSaving(false);
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
        backgroundColor: "#F2F5F9",
      }}
    >
      <View
        style={{
          flex: newLocation ? 0.9 : 0.5,
          paddingTop: 24,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          Drag the marker to change the location
        </Text>
        {newLocation && (
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                padding: 6,
                borderWidth: 1,
                borderColor: "#d8d8d8",
                textAlign: "center",
              }}
            >
              {parseFloat(newLocation && newLocation.latitude).toFixed(4)}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                padding: 6,
                borderWidth: 1,
                borderColor: "#d8d8d8",
                textAlign: "center",
              }}
            >
              {parseFloat(newLocation && newLocation.longitude).toFixed(4)}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 5,
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
              height: "100%",
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
      <View
        style={{
          flex: 1,
          paddingTop: 24,
        }}
      >
        <Button secondary onPress={handleSaveGPS} isLoading={isSaving}>
          {isSaving && <>Please wait...</>}
          {!isSaving && <>Save GPS coordinates</>}
        </Button>
      </View>
    </View>
  );
}

export default EditGPS;
