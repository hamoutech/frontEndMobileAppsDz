import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button, message, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { generatePassword } from "configs/passwordConfig";
import { axiosPrivate } from "api/axios";

const backgroundStyle = {
  backgroundImage: "url(/img/others/img-17.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const { Title, Paragraph, Text } = Typography;

const rules = {
  newPassword: [
    {
      required: true,
      message: t("register.passwordError1"),
    },
  ],
  newConfirm: [
    {
      required: true,
      message: t("register.passwordError2"),
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(t("register.passwordError3"));
      },
    }),
  ],
};
const ChangePasswordForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const theme = useSelector((state) => state.theme.currentTheme);

  const configureAutoPassword = () => {
    const password = generatePassword();
    form.setFieldValue("password", password);
    form.setFieldValue("confirm", password);
  };

  const { token } = useParams();
  const onSend = async (values) => {
    setLoading(true);
    try {
      await axiosPrivate({
        method: "post",
        url: "/auth/forgotPassword/changePasswords",
        data: JSON.stringify(values),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        setLoading(false);
        message.success(t("forgotPassword.Success"));
      }, 1500);
      setSuccess(true);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        message.error(error);
      }, 1500);
    }
  };
  return (
    <div className="h-100">
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={9}>
            <Card>
              <div className="my-2">
                <div className="text-center">
                  {/* <img
                    className="img-fluid"
                    src={`/img/${
                      theme === "light"
                        ? "kodomo-logo-text.png"
                        : "kodomo-logo-text-white.png"
                    }`}
                    alt=""
                  /> */}

                  {!success && (
                  <Text className="mb-4">{t("Change password")}</Text>
                  )}
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={18} lg={16}>
                    {!success ? (
                      <Form
                        form={form}
                        layout="vertical"
                        name="forget-password"
                        onFinish={onSend}
                      >
                        <Form.Item
                          name="password"
                          label={t("register.passwordPlaceholder")}
                          rules={rules.newPassword}
                          hasFeedback
                        >
                          <Input.Password
                            prefix={<LockOutlined className="text-primary" />}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="dashed"
                            htmlType="button"
                            block
                            style={{
                              whiteSpace: "normal",
                              height: "auto",
                              marginBottom: "10px",
                            }}
                            onClick={configureAutoPassword}
                          >
                            {t("register.genPassword")}
                          </Button>
                        </Form.Item>
                        <Form.Item
                          name="confirm"
                          label={t("register.confirmPasswordPlaeholder")}
                          rules={rules.newConfirm}
                          hasFeedback
                        >
                          <Input.Password
                            prefix={<LockOutlined className="text-primary" />}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                          >
                            {t("forgotPassword.ButtonSend.passwordChange")}
                          </Button>{" "}
                        </Form.Item>
                      </Form>
                    ) : (
                      <Paragraph>
                        {t(
                          "Password changed successfully, make sure to not to lose it!"
                        )}
                        <Link to="/">
                          {t("Click here to be redirected to login page.")}
                        </Link>
                      </Paragraph>
                    )}
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
