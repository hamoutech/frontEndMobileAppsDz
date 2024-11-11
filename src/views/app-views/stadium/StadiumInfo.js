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
const { TextArea } = Input

const imageUploadProps = {
  name: "file",
  multiple: false,
  listType: "picture",
  showUploadList: true,
}

const StadiumInfo = (props) => {
  const { stadium } = useSelector((state) => state.stadium)

  const dateFormat = "YYYY-MM-DD"
  const { mode } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [fileList, setFileList] = useState([])
  const [defaultLogoFile, setDefaultLogoFile] = useState([])
  const [uploading, setUploading] = useState(false)

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
    <div>
      <Row gutter={16} align="middle">
        <Col xs={24} sm={24} md={24}>
          <Card>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="stadiumName"
                  label={t("Stadium name")}
                  rules={[
                    {
                      required: true,
                      message: t("Required stadiumName"),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="location" label={t("Location")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="stadiumCapacity"
                  label={t("Capacity")}
                  rules={[
                    {
                      required: "true",
                      message: "Required capacity",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="stadiumLawn" label={t("GPS location")}>
                  <Input />
                </Form.Item>
              </Col>

              {/* <Col xs={24} sm={24} md={12}>
                <Form.Item name="stadiumFieldSize" label={t("Field size")}>
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col> */}
              {/* 
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="architect" label={t("Architect")}>
                  <Input />
                </Form.Item>
              </Col> */}

              <Col xs={24} sm={24} md={12}>
                <Form.Item name="totalSurface" label={t("Total area")}>
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              {/* <Col xs={24} sm={24} md={12}>
                <Form.Item name="builder" label={t("Builder")}>
                  <Input />
                </Form.Item>
              </Col> */}
            </Row>

            {/* <Form.Item name="tenant" label={t("Tenant")}>
              <Input />
            </Form.Item> */}

            {/* <Form.Item label={t("Stadium image")} name="stadiumImage">
              <Dragger
                {...imageUploadProps}
                beforeUpload={(file) => {
                  console.log(file);
                  return false;
                }}
                // onChange={(e) => props.handleUploadChange(e)}
              >
                {props.uploadedImg ? (
                  <img
                    src={props.uploadedImg}
                    alt="avatar"
                    className="img-fluid"
                  />
                ) : (
                  <div>
                    {props.uploadLoading ? (
                      <div>
                        <LoadingOutlined className="font-size-xxl text-primary" />
                        <div className="mt-3">{t("file.uploading")} </div>
                      </div>
                    ) : (
                      <div>
                        <CustomIcon className="display-3" svg={ImageSvg} />
                        <p>
                          {t(
                            "actualite.addAndModify.step1.ProfilePicCard.message",
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Dragger>
            </Form.Item> */}

            <Form.Item
              initialValue={defaultLogoFile}
              label={t("Stadium image")}
              name="stadiumImage"
              // rules={rules.image}
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload
                listType="picture"
                name="image"
                accept="image/*"
                maxCount={1}
                // name="stadiumeImage"
                {...propss}
                className="custom-upload"
              >
                <Button icon={<UploadOutlined />}>{t("Add an image")}</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label={t("Description")}
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
    </div>
  )
}

export default StadiumInfo
