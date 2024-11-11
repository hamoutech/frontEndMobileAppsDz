import React, { useState, useEffect } from "react"
import PageHeaderAlt from "components/layout-components/PageHeaderAlt"
import { Form, Button, message as AntMessage, Select, Space } from "antd"
import Flex from "components/shared-components/Flex"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { t } from "i18next"
import { useParams } from "react-router-dom"
import StadiumInfo from "./StadiumInfo"
import { IMAGE_URL } from "constants/imageUrl"
import {
  createStadium,
  fetchStadium,
  hideLoading,
  showLoading,
  updateStadium,
} from "store/slices/stadiumSlice"

const { Option } = Select

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener("load", () => callback(reader.result))
  reader.readAsDataURL(img)
}

const ADD = "ADD"
const EDIT = "EDIT"

const Stadium = (props) => {
  const { mode = ADD } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const { id } = useParams()
  const { error, stadium, loading } = useSelector((state) => state.stadium)

  const back = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStadium())
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du stade",
          error
        )
      }
    }

    fetchData()
  }, [dispatch])

  //   useEffect(() => {

  //     form.setFieldsValue({ ...stadium})

  // },[stadium]);

  useEffect(() => {
    if (stadium && stadium[0]) {
      const fileList = [
        {
          uid: "-1",
          name: stadium[0].stadiumImage[0].originalname,
          status: "done",
          url: `${IMAGE_URL + stadium[0].stadiumImage[0].filename}`,
        },
      ]

      form.setFieldsValue({
        stadiumName: stadium[0].stadiumName,
        location: stadium[0].location,
        stadiumCapacity: stadium[0].stadiumCapacity,
        stadiumLawn: stadium[0].gps,
        stadiumFieldSize: stadium[0].stadiumFieldSize,
        architect: stadium[0].architect,
        totalSurface: stadium[0].totalSurface,
        builder: stadium[0].builder,
        tenant: stadium[0].tenant,
        description: stadium[0].description,
        stadiumImage: fileList,
      })
    }
  }, [stadium, form])

  const onFinish = async (values) => {
    try {
      const values = await form.validateFields()
      const modifiedValues = {
        ...values,
      }
      const formData = new FormData()

      // Append the values to the formData
      formData.append("location", values.location)
      formData.append("stadiumName", values.stadiumName)
      formData.append("stadiumCapacity", values.stadiumCapacity)

      formData.append("gps", values.stadiumLawn)
      // formData.append("numberOfGoals", values.numberOfGoals);
      formData.append("stadiumFieldSize", values.stadiumFieldSize)
      formData.append("architect", values.architect)
      formData.append("totalSurface", values.totalSurface)
      formData.append("builder", values.builder)
      formData.append("tenant", values.tenant)
      formData.append("description", values.description)

      if (values.stadiumImage && values.stadiumImage[0]) {
        formData.append("stadiumImage", values.stadiumImage[0].originFileObj)
      }

      if (stadium.length === 0) {
        // Si le stade n'existe pas, créez-le
        await dispatch(createStadium(formData))
        AntMessage.success(t("Stadium added successfully!"), 5)
      } else {
        // Si le stade existe, mettez à jour les données
        await dispatch(updateStadium({ updatedStadiumData: formData }))
        AntMessage.success(t("Stadium updated successfully!"), 5)

        // navigate(0);
      }
    } catch (error) {
      //AntMessage.error(error)
    } finally {
      dispatch(hideLoading())
    }
  }

  const [initVal, setinitVal] = useState(null)

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="stadium-form"
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
                    ? t("Stadium info")
                    : t("stadium.modifyStadium.title")}
                </h2>
              </div>
            </Flex>
            {/* <CustomBreadCrumb /> */}
          </div>
        </PageHeaderAlt>
        <div className="container">
          <StadiumInfo
            // uploadedImg={stadium[0].stadiumImage}
            uploadLoading={uploadLoading}
            // handleUploadChange={handleUploadChange}
            mode={mode}
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

export default Stadium
