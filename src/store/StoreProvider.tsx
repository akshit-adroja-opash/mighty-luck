"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import { ReactNode, useEffect } from "react";
import { login } from "./slices/authSlice";

function StateSync({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 1. Hydrate state on first load
    const token = localStorage.getItem("auth_token");
    const userStr = localStorage.getItem("auth_user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        store.dispatch(login({ user, token }));
      } catch (e) {
        console.error("Failed to parse user from localStorage");
      }
    }

    // 2. Subscribe to store changes to persist auth state
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (state.auth.isAuthenticated && state.auth.token && state.auth.user) {
        localStorage.setItem("auth_token", state.auth.token);
        localStorage.setItem("auth_user", JSON.stringify(state.auth.user));
      } else {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    });

    return unsubscribe;
  }, []);

  return <>{children}</>;
}

export default function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <StateSync>{children}</StateSync>
    </Provider>
  );
}
