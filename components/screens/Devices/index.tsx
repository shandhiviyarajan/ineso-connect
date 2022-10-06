import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { SystemColors } from "../../../core/Styles/theme/colors";
import { LinkButton } from "../../atoms/LinkButton";
import { AppCustomHeader } from "../../molecules/AppHeader";
import moment from "moment";
import { ActionFetchDevice } from "../../../core/redux/actions/deviceActions";
import GenerateImage from "../../../core/utils/GenerateImage";
import { Dashboard } from "../Dashboard";
import { ActivityIndicator } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import QRSearch from "../QRScan/QRSearch";

export const Devices = ({ navigation }) => {
  const dispatchAction = useDispatch();

  const clientId = useSelector((state) => state.client.clientId);

  const [open, setQRModal] = React.useState(false);
  const handleQRSearch = () => {
    setQRModal(true);
  };
  const handleDeviceClick = ({ vendor, serial }) => {
    dispatchAction(
      ActionFetchDevice({
        clientId,
        deviceId: `${vendor}:${serial}`,
      })
    );
    navigation.navigate("Device");
  };
  const devices = useSelector((state) => state.device.devices);

  const [currentDevices, setDevices] = React.useState([]);

  const handleSearch = (value: any) => {
    let filtered = devices.data.filter((device: any) =>
      device.metadata.model.includes(value)
    );
    if (value.length > 0) {
      setDevices(filtered);
    } else {
      setDevices(devices.data);
    }
  };

  const [filter, setFilter] = React.useState(false);

  const toggleFilters = () => {
    setFilter(!filter);
  };

  const onScrollBeginDrag = () => {
    setFilter(true);
  };

  React.useEffect(() => {
    setDevices(devices && devices.data);
  }, [devices]);

  function Online() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            width: 16,
            height: 16,
            marginRight: 6,
            borderRadius: 100,
            backgroundColor: SystemColors.success,
          }}
        ></View>
        <Text>Online</Text>
      </View>
    );
  }
  function OffLine() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            width: 16,
            height: 16,
            marginRight: 6,
            borderRadius: 100,
            backgroundColor: SystemColors.danger,
          }}
        ></View>
        <Text>Offline</Text>
      </View>
    );
  }
  function DeviceCard({ onPress, device }) {
    return (
      <>
        <TouchableHighlight
          onPress={onPress}
          underlayColor="none"
          style={{
            height: 112,
          }}
        >
          <View
            style={{
              width: "100%",
              position: "relative",
              marginBottom: 10,
              padding: 12,
              borderRadius: 4,
              backgroundColor: "#fff",
              height: 96,
              flex: 1,
              flexDirection: "row",
              elevation: 5,
              shadowColor: "#666",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.1,
              shadowRadius: 7,
            }}
          >
            <View
              style={{
                marginRight: 12,
              }}
            >
              <Image
                source={GenerateImage(device.metadata.model)}
                style={{ height: 48, width: 48, borderRadius: 8 }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 5,
                }}
              >
                {device.metadata.model}
              </Text>
              <Text
                style={{
                  color: "#888",
                  marginBottom: 5,
                }}
              >
                {device.metadata.name}
              </Text>
              {device.online_status && <Online />}
              {!device.online_status && <OffLine />}
            </View>
            <View
              style={{
                position: "absolute",
                right: 12,
                top: 12,
              }}
            >
              <Text
                style={{
                  color: "#888",
                }}
              >
                {moment
                  .duration(device.lastStatusDate - Date.now(), "")
                  .humanize(true)}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </>
    );
  }
  return (
    <>
      <QRSearch open={open} setQRModal={setQRModal} />
      <AppCustomHeader navigation={navigation} />
      {/* <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("DeviceGoogleMaps");
            }}
            activeOpacity={0.5}
            underlayColor="none"
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "transparent",
                borderRadius: 24,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/images/map-marker.png")}
                style={{
                  width: 20,
                  height: 24,
                  marginRight: 0,
                  tintColor: SystemColors.primary,
                }}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View> */}

      <View
        style={{
          paddingHorizontal: 12,
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 100,
            width: 24,
            height: 24,
            top: 27,
            left: 32,
          }}
        >
          <Image
            source={require("../../../assets/images/search-icon.png")}
            style={{
              width: 20,
              height: 20,
              opacity: 0.25,
            }}
          />
        </View>
        <TextInput
          onChangeText={(value) => handleSearch(value)}
          placeholder="Search"
          placeholderTextColor="#888"
          clearButtonMode="always"
          autoCapitalize="none"
          style={{
            height: 44,
            fontSize: 18,
            color: "#000",
            textAlign: "left",
            paddingVertical: 0,
            borderWidth: 0,
            borderColor: "rgba(181,78,41,.5)",
            marginVertical: 12,
            paddingHorizontal: 16,
            paddingLeft: 48,
            width: "100%",
            borderRadius: 12,
            fontWeight: "400",
            backgroundColor: "#fff",
          }}
        />
        <TouchableHighlight
          onPress={handleQRSearch}
          activeOpacity={0.5}
          underlayColor="#fff"
          style={{
            position: "absolute",
            zIndex: 2000,
            top: 18,
            right: 20,
            width: 32,
            height: 32,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
            backgroundColor: SystemColors.primary,
          }}
        >
          <View>
            <Image
              source={require("../../../assets/images/qr-icon.png")}
              style={{
                tintColor: "#fff",
                width: 16,
                height: 16,
              }}
            />
          </View>
        </TouchableHighlight>
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingHorizontal: 12,
          }}
        >
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor="none"
            onPress={toggleFilters}
          >
            <View
              style={{
                paddingHorizontal: 6,
                paddingVertical: 6,
                backgroundColor: SystemColors.primary,
                borderRadius: 12,
                marginBottom: 6,
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                {filter ? "Show Filters" : "Hide Filters"}
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        <Collapsible collapsed={filter}>
          <Dashboard navigation={navigation} />
        </Collapsible>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          {devices.isLoading && <ActivityIndicator />}
          {devices.data && devices.data.length === 0 && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>No Devices Found !</Text>
            </View>
          )}
          {currentDevices && (
            <ScrollView
              onScrollBeginDrag={onScrollBeginDrag}
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingVertical: 12,
                justifyContent: devices.isLoading ? "center" : "flex-start",
              }}
            >
              {currentDevices.map((device, index) => (
                <DeviceCard
                  key={device._id + index}
                  device={device}
                  onPress={() => handleDeviceClick(device)}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};
