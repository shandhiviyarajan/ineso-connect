import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionFetchClient,
  ActionFetchClients,
  ActionSetClientId,
  ActionSetGroupId,
  ActionSetSiteId,
} from "../../../core/redux/actions/clientsActions";
import SelectBox from "../../atoms/SelectBox";
import { ActionFetchSites } from "../../../core/redux/actions/siteActions";
import { ActionFetchGroups } from "../../../core/redux/actions/groupActions";
import { ActionFetchDevices } from "../../../core/redux/actions/deviceActions";
import { ActionFetchAlert } from "../../../core/redux/actions/alertActions";
import { ActionUpdatePayload } from "../../../core/redux/actions/qrActions";
import { setToken } from "../../../core/interceptors/interceptors";
import { MeAction } from "../../../core/redux/actions/authActions";
export const SelectBoxes = ({ navigation }) => {
  //auth status
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //dispatcher
  const dispatchAction = useDispatch();

  // //all devices
  const devices = useSelector((state) => state.device.devices);

  //clients
  const clients = useSelector((state) => state.client.clients);
  const client = useSelector((state) => state.client.client.data);
  const clientId = useSelector((state) => state.client.clientId);
  const siteId = useSelector((state) => state.client.siteId);
  const groupId = useSelector((state) => state.client.groupId);
  const sites = useSelector((state) => state.site.sites);
  const groups = useSelector((state) => state.group.groups);
  const updated_payload = useSelector((state) => state.qr.payload);

  const [defaultClient, setSelectedClient] = React.useState(null);
  const [payload, setPayload] = React.useState({
    clientId: false,
    siteId: false,
    groupId: false,
  });

  //initial load
  React.useEffect(() => {
    (async () => {
      //set auth tokens
      setToken(isAuthenticated);
      //get profile
      dispatchAction(MeAction());
      //get all clients
      dispatchAction(ActionFetchClients());
    })();
  }, []);

  React.useEffect(() => {
    if (clients && clients.data) {
      dispatchAction(
        ActionSetClientId(clients && clients.data && clients.data[0].id)
      );

      setSelectedClient(clients.data[0]);
      dispatchAction(
        ActionFetchDevices({
          clientId: clientId
            ? clientId
            : clients && clients.data && clients.data[0].id,
          siteId: siteId ? siteId : false,
          groupId: groupId ? groupId : false,
        })
      );
    }
  }, [clients]);

  //once clients loaded fetch sites & devices

  React.useEffect(() => {
    if (clients && clients.data && clients.data.length > 0) {
      //set client id if available on state
      if (clientId) {
        setSelectedClient(
          clients.data.filter((client) => client.id === clientId)[0]
        );
      } else {
        //set client id for global state
        dispatchAction(
          ActionSetClientId(clients && clients.data && clients.data[0].id)
        );
        //if not set the first client on the selection
        setSelectedClient(clients.data[0]);
      }

      setPayload((prevState) => ({
        ...prevState,
        clientId: clients && clients.data && clients.data[0].id,
      }));

      //fetch sites
      dispatchAction(
        ActionFetchSites({
          clientId: clients.data[0].id,
        })
      );

      //fetch  alerts
      dispatchAction(
        ActionFetchClient({
          clientId: clients.data[0].id,
        })
      );
    }
  }, [clients]);

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

    if (vendor && serial) {
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
    } else {
      setPayload((prevState) => ({
        ...prevState,
        siteId: false,
        groupId: false,
      }));
    }
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
    if (payload) {
      dispatchAction(ActionUpdatePayload(payload));
      dispatchAction(ActionFetchDevices(payload));
    }
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
          backgroundColor: "#F2F5F9",
        }}
      >
        <View style={ContentStyle.card}>
          <View>
            <SelectBox
              defaultValue={defaultClient}
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
              placeholder="All sites"
              onSelect={(site) => {
                handleSiteSelect(site);
              }}
              buttonTextAfterSelection={({ name, vendor, serial }) => {
                return (
                  <>
                    <Text>{name}</Text>
                  </>
                );
              }}
              rowTextForSelection={({ name, vendor, serial }) => {
                return (
                  <>
                    <Text style={{ fontSize: 16, width: "100%" }}>{name}</Text>
                  </>
                );
              }}
              data={
                sites.data && sites.data
                  ? [
                      {
                        name: "All sites",
                        vendor: "",
                        serial: "",
                      },
                      ...sites.data,
                    ]
                  : []
              }
            />
          </View>

          <View>
            <SelectBox
              disabled={
                groups.data && groups.data ? groups.data.length === 0 : true
              }
              placeholder="All groups"
              onSelect={(group) => handleGroupSelect(group)}
              buttonTextAfterSelection={({ name }) => {
                return (
                  <>
                    <Text>{name === "_default_" ? "All groups" : name}</Text>
                  </>
                );
              }}
              rowTextForSelection={({ name }) => {
                return name === "_default_" ? "All groups" : name;
              }}
              data={groups.data && groups.data ? groups.data : []}
            />
          </View>
        </View>
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
    width: "100%",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 0,
  },
});
