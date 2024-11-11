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
  Select,
  Switch,
  Button,
} from "antd"
import { CheckOutlined, UploadOutlined } from "@ant-design/icons"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import {
  hideError,
  hideLoading,
  showLoading,
  createLive,
  updateLive,
  fetchOneLive,
} from "store/slices/liveSlice"
import { useNavigate, useParams } from "react-router-dom"
import { t } from "i18next"
import { getUser } from "store/slices/authSlice"
import { fetchMatchs } from "store/slices/matchSlice"
import PageHeaderAlt from "components/layout-components/PageHeaderAlt"
import Flex from "components/shared-components/Flex"

const { Option } = Select

const ADD = "ADD"
const EDIT = "EDIT"

const LiveApplication = ({ mode }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { TextArea } = Input
  const { error, live, loading } = useSelector((state) => state.lives)
  const { matchs } = useSelector((state) => state.matchs)

  const [filteredMatchs, setFilteredMatchs] = useState([])

  useEffect(() => {
    if (matchs) {
      const options = matchs.map((match) => ({
        value: match._id,
        label: match.titled,
      }))
      setFilteredMatchs(options)
    }
  }, [matchs])

  const [initVal, setInitialValues] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUser())
    dispatch(fetchMatchs())
  }, [dispatch])

  const { user } = useSelector((state) => state.auth)

  const dateFormat = "YYYY-MM-DD"
  useEffect(() => {
    if (mode === EDIT) {
      dispatch(fetchOneLive(id))
    }
  }, [dispatch, mode, id])

  useEffect(() => {
    if (mode === EDIT && live) {
      const updatedLive = {
        ...live,
        date: moment(live.creationDate),
      }
      form.setFieldsValue(updatedLive)
    }
  }, [form, mode, live])

  useEffect(() => {
    if (mode === ADD) {
      form.setFieldValue("display", true)
    }
  }, [form, mode, live])

  useEffect(() => {
    dispatch(hideError())
  }, [])

  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      const modifiedValues = {
        ...values,
        creationDate: values.date.format("YYYY-MM-DD"),
        link: transformLink(values.link),
      }
      const { ...restvalues } = modifiedValues
      if (mode === ADD) {
        await dispatch(createLive(restvalues)).unwrap()
        AntMessage.success(t("Live added successfully!"), 1)
        navigate(-1)
      }
      if (mode === EDIT) {
        await dispatch(updateLive({ id: live._id, data: restvalues })).unwrap()
        await AntMessage.success(t("Live updated!"), 1)
        navigate(-1)
      }
    } catch (error) {
      AntMessage.error(error)
    } finally {
      dispatch(hideLoading())
    }
  }
  function transformLink(link) {
    if (link) {
      const url = new URL(link)

      if (url.pathname.includes("/embed/")) {
        // If the URL already contains /embed/, just add the necessary parameters
        url.search = "modestbranding=1&showinfo=0&rel=0"
      } else {
        // Otherwise, transform the link to an embed URL
        const videoId = url.searchParams.get("v")
        if (videoId) {
          const newPath = `/embed/${videoId}`
          url.pathname = newPath
          url.search = "modestbranding=1&showinfo=0&rel=0"
        } else {
          // If no videoId found, return an empty string
          return ""
        }
      }

      return url.href
    }
    return "" // Return an empty string if the link is not provided or invalid
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="live-form"
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
                  {mode === "ADD" ? t("Add a live") : `${t("Edit live")}`}
                </h2>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>

        <div className="container">
          <Card size="large">
            <Row gutter={16}>
              {mode && (
                <Col span={24}>
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

              <Col span={24}>
                <Form.Item
                  label={t("link")}
                  name="link"
                  rules={[
                    {
                      required: true,
                      message: t("Required link"),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={t("Date")}
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: t("Please select a day"),
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} format={dateFormat} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={t("display")}
                  name="display"
                  valuePropName="checked"
                >
                  <Switch defaultChecked={live?.display} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={t("Link to a match")} name="match">
                  <Select
                    showSearch
                    optionFilterProp="children"
                    options={filteredMatchs}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
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
              </Col>
            </Row>
          </Card>
        </div>
        <div className="mt-2" style={{ textAlign: "center" }}>
          <Button
            icon={<CheckOutlined />}
            htmlType="submit"
            loading={loading}
            type="primary"
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

export default LiveApplication
