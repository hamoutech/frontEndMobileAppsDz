import { useState, useEffect } from "react"
import EllipsisDropdown from "components/shared-components/EllipsisDropdown"
import Flex from "components/shared-components/Flex"
import { useNavigate } from "react-router-dom"

import {
  Card,
  Table,
  message,
  Button,
  Modal,
  Menu,
  Input,
  Space,
  Typography,
  Result,
  Switch,
} from "antd"
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { t } from "i18next"
import LoadingData from "components/shared-components/LoadingData"
import { useDispatch, useSelector } from "react-redux"
import { saveAs } from "file-saver"
import JSZip from "jszip"
import { deleteAd, fetchAd, changeVisibilityAd } from "store/slices/adSlice"

const { confirm } = Modal
const { Title } = Typography

const AdList = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  // const [filteredUsers, setFilteredUsers] = useState([ ]);
  const [filteredUsers, setFilteredUsers] = useState([])
  const { ads, error, loading } = useSelector((state) => state.ad)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    console.log(user)
    dispatch(fetchAd(user?.name))
  }, [dispatch])

  useEffect(() => {
    if (error) {
      message.error(t("Failed to retreive data. Please try again later."))
    }
  }, [error])

  function generateCSV(data) {
    const header = "title,description\n"
    const csv = data.map((item) => `${item.title},${item.description}`)

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
  const [filteredAds, setFilteredAds] = useState([])
  useEffect(() => {
    setFilteredAds(ads)
  }, [ads])

  const search = (e) => {
    let query = e.target.value
    let data = []
    data = ads.filter((item) => {
      return query === "" ? item : item.title.toLowerCase().includes(query)
    })
    setFilteredAds(data)
  }

  const addAd = () => {
    navigate(`/app/ad/add`)
  }

  // const viewAdProfile = (row) => {
  //   navigate(`/app/ad/profil/${row._id}`);
  // };
  const editAdProfile = (row) => {
    navigate(`/app/ad/edit/${row._id}`)
  }

  const showDeleteConfirm = async (id) => {
    confirm({
      title: t("Delete ad"),
      icon: <ExclamationCircleOutlined />,
      content: t("Are you sure you want to delete this ad?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        dispatch(deleteAd(id))
          .unwrap()
          .then(() => {
            message.success({
              content: `${t("Deleted ad")}`,
              duration: 5,
            })
          })
          .catch((error) => {
            message.error(error)
          })
      },
    })
  }
  const handleToggleShown = (checked, record) => {
    dispatch(changeVisibilityAd({ id: record._id, data: { isShown: checked } }))
  }
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editAdProfile(row)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">{t("Edit Ad")}</span>
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

  const tableColumns = [
    {
      title: t("Title"),
      dataIndex: "title",
      sorter: {
        compare: (a, b) => {
          a = a.title.toLowerCase()
          b = b.title.toLowerCase()
          return a > b ? -1 : b > a ? 1 : 0
        },
      },
    },
    {
      title: t("Description"),
      dataIndex: "description",
      render: (description) => (
        <span>{getDescriptionPreview(description)}</span>
      ),
    },
    {
      title: t("Is shown"),
      dataIndex: "isShown",
      render: (isShown, record) => (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
          }}
        >
          <Switch
            checked={isShown}
            onChange={(checked) => handleToggleShown(checked, record)}
            checkedChildren={<CheckCircleOutlined />}
            unCheckedChildren={<CloseCircleOutlined />}
          />
        </span>
      ),
    },
    {
      title: t("Location"),
      dataIndex: "location",
    },

    {
      title: t("actions"),
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ]

  const getDescriptionPreview = (description) => {
    // Assume that description is an HTML string
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = description

    // Extract text content
    const textContent = tempDiv.textContent || tempDiv.innerText

    // Get the first four words
    const firstFourWords = textContent.split(" ").slice(0, 4).join(" ")

    // Add ellipsis if there are more words
    const previewText =
      textContent.split(" ").length > 4
        ? `${firstFourWords}...`
        : firstFourWords

    return previewText
  }
  return (
    <>
      <Title level={2}> {t("Ad")} </Title>

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
                onClick={addAd}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                {t("Add an ad")}
              </Button>

              <Button
                onClick={() => downloadAsZip(filteredAds)}
                type="primary"
                icon={<ExportOutlined />}
                block
                danger
              >
                {t("Export")}
              </Button>
            </Space>
          </div>
        </Flex>
        <div className="table-responsive">
          {loading ? (
            <LoadingData />
          ) : error ? (
            <Result
              status="error"
              title={t("Error")}
              subTitle={t("Something wrong, we can't retrieve this data")}
            />
          ) : (
            <Table
              className="no-border-last mt-3"
              columns={tableColumns}
              dataSource={filteredAds}
              rowKey="_id"
            />
          )}
        </div>
      </Card>
    </>
  )
}

export default AdList
