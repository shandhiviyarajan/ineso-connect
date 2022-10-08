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

  const customMapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#181818",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1b1b1b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#373737",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#3c3c3c",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d",
        },
      ],
    },
  ];

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
                    Math.random() * (i % 2 === 0 ? -0.0001 : 0.001),
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
