import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeviceGoogleMaps from '../../components/screens/GoogleMap';
import { Devices } from '../../components/screens/Devices';

function DeviceTabNavigation() {

    const Tab = createBottomTabNavigator();

    return (
        <>
            <Tab.Navigator>
                <Tab.Screen name="Devices" component={Devices} />
                <Tab.Screen name="Map" component={DeviceGoogleMaps} />
            </Tab.Navigator>
        </>
    )
}

export default DeviceTabNavigation