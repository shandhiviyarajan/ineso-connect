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
import { ActionFetchDevices } from "../../../core/redux/actions/deviceActions";
import { removeUnderscore, toCapitalize } from "../../../core/utils/Capitalize";
const DeviceGoogleMaps = () => {
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

  function onMapReady(e) {
    mapRef.fitToElements();
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
          <View
            style={{
              flex: 4,
              ...StyleSheet.absoluteFillObject,
            }}
          >
            <MapView
              moveOnMarkerPress={true}
              ref={(map) => {
                mapRef = map;
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
                          longitude:
                            device.metadata.gpsLocation.longitude + i * 0.001,
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
                          onPress={() => {
                            Alert.alert(0);
                          }}
                        >
                          <View
                            style={{
                              width: 300,
                              height: 80,
                              backgroundColor: "#333",
                              borderRadius: 2,
                              padding: 24,
                              flexDirection: "row",
                            }}
                          >
                            <Image
                              source={GenerateImage(device.metadata.model)}
                              style={{
                                resizeMode: "contain",
                                width: 44,
                                height: 44,
                                tintColor: "#fff",
                                marginRight: 12,
                              }}
                            />
                            <View>
                              <Text
                                style={{
                                  fontSize: 16,
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
