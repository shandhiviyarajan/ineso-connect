import React from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";
import { SystemColors } from "../../../core/Styles/theme/colors";
import RadioButtonRN from "radio-buttons-react-native";
import { Message } from "../../molecules/Toast";
import { apiUpdateAlertState } from "../../../core/API/apiAlert";

function ChangeState({ route, navigation }) {
  const alerts = useSelector((state) => state.alert.alerts);
  const clientId = useSelector((state) => state.client.clientId);

  const data = [
    {
      label: "Open",
      value: "open",
    },
    {
      label: "Closed",
      value: "close",
    },
    {
      label: "Assigned",
      value: "assigned",
    },
  ];

  const [payload, setPayload] = React.useState(null);
  const handlePayload = (e) => {
    setPayload(e.value);
  };

  const updateStatus = () => {
    apiUpdateAlertState({
      alertId: route && route.params.alert.alertId,
      clientId,
      payload,
    })
      .then(() => {
        Message("success", "Status updated !", "");
      })
      .catch(() => {
        Message("error", "Error !", "Status update failed !");
      });
  };

  const AlertCard = ({ alert }) => {
    return (
      <View>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 16,
            width: "100%",
            marginBottom: 6,
            borderRadius: 4,
            flexDirection: "column",
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
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {JSON.stringify(payload)}
              {alert.name}
            </Text>
            <Text
              style={{
                color: "#888",
                marginTop: 3,
                textAlign: "center",
              }}
            >
              {alert.device && alert.device.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginVertical: 12,
                textAlign: "center",
              }}
            >
              {alert.state}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              width: "100%",
            }}
          >
            <RadioButtonRN
              data={data}
              textStyle={{
                fontSize: 18,
                fontWeight: "600",
              }}
              selectedBtn={handlePayload}
              activeColor={SystemColors.primary}
            />
          </View>
          <TouchableHighlight
            style={{
              width: "100%",
            }}
            activeOpacity={0.5}
            underlayColor="#fff"
            onPress={() => updateStatus()}
          >
            <View
              style={{
                backgroundColor: SystemColors.primary,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 4,
                marginVertical: 12,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Update Status
              </Text>
            </View>
          </TouchableHighlight>
        </View>
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
      <AlertCard alert={route.params.alert} />
    </ScrollView>
  );
}

export default ChangeState;
