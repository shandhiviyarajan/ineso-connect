import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
export const Welcome = ({ navigation }) => {
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#B54E29",
      }}
    >
      <View
        style={{
          flex: 0.75,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/InesoMobileAppIcon.png")}
          style={{ height: 200, width: 200 }}
        />
        <Text
          style={{
            fontSize: 36,
            marginBottom: 12,
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Connect
        </Text>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: "#f6f6f6",
          }}
        >
          The blockchain-driven IoT platform to put your business at the next
          level
        </Text>
      </View>
      <View
        style={{
          flex: 0.25,
          width: "100%",
        }}
      >
        <TouchableHighlight
          onPress={() => navigateTo("Login")}
          activeOpacity={0.5}
          underlayColor="#B54E29"
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: "#B54E29",
              borderWidth: 1,
              borderColor: "#fff",
              paddingHorizontal: 24,
              paddingVertical: 12,
              height: 48,
              borderRadius: 0,
              width: "100%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: 18,
                color: "#fff",
              }}
            >
              CONTINUE
            </Text>
          </View>
        </TouchableHighlight>
        <Text
          style={{
            color: "#ccc",
            paddingVertical: 12,
            textAlign: "center",
          }}
        >
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};
