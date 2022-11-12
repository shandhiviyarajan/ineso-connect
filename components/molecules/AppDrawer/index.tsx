import React, { useState } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  LogoutAction,
  MeAction,
} from "../../../core/redux/actions/authActions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions, useNavigation } from "@react-navigation/core";
import { SystemColors } from "../../../core/Styles/theme/colors";

//app drawer
export const AppDrawer = (props) => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const me = useSelector((state) => state.auth.me.data);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#F2F6FC" }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              elevation: 5,
              shadowColor: "rgba(94, 132, 194, 0.25)",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              width: "100%",
              height: 64,
              margin: 16,
            }}
          >
            <Image
              source={require("../../../assets/images/InesoMobileAppIcon.png")}
              style={{
                width: 72,
                height: 72,
                borderRadius: 12,
              }}
            />
          </View>
          <View style={DrawerStyles.DrawerProfile}>
            {me && (
              <>
                <Text style={DrawerStyles.DrawerProfileText}>
                  {me.first_name} {me.last_name}
                </Text>

                <Text style={DrawerStyles.DrawerProfileText}> {me.email} </Text>
                <Text style={DrawerStyles.DrawerProfileText}>
                  {me.phone_number}
                </Text>
              </>
            )}
          </View>
        </DrawerContentScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity onPress={() => handleLogout()}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
              }}
            >
              <Text style={DrawerStyles.DrawerItemStyles}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const DrawerStyles = StyleSheet.create({
  DrawerItemStyles: {
    fontSize: 17,
    fontWeight: "500",
    paddingVertical: 12,
    color: "#737B8B",
  },

  DrawerItemActive: {
    fontSize: 17,
    fontWeight: "500",
    paddingVertical: 12,
    color: "#216FED",
  },
  DrawerProfile: {
    padding: 24,
    fontSize: 16,
  },
  DrawerProfileText: {
    width: "100%",
    fontSize: 22,
    lineHeight: 36,
    textAlign: "center",
  },
  DrawerFooter: {},
});
