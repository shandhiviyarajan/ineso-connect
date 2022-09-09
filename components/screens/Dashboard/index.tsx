import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Alert, Image } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { HeaderStatusBar } from "../../atoms/StatusBar";
import { Button } from "../../atoms/Button";
import { AppCustomHeader } from "../../molecules/AppHeader";
import {
  LogoutAction,
  MeAction,
} from "../../../core/redux/actions/authActions";
import { setClientToken } from "../../../core/interceptors/interceptors";
import {
  ActionFetchClient,
  ActionFetchClients,
  ActionSetClientId,
  ActionSetGroupId,
  ActionSetSiteId,
} from "../../../core/redux/actions/clientsActions";
import SelectBox from "../../atoms/SelectBox";
import { ActionFetchSites } from "../../../core/redux/actions/siteActions";

import { ActivityIndicator } from "react-native-paper";

import { ActionFetchGroups } from "../../../core/redux/actions/groupActions";
import { ActionFetchDevices } from "../../../core/redux/actions/deviceActions";
import { ActionFetchAlert } from "../../../core/redux/actions/alertActions";
export const Dashboard = ({ navigation }) => {
  //auth status
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //dispatcher
  const dispatchAction = useDispatch();

  //clients
  const clients = useSelector((state) => state.client.clients);
  const client = useSelector((state) => state.client.client.data);
  const clientId = useSelector((state) => state.client.clientId);

  const sites = useSelector((state) => state.site.sites);
  const siteId = useSelector((state) => state.client.siteId);

  const groups = useSelector((state) => state.group.groups);
  const groupId = useSelector((state) => state.client.groupId);

  const devices = useSelector((state) => state.device.devices);

  const [payload, setPayload] = React.useState({
    clientId: false,
    siteId: false,
    groupId: false,
  });

  //get user info on load
  useEffect(() => {
    console.log("fudkafjdljafkdjafkdjafj;l");
    if (isAuthenticated) {
      setClientToken(isAuthenticated);
      dispatchAction(ActionFetchClients());
      dispatchAction(MeAction());
    } else {
      dispatchAction(LogoutAction());
    }
  }, []);

  const filterDevices = () => {
    navigation.navigate("Devices");
  };

  //select client id
  const handleClientSelect = (client: any) => {
    const { id } = client;
    dispatchAction(ActionSetClientId(id));
    //ferch sites
    dispatchAction(
      ActionFetchSites({
        clientId: id,
      })
    );

    //fetch single client for alerts

    dispatchAction(
      ActionFetchClient({
        clientId: id,
      })
    );

    //set client id for state
    setPayload((prevState) => ({
      ...prevState,
      clientId: id,
      siteId: false,
      groupId: false,
    }));
  };

  //select site id
  const handleSiteSelect = (site: any) => {
    const { vendor, serial } = site;

    const siteId = `${vendor}:${serial}`;
    dispatchAction(ActionSetSiteId(siteId));
    //ferch groups using site id & Client id
    dispatchAction(
      ActionFetchGroups({
        clientId: payload.clientId,
        siteId,
      })
    );
    setPayload((prevState) => ({
      ...prevState,
      siteId,
    }));
  };

  //select site id
  const handleGroupSelect = (group: any) => {
    const { vendor, serial } = group;
    const groupId = `${vendor}:${serial}`;
    dispatchAction(ActionSetGroupId(groupId));
    setPayload((prevState) => ({
      ...prevState,
      groupId,
    }));
  };

  React.useEffect(() => {
    dispatchAction(ActionFetchDevices(payload));
  }, [payload]);

  //fetch all alerts
  React.useEffect(() => {
    if (client) {
      dispatchAction(
        ActionFetchAlert({
          clientId,
          glounId: `${client.vendor}:${client.serial}`,
        })
      );
    }
  }, [client]);

  return (
    <>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#F2F6FC",
        }}
      >
        <View style={ContentStyle.card}>
          <View>
            <SelectBox
              placeholder="CLIENTS"
              onSelect={(client) => {
                handleClientSelect(client);
              }}
              buttonTextAfterSelection={({ name }) => {
                return name.toUpperCase();
              }}
              rowTextForSelection={({ name }) => {
                return name.toUpperCase();
              }}
              data={clients.data && clients.data ? clients.data : []}
            />
          </View>
          <View>
            <SelectBox
              disabled={
                sites.data && sites.data ? sites.data.length === 0 : true
              }
              placeholder="SITES"
              onSelect={(site) => {
                handleSiteSelect(site);
              }}
              buttonTextAfterSelection={({ vendor, serial }) => {
                return (
                  <>
                    <Text>{`${vendor}:${serial}`}</Text>
                  </>
                );
              }}
              rowTextForSelection={({ name, vendor, serial }) => {
                return (
                  <>
                    <Text style={{ fontSize: 16, width: "100%" }}>
                      {name} {`${vendor}:${serial}`}
                    </Text>
                  </>
                );
              }}
              data={sites.data && sites.data ? sites.data : []}
            />
          </View>

          <View>
            <SelectBox
              disabled={
                groups.data && groups.data ? groups.data.length === 0 : true
              }
              placeholder="GROUPS"
              onSelect={(group) => handleGroupSelect(group)}
              buttonTextAfterSelection={({ name }) => {
                return (
                  <>
                    <Text>{name}</Text>
                  </>
                );
              }}
              rowTextForSelection={({ name }) => {
                return name;
              }}
              data={groups.data && groups.data ? groups.data : []}
            />
          </View>
        </View>
        {/* 
        <View style={ContentStyle.card}>
          {devices.isLoading && <ActivityIndicator />}
          <Text
            style={{
              fontSize: 24,
              marginBottom: 12,
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {devices.data && devices.data.length} Devices found
          </Text>
          <Button
            primary
            onPress={() => filterDevices()}
            disabled={!(devices.data && devices.data.length)}
          >
            Show Devices
          </Button>
        </View> */}
      </View>
    </>
  );
};

const ContentStyle = StyleSheet.create({
  button_success: {},
  button_normal: {},
  view: {
    flexDirection: "row",
    paddingVertical: 6,
    alignItems: "center",
  },
  label: {
    width: 120,
    fontWeight: "400",
    lineHeight: 16,
    fontSize: 14,
  },
  label_large: {
    width: 120,
    fontWeight: "500",
    lineHeight: 18,
    fontSize: 14,
  },
  value: {
    lineHeight: 16,
    color: "#216FED",
    fontWeight: "500",
    fontSize: 14,
    flexWrap: "wrap",
    width: "70%",
    textTransform: "capitalize",
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: "95%",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 0,
    elevation: 5,
    shadowColor: "#d9d9d9",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});
