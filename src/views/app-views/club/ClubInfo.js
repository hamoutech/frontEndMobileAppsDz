import React from "react"
import { useEffect, useState } from "react"
import { Input, Row, Col, Card, Form, Upload, InputNumber, Button } from "antd"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { t } from "i18next"
import { UploadOutlined } from "@ant-design/icons"
import { ImageSvg } from "assets/svg/icon"
import VideoImage from "assets/svg/video.png"
import CustomIcon from "components/util-components/CustomIcon"
import { IMAGE_URL } from "constants/imageUrl"

const { TextArea } = Input

const imageUploadProps = {
  name: "file",
  multiple: false,
  listType: "picture",
  showUploadList: true,
}

const StadiumInfo = ({ user }) => {
  const { t } = useTranslation()
  const [fileList, setFileList] = useState([])

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

  return (
    <Row gutter={16} align="middle">
      <Col xs={24} sm={24} md={24}>
        <Card>
          <Row gutter={16}>
            <Col xs={12} sm={12} md={12}>
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
                <Input disabled />
              </Form.Item>

              <Form.Item
                name="phoneNumberClub"
                label={t("register.phoneNumberPalceholder")}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <Form.Item name="address" label={t("Address")}>
                <Input />
              </Form.Item>
              <Form.Item label={t("Club email")} name="emailClub">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="nbrTitreGagner" label={t("Nombre titre gagner")}>
            <Input />
          </Form.Item>
          <Form.Item
            label={t("Club image")}
            name="image"
            // rules={rules.image}
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
          >
            <Upload
              accept="image/*"
              maxCount={1}
              listType="picture"
              {...propss}
              className="custom-upload"
            >
              <Button icon={<UploadOutlined />}>{t("Add an image")}</Button>
            </Upload>
          </Form.Item>
          {console.log(fileList)}
          {/* <img src="http://localhost:4000/uploads/images/Logo_de_la_JS_Kabylie1701694687128.png"></img> */}
          <Form.Item
            label={t("Historique")}
            name="description"
            rules={[
              {
                required: "true",
                message: t("Required description"),
              },
              {
                min: 80,
                message: t("Description must be at least 80 characters"),
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  )
}

export default StadiumInfo
