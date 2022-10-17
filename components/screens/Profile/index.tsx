import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  removeToken,
  setClientToken,
} from "../../../core/interceptors/interceptors";
import {
  LogoutAction,
  MeAction,
} from "../../../core/redux/actions/authActions";
import {
  ActionFetchClientsSuccess,
  ActionFetchClientSuccess,
} from "../../../core/redux/actions/clientsActions";
import {
  ActionFetchDevicesSuccess,
  ActionFetchDeviceSuccess,
} from "../../../core/redux/actions/deviceActions";
import { ActionUpdatePayload } from "../../../core/redux/actions/qrActions";

function Profile() {
  React.useEffect(() => {
    dispatch(MeAction());
  }, []);
  const isLoading = useSelector((state) => state.auth.me.isLoading);
  const me = useSelector((state) => state.auth.me.data);

  const dispatch = useDispatch();
  const handleLogout = () => {
    removeToken().then(() => {
      dispatch(ActionFetchClientsSuccess(null));
      dispatch(ActionFetchClientSuccess(null));
      dispatch(ActionFetchDevicesSuccess(null));
      dispatch(ActionUpdatePayload(null));
      setClientToken(null);
      dispatch(LogoutAction());
    });
  };

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
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      {!isLoading && (
        <>
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
            {me &&
            me.distributor &&
            me.distributor.logo &&
            me.distributor.logo ? (
              <Image
                source={{
                  uri:
                    me &&
                    me.distributor &&
                    me.distributor &&
                    me.distributor.logo,
                }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 24,
                  marginBottom: 24,
                }}
              />
            ) : (
              <Image
                source={require("../../../assets/images/InesoMobileAppIcon.png")}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 24,
                  marginBottom: 24,
                }}
              />
            )}
          </View>
          <View style={{ flex: 0.5 }}>
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
          <View
            style={{
              flex: 0.5,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <TouchableHighlight underlayColor="#fff" onPress={handleLogout}>
              <View
                style={{
                  padding: 24,
                  marginBottom: 24,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  Logout
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </>
      )}

      {isLoading && <ActivityIndicator />}
    </View>
  );
}

export default Profile;
