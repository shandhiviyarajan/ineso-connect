import React from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";
import { SystemColors } from "../../../core/Styles/theme/colors";

function Notifications({ navigation }) {
  const alerts = useSelector((state) => state.alert.alerts);

  const AlertCard = ({ alert }) => {
    return (
      <View>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#fff"
          onPress={() => {
            navigation.navigate("Change Status", {
              alert,
            });
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 16,
              marginBottom: 6,
              borderRadius: 4,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
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
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {alert.name}
              </Text>
              <Text
                style={{
                  color: "#888",
                  marginTop: 3,
                }}
              >
                {alert.device && alert.device.name}
              </Text>
              <Text>{alert.state}</Text>
            </View>
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor="#fff"
              onPress={() => {
                navigation.navigate("Change Status", {
                  alert,
                });
              }}
            >
              <View
                style={{
                  backgroundColor: SystemColors.primary,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 24,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  Edit Status
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </TouchableHighlight>
      </View>
    );
  };
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 12,
      }}
    >
      {alerts.isLoading && <ActivityIndicator />}

      {alerts.data &&
        alerts.data.map((alert) => (
          <AlertCard key={alert.alertId} alert={alert} />
        ))}
    </ScrollView>
  );
}

export default Notifications;
