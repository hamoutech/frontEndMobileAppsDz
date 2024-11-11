import React, { useState, useEffect } from "react"
import PageHeaderAlt from "components/layout-components/PageHeaderAlt"
import {
  Form,
  Button,
  message as AntMessage,
  Select,
  Space,
  Alert,
  Progress,
} from "antd"
import Flex from "components/shared-components/Flex"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { t } from "i18next"
import NewsInfoFields from "./newsInfoFields"

import { useParams } from "react-router-dom"
import {
  createNews,
  getOneNews,
  hideLoading,
  updateNews,
} from "store/slices/newsSlice"
import moment from "moment"
import { IMAGE_URL } from "constants/imageUrl"

const { Option } = Select

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener("load", () => callback(reader.result))
  reader.readAsDataURL(img)
}

const ADD = "ADD"
const EDIT = "EDIT"

const NewsForm = (props) => {
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
  const { error, actualite, loading } = useSelector((state) => state.news)

  useEffect(() => {
    if (mode === EDIT) {
      dispatch(getOneNews(id))
    }
  }, [dispatch, mode, id])

  useEffect(() => {
    if (mode === EDIT && actualite) {
      const updatedNews = {
        ...actualite,

        createdDate: moment(actualite.createdDate),
      }

      form.setFieldsValue(updatedNews)
    }

    if (actualite.image) {
      const fileList = [
        {
          uid: "-1",
          name: actualite.image[0].originalname,
          status: "done",
          url: `${IMAGE_URL + actualite.image[0].filename}`,
        },
      ]
      form.setFieldsValue({
        image: fileList,
      })
    }
  }, [form, mode, actualite])

  // useEffect(() => {
  //   dispatch(hideError());
  // }, []);
  const [editorContent, setEditorContent] = useState("")
  const handleEditorChange = (editorContent) => {
    setEditorContent(editorContent)
  }
  const [editorContentArab, setEditorContentArab] = useState("")
  const handleEditorChangeArab = (editorContentArab) => {
    setEditorContentArab(editorContentArab)
  }

  const [displayNotif, setDisplayNotif] = useState(true)
  const handleDisplayNotifChange = (displayNotif) => {
    setDisplayNotif(displayNotif)
  }
  const onFinish = async () => {
    try {
      const values = await form.validateFields()

      const formData = new FormData()
      let language = values.language.map((lang) => lang)

      formData.append("articleTitle", values.articleTitle)
      formData.append("articleTitleArab", values.articleTitleArab)
      formData.append("description", editorContent)
      formData.append("displayNotif", displayNotif)
      formData.append("notifTitle", values.notifTitle)
      formData.append("notifBody", values.notifBody)
      formData.append("language", JSON.stringify(language))

      formData.append("description_arab", editorContentArab)
      formData.append("createdDate", values.createdDate.format("YYYY-MM-DD"))

      if (values.image && values.image[0]) {
        formData.append("image", values.image[0].originFileObj)
      }
      // if (values.video && values.video[0]) {
      //   formData.append("video", values.video[0].originFileObj);
      // }

      formData.append("link", transformLink(values.link))
      if (mode === ADD) {
        await dispatch(createNews(formData)).unwrap()
        AntMessage.success(t("News added successfully!"), 1)
        navigate(-1)
      }
      if (mode === EDIT) {
        await dispatch(
          updateNews({ id: actualite._id, data: formData })
        ).unwrap()
        await AntMessage.success(t("News updated!"), 1)
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
          return "https://www.youtube.com/"
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
                  {mode === "ADD"
                    ? t("news.addNews.title")
                    : t("news.modifyNews.title")}
                </h2>
              </div>
            </Flex>
            {/* <CustomBreadCrumb /> */}
          </div>
        </PageHeaderAlt>
        <div className="container">
          <NewsInfoFields
            mode={mode}
            onEditorChange={handleEditorChange}
            onEditorChangeArab={handleEditorChangeArab}
            onDisplayNotifChange={handleDisplayNotifChange}
          />
        </div>
        <Flex justifyContent="center">
          <Space size="middle" className="mb-3">
            <Button type="primary" htmlType="submit">
              {mode === "ADD"
                ? t("actualite.addNews.addButton")
                : t("actualite.modifyNews.modifyButton")}
            </Button>
            <Button className="mr-2" onClick={back}>
              {t("actualite.addNews.cancelButton")}
            </Button>
          </Space>
        </Flex>
      </Form>
    </>
  )
}

export default NewsForm
