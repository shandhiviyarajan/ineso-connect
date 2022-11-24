import moment from "moment";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { MarkerAnimated } from "react-native-maps";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../atoms/Button";
import { measurementKeys } from "../../../core/constants";
import { RenameMaintenence } from "../../../core/utils/Maintenance";
import { toCapitalize, removeUnderscore } from "../../../core/utils/Capitalize";
import GenerateImage from "../../../core/utils/GenerateImage";
import { SystemColors } from "../../../core/Styles/theme/colors";
import { ActionSyncDevice } from "../../../core/redux/actions/deviceActions";
import { generateModel, vendorName } from "../../../core/utils/generateModel";

export const Device = ({ navigation }) => {
  const activeDevice = useSelector((state) => state.device.device.data);
  const isLoading = useSelector((state) => state.device.device.isLoading);
  const [measures, setMeasures] = React.useState([]);
  const clientId = useSelector((state) => state.client.clientId);
  const dispatchAction = useDispatch();
  function CommissionList({ children }) {
    return <View>{children}</View>;
  }

  function DeviceInfo({ title, value, unit, icon }) {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 12,
          paddingRight: 24,
          paddingLeft: 12,
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
          {icon ? (
            <Image
              source={icon}
              style={{
                resizeMode: "contain",
                height: 24,
                width: 24,
                tintColor: "#666",
                marginRight: 6,
              }}
            />
          ) : (
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: "#000",
                marginRight: 4,
              }}
              source={GenerateImage(
                activeDevice &&
                  activeDevice.metadata.model &&
                  activeDevice.metadata.model
              )}
            />
          )}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#5E5E5E",
            }}
          >
            {toCapitalize(title)}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: "#5E5E5E",
            fontWeight: "400",
          }}
        >
          {isNaN(value)
            ? value
            : value && value.toString().split(".")[1] > 0
            ? parseFloat(value).toFixed(1)
            : parseFloat(value)}
        </Text>
        <Text style={{ fontSize: 20, color: "#a5a5a5", fontWeight: "400" }}>
          &nbsp;
          {unit}
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
        <Text>Online</Text>
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
        <Text>Offline</Text>
      </View>
    );
  }
  let timer = null;
  React.useEffect(() => {
    if (activeDevice) {
      let deviceMeasurements = Object.entries(activeDevice.lastMeasurement);
      let filterdMeasures = measurementKeys.filter((mk) =>
        deviceMeasurements.some((dm) => dm[0] === mk.key)
      );
      let newMeasure = filterdMeasures.map((fm) => ({
        key: fm.key,
        name: fm.name,
        unit: fm.unit,
        icon: fm.icon,
        value: deviceMeasurements.filter((dm) => dm[0] === fm.key)[0][1],
      }));
      setMeasures(newMeasure);
      timer = setTimeout(() => {
        activeDevice &&
          dispatchAction(
            ActionSyncDevice({
              clientId,
              deviceId: `${activeDevice.vendor}:${activeDevice.serial}`,
            })
          );
      }, 180 * 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [activeDevice]);
  // fetch devices every 120 seconds (2 min)
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
              backgroundColor: "#F2F5F9",
            }}
          >
            <Image
              source={GenerateImage(activeDevice.metadata.model)}
              style={{
                width: 64,
                height: 64,
                marginRight: 12,
                tintColor: SystemColors.primary,
              }}
            ></Image>
            <View>
              <Text
                style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}
              >
                {activeDevice.metadata.name}
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "400", marginBottom: 8 }}
              >
                {toCapitalize(removeUnderscore(activeDevice.type))}
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
              backgroundColor: "#F2F5F9",
            }}
          >
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  Model : &nbsp;
                </Text>
                <Text style={{ fontSize: 16, color: "#5E5E5E" }}>
                  {activeDevice.metadata.model &&
                    generateModel(activeDevice.metadata.model)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  Line: &nbsp;
                </Text>

                <Text style={{ fontSize: 16, color: "#5E5E5E" }}>
                  {toCapitalize(removeUnderscore(activeDevice.line))}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  Vendor: &nbsp;
                </Text>
                <Text style={{ fontSize: 16, color: "#5E5E5E" }}>
                  {vendorName(activeDevice.vendor)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  Serial number: &nbsp;
                </Text>
                <Text style={{ fontSize: 16, color: "#5E5E5E" }}>
                  {activeDevice.serial}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  Last measurement:
                </Text>
                <Text style={{ fontSize: 14, color: "#5E5E5E" }}>
                  &nbsp;
                  {moment(activeDevice.lastMeasurement.time).format(
                    "DD-MMM-YYYY hh:mm:ss A"
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.card_measure}>
              {measures &&
                measures.map(
                  (measure, i) =>
                    measure.value !== null && (
                      <DeviceInfo
                        icon={measure.icon}
                        title={measure.name}
                        value={measure.value}
                        unit={measure.unit ? measure.unit : ""}
                        key={"measure" + i}
                      />
                    )
                )}
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
              {activeDevice &&
                activeDevice.metadata &&
                activeDevice.metadata.lifecycle.map((cycle, i) => (
                  <CommissionList key={"cycle" + i}>
                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "400",
                          width: "100%",
                          display: "flex",

                          fontSize: 20,
                          marginBottom: 6,
                          marginTop: 0,
                        }}
                      >
                        {cycle.state &&
                          cycle.state &&
                          toCapitalize(
                            RenameMaintenence(cycle.state && cycle.state)
                          )}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginBottom: 6,
                          color: "#5E5E5E",
                        }}
                      >
                        {moment(cycle.state.date).format(
                          "D - MMMM - yyyy - hh:mm:a"
                        )}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginBottom: 6,
                          color: "#5E5E5E",
                        }}
                      >
                        {cycle.desc}
                      </Text>
                    </View>
                  </CommissionList>
                ))}
            </View>

            {/* <View style={styles.card}>
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
              <Button
                secondary
                onPress={() => {
                  navigation.navigate("IncidentReporting");
                }}
              >
                Declare an Incident
              </Button>
            </View> */}

            {activeDevice.metadata.gpsLocation && (
              <>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "500",
                    marginBottom: 12,
                  }}
                >
                  Last location
                </Text>
                <View
                  style={[
                    styles.card,
                    {
                      padding: 0,
                      overflow: "hidden",
                      position: "relative",
                      paddingBottom: 24,
                    },
                  ]}
                >
                  <MapView
                    showsUserLocation={true}
                    customMapStyle={[]}
                    initialRegion={{
                      latitude: activeDevice.metadata.gpsLocation.latitude,
                      longitude: activeDevice.metadata.gpsLocation.longitude,
                      latitudeDelta: 0.003,
                      longitudeDelta: 0.003,
                    }}
                    style={{
                      height: 160,
                      marginBottom: 24,
                    }}
                  >
                    <MarkerAnimated
                      coordinate={{
                        longitude: activeDevice.metadata.gpsLocation.longitude,
                        latitude: activeDevice.metadata.gpsLocation.latitude,
                      }}
                    />
                  </MapView>

                  <Button
                    secondary
                    onPress={() => {
                      navigation.navigate("EditGPS", {
                        activeDevice,
                      });
                    }}
                  >
                    Edit GPS coordinates
                  </Button>
                </View>
              </>
            )}
            <CommissionList></CommissionList>

            {/* <View
              style={{
                paddingBottom: 24,
              }}
            >
              <Button primary>Remove Device</Button>
            </View> */}
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
