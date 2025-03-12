import { createSystem, defineConfig } from "@chakra-ui/react";

import { colors } from "./colors";

const config = defineConfig({
  theme: {
    tokens: {
      colors: colors,
      // fontSizes: fontSizes
    },
  },
  globalCss: {
    "html body": {
      margin: 0,
      padding: 0,
      backgroundColor: "#FCFCFC",
    },
  },
});

export const system = createSystem(config);
