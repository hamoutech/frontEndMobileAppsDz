import React, { useEffect, useState } from "react"
import {
  Table,
  Button,
  Modal,
  Menu,
  Typography,
  Card,
  Input,
  Result,
  message,
  Space,
} from "antd"
import { t } from "i18next"
import EllipsisDropdown from "components/shared-components/EllipsisDropdown"
import { createAvatar } from "@dicebear/core"
import { initials } from "@dicebear/collection"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { saveAs } from "file-saver"
import JSZip from "jszip"

import AvatarStatus from "components/shared-components/AvatarStatus"
import {
  FileSearchOutlined,
  EyeOutlined,
  ContainerOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PaperClipOutlined,
  PlusCircleOutlined,
  ExportOutlined,
} from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import Flex from "components/shared-components/Flex"
import LoadingData from "components/shared-components/LoadingData"
import { useDispatch, useSelector } from "react-redux"
import { fetchMatchs, deleteMatch } from "store/slices/matchSlice"
import MatchView from "./matchView"

const { Title } = Typography

const { confirm } = Modal

const MatchsList = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, matchs, error } = useSelector((state) => state.matchs)

  useEffect(() => {
    dispatch(fetchMatchs())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      message.error(t("Failed to retreive data. Please try again later."))
    }
  }, [error])

  function generateCSV(data) {
    const header = "titled,Date de creation,Nom Stade\n"
    const csv = data.map(
      (item) => `${item.titled},${item.date},${item.stadiumName}`
    )

    return header + csv.join("\n")
  }

  function downloadAsZip(data) {
    const zip = new JSZip()
    const csvData = generateCSV(data)

    zip.file("exported_data.csv", csvData)
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "exported_data.zip")
    })
  }

  //search
  const [filteredMatchs, setFilteredMatchs] = useState([])
  useEffect(() => {
    setFilteredMatchs(matchs)
  }, [matchs])

  const search = (e) => {
    let query = e.target.value
    let data = []
    data = matchs.filter((item) => {
      return query === "" ? item : item.titled.toLowerCase().includes(query)
    })
    setFilteredMatchs(data)
  }

  const showDeleteConfirm = async (id) => {
    confirm({
      title: t("Delete Matche"),
      icon: <ExclamationCircleOutlined />,
      content: t("Are you sure to delete this matche?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        dispatch(deleteMatch(id))
          .unwrap()
          .then(() => {
            message.success({
              content: `${t("Deleted matche")}`,
              duration: 5,
            })
          })
          .catch((error) => {
            message.error(error)
          })
      },
    })
  }

  const [matchProfileVisible, setMatchProfileVisible] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const showMatchProfile = (info) => {
    setMatchProfileVisible(true)
    setSelectedMatch(info)
  }

  const closeMatchProfile = () => {
    setMatchProfileVisible(false)
    setSelectedMatch(null)
  }
  const getMatchStatus = (date) => {
    const matchDate = moment(date)
    const currentDate = moment()
    return matchDate.isAfter(currentDate) ? t("À venir") : t("Joué")
  }
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        onClick={() => showMatchProfile(row)}
        // onClick={() => navigate(`/app/matchs/details/${row._id}`)}
      >
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">{t("View details")}</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => navigate(`/app/matchs/edit/${row._id}`)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">{t("Edit job")}</span>
        </Flex>
      </Menu.Item>

      <Menu.Item onClick={() => showDeleteConfirm(row._id)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">{t("Delete")}</span>
        </Flex>
      </Menu.Item>
    </Menu>
  )

  const columns = [
    {
      title: t("newslist.table.newsCell"),
      dataIndex: "titled",

      sorter: {
        compare: (a, b) => {
          a = a.titled.toLowerCase()
          b = b.titled.toLowerCase()
          return a > b ? -1 : b > a ? 1 : 0
        },
      },
    },

    {
      title: t("Created on"),
      dataIndex: "date",
      render: (date, record) => {
        // Vérifiez si le match est retardé
        if (record.delayed) {
          return null // Affiche rien si delayed est true
        }
        // Sinon, affiche la date formatée
        return <span>{moment(new Date(date)).format("DD/MM/YYYY")}</span>
      },
      sorter: {
        compare: (a, b) => {
          const dateA = moment(a.date)
          const dateB = moment(b.date)
          return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0
        },
      },
    },

    {
      title: t("Stadium name"),
      dataIndex: "stadiumName",
      key: "stadiumName",
      sorter: {
        compare: (a, b) => {
          a = a.stadiumName.toLowerCase()
          b = b.stadiumName.toLowerCase()
          return a > b ? -1 : b > a ? 1 : 0
        },
      },
    },
    {
      title: t("Etat du match"),
      dataIndex: "date",
      key: "date",
      render: (text, record) => getMatchStatus(record.date),
    },
    {
      title: t("Actions"),
      dataIndex: "actions",

      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ]

  return (
    <>
      <Title level={2}> {t("All resgistered matchs")} </Title>
      <Card>
        <Flex
          alignItems="center"
          justifyContent="between"
          mobileFlex={false}
          className="p-3"
        >
          <Flex className="mb-1" mobileFlex={false}>
            <Input
              placeholder={t("Search")}
              style={{ marginBottom: 16 }}
              onChange={(e) => {
                search(e)
              }}
              disabled={loading || error ? true : false}
            />
          </Flex>
          <div>
            <Space wrap>
              <Button
                onClick={() => navigate(`/app/matchs/add`)}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                {t("newslist.table.addButton")}
              </Button>

              <Button
                onClick={() => downloadAsZip(filteredMatchs)}
                // onClick={generateZip}
                type="primary"
                icon={<ExportOutlined />}
                block
                danger
              >
                {t("newslist.table.exportButton")}
              </Button>
            </Space>
          </div>
        </Flex>
        <div>
          {loading ? (
            <LoadingData />
          ) : error ? (
            <Result
              status="error"
              title={t("Error")}
              subTitle={t("Something wrong, we can't retrieve this data")}
            />
          ) : (
            <Table columns={columns} dataSource={filteredMatchs} rowKey="_id" />
          )}
        </div>

        <MatchView
          data={selectedMatch}
          visible={matchProfileVisible}
          close={closeMatchProfile}
        />
      </Card>
    </>
  )
}

export default MatchsList
