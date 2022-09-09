import React from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { PROVIDER_GOOGLE } from "react-native-maps";
import GenerateImage from "../../../core/utils/GenerateImage";
function DeviceGoogleMaps() {
  const devices = useSelector((state) => state.device.devices);

  let initialRegion = {};
  React.useEffect(() => {
    initialRegion = {
      latitude: 45.781941,
      longitude: 4.748706,
      latitudeDelta: 0,
      longitudeDelta: 0,
    };
  }, [devices]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {devices && devices.data && devices.data && (
        <MapView
          style={{
            width: "100%",
            height: "100%",
          }}
          initialRegion={initialRegion}
        >
          {devices &&
            devices.data.map((device, index) => (
              <Marker
                key={device._id + index}
                title={device.metadata.model}
                coordinate={{
                  latitude: device.metadata.gpsLocation.latitude,
                  longitude: device.metadata.gpsLocation.longitude,
                }}
              ></Marker>
            ))}
        </MapView>
      )}
    </View>
  );
}

export default DeviceGoogleMaps;
