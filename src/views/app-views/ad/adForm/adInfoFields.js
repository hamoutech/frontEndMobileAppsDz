import React from "react"
import { useEffect, useState } from "react"
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  Button,
  Divider,
  Switch,
  Select,
} from "antd"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { t } from "i18next"
import { UploadOutlined } from "@ant-design/icons"

import { rules } from "./adFieldsRules"

import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const { Option } = Select

const { TextArea } = Input
const { Dragger } = Upload

const imageUploadProps = {
  name: "file",
  multiple: false,
  listType: "picture",
  showUploadList: true,
}

const AdInfoFields = (props) => {
  const dateFormat = "YYYY-MM-DD"
  const EDIT = "EDIT"
  const { mode } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [fileList, setFileList] = useState([])
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

  const [editorContent, setEditorContent] = useState("")
  const handleEditorChange = (event, editor) => {
    const data = editor.getData()
    // const plainText = data.replace(/<\/?p>/g, '').replace(/&nbsp;/g, ' '); // Supprimer les balises <p> et remplacer &nbsp; par un espace
    setEditorContent(data)
    if (props.onEditorChange) {
      props.onEditorChange(data)
    }
  }
  const { ad } = useSelector((state) => state.ad)
  useEffect(() => {
    if (mode === EDIT && ad) {
      setEditorContent(ad.description || "") // Assurez-vous que actualite.description est défini
    }
  }, [mode, ad])
  return (
    <div>
      <Row gutter={16} align="middle">
        <Col xs={24} sm={24} md={24}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item name="title" label={t("Title")} rules={rules.title}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label={t("display")}
            name="isShown"
            valuePropName="checked"
          >
            <Switch defaultChecked={ad?.isShown} />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="location"
                label={t("Location")}
                rules={rules.location}
              >
                <Select placeholder={t("Select a location")}>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="duration"
                label={t("Duration")}
                rules={rules.duration}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label={t("image")}
            name="image"
            rules={rules.image}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
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
          <Form.Item label={t("link")} name="video">
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            // rules={rules.description}
          >
            <CKEditor
              editor={ClassicEditor}
              data={editorContent}
              onChange={handleEditorChange}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    //use max-height(for scroll) or min-height(static)
                    "min-height",
                    "200px",
                    editor.editing.view.document.getRoot()
                  )
                })
              }}
              config={{
                language: "fr",
                direction: "ltr", // Assurez-vous que la direction est définie sur ltr (Left to Right)
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

export default AdInfoFields
