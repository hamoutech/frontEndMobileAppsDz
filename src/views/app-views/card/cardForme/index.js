import React, { useState, useEffect } from "react"
import { Row, Col } from "antd"

import {
  Form,
  Button,
  message as AntMessage,
  Space,
  Upload,
  Input,
  InputNumber,
} from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  createCard,
  getCardById as getOneCard,
  updateCardById,
  hideLoading,
} from "store/slices/carteSlice"
import PageHeaderAlt from "components/layout-components/PageHeaderAlt"
import Flex from "components/shared-components/Flex"
import { UploadOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"

const { TextArea } = Input

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener("load", () => callback(reader.result))
  reader.readAsDataURL(img)
}

const ADD = "ADD"
const EDIT = "EDIT"

const CardForm = (props) => {
  const { mode = ADD } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState("")
  const [fileList, setFileList] = useState([])

  const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const { id } = useParams()
  const { error, card, loading } = useSelector((state) => state.card)

  const back = () => {
    navigate(-1)
  }

  const propss = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false
    },
    fileList,
  }

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true)
      return
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl)
        setUploadLoading(false)
      })
    }
  }

  useEffect(() => {
    if (mode === EDIT) {
      dispatch(getOneCard(id))
        .unwrap()
        .catch((error) => {
          AntMessage.error(t("Error fetching card"), { error: error.message })
        })
    }
  }, [dispatch, mode, id, t])

  useEffect(() => {
    if (mode === EDIT && card) {
      const fileList = []

      if (card.image && card.image.length > 0) {
        fileList.push({
          uid: "-1",
          name: card.image[0].originalname || "image.jpg",
          status: "done",
          url: `http://localhost:4001/uploads/images/${card.image[0].filename}`,
        })
      }

      form.setFieldsValue({
        titled: card.titled,
        description: card.description,
        numberOfMatches: card.numberOfMatches,
        totalPrice: card.totalPrice,
        duration: card.duration,
        image: fileList,
      })
    }
  }, [form, mode, card])

  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      const formData = new FormData()
      formData.append("titled", values.titled)
      formData.append("description", values.description)
      formData.append("numberOfMatches", values.numberOfMatches)
      formData.append("totalPrice", values.totalPrice)
      formData.append("duration", values.duration)

      if (values.image && values.image[0] && values.image[0].originFileObj) {
        const file = values.image[0].originFileObj
        formData.append("image", file)
      }

      if (mode === ADD) {
        await dispatch(createCard(formData)).unwrap()
        AntMessage.success(t("Card added successfully"), 1)
        navigate(-1)
      } else if (mode === EDIT) {
        await dispatch(
          updateCardById({ id: card._id, data: formData })
        ).unwrap()
        AntMessage.success(t("Card updated successfully"), 1)
        navigate(-1)
      }
    } catch (error) {
      AntMessage.error(error.message || t("Submission error"))
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
        name="card-form"
        className="ant-advanced-search-form"
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
                  {mode === "ADD" ? t("Add Card") : t("Edit Card")}
                </h2>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="titled"
                label={t("Title")}
                rules={[{ required: true, message: t("Title is required") }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label={t("Description")}
                rules={[
                  { required: true, message: t("Description is required") },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="numberOfMatches"
                label={t("Number of Matches")}
                rules={[
                  {
                    required: true,
                    message: t("Number of matches is required"),
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="totalPrice"
                label={t("Total Price")}
                rules={[
                  { required: true, message: t("Total price is required") },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={24}>
              <Form.Item
                name="duration"
                label={t("Duration")}
                rules={[{ required: true, message: t("Duration is required") }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={t("Image")}
                name="image"
                rules={[{ required: true, message: t("Image is required") }]}
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
              >
                <Upload
                  listType="picture"
                  maxCount={1}
                  accept="image/*"
                  className="custom-upload"
                >
                  <Button icon={<UploadOutlined />}>{t("Upload Image")}</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Flex justifyContent="center">
          <Space size="middle" className="mb-3">
            <Button type="primary" htmlType="submit" loading={submitLoading}>
              {mode === "ADD" ? t("Add Card") : t("Edit Card")}
            </Button>
            <Button onClick={back}>{t("Cancel")}</Button>
          </Space>
        </Flex>
      </Form>
    </>
  )
}

export default CardForm
