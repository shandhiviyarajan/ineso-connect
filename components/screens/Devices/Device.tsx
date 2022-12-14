import moment from "moment";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useSelector } from "react-redux";
import { SystemColors } from "../../../core/Styles/theme/colors";
import GenerateImage from "../../../core/utils/GenerateImage";
import { Button } from "../../atoms/Button";
import { LinkButton } from "../../atoms/LinkButton";

export const Device = ({ navigation }) => {
  const activeDevice = useSelector((state) => state.device.device.data);
  const isLoading = useSelector((state) => state.device.device.isLoading);
  const [measures, setMeasures] = React.useState([]);
  function CommissionList({ children }) {
    return (
      <View>
        <Text
          style={{
            fontSize: 17,
            paddingVertical: 4,
            color: "#666",
          }}
        >
          {children}
        </Text>
      </View>
    );
  }

  function DeviceInfo({ title, value }) {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 12,
          paddingHorizontal: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 0.5,
          borderBottomColor: "#d8d8d8",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/InesoLogoBanner.png")}
            style={{
              width: 32,
              height: 32,
              marginRight: 12,
            }}
          />
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {title}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {isNaN(value) ? value : parseInt(value)}
        </Text>
      </View>
    );
  }

  function Online() {
    return (
      <View
        style={{
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
        <Text
          style={{
            fontWeight: "500",
          }}
        >
          Online
        </Text>
      </View>
    );
  }
  function OffLine() {
    return (
      <View
        style={{
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

  const measurementKeys = [
    "Internal_Temperature",
    "Restarted",
    "Sensor_Firmware_Version",
    "Sensor_Humidity",
    "Sensor_Temperature",
  ];

  React.useEffect(() => {
    if (activeDevice) {
      let filterdMeasures = Object.entries(activeDevice.lastMeasurement).filter(
        (m) => measurementKeys.includes(m[0])
      );
      setMeasures(filterdMeasures);
    }
  }, [activeDevice]);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && <ActivityIndicator />}
      </View>
      {activeDevice && (
        <>
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 8,
              flexDirection: "row",
            }}
          >
            <Image
              source={GenerateImage(activeDevice.metadata.model)}
              style={{
                width: 56,
                height: 56,
                marginRight: 12,
              }}
            ></Image>
            <View>
              <Text
                style={{ fontSize: 20, fontWeight: "600", marginBottom: 8 }}
              >
                {activeDevice.metadata.model}
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "400", marginBottom: 8 }}
              >
                {activeDevice.metadata.name}
              </Text>
              {activeDevice.online_status && <Online />}
              {!activeDevice.online_status && <OffLine />}
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 0,
              position: "relative",
            }}
          ></View>
          <ScrollView
            contentContainerStyle={{
              padding: 12,
            }}
          >
            <View style={styles.card}>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 6,
                }}
              >
                Category : {activeDevice.category}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 6,
                }}
              >
                Type : {activeDevice.type}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 6,
                }}
              >
                Line: {activeDevice.line}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 6,
                }}
              >
                Vendor: {activeDevice.vendor}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 6,
                }}
              >
                Serial number: {activeDevice.serial}
              </Text>
            </View>
            <View style={styles.card_measure}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "500",
                  marginBottom: 12,
                  paddingLeft: 24,
                }}
              >
                Measurement
              </Text>
              {measures &&
                measures.map((measure) => (
                  <DeviceInfo
                    title={measure[0]}
                    value={measure[1]}
                    key={measure[0]}
                  />
                ))}

              <Text
                style={{
                  padding: 12,
                  color: "#888",
                }}
              >
                Last measurement -
                {moment(activeDevice.lastMeasurement.time).format("hh:mm:a")}
              </Text>
            </View>

            <View style={styles.card}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "500",
                  marginBottom: 12,
                }}
              >
                Commissioning
              </Text>
              <CommissionList>Date: June 13, 2022</CommissionList>

              <CommissionList>Operating time: 4 Days</CommissionList>
              <CommissionList>State: Online Battery</CommissionList>
              <CommissionList>Level: Full</CommissionList>
            </View>

            <View style={styles.card}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "500",
                  marginBottom: 12,
                }}
              >
                Maintenance History
              </Text>
              <CommissionList>Date: June 13, 2022</CommissionList>
              <CommissionList></CommissionList>
              <Button secondary>Declare an Incident</Button>
            </View>
            <View style={styles.card}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "500",
                  marginBottom: 12,
                }}
              >
                Last location
              </Text>
              <CommissionList>This device is fixed</CommissionList>
              <LinkButton
                style={{
                  fontSize: 16,
                  paddingTop: 3,
                }}
              >
                Edit GPS Coodination
              </LinkButton>
            </View>

            <View style={styles.card}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "500",
                  marginBottom: 12,
                }}
              >
                Groups
              </Text>
            </View>
            <View
              style={{
                paddingBottom: 24,
              }}
            >
              <Button primary>Remove Device</Button>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    elevation: 5,
    shadowColor: "#666",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  card_measure: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingTop: 12,
    marginBottom: 16,
    elevation: 5,
    shadowColor: "#666",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
});
