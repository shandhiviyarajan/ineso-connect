import React, { useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";
import MapView, { Callout, Marker, MarkerAnimated } from "react-native-maps";
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

  let mapRef = useRef(null);
  const [isSaving, setSaving] = React.useState(false);
  const dispatchAction = useDispatch();

  const handleSaveGPS = () => {
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
        longitude: activeDevice.metadata.gpsLocation.longitude,
        latitude: activeDevice.metadata.gpsLocation.latitude,
      });
    }
  }, []);

  const updateLocation = (e, name) => {
    setNewCoordinates((prevState) => ({
      ...prevState,
      [name]: parseFloat(e),
    }));
  };

  React.useEffect(() => {
    mapRef.fitToElements(true);
  }, [newLocation]);

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
      <KeyboardAvoidingView
        style={{
          width: "90%",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              textAlign: "center",
              marginVertical: 6,
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
                <Text style={{ fontSize: 16, width: 90, fontWeight: "400" }}>
                  Latitude
                </Text>
                <TextInput
                  name="latitude"
                  keyboardType="numeric"
                  onChangeText={(e) => updateLocation(e, "latitude")}
                  style={{
                    flex: 1,
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: "#d8d8d8",
                    textAlign: "center",
                    paddingVertical: 6,
                    paddingHorizontal: 6,
                    color: "#000",
                    backgroundColor: "#fff",
                  }}
                  value={newLocation && newLocation.latitude + ""}
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 16, width: 90, fontWeight: "400" }}>
                  Longitude{" "}
                </Text>
                <TextInput
                  name="longitude"
                  keyboardType="numeric"
                  onChangeText={(e) => updateLocation(e, "longitude")}
                  style={{
                    flex: 1,
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: "#d8d8d8",
                    textAlign: "center",
                    paddingVertical: 6,
                    paddingHorizontal: 6,
                    color: "#000",
                    backgroundColor: "#fff",
                  }}
                  value={newLocation && newLocation.longitude + ""}
                />
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          flex: 5,
          width: Dimensions.get("screen").width,
        }}
      >
        <TouchableHighlight
          underlayColor="transparent"
          style={{
            width: 36,
            height: 36,
            position: "absolute",
            top: 24,
            right: 24,
            zIndex: 100,
          }}
          onPress={() => {
            mapRef.fitToElements(true);
          }}
        >
          <View>
            <Image
              source={require("../../../assets/images/center-map.png")}
              style={{
                width: 32,
                height: 32,
                tintColor: "#000",
                resizeMode: "contain",
              }}
            />
          </View>
        </TouchableHighlight>

        {activeDevice && (
          <MapView
            ref={(map) => (mapRef = map)}
            customMapStyle={[]}
            zoomEnabled={true}
            scrollEnabled={true}
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
                longitude: newLocation && newLocation.longitude,
                latitude: newLocation && newLocation.latitude,
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
              <Callout>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Drag
                  </Text>
                </View>
              </Callout>
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
