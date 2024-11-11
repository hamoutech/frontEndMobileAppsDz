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
import { useTranslation } from "react-i18next"

import EllipsisDropdown from "components/shared-components/EllipsisDropdown"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllClients,
  banClientAccount,
  validateClientAccount,
  deleteClientAccount,
} from "store/slices/clientSlice"
import ClientView from "./ClientView"
import {
  EyeOutlined,
  StopOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons"
import Flex from "components/shared-components/Flex"
import LoadingData from "components/shared-components/LoadingData"

const { Title } = Typography
const { confirm } = Modal

const ClientsList = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { loading, clients, error } = useSelector((state) => state.client)

  useEffect(() => {
    dispatch(getAllClients())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      message.error(t("Failed to retrieve data. Please try again later."))
    }
  }, [error])

  // Filtrage pour la recherche
  const [filteredClients, setFilteredClients] = useState([])
  useEffect(() => {
    setFilteredClients(clients)
  }, [clients])

  const search = (e) => {
    const query = e.target.value.toLowerCase()
    const data = clients.filter(
      (client) =>
        client.pseudo.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.phoneNumber.includes(query)
    )
    setFilteredClients(data)
  }

  const [clientProfileVisible, setClientProfileVisible] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)

  const showClientProfile = (info) => {
    setClientProfileVisible(true)
    setSelectedClient(info)
  }

  const closeClientProfile = () => {
    setClientProfileVisible(false)
    setSelectedClient(null)
  }

  const showValidateModal = (client) => {
    confirm({
      title: t("Do you want to validate this account?"),
      icon: <ExclamationCircleOutlined />,
      content: t("This will activate the client's account."),
      onOk() {
        dispatch(validateClientAccount(client._id))
      },
    })
  }

  const showBanModal = (client) => {
    let banReason = ""
    Modal.confirm({
      title: t("Do you want to ban this account?"),
      icon: <ExclamationCircleOutlined />,
      content: (
        <Input
          placeholder={t("Enter the reason for banning")}
          onChange={(e) => (banReason = e.target.value)}
        />
      ),
      onOk() {
        dispatch(banClientAccount({ id: client._id, reason: banReason }))
      },
    })
  }

  const showDeleteConfirm = (id) => {
    confirm({
      title: t("Delete Client"),
      icon: <ExclamationCircleOutlined />,
      content: t("Are you sure you want to delete this Client?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        dispatch(deleteClientAccount(id))
          .then(() => message.success(t("Card deleted successfully.")))
          .catch((err) => message.error(err))
      },
    })
  }
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => showClientProfile(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">{t("View details")}</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => showDeleteConfirm(row._id)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">{t("Delete client")}</span>
        </Flex>
      </Menu.Item>

      {row.status === "VALIDATED" ? (
        <Menu.Item onClick={() => showBanModal(row)}>
          <Flex alignItems="center">
            <StopOutlined />
            <span className="ml-2">{t("Ban client")}</span>
          </Flex>
        </Menu.Item>
      ) : (
        <Menu.Item onClick={() => showValidateModal(row)}>
          <Flex alignItems="center">
            <PlusCircleOutlined />
            <span className="ml-2">{t("Validate client")}</span>
          </Flex>
        </Menu.Item>
      )}
    </Menu>
  )

  const columns = [
    {
      title: t("Pseudo"),
      dataIndex: "pseudo",
      sorter: (a, b) => a.pseudo.localeCompare(b.pseudo),
    },
    {
      title: t("Email"),
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: t("Phone Number"),
      dataIndex: "phoneNumber",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      render: (status) => (
        <span>{status === "VALIDATED" ? t("validated") : t("banned")}</span>
      ),
      filters: [
        { text: t("Active"), value: true },
        { text: t("Inactive"), value: false },
      ],
      onFilter: (value, record) => record.status === value,
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
      <Title level={2}>{t("All Clients")}</Title>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Input
            placeholder={t("Search")}
            onChange={search}
            disabled={loading || error ? true : false}
            style={{ marginBottom: 16, maxWidth: 200 }}
          />
        </Flex>
        <div>
          {loading ? (
            <LoadingData />
          ) : error ? (
            <Result
              status="error"
              title={t("Error")}
              subTitle={t("Failed to load clients")}
            />
          ) : (
            <Table
              columns={columns}
              dataSource={filteredClients}
              rowKey="_id"
            />
          )}
        </div>
        <ClientView
          data={selectedClient}
          visible={clientProfileVisible}
          close={closeClientProfile}
        />
      </Card>
    </>
  )
}

export default ClientsList
