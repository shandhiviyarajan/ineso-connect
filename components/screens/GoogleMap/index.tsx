import React from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import MapView, {
  Callout,
  MapCallout,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { UrlTile } from "react-native-maps";

import image from "../../../assets/images/map-marker.png";
import GenerateImage from "../../../core/utils/GenerateImage";
import { SystemColors } from "../../../core/Styles/theme/colors";
import { ActionFetchDevices } from "../../../core/redux/actions/deviceActions";
const DeviceGoogleMaps = () => {
  const devices = useSelector((state) => state.device.devices);
  const clientId = useSelector((state) => state.client.clientId);
  const delta = {
    latitudeDelta: 1,
    longitudeDelta: 1,
  };
  const dispatchAction = useDispatch();
  const [initialRegion, setRegion] = React.useState({
    latitude: 45.4708,
    longitude: 9.1911,
    latitudeDelta: delta.latitudeDelta,
    longitudeDelta: delta.longitudeDelta,
  });

  const moveToDevice = (device) => {
    console.log(device);
  };

  React.useEffect(() => {
    dispatchAction(
      ActionFetchDevices({
        clientId: clientId,
        siteId: false,
        groupId: false,
      })
    );
  }, [dispatchAction]);

  React.useEffect(() => {
    async () => {
      if (devices) {
        centerMap();
      }
    };
  }, [devices]);

  const centerMap = async (e) => {
    console.log(e);
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

    mapRef.current.animateToRegion({});
  };

  function renderMarker({ location }) {
    return (
      <Marker image={image} coordinate={location}>
        <Callout>
          <Text> Callout</Text>
        </Callout>
      </Marker>
    );
  }

  function onMapReady(e) {
    console.log(e);
  }

  let mapRef = React.useRef(null);

  return (
    <>
      <ScrollView
        scrollEventThrottle={1}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        {/* <View
        style={{
          zIndex: 200,
          flex: 1,
          height: 400,
        }}
      >
        <Text>{JSON.stringify(devices.data && devices.data[0])}</Text>
      </View> */}
        <>
          <View
            style={{
              flex: 1,
              paddingTop: 64,
            }}
          >
            <TouchableHighlight onPress={centerMap}>
              <View>
                <Text>Center</Text>
              </View>
            </TouchableHighlight>
            {devices &&
              devices.data &&
              devices.data.map((d, i) => (
                <Text>
                  {d && d.metadata && d.metadata.name}
                  {d && d.metadata && d.metadata.gpsLocation.latitude} + "- " +
                  {d && d.metadata && d.metadata.gpsLocation.longitude}
                </Text>
              ))}
          </View>
          <View
            style={{
              flex: 4,
              // ...StyleSheet.absoluteFillObject,
            }}
          >
            <MapView
              ref={(map) => {
                mapRef = map;
                console.log(mapRef);
              }}
              onMapReady={onMapReady}
              showsUserLocation={false}
              customMapStyle={[]}
              zoomEnabled={true}
              initialRegion={initialRegion}
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
                          longitude: device.metadata.gpsLocation.longitude,
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
