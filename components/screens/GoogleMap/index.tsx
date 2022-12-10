import React from "react";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GenerateImage from "../../../core/utils/GenerateImage";
import { SystemColors } from "../../../core/Styles/theme/colors";
import { useIsFocused } from "@react-navigation/native";
import {
  ActionFetchDevice,
  ActionFetchDevices,
} from "../../../core/redux/actions/deviceActions";
import { removeUnderscore, toCapitalize } from "../../../core/utils/Capitalize";
const DeviceGoogleMaps = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const devices = useSelector((state) => state.device.devices);
  const clientId = useSelector((state) => state.client.clientId);
  const delta = {
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001 * ASPECT_RATIO,
  };
  const dispatchAction = useDispatch();
  const [initialRegion, setRegion] = React.useState({
    latitude: 45.4708,
    longitude: 9.1911,
    latitudeDelta: delta.latitudeDelta,
    longitudeDelta: delta.longitudeDelta,
  });

  const moveToDevice = (device) => {
    setRegion({
      latitude: device.metadata.gpsLocation.latitude
        ? device.metadata.gpsLocation.latitude
        : 45.4708,

      longitude: device.metadata.gpsLocation.longitude
        ? device.metadata.gpsLocation.longitude
        : 9.1911,
      latitudeDelta: delta.latitudeDelta,
      longitudeDelta: delta.longitudeDelta,
    });
  };

  const handleDeviceClick = ({ vendor, serial }) => {
    dispatchAction(
      ActionFetchDevice({
        clientId,
        deviceId: `${vendor}:${serial}`,
      })
    );
    navigation.navigate("All devices");
  };

  let mapRef = React.useRef(null);
  const DEFAULT_PADDING = { top: 160, right: 60, bottom: 60, left: 60 };
  function createMarkers() {
    mapRef.fitToCoordinates(
      devices &&
        devices.data &&
        devices.data.map((device) => {
          return device.metadata.gpsLocation;
        }),
      DEFAULT_PADDING,
      true
    );
    mapRef.fitToElements(true);
  }

  const fitMap = () => {
    // createMarkers();
    mapRef.fitToElements(true);
  };

  React.useEffect(() => {
    if (devices) {
      mapRef.fitToElements(true);
    }
  }, [devices]);

  return (
    <>
      <ScrollView
        scrollEventThrottle={1}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <>
          <TouchableHighlight
            underlayColor="transparent"
            style={{
              width: 36,
              height: 36,
              position: "absolute",
              top: Platform.OS === "ios" ? 48 : 24,
              right: 24,
              zIndex: 100,
            }}
            onPress={fitMap}
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

          <View
            style={{
              flex: 4,
            }}
          >
            <MapView
              onLayout={fitMap}
              moveOnMarkerPress={true}
              ref={(map) => {
                mapRef = map;
              }}
              showsUserLocation={true}
              customMapStyle={[]}
              zoomEnabled={true}
              style={{
                borderWidth: 1,
                width: "100%",
                marginTop: 0,
                height: Dimensions.get("screen").height - 56,
              }}
            >
              {devices &&
                devices.data &&
                devices.data.map(
                  (device, i) =>
                    device && (
                      <Marker
                        onPress={() => {
                          moveToDevice(device);
                        }}
                        key={device._id}
                        description={device.metadata.name}
                        coordinate={{
                          latitude: device.metadata.gpsLocation.latitude,
                          longitude:
                            device.metadata.gpsLocation.longitude +
                            i * 0.000075,
                        }}
                      >
                        <View
                          style={{
                            width: 52,
                            height: 52,
                            backgroundColor: SystemColors.primary,
                            borderRadius: 44,
                            elevation: 5,
                            shadowOpacity: 0.15,
                            shadowColor: "rgba(0,0,0,.5)",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={GenerateImage(device.metadata.model)}
                            style={{
                              width: 32,
                              height: 32,
                              tintColor: "#fff",
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                        <Callout
                          tooltip={true}
                          onPress={() => handleDeviceClick(device)}
                        >
                          <View
                            style={{
                              width: 340,
                              height: 80,
                              backgroundColor: "#333",
                              borderRadius: 2,
                              padding: 24,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              source={GenerateImage(
                                device &&
                                  device.metadata &&
                                  device.metadata.model
                              )}
                              style={{
                                width: 36,
                                height: 36,
                                tintColor: "#fff",
                                marginRight: 12,
                                resizeMode: "contain",
                              }}
                            />
                            <View>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "500",
                                  color: "#fff",
                                  paddingRight: 24,
                                }}
                              >
                                {device.metadata.name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: "400",
                                  color: "#d8d8d8",
                                }}
                              >
                                {toCapitalize(removeUnderscore(device.type))}
                              </Text>
                            </View>
                          </View>
                        </Callout>
                      </Marker>
                    )
                )}
            </MapView>
          </View>
        </>
      </ScrollView>
    </>
  );
};

export default DeviceGoogleMaps;
