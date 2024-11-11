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
import { deleteNews, fetchNews } from "store/slices/newsSlice";
import NewsView from "./NewsView";

const { confirm } = Modal;
const { Title } = Typography;

const NewsList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const [filteredUsers, setFilteredUsers] = useState([ ]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { actualites, error, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(t("Failed to retreive data. Please try again later."));
    }
  }, [error]);

  function generateCSV(data) {
    const header = "Actualite,CreatedAt,Description\n";
    const csv = data.map(
      (item) => `${item.articleTitle},${item.createdDate},${item.description}`
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
  // const [searchText, setSearchText] = useState("");
  // const handleSearch = (value) => {
  //   setSearchText(value);
  // };
  //search
  const [filteredActualites, setFilteredActualites] = useState([]);
  useEffect(() => {
    setFilteredActualites(actualites);
  }, [actualites]);

  const search = (e) => {
    let query = e.target.value;
    let data = [];
    data = actualites.filter((item) => {
      return query === ""
        ? item
        : item.articleTitle.toLowerCase().includes(query);
    });
    setFilteredActualites(data);
  };

  const addNews = () => {
    navigate(`/app/news/add`);
  };

  // const viewNewsProfile = (row) => {
  //   navigate(`/app/news/profil/${row._id}`);
  // };
  const editNewsProfile = (row) => {
    navigate(`/app/news/edit/${row._id}`);
  };

  const showDeleteConfirm = async (id) => {
    confirm({
      title: t("Delete news"),
      icon: <ExclamationCircleOutlined />,
      content: t("Are you sure you want to delete this news?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        dispatch(deleteNews(id))
          .unwrap()
          .then(() => {
            message.success({
              content: `${t("Deleted news")}`,
              duration: 5,
            });
          })
          .catch((error) => {
            message.error(error);
          });
      },
    });
  };

  const [newsProfileVisible, setNewsProfileVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const showNewsProfile = (info) => {
    setNewsProfileVisible(true);
    setSelectedNews(info);
  };

  const closeNewsProfile = () => {
    setNewsProfileVisible(false);
    setSelectedNews(null);
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => showNewsProfile(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">{t("View news")}</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => editNewsProfile(row)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">{t("Edit news")}</span>
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
      title: t("newslist.table.newsCell"),
      dataIndex: "articleTitle",
      sorter: {
        compare: (a, b) => {
          a = a.articleTitle.toLowerCase();
          b = b.articleTitle.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: t("newslist.table.createdAtCell"),
      dataIndex: "createdDate",
      render: (date) => (
        <span> {moment(new Date(date)).format("DD/MM/YYYY")} </span>
      ),
      // render: (date) => <span>{moment(date).format("YYYY-MM-DD")}</span>,
      // sorter: (a, b) => moment(a.createdDate).unix() - moment(b.createdDate).unix(),
    },

    {
      title: t("newslist.table.descriptionCell"),
      dataIndex: "description",
      render: (description) => (
        <span>{getDescriptionPreview(description)}</span>
      ),
    },

    {
      title: t("newslist.table.optionsCell"),
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
      <Title level={2}> {t("News")} </Title>

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
                onClick={addNews}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                {t("newslist.table.addButton")}
              </Button>

              <Button
                onClick={() => downloadAsZip(filteredActualites)}
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
              dataSource={filteredActualites}
              rowKey="_id"
            />
          )}
        </div>

        <NewsView
          data={selectedNews}
          visible={newsProfileVisible}
          close={closeNewsProfile}
        />
      </Card>
    </>
  );
};

export default NewsList;
