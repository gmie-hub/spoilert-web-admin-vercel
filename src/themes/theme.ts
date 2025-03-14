import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import { buttonRecipe } from "./buttonRecipe";
import { cardRecipes } from "./cardRecipes";
import { colors } from "./colors";
import { textRecipes } from "./textRecipes";

const config = defineConfig({
  theme: {
    recipes: {
      card: cardRecipes,
      text: textRecipes,
      button: buttonRecipe,
    },
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
      color: "#212529",
    },
  },
});

export const system = createSystem(defaultConfig, config);
