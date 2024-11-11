import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { onHeaderNavColorChange, onSwitchTheme } from "store/slices/themeSlice";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Space, Switch, Image } from "antd";

import { BulbOutlined, BulbFilled } from "@ant-design/icons";
const ThemeSwitch = () => {
  const dispatch = useDispatch();

  const { currentTheme } = useSelector((state) => state.theme);
  const { switcher, themes } = useThemeSwitcher();
  const toggleTheme = (isChecked) => {
    const changedTheme = isChecked ? "dark" : "light";
    dispatch(onSwitchTheme(changedTheme));
    switcher({ theme: themes[changedTheme] });
  };
  return (
    <Space direction="vertical">
      <Switch
        checkedChildren={
          <Image
            preview={false}
            src="/img/more icons/moon-symbol-20.png"
            alt="dark"
            width={20}
          />
        }
        unCheckedChildren={
          <Image
            preview={false}
            src="/img/more icons/sun-20.png"
            alt="light"
            width={20}
          />
        }
        checked={currentTheme === "dark"}
        onChange={toggleTheme}
      />
    </Space>
  );
};
export default ThemeSwitch;
