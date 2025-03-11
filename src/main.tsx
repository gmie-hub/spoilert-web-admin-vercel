import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp } from 'antd';
// eslint-disable-next-line import/order
import { createRoot } from "react-dom/client";

import "./index.scss";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Theme } from "./themes/themes.tsx";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Theme>
          <AntdApp notification={{ placement: "top" }}>
            <App />
          </AntdApp>
        </Theme>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
