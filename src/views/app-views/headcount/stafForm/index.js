import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  message as AntMessage,
  Select,
  Space,
  Card,
  Popconfirm,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import utils from "utils";
import { t } from "i18next";

import Icon from "components/util-components/Icon";
import Flex from "components/shared-components/Flex";
import CustomBreadCrumb from "components/layout-components/CustomBreadCrumb";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import StafInfosForm from "./stafInfosForm";
import moment from "moment";
import {
  createStaff,
  updateStaff,
  hideError,
  showLoading,
  hideLoading,
  getOneStaff,
} from "store/slices/staffSlice";
import { useParams } from "react-router-dom";

const ADD = "ADD";
const EDIT = "EDIT";

const StafForm = (props) => {
  const { mode = ADD } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const [fullName, setFullName] = useState("");
  const [initVal, setInitialValues] = useState(null);

  useEffect(() => {
    if (refresh) {
      dispatch(getOneStaff(id));
      setRefresh(false);
    }
  }, [refresh, dispatch, id]);

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const back = () => {
    navigate(-1);
  };

  const { error, user, users, loading } = useSelector((state) => state.staffs);

  useEffect(() => {
    if (mode === EDIT) {
      dispatch(getOneStaff(id));
    }
  }, [dispatch, mode, id]);

  useEffect(() => {
    if (mode === EDIT && user) {
      form.setFieldsValue({ ...user });
    }
  }, [form, mode, user]);

  // useEffect(() => {
  //   dispatch(hideError());
  // }, []);

  const onFinish = async () => {
    dispatch(showLoading());

    try {
      const values = await form.validateFields();
      const modifiedValues = {
        ...values,
      };

      const { ...restvalues } = modifiedValues;
      if (mode === ADD) {
        await dispatch(createStaff(restvalues)).unwrap();
        AntMessage.success(t("Staff added successfully!"), 5);
        navigate(-1);
      }
      if (mode === EDIT) {
        await dispatch(
          updateStaff({ id: user._id, data: restvalues })
        ).unwrap();
        AntMessage.success(t("Staff updated!"), 5);
        navigate(-1);
      }
    } catch (error) {
      AntMessage.error(error, 5);
    } finally {
      dispatch(hideLoading());
    }
  };
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="Staff-form"
        className="ant-advanced-search-form"
        initialValues={initVal}
      >
        <PageHeaderAlt className="border-bottom mb-4">
          <div className="container">
            <Flex mobileFlex={false}>
              <div>
                <h2 className="mb-3" style={{ display: "inline-block" }}>
                  {mode === "ADD" ? t("New staf") : t("Edit staff")}
                </h2>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <StafInfosForm mode={mode} />
        </div>
      </Form>
      <Flex justifyContent="center">
        <Space size="middle" className="mb-3">
          <Button
            type="primary"
            onClick={() => onFinish()}
            htmlType="submit"
            loading={submitLoading}
          >
            {mode === "ADD" ? t("Submit") : t("Validate")}
          </Button>
          <Button className="mr-2" onClick={back}>
            {t("Cancel")}
          </Button>
        </Space>
      </Flex>
    </>
  );
};

export default StafForm;
