import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import GenerateImage from "../../../core/utils/GenerateImage";
import { AppCustomHeader } from "../../molecules/AppHeader";
import { useNavigation } from "@react-navigation/native";

import image from "../../../assets/images/map-marker.png";
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

  const coordinates = [];

  coordinates.push({
    key: 0,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  });

  for (let i = 1; i < 20; i++) {
    const location = {
      longitude:
        coordinates[i - 1].location.longitude +
        Math.random() * (i % 2 === 0 ? -1 : 1),
      latitude:
        coordinates[i - 1].location.latitude +
        Math.random() * (i % 2 === 0 ? -1 : 1),
    };

    coordinates.push({ key: i, location });
  }

  function renderMarker({ location }) {
    return (
      <Marker image={image} coordinate={location}>
        <Callout>
          <Text>BiG BiG Callout</Text>
        </Callout>
      </Marker>
    );
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <MapView
          showsUserLocation={true}
          customMapStyle={[]}
          initialRegion={{
            latitude:
              devices &&
              devices.data &&
              devices.data[0].metadata.gpsLocation.latitude,
            longitude:
              devices &&
              devices.data &&
              devices.data[0].metadata.gpsLocation.longitude,
            latitudeDelta: 0.0003,
            longitudeDelta: 0.0003,
          }}
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
        >
          {devices &&
            devices.data &&
            devices.data.map((device, i) => (
              <Marker
                key={device.id}
                coordinate={{
                  longitude:
                    device.metadata.gpsLocation.longitude +
                    Math.random() * (i % 2 === 0 ? -0.001 : 0.001),
                  latitude:
                    device.metadata.gpsLocation.latitude +
                    Math.random() * (i % 2 === 0 ? -0.001 : 0.001),
                }}
              />
            ))}
        </MapView>
      </View>
    </>
  );
};

export default DeviceGoogleMaps;
