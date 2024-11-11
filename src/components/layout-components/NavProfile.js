import React, { useState } from "react";
import { useEffect, useCallback } from "react";
import { Menu, Dropdown, Avatar, Skeleton, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { signOut } from "store/slices/authSlice";
import { getUser } from "store/slices/authSlice";
import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";
import { t } from "i18next";
import Icon from "components/util-components/Icon";

const MenuItemSignOut = (props) => (
  <span>
    <LogoutOutlined className="font-size-md" />
    <span className="font-weight-normal mx-2">{props.label}</span>
  </span>
);
const MenuItem = (props) => (
  <a href={props.path}>
    <Icon className="font-size-md" type={props.icon} />
    <span className="font-weight-normal mx-2">{props.label}</span>
  </a>
);

export const NavProfile = () => {
  const dispatch = useDispatch();
  const [theEmail, setTheEmail] = useState("");
  const [theName, setTheName] = useState("club");
  const [theRole, setTheRole] = useState("admin");
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const { user, loading, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (localStorage.getItem("adminemail")) {
        setTheEmail(localStorage.getItem("adminemail"));
        setTheName(localStorage.getItem("adminname"));
        setTheRole(localStorage.getItem("adminrole"));
      } else {
        setTheEmail(user.email);
        setTheName(user.headName);
        setTheRole("SUPERADMIN");
      }
    }
  }, [user]);
  const generateAvatar = (username) => {
    const avatar = createAvatar(bottts, {
      seed: username,
      radius: 50,
    }).toDataUriSync();
    return avatar;
  };

  const handleClick = ({ key }) => {
    if (key === "Sign Out") {
      handleSignOut();
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };
  // user?.roles === "ADMIN"
  const menu =
    theRole === "SUPERADMIN" ? (
      <Menu
        onClick={handleClick}
        items={[
          {
            key: "Account Settings",
            label: (
              <MenuItem
                path="/app/mon_compte"
                icon={SettingOutlined}
                label={t("topNav.navProfile.manageAccount")}
              />
            ),
          },
          // {
          //   key: "Users",
          //   label: (
          //     <MenuItem
          //       path="/app/users/liste"
          //       icon={UsergroupAddOutlined}
          //       label={t("topNav.navprofile.manageUsers")}
          //     />
          //   ),
          // },
          {
            key: "Sign Out",
            label: <MenuItemSignOut label={t("topNav.navProfile.signout")} />,
          },
        ]}
      />
    ) : (
      <Menu
        onClick={handleClick}
        items={[
          {
            key: "Account Settings",
            label: (
              <MenuItem
                path="/app/mon_compte"
                icon={SettingOutlined}
                label={t("topNav.navProfile.manageAccount")}
              />
            ),
          },
          {
            key: "Sign Out",
            label: <MenuItemSignOut label={t("topNav.navProfile.signout")} />,
          },
        ]}
      />
    );

  return (
    <Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
      <div className="nav-item">
        {loading && user ? (
          <Space>
            <Skeleton.Avatar active />
            <Skeleton.Button active size="small" />
          </Space>
        ) : (
          <div className="d-flex align-items-center">
            <Avatar
              src={user ? generateAvatar(user.name) : generateAvatar("")}
            />
            {/* {user.image.length > 0 && (
                <div>

                  <img src={`http://localhost:5000/${user.image[0].path}`}  />
                </div>
              )} */}
            <div className="pl-1 d-none d-sm-block profile-text">
              <div className="font-size-base font-weight-bold">{theName}</div>

              <span className="opacity-0-8">{theEmail}</span>
            </div>
          </div>
        )}
      </div>
    </Dropdown>
  );
};

export default NavProfile;
