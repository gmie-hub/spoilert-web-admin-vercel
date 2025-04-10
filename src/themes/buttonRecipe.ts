import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  variants: {
    visual: {
      outline: {
        px: '2',
      }
    },
    variant: {
      dangerOutline: {
        color: "red",
        bg: "transparent",
        fontSize: "md",
        fontWeight: "semibold",
        borderRadius: "lg",
        border: "1px solid #E0E0E0",
        paddingInline: "5",
        py: "6",
      },
      danger: {
        color: "white",
        bg: "red",
        fontSize: "md",
        fontWeight: "semibold",
        borderRadius: "lg",
        py: "6",
      },
      yellow: {
        color: "white",
        fontSize: "md",
        fontWeight: "semibold",
        bg: "yellow",
        borderRadius: "lg",
        py: "6",
      },
      yellowOutline: {
        color: "yellow",
        border: "1px solid #E0E0E0",
        fontSize: "md",
        fontWeight: "semibold",
        bg: "transparent",
        borderRadius: "xl",
        py: "3",
      },
    },
  },
});
