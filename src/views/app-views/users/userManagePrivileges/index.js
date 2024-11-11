import React, { useState } from "react";
import { List, Switch, Form, Button } from "antd";
import Icon from "components/util-components/Icon";
import Flex from "components/shared-components/Flex";
import { useTranslation } from "react-i18next";

const UserManagePrivileges = ({
  handleVisible,
  type,
  handleSwitch,
  config,
  isadmin,
}) => {
  const { t } = useTranslation();
  return (
    <Flex flexDirection="column">
      <div>
        <List
          itemLayout="horizontal"
          dataSource={config}
          renderItem={(item) => (
            <List.Item>
              <Flex
                justifyContent="between"
                alignItems="center"
                className="w-100"
              >
                <div className="d-flex align-items-center">
                  <Icon className="h1 mb-0 text-primary" type={item.icon} />
                  <div className="ml-3">
                    <h4 className="mb-0">{t(item.title)}</h4>
                  </div>
                </div>

                <Switch
                  onChange={(checked) => handleSwitch(checked, item)}
                  checked={isadmin ? true : item.allow}
                  disabled={isadmin}
                />
              </Flex>
            </List.Item>
          )}
        />
      </div>{" "}
      {type === "edit" && (
        <div className="mt-5">
          <Button type="primary" htmlType="submit" className="mr-2">
            {t("Submit")}
          </Button>

          <Button onClick={handleVisible}>{t("Cancel")}</Button>
        </div>
      )}
    </Flex>
  );
};

export default UserManagePrivileges;
