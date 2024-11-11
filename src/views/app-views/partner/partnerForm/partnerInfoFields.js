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
  DatePicker,
  Divider,
} from "antd"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { t } from "i18next"
import { UploadOutlined } from "@ant-design/icons"

import { rules } from "./partnerFieldsRules"

import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const { TextArea } = Input
const { Dragger } = Upload

const imageUploadProps = {
  name: "file",
  multiple: false,
  listType: "picture",
  showUploadList: true,
}

const PartnerInfoFields = (props) => {
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
  const { partner } = useSelector((state) => state.partner)
  useEffect(() => {
    if (mode === EDIT && partner) {
      setEditorContent(partner.description || "") // Assurez-vous que actualite.description est défini
    }
  }, [mode, partner])
  return (
    <div>
      <Row gutter={16} align="middle">
        <Col xs={24} sm={24} md={24}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="companyName"
                label={t("company name")}
                rules={rules.articleName}
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
          <Form.Item
            name="phoneNumber"
            label={t("phone number")}
            rules={rules.phoneNumber}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label={t("email")} rules={rules.email}>
            <Input />
          </Form.Item>
          <Form.Item name="RC" label="RC" rules={rules.RC}>
            <Input />
          </Form.Item>
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

export default PartnerInfoFields
