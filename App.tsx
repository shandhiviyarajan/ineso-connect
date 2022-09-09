import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./core/store";
import { RootNavigator } from "./core/routers/RootNavigation";
import { Provider as PaperProvider } from "react-native-paper";

const App = () => {
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
