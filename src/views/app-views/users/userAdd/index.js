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
  Alert,
  ConfigProvider,
} from "antd";
import {
  UserAddOutlined,
  WomanOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import Icon from "components/util-components/Icon";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { getIcon } from "../usersList";
import CustomBreadCrumb from "components/layout-components/CustomBreadCrumb";
import navigationConfig from "configs/NavigationConfig";
import { addUser } from "store/slices/usersSlice";
import { hideLoading, showLoading, hideError } from "store/slices/usersSlice";
import { getUser } from "store/slices/authSlice";
import { fetchRoles } from "store/slices/roleSlice";
const { Option } = Select;
const { Meta } = Card;

const privilegeList = navigationConfig.map((item) => ({
  id: item.key,
  hasAccess: false,
}));

const rules = {
  userName: [
    {
      required: true,
      message: t("Please enter username"),
    },
  ],

  email: [
    {
      required: true,
      message: t("Please enter email"),
    },
    {
      type: "email",
      message: t("Email is not valid"),
    },
  ],
  password: [
    {
      required: true,
      message: t("Please enter password"),
    },
  ],
  confirm: [
    {
      required: true,
      message: t("Please confirm password"),
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(t("Passwords must match"));
      },
    }),
  ],
};

const options = [
  { label: t("ADMIN"), value: "ADMIN" },
  { label: t("MANAGER"), value: "MANAGER" },
];

const UserAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isadmin, setIsadmin] = useState(false);

  const [privileges, setprivileges] = useState(privilegeList);

  const { error, loading } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state.roles);
  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchRoles());
  }, [dispatch]);
  const AddForm = ({ handleChange }) => {
    return (
      <Card className="mt-3">
        <Meta title={t("Account creation")} />
        <Divider className="mb-4" />
        <Form.Item name="name" label={t("Username")} rules={rules.userName}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label={t("Email")}
          rules={rules.email}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label={t("Role")}
          rules={rules.password}
          hasFeedback
        >
          <Select onChange={handleChange}>
            {roles.map((option) => (
              <Option key={option.roleName} value={option.roleName}>
                {option.roleName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          label={t("Password")}
          rules={rules.password}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={t("Confirm password")}
          rules={rules.confirm}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
      </Card>
    );
  };

  const handleChange = (value) => {
    const selectedRole = value;
    setIsadmin(selectedRole === "ADMIN");
    if (selectedRole === "ADMIN") {
      const updatedConfig = privileges.map((elm) => {
        return { ...elm, hasAccess: true };
      });

      setprivileges(updatedConfig);
    }
  };

  useEffect(() => {
    dispatch(hideError());
  }, []);
  const onAddUser = async () => {
    dispatch(showLoading());

    try {
      const values = await form.validateFields();
      const { confirm, ...formData } = values;
      const modifiedValues = { ...formData, club: user._id };
      handleChange();
      // to check if at least one privilge has been attributed to a manager
      // const hasSelectedPrivilege = privileges.some((item) => item.hasAccess);
      // if (!hasSelectedPrivilege) {
      //   throw new Error(t("Please select at least one privilege"));
      // }
      await dispatch(addUser(modifiedValues)).unwrap();

      AntMessage.success(t("User successfully added!"));
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
        onFinish={onAddUser}
        name="user-form"
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
                  {t("New user")}
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
          <AddForm handleChange={handleChange} />
          {/* <Card>
            <Meta
              title={t("user_privileges.title")}
              description={t("user_privileges.description")}
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
                          checked={isadmin ? true : item.hasAccess}
                          disabled={isadmin}
                        />
                      </Flex>
                    </List.Item>
                  )}
                />
              </div>
            </Flex>
          </Card> */}
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <Button htmlType="submit" loading={loading} type="primary">
              {" "}
              {t("send")}{" "}
            </Button>
            <Button onClick={() => navigate(-1)}>{t("back")}</Button>
          </div>
          {/* {error && (
        <Alert
          message="Error"
          description={error.message}
          type="error"
          showIcon
          closable
          banner 
        />
      )} */}
        </div>
      </Form>
    </ConfigProvider>
  );
};

export default UserAdd;
