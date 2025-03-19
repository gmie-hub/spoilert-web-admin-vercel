import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  variants: {
    visual: {
      outline: {
        px: '2',
      }
    },
    yellowOutline: {
      true: {
        color: "#D4A437",
        border: "1px solid #E0E0E0",
        fontSize: "sm",
        fontWeight: "semibold",
        bg: "transparent",
        borderRadius: "xl",
      },
    },
    yellow: {
      true: {
        color: "white",
        fontSize: "sm",
        fontWeight: "semibold",
        bg: "#D4A437",
        borderRadius: "lg",
      },
    },
    danger: {
      true: {
        color: "white",
        bg: "red",
        fontSize: "sm",
        fontWeight: "semibold",
        borderRadius: "lg",
      },
    },
    dangerOutline: {
      true: {
        color: "red",
        bg: "transparent",
        fontSize: "sm",
        fontWeight: "semibold",
        borderRadius: "lg",
        border: "1px solid #E0E0E0",
        paddingInline: "5"
      },
    },
  },
});
