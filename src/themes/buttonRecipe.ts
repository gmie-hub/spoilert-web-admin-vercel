import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  variants: {
    visual: {
      outline: {
        px: "2",
        borderRadius: "lg",
      },
    },
    variant: {
      dangerOutline: {
        color: "red",
        bg: "transparent",
        fontSize: "sm",
        fontWeight: "semibold",
        borderRadius: "lg",
        border: "1px solid #E0E0E0",
        paddingInline: "5",
      },
      danger: {
        color: "white",
        bg: "red",
        fontSize: "sm",
        fontWeight: "semibold",
        borderRadius: "lg",
      },
      yellow: {
        color: "white",
        fontSize: "sm",
        fontWeight: "semibold",
        bg: "#D4A437",
        borderRadius: "lg",
      },
      yellowOutline: {
        color: "#D4A437",
        border: "1px solid #E0E0E0",
        fontSize: "sm",
        fontWeight: "semibold",
        bg: "transparent",
        borderRadius: "xl",
      },
    },
  },
});
