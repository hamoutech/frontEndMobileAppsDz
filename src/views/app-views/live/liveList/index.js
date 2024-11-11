import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Menu,
  Typography,
  Card,
  Input,
  Tooltip,
  Result,
  message,
  Tag,
  Badge,
  Space,
  List,
} from "antd";
import { t } from "i18next";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { saveAs } from "file-saver";
import JSZip from "jszip";

import AvatarStatus from "components/shared-components/AvatarStatus";
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
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Flex from "components/shared-components/Flex";
import LoadingData from "components/shared-components/LoadingData";
import { useDispatch, useSelector } from "react-redux";
import { fetchLives, deleteLive } from "store/slices/liveSlice";

const { Title } = Typography;

const { confirm } = Modal;

const LivesList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedLive, setSelectedJob] = useState(null);

  const { loading, lives, error } = useSelector((state) => state.lives);

  useEffect(() => {
    dispatch(fetchLives());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(t("Failed to retreive data. Please try again later."));
    }
  }, [error]);

  function generateCSV(data) {
    const header = "titled,link,creationDate,display\n";
    const csv = data.map(
      (item) =>
        `${item.titled},${item.link},${moment(
          new Date(item.creationDate)
        ).format("DD/MM/YYYY")},${item.display}`
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
  const [filteredLives, setFilteredLives] = useState([]);
  useEffect(() => {
    setFilteredLives(lives);
  }, [lives]);

  const search = (e) => {
    let query = e.target.value;
    let data = [];
    data = lives.filter((item) => {
      return query === "" ? item : item.titled.toLowerCase().includes(query);
    });
    setFilteredLives(data);
  };

  const showDeleteConfirm = async (id) => {
    confirm({
      title: t("Delete live"),
      icon: <ExclamationCircleOutlined />,
      content: t("Are you sure to delete this live?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        dispatch(deleteLive(id))
          .unwrap()
          .then(() => {
            message.success({
              content: `${t("Deleted live")}`,
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
      <Menu.Item onClick={() => navigate(`/app/lives/edit/${row._id}`)}>
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
  );

  const columns = [
    // {
    //   title: t("newslist.table.newsCell"),
    //   dataIndex: "titled",

    //   sorter: {
    //     compare: (a, b) => {
    //       a = a.titled.toLowerCase();
    //       b = b.titled.toLowerCase();
    //       return a > b ? -1 : b > a ? 1 : 0;
    //     },
    //   },
    // },

    {
      title: t("Created on"),
      dataIndex: "creationDate",
      render: (date) => (
        <span> {moment(new Date(date)).format("DD/MM/YYYY")} </span>
      ),
      // render: (date) => <span>{moment(date).format("YYYY-MM-DD")}</span>,
      // sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: t("link"),
      dataIndex: "link",
      // sorter: {
      //   compare: (a, b) => {
      //     a = a.stadiumName.toLowerCase();
      //     b = b.stadiumName.toLowerCase();
      //     return a > b ? -1 : b > a ? 1 : 0;
      //   },
      // },
    },
    {
      title: t("display"),
      dataIndex: "display",
      render: (value) => {
        if (value) {
          return (
            <CheckCircleOutlined
              style={{ fontSize: "large", color: "green" }}
            />
          );
        } else {
          return (
            <CloseCircleOutlined style={{ fontSize: "large", color: "red" }} />
          );
        }
      },
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
  ];
  const displayValue = (value) => {
    if (value) {
      return (
        <Tooltip title="Displayed">
          <CheckCircleOutlined style={{ fontSize: "large", color: "green" }} />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Not displayed">
          <CloseCircleOutlined style={{ fontSize: "large", color: "red" }} />
        </Tooltip>
      );
    }
  };
  function transformLink(link) {
    if (link) {
      const url = new URL(link);
      const videoId = url.searchParams.get("v");
      const newPath = `/embed/${videoId}`;
      url.pathname = newPath;
      url.search = "rel=0"; // Add the rel=0 parameter to prevent suggestions

      return url.href;
    }
  }

  return (
    <>
      <Title level={2}> {t("All resgistered lives")} </Title>
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
                onClick={() => navigate(`/app/lives/add`)}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                {t("newslist.table.addButton")}
              </Button>

              <Button
                onClick={() => downloadAsZip(filteredLives)}
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
            // <Table columns={columns} dataSource={lives} rowKey="_id" />
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={filteredLives}
              renderItem={(item) => (
                <List.Item>
                  {/*                <Card title={item.link}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <p>
                          {moment(new Date(item.creationDate)).format(
                            "DD/MM/YYYY"
                          )}
                        </p>
                        <p>{displayValue(item.display)}</p>
                      </div>
                      <div className="text-right">
                        <EllipsisDropdown menu={dropdownMenu(item)} />
                      </div>
                    </div>
                        </Card>*/}

                  <Card
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>
                          {item.titled}
                          {"  "}
                          {displayValue(item.display)}
                        </span>{" "}
                        {/* Adjust your title here */}
                        <EllipsisDropdown menu={dropdownMenu(item)} />
                      </div>
                    }
                  >
                    <iframe
                      src={item.link}
                      title="YouTube video player"
                      width="100%"
                      height="300"
                      style={{ border: "none", overflow: "hidden" }}
                      allowFullScreen={true}
                      allow="autoplay; encrypted-media"
                    ></iframe>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </div>
      </Card>
    </>
  );
};

export default LivesList;
