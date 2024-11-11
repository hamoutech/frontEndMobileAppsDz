import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { motion } from "framer-motion";
import {
  Card,
  Form,
  Button,
  message as AntMessage,
  Select,
  Input,
  Divider,
  Switch,
  List,
  ConfigProvider,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import Icon from "components/util-components/Icon";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import CustomBreadCrumb from "components/layout-components/CustomBreadCrumb";
import navigationConfig from "configs/NavigationConfig";
import { addRole } from "store/slices/roleSlice";
import { hideLoading, showLoading, hideError } from "store/slices/roleSlice";
import { getIcon } from "../usersList";
const { Meta } = Card;

const privilegeList = navigationConfig.map((item) => ({
  id: item.key,
  hasAccess: false,
}));

const rules = {
  nomRole: [
    {
      required: true,
      message: t("Please enter role name"),
    },
  ],
  description: [
    {
      required: true,
      message: t("Please enter description"),
    },
  ],
};

const RoleAddForm = ({ handleChange }) => {
  return (
    <Card className="mt-3">
      <Meta title={t("Role creation")} />
      <Divider className="mb-4" />
      <Form.Item name="roleName" label={t("Role name")} rules={rules.nomRole}>
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label={t("Description")}
        rules={rules.description}
        hasFeedback
      >
        <Input.TextArea />
      </Form.Item>
    </Card>
  );
};

const RoleAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [privileges, setPrivileges] = useState(privilegeList);
  const { error, loading } = useSelector((state) => state.roles);

  const handleSwitchChange = (checked, item) => {
    const updatedConfig = privileges.map((elm) => {
      if (elm.id === item.id) {
        return { ...elm, hasAccess: checked };
      }
      return elm;
    });

    setPrivileges(updatedConfig);
  };

  const handleChange = (value) => {
    setIsAdmin(value === "ADMIN");
    if (value === "ADMIN") {
      const updatedConfig = privileges.map((elm) => {
        return { ...elm, hasAccess: true };
      });
      setPrivileges(updatedConfig);
    }
  };

  useEffect(() => {
    dispatch(hideError());
  }, [dispatch]);

  const onAddRole = async () => {
    dispatch(showLoading());
    try {
      const values = await form.validateFields();
      const modifiedValues = { ...values, privileges };
      const hasSelectedPrivilege = privileges.some((item) => item.hasAccess);
      if (!hasSelectedPrivilege) {
        throw new Error(t("Please select at least one privilege"));
      }
      console.log(modifiedValues);
      await dispatch(addRole(modifiedValues)).unwrap();
      AntMessage.success(t("Role successfully added!"));
      navigate(-1);
    } catch (err) {
      AntMessage.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <ConfigProvider>
      <Form
        layout="vertical"
        form={form}
        onFinish={onAddRole}
        name="role-form"
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom">
          <div className="container" style={{ padding: "10px" }}>
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <div>
                <Icon className="font-size-lg" type={UserAddOutlined} />
                <h2 style={{ display: "inline-block", margin: "10px" }}>
                  {t("New role")}
                </h2>
                <CustomBreadCrumb />
              </div>
              <Button type="primary" onClick={() => navigate(-1)}>
                {t("back")}
              </Button>
            </Flex>
          </div>
        </PageHeaderAlt>

        <div className="container" style={{ padding: "10px" }}>
          <RoleAddForm handleChange={handleChange} />
          <Card>
            <Meta
              title={t("Role privileges")}
              description={t("Assign privileges to this role")}
            />
            <Divider className="mb-4" />
            <Flex flexDirection="column">
              <div>
                <List
                  itemLayout="horizontal"
                  dataSource={privileges}
                  renderItem={(item) => (
                    <List.Item>
                      <Flex
                        justifyContent="between"
                        alignItems="center"
                        className="w-100"
                      >
                        <div className="d-flex align-items-center">
                          {getIcon(item.id, "h1 mb-0 text-primary")}
                          <div className="ml-3">
                            <h4 className="mb-0">{t(item.id)}</h4>
                          </div>
                        </div>

                        <Switch
                          onChange={(checked) =>
                            handleSwitchChange(checked, item)
                          }
                          checked={isAdmin ? true : item.hasAccess}
                          disabled={isAdmin}
                        />
                      </Flex>
                    </List.Item>
                  )}
                />
              </div>
            </Flex>
          </Card>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <Button htmlType="submit" loading={loading} type="primary">
              {t("send")}
            </Button>
            <Button onClick={() => navigate(-1)}>{t("back")}</Button>
          </div>
        </div>
      </Form>
    </ConfigProvider>
  );
};

export default RoleAdd;
