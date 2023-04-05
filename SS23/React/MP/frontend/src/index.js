import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import "bootstrap/dist/css/bootstrap.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import SpinnerLogo from "./components/SpinnerLogo";
import ReactGA from "react-ga4";
import { HelmetProvider } from "react-helmet-async";

// ReactGA.initialize("G-PLXL78DWRK");
// ReactGA.send({hitType: "pageview", page: "/"})
// ReactGA.send(document.location.pathname);

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    // StrictMode führt Teile des Codes doppelt aus, um eventuelle Fehler aufzudecken
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<SpinnerLogo />} persistor={persistor}>
          <HelmetProvider>

            <App />
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// function sentToAnalytics({ id, name, value }) {
//   ga("send", "event", {
//     eventCategory: "Web Vitals",
//     eventAction: name,
//     eventValue: Math.round(name === "CLS" ? value * 1000 : value),
//     eventLabel: id,
//     nonInteraction: true,
//   });
// }

// reportWebVitals(sentToAnalytics);
