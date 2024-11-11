import React, { useEffect, useState } from "react"
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  Button,
  DatePicker,
  Divider,
  Switch,
  Select,
} from "antd"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { UploadOutlined } from "@ant-design/icons"

import { rules } from "./newsFieldsRules"

import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const { TextArea } = Input

const imageUploadProps = {
  name: "file",
  multiple: false,
  listType: "picture",
  showUploadList: true,
}

const NewsInfoFields = (props) => {
  const dateFormat = "YYYY-MM-DD"
  const EDIT = "EDIT"
  const { mode } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [fileList, setFileList] = useState([
    [
      {
        uid: "-1",
        name: "default_image.jpg",
        status: "done",
        url: "https://via.placeholder.com/150",
      },
    ],
  ])
  const [uploading, setUploading] = useState(false)
  const [editorContent, setEditorContent] = useState("")
  const [editorContentArab, setEditorContentArab] = useState("")
  const [displayNotif, setDisplayNotif] = useState(true)
  const [selectedLanguages, setSelectedLanguages] = useState([])

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
  const handleEditorChange = (event, editor) => {
    const data = editor.getData()
    setEditorContent(data)
    if (props.onEditorChange) {
      props.onEditorChange(data)
    }
  }
  const handleEditorChangeArab = (event, editor) => {
    const dataArab = editor.getData()
    setEditorContentArab(dataArab)
    if (props.onEditorChangeArab) {
      props.onEditorChangeArab(dataArab)
    }
  }

  const handleDisplayNotifChange = (checked) => {
    setDisplayNotif(checked)
    if (props.onDisplayNotifChange) {
      props.onDisplayNotifChange(checked)
    }
  }

  const { actualite } = useSelector((state) => state.news)
  useEffect(() => {
    if (mode === EDIT && actualite) {
      setEditorContent(actualite.description || "")
      setDisplayNotif(actualite.displayNotif)
      setEditorContentArab(actualite.description_arab || "")
    }
  }, [mode, actualite])

  const handleLanguageChange = (value) => {
    setSelectedLanguages(value)
  }

  return (
    <div>
      <Row gutter={16} align="middle">
        <Col xs={24} sm={24} md={24}>
          <Card title={t("News informations")}>
            <Divider className="m-0 mb-4" />
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  name="articleTitle"
                  label={t(
                    "actualite.addAndModify.step1.PersonnalInfoCard.titleArtocle.label"
                  )}
                  rules={rules.articleName}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  label={t("Language")}
                  name="language"
                  rules={[
                    {
                      required: true,
                      message: t("Please select the language"),
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    onChange={handleLanguageChange}
                    options={[
                      { value: "fr", label: t("fr") },
                      { value: "arb", label: t("arb") },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              {selectedLanguages.includes("fr") && (
                <>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item
                      name="articleTitle"
                      label={t("French article title")}
                      rules={rules.articleName}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={rules.description}
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        data={editorContent}
                        onChange={handleEditorChange}
                        onReady={(editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "min-height",
                              "200px",
                              editor.editing.view.document.getRoot()
                            )
                          })
                        }}
                        config={{
                          language: "fr",
                          direction: "ltr",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}
              {selectedLanguages.includes("arb") && (
                <>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item
                      name="articleTitleArab"
                      label={t("Arab article title")}
                      rules={rules.articleName}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item
                      label={t("Arab description")}
                      name="description_arab"
                      rules={rules.description}
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        data={editorContentArab}
                        onChange={handleEditorChangeArab}
                        onReady={(editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "min-height",
                              "200px",
                              editor.editing.view.document.getRoot()
                            )
                          })
                        }}
                        config={{
                          language: "arb",
                          direction: "rtl",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}
            </Row>
            <Form.Item
              label={t("actualite.addAndModify.step1.ProfilePicCard.title")}
              name="image"
              rules={rules.image}
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload
                name="image"
                maxCount={1}
                listType="picture"
                {...propss}
                className="custom-upload"
              >
                <Button icon={<UploadOutlined />}>{t("Add an image")}</Button>
              </Upload>
            </Form.Item>
            <Form.Item label={t("link")} name="link">
              <Input />
            </Form.Item>
            {/* <Form.Item
              label={t("actualite.addAndModify.step1.videoCard.title")}
              name="video"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload
                name="video"
                accept="video/*"
                maxCount={1}
                listType="picture"
                {...propss}
              >
                <Button icon={<UploadOutlined />}>{t("Add a video")}</Button>
              </Upload>
            </Form.Item> */}
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="createdDate"
                label={t(
                  "actualite.addAndModify.step1.PersonnalInfoCard.creationDate.label"
                )}
                rules={rules.creationDate}
              >
                <DatePicker
                  format={dateFormat}
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Form.Item
              label={t("Display the notification")}
              name="displayNotif"
            >
              <Switch
                checked={displayNotif}
                onChange={(checked) => handleDisplayNotifChange(checked)}
              />
            </Form.Item>

            {displayNotif && (
              <>
                <Form.Item
                  label={t("Notification title")}
                  name="notifTitle"
                  rules={rules.notifTitle}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={t("Notification body")}
                  name="notifBody"
                  rules={rules.notifBody}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default NewsInfoFields
