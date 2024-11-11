import React, { useState, useEffect } from "react"
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  message as AntMessage,
  DatePicker,
  TimePicker,
  Select,
  InputNumber,
  Button,
  Divider,
  Switch,
} from "antd"
import { CheckOutlined, UploadOutlined } from "@ant-design/icons"
import { rules } from "views/app-views/news/newsForm/newsFieldsRules"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import {
  hideError,
  hideLoading,
  fetchPlayersByPosition,
  createMatch,
  updateMatch,
  fetchOneMatch,
} from "store/slices/matchSlice"
import { useNavigate } from "react-router-dom/dist"
import { t } from "i18next"
import Icon from "components/util-components/Icon"
import { useParams } from "react-router-dom"
import { useForm } from "antd/lib/form/Form"
import PageHeaderAlt from "components/layout-components/PageHeaderAlt"
import Flex from "components/shared-components/Flex"
import { getUser } from "store/slices/authSlice"
import { IMAGE_URL } from "constants/imageUrl"

const { TextArea } = Input
const { Option } = Select

const ADD = "ADD"
const EDIT = "EDIT"

const MatchApplication = ({ mode }) => {
  const [form] = useForm()
  const dispatch = useDispatch()
  const { error, match, loading, playersByPosition } = useSelector(
    (state) => state.matchs
  )
  const { user } = useSelector((state) => state.auth)
  const [fileList, setFileList] = useState([])

  const [displayNotif, setDisplayNotif] = useState(true) // Default to true
  const [displayDate, setDisplayDate] = useState(true) // Default to true

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchPlayersByPosition())
  }, [dispatch])

  useEffect(() => {
    if (mode === EDIT) {
      dispatch(fetchOneMatch(id))
    }
  }, [dispatch, mode, id])

  useEffect(() => {
    if (mode === EDIT && match) {
      const updatedMatch = {
        ...match,
        date: match.date ? moment(new Date(match.date)) : null,
        hour: match.hour ? moment(match.hour, "HH:mm") : null,
        displayNotif: match.displayNotif || true,
      }
      form.setFieldsValue(updatedMatch)
      setDisplayNotif(updatedMatch.displayNotif)
      setDisplayDate(updatedMatch.delayed)

      if (match.adversaryLogo) {
        const fileList = [
          {
            uid: "-1",
            name: match.adversaryLogo[0].originalname,
            status: "done",
            url: `${IMAGE_URL + match.adversaryLogo[0].filename}`,
          },
        ]
        form.setFieldsValue({
          adversaryLogo: fileList,
        })
      }
    }
  }, [form, mode, match])

  useEffect(() => {
    dispatch(hideError())
  }, [])

  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      const formData = new FormData()
      formData.append("titled", values.titled)
      formData.append("stadiumName", values.stadiumName)
      formData.append("competition", values.competition)
      formData.append("delayed", values.delayed)
      if (!values.delayed && values.date) {
        formData.append("date", values.date.format("YYYY/MM/DD"))
      }
      if (!values.delayed && values.hour) {
        formData.append("hour", values.hour.format("HH:mm"))
      }
      if (values.goalkeeper) {
        formData.append("goalkeeper", values.goalkeeper)
      }

      if (values.defender) {
        formData.append("defender", values.defender)
      }
      if (values.midfielder) {
        formData.append("midfielder", values.midfielder)
      }
      if (values.attacker) {
        formData.append("attacker", values.attacker)
      }

      formData.append("myClubResult", values.myClubResult || 0)
      formData.append("nameAdversary", values.nameAdversary)
      formData.append("resultAdversary", values.resultAdversary || 0)
      formData.append("displayNotif", values.displayNotif)

      if (displayNotif && values.notifTitle) {
        formData.append("notifTitle", values.notifTitle)
      }
      if (displayNotif && values.notifBody) {
        formData.append("notifBody", values.notifBody)
      }
      formData.append("description", values.description)

      if (values.adversaryLogo && values.adversaryLogo[0]) {
        formData.append("adversaryLogo", values.adversaryLogo[0].originFileObj)
      }

      if (mode === ADD) {
        await dispatch(createMatch(formData)).unwrap()
        AntMessage.success(t("Match added successfully!"), 1)
        navigate(-1)
      } else if (mode === EDIT) {
        await dispatch(updateMatch({ id: match._id, data: formData })).unwrap()
        AntMessage.success(t("Match updated!"), 1)
        navigate(-1)
      }
    } catch (error) {
      AntMessage.error(error.message)
    } finally {
      dispatch(hideLoading())
    }
  }
  const onPositionChange = (value, position) => {
    dispatch(fetchPlayersByPosition(position))
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
    <>
      <Form layout="vertical" form={form} onFinish={onFinish} name="match-form">
        <PageHeaderAlt className="border-bottom mb-4">
          <div className="container">
            <Flex
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <div>
                <Icon className="font-size-lg mr-2" type={CheckOutlined} />
                <h2 className="mb-3" style={{ display: "inline-block" }}>
                  {mode === "ADD" ? t("Add a match") : `${t("Edit match")}`}
                </h2>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>

        <div className="container">
          <Card size="large">
            <Row gutter={16}>
              {mode && (
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label={t("newslist.table.newsCell")}
                    name="titled"
                    rules={[
                      {
                        required: true,
                        message: t("Required title"),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              )}
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label={t("Stadium name")}
                  name="stadiumName"
                  rules={[
                    {
                      required: true,
                      message: t("Required stadium name"),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label={t("match.competition")} name="competition">
                  <Select
                    allowClear
                    options={[
                      {
                        value: "Coupe d'algérie",
                        label: "Coupe d'algérie",
                      },
                      {
                        value: "ligue des champions",
                        label: "ligue des champions",
                      },
                      {
                        value: "Coupe de CAF",
                        label: "Coupe de CAF",
                      },
                      {
                        value: "ligue 1 mobilis",
                        label: "ligue 1 mobilis",
                      },
                      {
                        value: "Coupe d'arabe",
                        label: "Coupe d'arabe",
                      },
                      {
                        value: "Matchs amicaux",
                        label: "Matchs amicaux",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label={t("Delayed")}
                  name="delayed"
                  valuePropName="checked"
                  initialValue={true}
                  rules={[
                    {
                      required: true,
                      message: t("Required delayed"),
                    },
                  ]}
                >
                  <Switch
                    checked={displayDate}
                    onChange={(checked) => setDisplayDate(checked)}
                  />
                </Form.Item>
              </Col>
              {!displayDate && (
                <>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Date"
                      name="date"
                      rules={[
                        {
                          required: true,
                          message: t("Please select a day"),
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        format="YYYY-MM-DD"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label={t("From")}
                      name="hour"
                      rules={[
                        {
                          required: true,
                          message: t("Select Starting time"),
                        },
                      ]}
                    >
                      <TimePicker
                        format="HH:mm"
                        valueFormat="HH:mm"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}
            </Row>
            <Form.Item
              label={t("Description")}
              name="description"
              rules={[
                {
                  required: true,
                  message: t("Required description"),
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label={t("Display the notification")}
              name="displayNotif"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch
                checked={displayNotif}
                onChange={(checked) => setDisplayNotif(checked)}
              />
            </Form.Item>

            {displayNotif && (
              <>
                <Form.Item label={t("Notification title")} name="notifTitle">
                  <Input />
                </Form.Item>

                <Form.Item label={t("Notification body")} name="notifBody">
                  <TextArea rows={4} />
                </Form.Item>
              </>
            )}
          </Card>
          <Col span={24}>
            <Card title={t("Statistiques")}>
              <Divider className="m-0 mb-4" />

              <Row gutter={16}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label={t("register.username2Palceholder")}>
                    <Input disabled value={user.name} name="myClubName" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="myClubResult" label={t("Nombre de buts")}>
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label={t("register.usernamePalceholder")}
                    name="nameAdversary"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="resultAdversary" label={t("Nombre de buts")}>
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Mon logo"
                    name="myClubLogo"
                    value={user.image[0].filename}
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                  >
                    <Upload
                      name="image"
                      maxCount={1}
                      listType="picture"
                      {...propss}
                      disabled
                    >
                      <Button icon={<UploadOutlined />}>
                        {user.image[0].filename}
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Logo Adversaire"
                    name="adversaryLogo"
                    rules={rules.adversaryLogo}
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                  >
                    <Upload
                      name="adversaryLogo"
                      maxCount={1}
                      listType="picture"
                      {...propss}
                      className="custom-upload"
                    >
                      <Button icon={<UploadOutlined />}>
                        {t("Ajouter un logo")}
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          {/* )} */}

          <Col span={24}>
            <Card title={t("Team composition")}>
              <Divider className="m-0 mb-4" />

              <Form.Item label={t("Guard")} name="goalkeeper">
                <Select
                  allowClear
                  options={(playersByPosition["goalkeeper"] || []).map(
                    (player) => ({
                      value: player.fullName,
                      label: player.fullName,
                    })
                  )}
                  onChange={(value) => onPositionChange(value, "goalkeeper")}
                />
              </Form.Item>
              <Form.Item label={t("Defender")} name="defender">
                <Select
                  mode="multiple"
                  showArrow
                  allowClear
                  maxTagCount="responsive"
                  size="large"
                  style={{
                    width: "100%",
                  }}
                  options={(playersByPosition["defender"] || []).map(
                    (player) => ({
                      value: player.fullName,
                      label: player.fullName,
                    })
                  )}
                  onChange={(value) => onPositionChange(value, "defender")}
                />
              </Form.Item>
              <Form.Item label={t("midfielder")} name="midfielder">
                <Select
                  mode="multiple"
                  showArrow
                  allowClear
                  maxTagCount="responsive"
                  size="large"
                  style={{
                    width: "100%",
                  }}
                  options={(playersByPosition["midfielder"] || []).map(
                    (player) => ({
                      value: player.fullName,
                      label: player.fullName,
                    })
                  )}
                  onChange={(value) => onPositionChange(value, "midfielder")}
                />
              </Form.Item>
              <Form.Item label={t("forward")} name="attacker">
                <Select
                  mode="multiple"
                  showArrow
                  allowClear
                  maxTagCount="responsive"
                  size="large"
                  style={{
                    width: "100%",
                  }}
                  options={(playersByPosition["attacker"] || []).map(
                    (player) => ({
                      value: player.fullName,
                      label: player.fullName,
                    })
                  )}
                  onChange={(value) => onPositionChange(value, "attacker")}
                />
              </Form.Item>
            </Card>
          </Col>
        </div>

        <div className="mt-2" style={{ textAlign: "center" }}>
          <Button
            icon={<CheckOutlined />}
            htmlType="submit"
            loading={loading}
            type="primary "
          >
            {mode === ADD
              ? t("actualite.addNews.addButton")
              : t("actualite.modifyNews.modifyButton")}
          </Button>
        </div>
      </Form>
    </>
  )
}

export default MatchApplication
