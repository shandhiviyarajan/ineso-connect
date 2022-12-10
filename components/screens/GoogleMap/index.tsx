import React from "react";
import {
  Alert,
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

  const devices = useSelector((state) => state.device.devices);
  const clientId = useSelector((state) => state.client.clientId);
  const delta = {
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
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
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
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

  React.useEffect(() => {
    if (devices) {
      mapRef.fitToElements(true);
    }
  }, [devices]);

  const centerMap = async (e) => {
    console.log("center", e);
    setRegion({
      latitude:
        devices &&
        devices.data &&
        devices.data[0] &&
        devices.data[0].metadata &&
        devices.data[0].metadata.gpsLocation.latitude
          ? devices.data[0].metadata.gpsLocation.latitude
          : 45.4708,
      longitude:
        devices &&
        devices.data &&
        devices.data[0] &&
        devices.data[0].metadata &&
        devices.data[0].metadata.gpsLocation.longitude
          ? devices.data[0].metadata.gpsLocation.longitude
          : 9.1911,
      latitudeDelta: delta.latitudeDelta,
      longitudeDelta: delta.longitudeDelta,
    });
  };

  let mapRef = React.useRef(null);

  const fitMap = () => {
    mapRef.fitToElements(true);
  };
  function onMarkerSelect(e) {
    console.log(e);
  }
  function onMapReady(e) {
    setTimeout(() => {
      console.log(mapRef);
    }, 1000);
  }

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
              top: 24,
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
              ...StyleSheet.absoluteFillObject,
            }}
          >
            <MapView
              onLayout={fitMap}
              moveOnMarkerPress={true}
              ref={(map) => {
                mapRef = map;
              }}
              showsUserLocation={false}
              customMapStyle={[]}
              zoomEnabled={true}
              style={{
                ...StyleSheet.absoluteFillObject,
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
