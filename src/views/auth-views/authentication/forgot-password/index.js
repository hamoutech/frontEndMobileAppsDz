import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { axiosPrivate } from "api/axios";

const backgroundStyle = {
  backgroundImage: "url(/img/others/img-17.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisbaled] = useState(false);
  const { t } = useTranslation();

  const theme = useSelector((state) => state.theme.currentTheme);

  const onSend = async (values) => {
    setLoading(true);
    try {
      await axiosPrivate({
        method: "post",
        url: "/auth/forgotPassword",
        data: JSON.stringify(values),
      });
      setTimeout(() => {
        setLoading(false);
        message.success(t("forgotPassword.Success"));
      }, 1500);
      setDisbaled(true);
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
                        ? "kodomo-logo.png"
                        : "kodomo-logo-white.png"
                    }`}
                    alt=""
                  /> */}
                  <h3 className="mt-3 font-weight-bold">
                    {t("forgotPassword.Title")}
                  </h3>
                  <p className="mb-4">{t("forgotPassword.message")}</p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={18} lg={16}>
                    <Form
                      form={form}
                      layout="vertical"
                      name="forget-password"
                      onFinish={onSend}
                    >
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: t("forgotPassword.errorMessage1"),
                          },
                          {
                            type: "email",
                            message: t("forgotPassword.errorMessage2"),
                          },
                        ]}
                      >
                        <Input
                          placeholder={t("forgotPassword.placeholder")}
                          prefix={<MailOutlined className="text-primary" />}
                        />
                      </Form.Item>
                      <Form.Item>
                        {/* <NavLink to="changePasswords"> */}
                        <Button
                          disabled={disabled}
                          loading={loading}
                          type="primary"
                          htmlType="submit"
                          block
                        >
                          {loading
                            ? t("forgotPassword.ButtonSending")
                            : t("forgotPassword.ButtonSend")}
                        </Button>
                        {/* </NavLink> */}
                      </Form.Item>
                    </Form>
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

export default ForgotPassword;
