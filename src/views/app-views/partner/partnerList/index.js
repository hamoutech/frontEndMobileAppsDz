import React, { useState, useEffect } from "react";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Table,
  Tag,
  Tooltip,
  message,
  Button,
  Modal,
  Menu,
  Select,
  Input,
  Space,
  Typography,
  Result,
} from "antd";
import {
  EyeOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import LoadingData from "components/shared-components/LoadingData";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { deletePartner, fetchPartner } from "store/slices/partnerSlice";

const { confirm } = Modal;
const { Title } = Typography;

const PartnerList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const [filteredUsers, setFilteredUsers] = useState([ ]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { partners, error, loading } = useSelector((state) => state.partner);

  useEffect(() => {
    dispatch(fetchPartner());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(t("Failed to retreive data. Please try again later."));
    }
  }, [error]);

  function generateCSV(data) {
    const header = "companyName,RC,phoneNumber,email,description\n";
    const csv = data.map(
      (item) =>
        `${item.companyName},${item.RC},${item.phoneNumber},${item.email},${item.description}`
    );

    return header + csv.join("\n");
  }

  function downloadAsZip(data) {
    const zip = new JSZip();
    const csvData = generateCSV(data);

    zip.file("exported_data.csv", csvData);
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "exported_data.zip");
    });
  }
  //search
  const [filteredPartners, setFilteredPartners] = useState([]);
  useEffect(() => {
    setFilteredPartners(partners);
  }, [partners]);

  const search = (e) => {
    let query = e.target.value;
    let data = [];
    data = partners.filter((item) => {
      return query === ""
        ? item
        : item.companyName.toLowerCase().includes(query);
    });
    setFilteredPartners(data);
  };

  const addPartner = () => {
    navigate(`/app/partner/add`);
  };

  // const viewPartnerProfile = (row) => {
  //   navigate(`/app/partner/profil/${row._id}`);
  // };
  const editPartnerProfile = (row) => {
    navigate(`/app/partner/edit/${row._id}`);
  };

  const showDeleteConfirm = async (id) => {
    confirm({
      title: t("Delete partner"),
      icon: <ExclamationCircleOutlined />,
      content: t("Are you sure you want to delete this partner?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        dispatch(deletePartner(id))
          .unwrap()
          .then(() => {
            message.success({
              content: `${t("Deleted partner")}`,
              duration: 5,
            });
          })
          .catch((error) => {
            message.error(error);
          });
      },
    });
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editPartnerProfile(row)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">{t("Edit profile")}</span>
        </Flex>
      </Menu.Item>

      <Menu.Item onClick={() => showDeleteConfirm(row._id)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">{t("Delete")}</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const tableColumns = [
    {
      title: t("compagny name"),
      dataIndex: "companyName",
      sorter: {
        compare: (a, b) => {
          a = a.companyName.toLowerCase();
          b = b.companyName.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "RC",
      dataIndex: "RC",
    },
    {
      title: t("phone number"),
      dataIndex: "phoneNumber",
    },
    {
      title: t("email"),
      dataIndex: "email",
    },
    {
      title: t("Description"),
      dataIndex: "description",
      render: (description) => (
        <span>{getDescriptionPreview(description)}</span>
      ),
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
  ];

  const getDescriptionPreview = (description) => {
    // Assume that description is an HTML string
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;

    // Extract text content
    const textContent = tempDiv.textContent || tempDiv.innerText;

    // Get the first four words
    const firstFourWords = textContent.split(" ").slice(0, 4).join(" ");

    // Add ellipsis if there are more words
    const previewText =
      textContent.split(" ").length > 4
        ? `${firstFourWords}...`
        : firstFourWords;

    return previewText;
  };
  return (
    <>
      <Title level={2}> {t("Partner")} </Title>

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
                search(e);
              }}
              disabled={loading || error ? true : false}
            />
          </Flex>
          <div>
            <Space wrap>
              <Button
                onClick={addPartner}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                {t("Add a partner")}
              </Button>

              <Button
                onClick={() => downloadAsZip(filteredPartners)}
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
              dataSource={filteredPartners}
              rowKey="_id"
            />
          )}
        </div>
      </Card>
    </>
  );
};

export default PartnerList;
