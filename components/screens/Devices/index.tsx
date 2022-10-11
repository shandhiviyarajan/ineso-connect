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
import { AppCustomHeader } from "../../molecules/AppHeader";
import moment from "moment";
import { ActionFetchDevice } from "../../../core/redux/actions/deviceActions";
import GenerateImage from "../../../core/utils/GenerateImage";
import { ActivityIndicator } from "react-native";
import Collapsible from "react-native-collapsible";
import QRSearch from "../QRScan/QRSearch";
import {
  ActionSearchDevice,
  ActionSetQR,
} from "../../../core/redux/actions/qrActions";
import { SelectBoxes } from "./SelectBoxes";
import { useNavigation } from "@react-navigation/native";
const Devices = () => {
  const dispatchAction = useDispatch();

  const navigation = useNavigation();

  const clientId = useSelector((state) => state.client.clientId);

  const [filter, setFilter] = React.useState(false);

  const [open, setQRModal] = React.useState(false);
  //open scanner modal
  const openQRScannerSearch = () => {
    setQRModal(true);
  };
  //handle device click
  const handleDeviceClick = ({ vendor, serial }) => {
    dispatchAction(
      ActionFetchDevice({
        clientId,
        deviceId: `${vendor}:${serial}`,
      })
    );
    navigation.navigate("Device");
  };
  //all devices
  const devices = useSelector((state) => state.device.devices);

  const QR_CODE = useSelector((state) => state.qr.QR_CODE);

  const [currentDevices, setCurrentDevices] = React.useState([]);
  //handle search
  const handleTextSearch = (value: any) => {
    let filtered =
      devices &&
      devices.data &&
      devices.data.filter((device: any) =>
        device.metadata.model.includes(value)
      );
    if (value.length > 0) {
      setCurrentDevices(filtered);
    } else {
      setCurrentDevices(devices.data);
    }
  };

  //const clear search

  const handleClearSearch = () => {
    dispatchAction(ActionSetQR(null));
  };

  const toggleFilters = () => {
    setFilter(!filter);
  };

  const onScrollBeginDrag = () => {
    setFilter(true);
  };

  React.useEffect(() => {
    if (devices.data) {
      setCurrentDevices(devices && devices.data);
    }
  }, [devices]);

  //search by qr code if client id and qr code is valid
  React.useEffect(() => {
    if (QR_CODE && clientId) {
      dispatchAction(
        ActionSearchDevice({
          clientId,
          qr_code: QR_CODE,
        })
      );
    }
  }, [QR_CODE]);

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
              borderRightWidth: device.metadata.qrcodeId ? 2 : 0,
              borderRightColor: SystemColors.success,
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
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                    marginRight: 12,
                    fontWeight: "500",
                  }}
                >
                  {device.metadata.model}
                </Text>
              </View>
              <Text
                style={{
                  color: "#888",
                  marginBottom: 5,
                }}
              >
                {device.metadata.name}
              </Text>

              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {device.online_status && <Online />}
                {!device.online_status && <OffLine />}

                {device.metadata.active && (
                  <View
                    style={{
                      backgroundColor: "green",
                      width: 72,
                      height: 24,
                      borderRadius: 44,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ color: "#fff", width: 72, textAlign: "center" }}
                    >
                      Active
                    </Text>
                  </View>
                )}
              </View>
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
          onChangeText={(value) => handleTextSearch(value)}
          placeholder="Search by name or QR Code "
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
            marginTop: 12,
            paddingHorizontal: 16,
            paddingLeft: 48,
            width: "100%",
            borderRadius: 12,
            fontWeight: "400",
            backgroundColor: "#fff",
          }}
        />

        <TouchableHighlight
          onPress={openQRScannerSearch}
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
      {QR_CODE && (
        <View
          style={{
            marginTop: 6,
            backgroundColor: "#fff",
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginHorizontal: 12,
            marginBottom: 6,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                color: SystemColors.primary,
              }}
            >
              Searched QR Code
            </Text>
            <Text> - {QR_CODE}</Text>
          </View>

          <TouchableHighlight
            underlayColor="#fff"
            onPress={handleClearSearch}
            style={{
              position: "relative",
              zIndex: 2000,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 44,
              borderWidth: 0,
              height: 32,

              paddingHorizontal: 12,
              backgroundColor: "#f1f1f1",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#666" }}>Clear</Text>
              <Image
                source={require("../../../assets/images/close-icon.png")}
                style={{
                  width: 10,
                  height: 10,
                  marginLeft: 6,
                  tintColor: "#666",
                }}
              />
            </View>
          </TouchableHighlight>
        </View>
      )}
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
                paddingHorizontal: 12,
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
          <SelectBoxes navigation={navigation} />
        </Collapsible>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          {devices.isLoading && (
            <View
              style={{
                position: "absolute",
                width: 44,
                height: 44,
                borderRadius: 6,
                backgroundColor: "#fff",
                zIndex: 3000,
                elevation: 5,
                left: "50%",
                top: "50%",
                marginTop: -22,
                marginLeft: -22,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator color={SystemColors.primary} />
            </View>
          )}

          {currentDevices && currentDevices.length === 0 && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                {!QR_CODE && <>No devices found !</>}
                {QR_CODE && <>No devices found for below QR code -{QR_CODE}</>}
              </Text>
            </View>
          )}
          {!devices.isLoading && currentDevices && currentDevices.length > 0 && (
            <ScrollView
              scrollEventThrottle={1}
              onScrollBeginDrag={onScrollBeginDrag}
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingVertical: 12,
                paddingBottom: 72,
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

export default Devices;
