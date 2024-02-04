import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SocketProvider } from "./context/socketProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/Themes";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SocketProvider>
            <App />
          </SocketProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
