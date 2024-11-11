import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  UserAddOutlined,
  MessageOutlined,
  UploadOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Alert,
  AutoComplete,
  DatePicker,
  Upload,
  message,
} from "antd";
import {
  signUp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
} from "store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { generatePassword } from "../../../configs/passwordConfig";

export const RegisterForm = (props) => {
  const {
    signUp,
    showLoading,
    token,
    loading,
    redirect,
    message,
    showMessage,
    hideAuthMessage,
    allowRedirect = true,
  } = props;
  const [form] = Form.useForm();

  const { TextArea } = Input;

  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const rules = {
    image: [
      {
        required: true,
        message: t("register.userImageError"),
      },

      {
        type: "file",
        message: "",
      },
    ],
    name: [
      {
        required: true,
        message: t("register.userNameError"),
      },
      {
        type: "text",
        message: "",
      },
    ],
    headName: [
      {
        required: true,
        message: t("register.directornameError"),
      },
      {
        type: "text",
        message: "",
      },
    ],

    phoneNumber: [
      {
        required: true,
        message: t("register.phoneNumberError"),
      },
      {
        type: "text",
        message: "",
      },
      { validator: validatePhoneNumber },
    ],
    address: [
      {
        required: true,
        message: t("register.addressError"),
      },
      {
        type: "text",
      },
    ],

    email: [
      {
        required: true,
        message: t("register.emailError1"),
      },
      {
        type: "email",
        message: t("register.emailError2"),
      },
    ],
    createdDate: [
      {
        required: true,
        message: t("register.dateError"),
      },
    ],
    description: [
      {
        required: true,
        message: t("register.descriptionError"),
      },
      {
        type: "text",
        message: "",
      },
      {
        min: 10,
        message: "Le texte doit contenir au moins 10 caractères.",
      },
    ],
    password: [
      {
        required: true,
        message: t("register.passwordError1"),
      },
    ],
    confirm: [
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

  const [file, setFile] = useState(null);
  const handleFileUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setFile(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // useEffect(() => {
  //   if ( allowRedirect) {
  //     navigate(redirect);

  //   }
  //   if (showMessage) {
  //     const timer = setTimeout(() => hideAuthMessage(), 4000);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // });

  const onSignUp = () => {
    form
      .validateFields()
      .then((values) => {
        showLoading();
        const formData = new FormData();

        // Log the values object

        // Append the values to the formData
        formData.append("name", values.name);
        formData.append("headName", values.headName);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("email", values.email);
        formData.append("description", values.description);

        formData.append("createdDate", values.createdDate.format("YYYY-MM-DD"));
        formData.append("password", values.password);
        formData.append("address", values.address);

        // Append the actual file object for the photo if it's not empty
        if (values.image && values.image[0]) {
          formData.append("image", values.image[0].originFileObj);
        }
        let arr = [];
        // Now you can check if formData is indeed a FormData object
        for (let obj of formData) {
        }

        // Perform your signup logicsignUp(formData)
        signUp(formData)
          .then((response) => {
            // Handle the success case, e.g., navigate to a different page.

            navigate(redirect);
            // navigate('/app/auth');
            // message.success(t("Staff added successfully!"), 5);
          })
          .catch((error) => {
            // Handle the API error, show a message to the user, or stop loading if needed.
            console.error("Error during signup:", error);
          });
      })
      .catch((info) => {});
  };

  const configureAutoPassword = () => {
    const password = generatePassword();
    form.setFieldValue("password", password);
    form.setFieldValue("confirm", password);
  };

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const propss = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        {typeof message === "string" && message && (
          <Alert type="error" showIcon message={message}></Alert>
        )}
      </motion.div>
      <Form
        form={form}
        layout="vertical"
        name="register-form"
        onFinish={onSignUp}
      >
        <Form.Item
          name="image"
          label={t("register.logoPalceholder")}
          rules={rules.image}
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          {/* <Upload
            name="photo"
            // action="/upload" // Replace with your backend API endpoint
            listType="picture"
            showUploadList={true}
            onChange={handleFileUpload}
            
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <Button icon={<UploadOutlined />}>Ajouter votre logo</Button>
            )}
          </Upload> */}
          <Upload
            name="image"
            accept="image/*"
            maxCount={1}
            listType="picture"
            {...propss}
          >
            <Button icon={<UploadOutlined />}>Ajouter votre logo</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="name"
          label={t("register.usernamePalceholder")}
          rules={rules.name}
          hasFeedback
        >
          <Input prefix={<UserOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="headName"
          label={t("register.directornamePalceholder")}
          rules={rules.headName}
          hasFeedback
        >
          <Input prefix={<UserAddOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label={t("register.phoneNumberPalceholder")}
          rules={rules.phoneNumber}
          hasFeedback
        >
          <Input prefix={<UserOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="email"
          label={t("register.emailPalceholder")}
          rules={rules.email}
          hasFeedback
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="address"
          label={t("register.addressPalceholder")}
          rules={rules.address}
          hasFeedback
        >
          <Input prefix={<HomeOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="description"
          label={t("register.descriptionPalceholder")}
          rules={rules.description}
          hasFeedback
        >
          <TextArea prefix={<MessageOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="createdDate"
          label={t("register.datePalceholder")}
          rules={rules.date}
          hasFeedback
        >
          <DatePicker className="text-primary" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="password"
          label={t("register.passwordPlaceholder")}
          rules={rules.password}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item>
          <Button
            type="dashed"
            htmlType="button"
            block
            onClick={configureAutoPassword}
          >
            {t("register.genPassword")}
          </Button>
        </Form.Item>
        <Form.Item
          name="confirm"
          label={t("register.confirmPasswordPlaeholder")}
          rules={rules.confirm}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {t("register.Register")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signUp,
  showAuthMessage,
  hideAuthMessage,
  showLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
