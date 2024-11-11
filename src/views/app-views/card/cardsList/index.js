import React, { useEffect, useState } from "react"
import {
  Table,
  Modal,
  Input,
  Result,
  message as antMessage,
  Space,
  Card as AntCard,
  Typography,
  Menu,
  Dropdown,
  Button,
} from "antd"
import { useDispatch, useSelector } from "react-redux"
import Flex from "components/shared-components/Flex"
import LoadingData from "components/shared-components/LoadingData"
import { useNavigate } from "react-router-dom"
import {
  PlusCircleOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
} from "@ant-design/icons"
import CardView from "./cardView"
import { useTranslation } from "react-i18next"
import { deleteCardById, getAllCards } from "store/slices/carteSlice"

const { Title } = Typography

const CardsList = () => {
  const { confirm } = Modal
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, message, cards } = useSelector((state) => state.card)

  useEffect(() => {
    dispatch(getAllCards(1))
  }, [dispatch])

  useEffect(() => {
    if (message) {
      antMessage.error(t("Failed to retrieve data. Please try again later."))
    }
  }, [message])

  const [filteredCards, setFilteredCards] = useState([])

  useEffect(() => {
    setFilteredCards(cards)
  }, [cards])

  const search = (e) => {
    const query = e.target.value.toLowerCase()
    const filtered = cards.filter((card) =>
      card.titled.toLowerCase().includes(query)
    )
    setFilteredCards(filtered)
  }

  const showDeleteConfirm = (id) => {
    confirm({
      title: t("Delete Card"),
      icon: <ExclamationCircleOutlined />,
      content: t("Are you sure you want to delete this card?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        dispatch(deleteCardById(id))
          .then(() => antMessage.success(t("Card deleted successfully.")))
          .catch((err) => antMessage.error(err))
      },
    })
  }

  const [cardProfileVisible, setCardProfileVisible] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const showCardProfile = (info) => {
    setSelectedCard(info)
    setCardProfileVisible(true)
  }

  const closeCardProfile = () => {
    setSelectedCard(null)
    setCardProfileVisible(false)
  }

  const editCard = (id) => {
    navigate(`/app/cards/edit/${id}`)
  }

  const dropdownMenu = (record) => (
    <Menu>
      <Menu.Item onClick={() => showCardProfile(record)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">{t("View details")}</span>
        </Flex>
      </Menu.Item>

      <Menu.Item onClick={() => editCard(record._id)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">{t("Edit card")}</span>
        </Flex>
      </Menu.Item>

      <Menu.Item onClick={() => showDeleteConfirm(record._id)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">{t("Delete card")}</span>
        </Flex>
      </Menu.Item>
    </Menu>
  )

  const columns = [
    {
      title: t("Title"),
      dataIndex: "titled",
      sorter: (a, b) => a.titled.localeCompare(b.titled),
    },
    {
      title: t("Number of Matches"),
      dataIndex: "numberOfMatches",
      sorter: (a, b) => a.numberOfMatches - b.numberOfMatches,
    },
    {
      title: t("Total Price"),
      dataIndex: "totalPrice",
      render: (price) => `$${price}`,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: t("Duration"),
      dataIndex: "duration",
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: t("Actions"),
      dataIndex: "actions",
      render: (_, record) => (
        <Dropdown overlay={dropdownMenu(record)} trigger={["click"]}>
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ]

  return (
    <>
      <Title level={2}>{t("All Cards")}</Title>
      <AntCard>
        <Flex
          alignItems="center"
          justifyContent="between"
          mobileFlex={false}
          className="p-3"
        >
          <Flex className="mb-1" mobileFlex={false}>
            <Input
              placeholder={t("Search")}
              onChange={search}
              style={{ marginBottom: 16 }}
              disabled={loading}
            />
          </Flex>
          <div>
            <Space wrap>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={() => navigate("/app/cards/add")}
              >
                {t("Add Card")}
              </Button>
            </Space>
          </div>
        </Flex>

        <div>
          {loading ? (
            <LoadingData />
          ) : message ? (
            <Result
              status="error"
              title={t("Error")}
              subTitle={t("Failed to fetch cards.")}
            />
          ) : (
            <Table columns={columns} dataSource={filteredCards} rowKey="_id" />
          )}
        </div>
      </AntCard>

      {selectedCard && (
        <CardView
          data={selectedCard}
          visible={cardProfileVisible}
          close={closeCardProfile}
        />
      )}
    </>
  )
}

export default CardsList
