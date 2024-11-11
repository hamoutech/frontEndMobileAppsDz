import React, { Component, useEffect, useState } from "react"
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
  Space,
} from "antd"
import PageHeaderAlt from "components/layout-components/PageHeaderAlt"
import { UserOutlined } from "@ant-design/icons"
import { ROW_GUTTER } from "constants/ThemeConstant"
import Flex from "components/shared-components/Flex"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import {
  modifyAccount,
  hideLoading,
  hideError,
  showLoading,
} from "store/slices/accountSlice"
import { getUser } from "store/slices/authSlice"
import ClubInfo from "./ClubInfo"
import { IMAGE_URL } from "constants/imageUrl"

export const Club = () => {
  const back = () => {
    navigate(-1)
  }
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, showMessage, user } = useSelector((state) => state.auth)
  const validatePhoneNumber = (rule, value, callback) => {
    // Utilisez une expression régulière pour valider le numéro de téléphone
    const phoneNumberPattern = /^\+213\d{9}$/

    if (!phoneNumberPattern.test(value)) {
      callback(
        "Le numéro de téléphone doit être au format +213 suivi de 9 chiffres."
      )
    } else {
      callback()
    }
  }

  useEffect(() => {
    if (user) {
      const modif = { ...user }
      form.setFieldsValue(modif)
      const fileList = []
      console.log(user)
      if (user.image && user.image[0]) {
        fileList.push({
          uid: "-1",
          name: user.image[0].originalname,
          status: "done",
          url: `${IMAGE_URL}${user.image[0].filename}`,
        })

        form.setFieldsValue({
          image: fileList,
        })
      }
    }
  }, [user])
  useEffect(() => {
    dispatch(getUser())
    dispatch(hideError())
  }, [])

  const onFinish = async () => {
    dispatch(showLoading())
    try {
      const values = await form.validateFields()
      const formData = new FormData()

      // Append regular form data fields
      formData.append("name", values.name)
      formData.append("phoneNumberClub", values.phoneNumberClub)
      formData.append("address", values.address)

      formData.append("emailClub", values.emailClub)

      formData.append("nbrTitreGagner", values.nbrTitreGagner)

      formData.append("description", values.description)

      // Append image file if it exists
      if (values.image && values.image[0]) {
        formData.append("image", values.image[0].originFileObj)
      }

      // Send the formData through the modifyAccount function
      await dispatch(modifyAccount(formData)).unwrap()

      await AntMessage.success(t("Account updated!"), 0.5)
      navigate(-1)
    } catch (err) {
      AntMessage.error(err.message)
    } finally {
      dispatch(hideLoading())
    }
  }
  const [initVal, setinitVal] = useState(null)
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="stadium-form"
        className="ant-advanced-search-form"
        initialValues={initVal}
      >
        <PageHeaderAlt className="border-bottom mb-4">
          <div className="container">
            <Flex
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <div>
                <h2 className="mb-3" style={{ display: "inline-block" }}>
                  {t("Club info")}
                </h2>
              </div>
            </Flex>
            {/* <CustomBreadCrumb /> */}
          </div>
        </PageHeaderAlt>
        <div className="container">
          <ClubInfo
            user={user}
            // handleUploadChange={handleUploadChange}
          />
        </div>
        <Flex justifyContent="center">
          <Space size="middle" className="mb-3">
            <Button type="primary" htmlType="submit">
              {t("actualite.addNews.addButton")}
            </Button>
            <Button className="mr-2" onClick={back}>
              {t("actualite.addNews.cancelButton")}
            </Button>
          </Space>
        </Flex>
      </Form>
    </>
  )
}

export default Club
