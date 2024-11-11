import React, { useState } from "react"
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  message,
  DatePicker,
  Select,
  Radio,
  InputNumber,
  Checkbox,
  Divider,
  Space,
  Button,
} from "antd"
import { useTranslation } from "react-i18next"
import { t } from "i18next"
import {
  MailOutlined,
  LockOutlined,
  FilePdfOutlined,
  LoadingOutlined,
  UploadOutlined,
  InboxOutlined,
} from "@ant-design/icons"
import { rules } from "./playerFieldsRules"
const { TextArea } = Input
const { Dragger } = Upload
const { Option } = Select

const PlayerInfosForm = (props) => {
  const dateFormat = "YYYY-MM-DD"
  const { t } = useTranslation()
  const { mode } = props

  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)
  const [category, setTheCategory] = useState([])
  const handleCategoryChange = (value) => {
    setTheCategory(value)
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

  return (
    <div>
      <Row gutter={16} align="middle">
        <Col span={24}>
          <Card title={t("Personal infomation")}>
            <Divider className="m-0 mb-4" />
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="fullName"
                  label={t("fullName")}
                  rules={rules.fullName}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="placeOfBirth"
                  label={t("birthPlace")}
                  rules={rules.birthPlace}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="nationality" label={t("nationality")}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="dateOfBirth"
                  label={t("BirthDate")}
                  rules={rules.birthdate}
                >
                  <DatePicker
                    format={dateFormat}
                    size="large"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  name="numberPhone"
                  label={t(
                    "staff.addAndModify.step1.PersonnalInfoCard.phoneNumber.label"
                  )}
                  rules={rules.phoneNumber}
                >
                  <Input maxLength={10} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  name="position"
                  label={t("playerslist.table.posteCell")}
                  rules={rules.position}
                >
                  <Select
                    allowClear
                    options={[
                      {
                        value: "goalkeeper",
                        label: "Gardien",
                      },
                      {
                        value: "defender",
                        label: "Défenseur",
                      },
                      {
                        value: "midfielder",
                        label: "Milieu",
                      },
                      {
                        value: "attacker",
                        label: "Attaquant",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="weight" label={t("weight")}>
                  <Input />
                </Form.Item>
                {/* <Form.Item
                  label={t("Category")}
                  name="category"
                >
                  <Select
                    allowClear
                    onChange={handleCategoryChange}
                    options={[
                      {
                        value: "Senior",
                        label: "Senior",
                      },
                      {
                        value: "Junior",
                        label: "Junior",
                      },
                      {
                        value: "Cadet",
                        label: "Cadet",
                      },
                      {
                        value: "Minime",
                        label: "Minime",
                      },
                      {
                        value: "Pupilles",
                        label: "Pupilles",
                      },
                    ]}
                  />
                </Form.Item> */}
                <Form.Item name="size" label={t("size")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="atTheClubSince" label={t("atTheClubSince")}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  label={t("actualite.addAndModify.step1.ProfilePicCard.title")}
                  name="image"
                  rules={rules.image}
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}
                >
                  <Upload
                    maxCount={1}
                    listType="picture"
                    {...propss}
                    className="custom-upload"
                  >
                    <Button icon={<UploadOutlined />}>
                      {t("Add an image")}
                    </Button>
                  </Upload>
                </Form.Item>
                {/* <Form.Item
                  label={t("actualite.addAndModify.step1.videoCard.title")}
                  name="video"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}
                >
                  <Upload
                    name="video"
                    maxCount={1}
                    listType="picture"
                    {...propss}
                  >
                    <Button icon={<UploadOutlined />}>Ajouter une video</Button>
                  </Upload>
                </Form.Item> */}
              </Col>
            </Row>

            <Form.Item
              label={t("Description")}
              name="description"
              // rules={[{
              //   required:'true',
              //   message:t("Required description")
              // },
              // {

              //       min: 80,
              //       message: t("Description must be at least 80 characters")

              // }
              // ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={24}>
          <Card title={t("Staistiques")}>
            <Divider className="m-0 mb-4" />

            <Form.Item name="numberOfMatches" label={t("Nombre de matchs")}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="numberOfGoals"
              label={t("Nombre de buts")}
              // rules={rules.goals}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="numberOfDecisivePasses"
              label={t("Nombre de passes decisif")}
              // rules={rules.goals}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Card>
        </Col>

        <Col span={24}>
          <Card title={t("previousClub")}>
            <Divider className="m-0 mb-4" />

            <Form.Item name="previousClubYears" label={t("years")}>
              <Input />
            </Form.Item>

            <Form.Item name="previousClubName" label={t("club")}>
              <Input />
            </Form.Item>

            <Form.Item
              name="previousClubNumberOfMatches"
              label={t("Nombre de matchs")}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlayerInfosForm
