import { Form, Input, Button, Col, Row, message as AntMessage, Image, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Flex from "components/shared-components/Flex";
import { useSelector, useDispatch } from "react-redux";
import { changePassword, hideLoading, hideErrorError, showLoading} from "store/slices/accountSlice";

const ChangePasswordForm = ({ visible, onCancel, onSubmit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch()

  const onFinish = async () => {
    dispatch(showLoading());
    try {
      const values = await form.validateFields();
      const {password, newPassword} = values
      dispatch(hideLoading());
      await dispatch(changePassword({password, newPassword})).unwrap();
  
      await AntMessage.success(t("Password changed successfully!"), 0.5);
      form.resetFields();
      navigate(-1);
    } catch (err) {
      
      AntMessage.error(err.message);
    } finally {
      dispatch(hideLoading());
    }

  };

  const back = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2 className="mb-4">{t("Change Password")}</h2>
      <Divider />
      <Row>
       

          <Form
            form={form}
            name="manage account form"
            layout="vertical"
            onFinish={onFinish}
          >
            <Row>
              <Col xs={24} sm={24} md={24} lg={18}>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item
                      label={t("Current Password")}
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: t("Please enter your current password"),
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label={t("New Password")}
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: t("Please enter your new password"),
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label={t("Confirm Password")}
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          message: t("Please confirm your new password"),
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve(
                                t("Passwords do not match")
                              );
                            }
                            return Promise.reject();
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit">
                  {t("Save")}
                </Button>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6}>
                <div style={{ textAlign: "center" }}>
                  <Image
                    preview={false}
                    src="/img/others/img-changePwd.png"
                    alt="password image"
                    width={350}
                  />
                </div>
              </Col>
            </Row>
          </Form>
       
      </Row>
    </div>
  );
};

export default ChangePasswordForm;
