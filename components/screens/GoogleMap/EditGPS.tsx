import React from "react";
import { View, Text, Dimensions, Image, TextInput } from "react-native";
import MapView, { Marker, MarkerAnimated } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateGPSCoodinates } from "../../../core/API/apiDevices";
import { ActionFetchDevice } from "../../../core/redux/actions/deviceActions";
import { SystemColors } from "../../../core/Styles/theme/colors";
import GenerateImage from "../../../core/utils/GenerateImage";
import { Button } from "../../atoms/Button";
import { Message } from "../../molecules/Toast";
function EditGPS({ route, navigation }) {
  const { activeDevice } = route.params;
  const clientId = useSelector((state) => state.client.clientId);

  const [newLocation, setNewCoordinates] = React.useState({
    latitude: 0,
    longitude: 0,
  });

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

  React.useEffect(() => {
    if (activeDevice) {
      setNewCoordinates({
        latitude: activeDevice.metadata.gpsLocation.latitude,
        longitude: activeDevice.metadata.gpsLocation.longitude,
      });
    }
  }, [activeDevice]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F5F9",
        width: "100%",
      }}
    >
      <View
        style={{
          flex: newLocation ? 1 : 0.4,
          paddingTop: 24,
          paddingHorizontal: 24,
          width: "100%",
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
              flexDirection: "column",
              paddingTop: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ width: 72 }}>Latitude </Text>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 14,
                  borderWidth: 1,
                  borderColor: "#d8d8d8",
                  textAlign: "center",
                  paddingVertical: 6,
                  paddingHorizontal: 6,
                }}
                value={parseFloat(newLocation && newLocation.latitude).toFixed(
                  4
                )}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: 72 }}>Longitude </Text>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 14,
                  borderWidth: 1,
                  borderColor: "#d8d8d8",
                  textAlign: "center",
                  paddingVertical: 6,
                  paddingHorizontal: 6,
                }}
                value={parseFloat(newLocation && newLocation.longitude).toFixed(
                  4
                )}
              />
            </View>
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
            customMapStyle={[]}
            zoomEnabled={true}
            scrollEnabled={false}
            showsUserLocation={false}
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
            <Marker
              draggable={true}
              onDragEnd={(e) => setNewCoordinates(e.nativeEvent.coordinate)}
              coordinate={{
                latitude: newLocation && newLocation.latitude,
                longitude: newLocation && newLocation.longitude,
              }}
            >
              <View
                style={{
                  backgroundColor: SystemColors.primary,
                  width: 44,
                  height: 44,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={GenerateImage(activeDevice.metadata.model)}
                  style={{ width: 32, height: 32, tintColor: "#fff" }}
                />
              </View>
            </Marker>
          </MapView>
        )}
        <View
          style={{
            position: "absolute",
            flex: 1,
            width: "100%",
            bottom: 36,
            justifyContent: "center",
          }}
        >
          <Button
            underlayColor="transparent"
            secondary
            onPress={handleSaveGPS}
            isLoading={isSaving}
          >
            {isSaving && <>Please wait...</>}
            {!isSaving && <>Confirm device location</>}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default EditGPS;
