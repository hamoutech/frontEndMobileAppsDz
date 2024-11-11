import React, { useState, useEffect } from "react"
import PageHeaderAlt from "components/layout-components/PageHeaderAlt"
import { Form, Button, message as AntMessage, Select, Space } from "antd"
import Flex from "components/shared-components/Flex"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { t } from "i18next"
import AdInfoFields from "./adInfoFields"

import { useParams } from "react-router-dom"
import { createAd, getOneAd, hideLoading, updateAd } from "store/slices/adSlice"
import { IMAGE_URL } from "constants/imageUrl"

const { Option } = Select

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener("load", () => callback(reader.result))
  reader.readAsDataURL(img)
}

const ADD = "ADD"
const EDIT = "EDIT"

const AdForm = (props) => {
  const { mode = ADD } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState("")
  const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const { id } = useParams()

  const back = () => {
    navigate(-1)
  }

  const handleUploadChange = (info) => {
    if (info.file.status === t("file.loading")) {
      setUploadLoading(true)
      return
    }
    if (info.file.status === t("file.finishedLoading")) {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl)
        setUploadLoading(true)
      })
    }
  }
  const [initVal, setInitialValues] = useState(null)
  const { error, ad, loading } = useSelector((state) => state.ad)

  useEffect(() => {
    if (mode === EDIT) {
      console.log(id)
      dispatch(getOneAd(id))
        .unwrap()
        .catch((error) => {
          console.error("Error fetching ad:", error) // Log the error
          AntMessage.error(t("Error fetching ad: ") + error.message)
        })
    }
  }, [dispatch, mode, id, t])

  useEffect(() => {
    if (mode === EDIT && ad) {
      const updatedAd = {
        ...ad,
      }
      form.setFieldsValue(updatedAd)
      if (ad.image) {
        const fileList = [
          {
            uid: "-1",
            name: ad.image[0].originalname,
            status: "done",
            url: `${IMAGE_URL + ad.image[0].filename}`,
          },
        ]
        form.setFieldsValue({
          image: fileList,
        })
      }
    }
  }, [form, mode, ad])
  // pour la description
  const [editorContent, setEditorContent] = useState("")
  const handleEditorChange = (editorContent) => {
    setEditorContent(editorContent)
  }

  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      const modifiedValues = {
        ...values,
        description: editorContent,
      }
      const formData = new FormData()

      formData.append("title", values.title)
      formData.append("isShown", values.isShown)
      formData.append("description", editorContent)
      formData.append("location", values.location)
      formData.append("duration", values.duration)

      if (values.image && values.image[0]) {
        formData.append("image", values.image[0].originFileObj)
      }
      if (values.video && values.video[0]) {
        formData.append("video", values.video[0].originFileObj)
      }

      if (mode === ADD) {
        await dispatch(createAd(formData)).unwrap()
        AntMessage.success(t("Ad added successfully!"), 1)
        navigate(-1)
      }
      if (mode === EDIT) {
        await dispatch(updateAd({ id: ad._id, data: formData })).unwrap()
        await AntMessage.success(t("Ad updated!"), 1)
        navigate(-1)
      }
    } catch (error) {
      AntMessage.error(error)
    } finally {
      dispatch(hideLoading())
    }
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="Nanny-form"
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
                  {mode === "ADD" ? t("Add an ad") : t("Edit ad")}
                </h2>
              </div>
            </Flex>
            {/* <CustomBreadCrumb /> */}
          </div>
        </PageHeaderAlt>
        <div className="container">
          <AdInfoFields mode={mode} onEditorChange={handleEditorChange} />
        </div>
        <Flex justifyContent="center">
          <Space size="middle" className="mb-3">
            <Button type="primary" htmlType="submit">
              {mode === "ADD" ? t("Add an ad") : t("Edit ad")}
            </Button>
            <Button className="mr-2" onClick={back}>
              {t("cancel")}
            </Button>
          </Space>
        </Flex>
      </Form>
    </>
  )
}

export default AdForm
