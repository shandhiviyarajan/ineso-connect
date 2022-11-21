import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import MapView, { Callout, MapCallout, Marker } from "react-native-maps";
import { Image } from "react-native";
import { useSelector } from "react-redux";

import image from "../../../assets/images/map-marker.png";
import GenerateImage from "../../../core/utils/GenerateImage";
import { SystemColors } from "../../../core/Styles/theme/colors";
const DeviceGoogleMaps = () => {
  const devices = useSelector((state) => state.device.devices);

  let initialRegion = {};
  React.useEffect(() => {
    initialRegion = {
      latitude: 45.781941,
      longitude: 4.748706,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }, [devices]);

  function renderMarker({ location }) {
    return (
      <Marker image={image} coordinate={location}>
        <Callout>
          <Text> Callout</Text>
        </Callout>
      </Marker>
    );
  }

  return (
    <>
      {/* <View
        style={{
          zIndex: 200,
          flex: 1,
          height: 400,
        }}
      >
        <Text>{JSON.stringify(devices.data && devices.data[0])}</Text>
      </View> */}
      <View
        style={{
          flex: 1,
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <MapView
          showsUserLocation={true}
          customMapStyle={[]}
          zoomEnabled={true}
          initialRegion={{
            latitude:
              devices &&
              devices.data &&
              devices.data[0] &&
              devices.data[0].metadata &&
              devices.data[0].metadata.gpsLocation.latitude
                ? devices.data[0].metadata.gpsLocation.latitude
                : 45.781941,
            longitude:
              devices &&
              devices.data &&
              devices.data[0] &&
              devices.data[0].metadata &&
              devices.data[0].metadata.gpsLocation.longitude
                ? devices.data[0].metadata.gpsLocation.longitude
                : 4.748706,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
        >
          {devices &&
            devices.data &&
            devices.data.map((device, i) => (
              <Marker
                key={"map-marker" + i}
                description={device.metadata.name}
                coordinate={{
                  longitude: device.metadata.gpsLocation.longitude,
                  latitude: device.metadata.gpsLocation.latitude,
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
                    style={{ width: 32, height: 32, tintColor: "#fff" }}
                  />
                </View>
              </Marker>
            ))}
        </MapView>
      </View>
    </>
  );
};

export default DeviceGoogleMaps;
