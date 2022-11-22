import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./core/store";
import { RootNavigator } from "./core/routers/RootNavigation";
import { Provider as PaperProvider } from "react-native-paper";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "./core/interceptors/interceptors";

const App = () => {
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current
  );

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <RootNavigator />
          </PaperProvider>
        </PersistGate>
      </>
    </Provider>
  );
};

export default App;
