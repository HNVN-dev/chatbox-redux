import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { StoreBuilder } from "../../Core/store/store.ts";
import { UuidProvider } from "../../Secondary-Adapters/IdProvider/UuidProvider.ts";
import { WebSocketProvider } from "../../Secondary-Adapters/SocketProvider/WebSocketProvider.ts";
import { Provider } from "react-redux";

const idProvider = new UuidProvider();
const socketProvider = new WebSocketProvider();
const store = StoreBuilder.init()
  .withDependencies({
    idProvider,
    socketProvider,
  })
  .build();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
