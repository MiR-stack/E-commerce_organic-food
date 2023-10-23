"use client";

import { Provider } from "react-redux";
import { store } from ".";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

function Providers({ children }) {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}

export default Providers;
