import React from "react";
import {
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
import {
  ActionFetchDevice,
  ActionFetchDevices,
} from "../../../core/redux/actions/deviceActions";
import GenerateImage from "../../../core/utils/GenerateImage";
import { ActivityIndicator } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import QRSearch from "../QRScan/QRSearch";
import {
  ActionSearchDevice,
  ActionSetQR,
} from "../../../core/redux/actions/qrActions";
import { SelectBoxes } from "./SelectBoxes";
import { useNavigation } from "@react-navigation/native";
import { Message } from "../../molecules/Toast";
import { generateModel } from "../../../core/utils/generateModel";
const Devices = () => {
  const dispatchAction = useDispatch();
  const updated_payload = useSelector((state) => state.qr.payload);

  const navigation = useNavigation();

  const clientId = useSelector((state) => state.client.clientId);
  const siteId = useSelector((state) => state.client.siteId);
  const groupId = useSelector((state) => state.client.groupId);

  const [filter, setFilter] = React.useState(false);

  const [open, setQRModal] = React.useState(false);

  const payload_ids = useSelector((state) => state.qr.payload);

  //all devices
  const devices = useSelector((state) => state.device.devices);

  const QR_CODE = useSelector((state) => state.qr.QR_CODE);

  const [currentDevices, setCurrentDevices] = React.useState(null);
  //open scanner modal
  const openQRScannerSearch = () => {
    if (!clientId) {
      Message("error", "Please select a client !", "Client id not found !");
      return;
    }
    dispatchAction(ActionSetQR(null));
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
    navigation.navigate("All devices");
  };

  //handle search
  const handleTextSearch = (value: any) => {
    let filtered =
      devices &&
      devices.data &&
      devices.data.filter((device: any) =>
        device.metadata.name.includes(value)
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

    //refetch with selected client id, site id, group id
    dispatchAction(ActionFetchDevices(payload_ids));
  };

  const toggleFilters = () => {
    setFilter(!filter);
  };

  const onScrollBeginDrag = () => {
    setFilter(true);
  };

  React.useEffect(() => {
    if (devices.data) {
      let sort_by_time =
        devices &&
        devices.data.sort((a, b) => b.lastStatusDate - a.lastStatusDate);

      let sort_by_online =
        devices &&
        devices.data.sort((a, b) => b.online_status - a.online_status);

      setCurrentDevices(sort_by_online);
    }
  }, [devices]);

  //search by qr code if client id and qr code is valid
  React.useEffect(() => {
    if (QR_CODE) {
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
            width: 20,
            height: 20,
            marginRight: 6,
            borderRadius: 100,
          }}
        >
          <Image
            source={require("../../../assets/images/measure/connected.png")}
            style={{
              width: 20,
              height: 20,
              tintColor: SystemColors.success,
            }}
          />
        </View>
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
            width: 20,
            height: 20,
            marginRight: 6,
            borderRadius: 100,
          }}
        >
          <Image
            style={{
              tintColor: SystemColors.warning,
              width: 18,
              height: 18,
            }}
            source={require("../../../assets/images/measure/offline.png")}
          />
        </View>
      </View>
    );
  }
  function ActiveDevice() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          height: 32,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "green", textAlign: "center" }}></Text>
      </View>
    );
  }
  function DeviceCard({ onPress, device }) {
    return (
      <>
        <TouchableHighlight
          onPress={onPress}
          underlayColor="#fff"
          style={{
            height: 112,
          }}
        >
          <View
            style={{
              width: "100%",
              position: "relative",
              marginBottom: 6,
              padding: 12,
              borderRadius: 6,
              backgroundColor: "#fff",
              height: 96,
              flex: 1,
              flexDirection: "row",
              elevation: 3,
              shadowColor: "#666",
              borderWidth: 1,
              borderColor: "#d6d6d6",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.05,
              shadowRadius: 5,
            }}
          >
            <View
              style={{
                marginRight: 12,
              }}
            >
              <Image
                source={GenerateImage(device && device.metadata?.model)}
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 8,
                  tintColor: "#000",
                  resizeMode: "contain",
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 5,
                    marginRight: 12,
                    fontWeight: "500",
                  }}
                >
                  {device && device.metadata && device.metadata.name}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: "#888",
                    marginBottom: 5,
                  }}
                >
                  {generateModel(
                    device && device.metadata && device.metadata.model,
                    "type"
                  )}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                {device.online_status && <Online />}
                {!device.online_status && <OffLine />}
                {device.metadata.active && <ActiveDevice />}
              </View>

              <View>
                <Text
                  style={{
                    color: "#888",
                    textAlign: "right",
                  }}
                >
                  {moment
                    .duration(device.lastStatusDate - Date.now(), "")
                    .humanize(true)}
                </Text>
              </View>
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
      <View
        style={{
          paddingHorizontal: 12,
          position: "relative",
          backgroundColor: "#F2F5F9",
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
              width: 16,
              height: 16,
              opacity: 1,
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
            fontSize: 14,
            color: "#000",
            textAlign: "left",
            paddingVertical: 0,
            borderWidth: 1,
            borderColor: "#d8d8d8",
            marginTop: 12,
            paddingHorizontal: 16,
            paddingLeft: 40,
            width: "100%",
            borderRadius: 6,
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
            backgroundColor: "#fff",
          }}
        >
          <View>
            <Image
              source={require("../../../assets/images/qr.png")}
              style={{
                tintColor: "#666",
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
            backgroundColor: "#F2F5F9",
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
                fontSize: 14,
                color: SystemColors.primary,
              }}
            >
              Searched QR Code
            </Text>
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
              backgroundColor: "#F2F5F9",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#666", fontWeight: "500" }}>Clear</Text>
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
            paddingHorizontal: 0,
            backgroundColor: "#F2F5F9",
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
                paddingTop: 12,

                borderRadius: 0,
                marginBottom: 0,
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  fontWeight: "600",
                  color: "#666",
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
            backgroundColor: "#F2F5F9",
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
              <ActivityIndicator />
            </View>
          )}

          {devices.isLoading && (
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
                <ActivityIndicator />
              </Text>
            </View>
          )}

          {!devices.isLoading &&
            currentDevices &&
            currentDevices.length === 0 && (
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
                  {QR_CODE && (
                    <>No devices found for below QR code -{QR_CODE}</>
                  )}
                </Text>
              </View>
            )}
          {!devices.isLoading &&
            currentDevices &&
            currentDevices.length > 0 && (
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
                {currentDevices.map(
                  (device, index) =>
                    device && (
                      <DeviceCard
                        key={device && index + device._id}
                        device={device}
                        onPress={() => handleDeviceClick(device)}
                      />
                    )
                )}
              </ScrollView>
            )}
        </View>
      </View>
    </>
  );
};

export default Devices;
