import React, { useState, useEffect } from "react"
import {
  Form,
  Button,
  message as AntMessage,
  Select,
  Space,
  Card,
  Popconfirm,
} from "antd"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import Flex from "components/shared-components/Flex"
import PageHeaderAlt from "components/layout-components/PageHeaderAlt"
import moment from "moment"

import { useParams } from "react-router-dom"

import {
  createPlayer,
  getOnePlayer,
  updatePlayer,
  hideLoading,
} from "store/slices/joueurSlice"
import PlayerInfosForm from "./playerInfosForm"
import { IMAGE_URL } from "constants/imageUrl"

const ADD = "ADD"
const EDIT = "EDIT"

const PlayerForm = (props) => {
  const { mode = ADD } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [refresh, setRefresh] = useState(false)
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const { id } = useParams()
  const [initVal, setInitialValues] = useState(null)
  // useEffect(() => {
  //   if (refresh) {
  //     dispatch(getOnePlayer(id));
  //     setRefresh(false);
  //   }
  // }, [refresh, dispatch, id]);

  const handleCancel = () => {
    setVisible(false)
  }

  const showModal = () => {
    setVisible(true)
  }

  const back = () => {
    navigate(-1)
  }

  const { error, joueur, loading } = useSelector((state) => state.joueurs)

  useEffect(() => {
    if (mode === EDIT) {
      dispatch(getOnePlayer(id))
    }
  }, [dispatch, mode, id])

  useEffect(() => {
    if (mode === EDIT && joueur) {
      const updatedJoueur = {
        ...joueur,
        dateOfBirth: moment(joueur.dateOfBirth),
      }
      form.setFieldsValue(updatedJoueur)

      if (joueur.image) {
        const fileList = [
          {
            uid: "-1",
            name: joueur.image[0].originalname,
            status: "done",
            url: `${IMAGE_URL + joueur.image[0].filename}`,
          },
        ]
        form.setFieldsValue({
          image: fileList,
        })
      }
    }
  }, [form, mode, joueur])

  // useEffect(() => {
  //   dispatch(hideError());
  // }, []);

  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      const modifiedValues = {
        ...values,
      }
      const formData = new FormData()

      // Append the values to the formData
      formData.append("fullName", values.fullName)
      formData.append("placeOfBirth", values.placeOfBirth)
      formData.append("category", values.category)
      formData.append("numberPhone", values.numberPhone)
      formData.append("nationality", values.nationality)
      formData.append("description", values.description)
      formData.append("dateOfBirth", values.dateOfBirth.format("YYYY-MM-DD"))
      formData.append("size", values.size)
      formData.append("atTheClubSince", values.atTheClubSince)
      formData.append("weight", values.weight)
      formData.append("position", values.position)
      formData.append(
        "numberOfMatches",
        values.numberOfMatches ? values.numberOfMatches : 0
      )
      formData.append("numberOfGoals", values.numberOfGoals)
      formData.append("numberOfDecisivePasses", values.numberOfDecisivePasses)
      formData.append("previousClubYears", values.previousClubYears)
      formData.append("previousClubName", values.previousClubName)
      formData.append(
        "previousClubNumberOfMatches",
        values.previousClubNumberOfMatches
      )

      if (values.image && values.image[0]) {
        formData.append("image", values.image[0].originFileObj)
      }
      if (values.video && values.video[0]) {
        formData.append("video", values.video[0].originFileObj)
      }
      if (mode === ADD) {
        await dispatch(createPlayer(formData)).unwrap()
        AntMessage.success(t("Player added successfully!"), 1)
        navigate(-1)
      }
      if (mode === EDIT) {
        await dispatch(
          updatePlayer({ id: joueur._id, data: formData })
        ).unwrap()
        await AntMessage.success(t("Player updated!"), 1)
        navigate(-1)
      }
    } catch (error) {
      AntMessage.error(error)
    } finally {
      dispatch(hideLoading())
    }
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="Parent-form"
        className="ant-advanced-search-form"
        initialValues={initVal}
      >
        <PageHeaderAlt className="border-bottom mb-4">
          <div className="container">
            <Flex mobileFlex={false}>
              <div>
                <h2 className="mb-3" style={{ display: "inline-block" }}>
                  {mode === "ADD" ? t("New Pplayer") : t("Edit Player")}
                </h2>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <PlayerInfosForm mode={mode} />
        </div>
      </Form>
      <Flex justifyContent="center">
        <Space size="middle" className="mb-3">
          <Button
            type="primary"
            onClick={() => onFinish()}
            htmlType="submit"
            loading={submitLoading}
          >
            {mode === "ADD" ? t("Submit") : t("Validate")}
          </Button>
          <Button className="mr-2" onClick={back}>
            {t("Cancel")}
          </Button>
        </Space>
      </Flex>
    </>
  )
}

export default PlayerForm
