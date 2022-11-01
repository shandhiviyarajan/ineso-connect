import AsyncStorage from "@react-native-async-storage/async-storage"

let primaryColor = "#B54E29";
AsyncStorage.getItem("@app-config")
    .then(response => {
        primaryColor = JSON.parse(response).color;
    });

export let SystemColors = {
    "primary": primaryColor,
    "success": "#27E77C",
    "danger": "#CC3D35",
    "primary_light": "#FFF5F2",
    "warning": "#fb8c00",
};