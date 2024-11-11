import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { GoogleSVG, FacebookSVG } from "assets/svg/icon";
import { NavLink, useNavigation } from "react-router-dom";
import CustomIcon from "components/util-components/CustomIcon";
import {
  signIn,
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
} from "store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { APP_PREFIX_PATH, AUTHENTICATED_ENTRY } from "configs/AppConfig";

export const LoginForm = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    otherSignIn,
    showForgetPassword,
    hideAuthMessage,
    onForgetPasswordClick,
    showLoading,
    signInWithGoogle,
    signInWithFacebook,
    extra,
    signIn,
    token,
    loading,
    redirect,
    showMessage,
    message,
    status,
    allowRedirect = true,
  } = props;

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertMessage, setAlertMessage] = useState("");

  const onLogin = (values) => {
    showLoading();
    signIn(values)
      .unwrap()
      .then((response) => {
        if (response.status === "PENDING" || response.status === "BANNED") {
          // message.info('Veuillez attendre la validation des administrateurs.');
          setAlertType("info");
          setAlertMessage(
            `Veuillez attendre la validation des administrateurs.`
          );
          setAlertVisible(true);
        } else {
          // navigate(`${AUTHENTICATED_ENTRY}`)
          console.warn("azoul dhina");
        }
      })
      .catch((error) => {
        // message.error(error.error || 'Une erreur est survenue lors de la connexion');

        setAlertType("error");
        setAlertMessage(error);
        setAlertVisible(true);
      });
  };
  const handleAlertClose = () => {
    setAlertVisible(false);
  };
  const onGoogleLogin = () => {
    showLoading();
    signInWithGoogle();
  };

  const onFacebookLogin = () => {
    showLoading();
    signInWithFacebook();
  };

  useEffect(() => {
    if (token !== null && allowRedirect) {
      navigate(redirect);
    }
    if (showMessage) {
      const timer = setTimeout(() => hideAuthMessage(), 4000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  const renderOtherSignIn = (
    <div>
      <Divider>
        <span className="text-muted font-size-base font-weight-normal">
          {t("login.connectWithMessage")}
        </span>
      </Divider>
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => onGoogleLogin()}
          className="mr-2"
          disabled={loading}
          icon={<CustomIcon svg={GoogleSVG} />}
        >
          Google
        </Button>
        <Button
          onClick={() => onFacebookLogin()}
          icon={<CustomIcon svg={FacebookSVG} />}
          disabled={loading}
        >
          Facebook
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        {/* <Alert type="error" showIcon message={message}></Alert> */}
        {alertVisible && (
          <Alert
            message={alertMessage}
            type={alertType}
            closable
            onClose={handleAlertClose}
          />
        )}
      </motion.div>

      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item
          name="email"
          label={t("login.emailPlaceholder")}
          rules={[
            {
              required: true,
              message: t("login.emailError1"),
            },
            {
              type: "email",
              message: t("login.emailError2"),
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div>
              <span>{t("login.passwordPlaceholder")}</span>
            </div>
          }
          rules={[
            {
              required: true,
              message: t("login.passwordError"),
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <p>
          <NavLink to="/auth/forgot-password">
            {t("login.forgotPasswordMessage")}
          </NavLink>
        </p>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="ant-btn"
            // onClick={()=>navigate("/app/dashboards/default")}
          >
            {/* `${APP_PREFIX_PATH}/dashboards/default` */}

            {t("login.SigninMessage")}
          </Button>
        </Form.Item>
        {/* {otherSignIn ? renderOtherSignIn : null}
        {extra} */}
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signIn,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
