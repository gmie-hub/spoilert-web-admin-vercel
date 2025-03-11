import { type FC, type PropsWithChildren } from "react";

import { ConfigProvider } from "antd";

export const Theme: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedColor: "var(--color-primary-white)", 

          },
          Switch: {
            colorPrimary: "var(--color-green-text)",
            colorPrimaryHover: "var(--color-main-primary)",
          },
          Spin: {
            colorPrimary: "var(--color-green-text)",
          },
          Tabs: {
            itemColor: "var(--color-body-text)",
            itemActiveColor: "#28a745",
            itemSelectedColor: "#28a745",
            inkBarColor: "#28a745",
            itemHoverColor: "#28a745",
            titleFontSize: 16,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
