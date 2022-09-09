import React from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

function Profile() {
  const me = useSelector((state) => state.auth.me.data);

  function ProfileText({ children }) {
    return (
      <Text
        style={{
          fontSize: 16,
          paddingVertical: 3,
          textAlign: "center",
          fontWeight: "500",
          color: "#666",
        }}
      >
        {children}
      </Text>
    );
  }
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 0,
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#f1f1f1",
          width: "100%",
          height: "40%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Image
          source={require("../../../assets/images/InesoMobileAppIcon.png")}
          style={{
            width: 120,
            height: 120,
            borderRadius: 24,
            marginBottom: 24,
          }}
        />
      </View>
      <View>
        {me && (
          <>
            <Text
              style={{
                fontSize: 24,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              {me.first_name} {me.last_name}
            </Text>
            <ProfileText>{me.email}</ProfileText>
            <ProfileText>{me.phone_number}</ProfileText>
            <ProfileText>{me.prefered_timezone}</ProfileText>
            <ProfileText>{me.distributor.name}</ProfileText>
          </>
        )}
      </View>
    </View>
  );
}

export default Profile;
