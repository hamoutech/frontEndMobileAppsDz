import React, { Component, useEffect, useState } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Col,
  message as AntMessage,
  Upload,
  Image,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  modifyAccount,
  hideLoading,
  hideError,
  showLoading,
} from "store/slices/accountSlice";
import { getUser } from "store/slices/authSlice";

export const ManageAccount = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, showMessage, user } = useSelector((state) => state.auth);
  const validatePhoneNumber = (rule, value, callback) => {
    // Utilisez une expression régulière pour valider le numéro de téléphone
    const phoneNumberPattern = /^\+213\d{9}$/;

    if (!phoneNumberPattern.test(value)) {
      callback(
        "Le numéro de téléphone doit être au format +213 suivi de 9 chiffres."
      );
    } else {
      callback();
    }
  };

  useEffect(() => {
    form.setFieldsValue({ ...user });
  }, [user]);
  useEffect(() => {
    dispatch(getUser());
    dispatch(hideError());
  }, []);

  const onFinish = async () => {
    dispatch(showLoading());
    try {
      const values = await form.validateFields();
      dispatch(hideLoading());
      await dispatch(modifyAccount(values)).unwrap();

      await AntMessage.success(t("Account updated!"), 0.5);
      navigate(-1);
    } catch (err) {
      AntMessage.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <>
      <h2 className="mb-4">{t("Manage account")}</h2>
      <Divider />
      <div className="mt-4">
        <Form
          form={form}
          name="manage account form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    label={t("Username")}
                    name="headName"
                    // initialValue={user.headName}
                    rules={[
                      {
                        required: true,
                        message: t("Username required"),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    name="name"
                    label={t("register.usernamePalceholder")}
                    rules={[
                      {
                        required: true,
                        message: t("register.userNameError"),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    name="phoneNumber"
                    label={t("register.phoneNumberPalceholder")}
                    rules={[
                      {
                        required: true,
                        message: t("register.phoneNumberError"),
                      },

                      { validator: validatePhoneNumber },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    label={t("Email")}
                    name="email"
                    // initialValue={user.email}
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: t("Valid email required"),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button loading={loading} type="primary" htmlType="submit">
                {t("Save")}
              </Button>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
              <div style={{ textAlign: "center" }}>
                <Image
                  preview={false}
                  src="/img/others/img-account.png"
                  alt="password image"
                  width={350}
                />
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ManageAccount;
