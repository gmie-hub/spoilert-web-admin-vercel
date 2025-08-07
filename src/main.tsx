import { StrictMode } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// eslint-disable-next-line import/order
import { createRoot } from "react-dom/client";

import "./index.scss";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
// import { Provider } from "./components/ui/provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { system } from "./themes/theme.ts";

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
    <ChakraProvider value={system}>
      {/* <Provider> */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
      {/* </Provider> */}
    </ChakraProvider>
  </StrictMode>
);
