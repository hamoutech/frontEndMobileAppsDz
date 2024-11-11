import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Tag,
  Tooltip,
  Divider,
  message,
  Button,
  Input,
  Menu,
  Modal,
  Space,
  Result,
  Select,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { t } from "i18next";
import Flex from "components/shared-components/Flex";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import LoadingData from "components/shared-components/LoadingData";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import {
  deletePlayer,
  fetchJoueurs,
  getPlayersByFullName,
} from "store/slices/joueurSlice";
import PlayerView from "./playerView";

const { confirm } = Modal;

const PlayersList = () => {
  const [playerProfileVisible, setPlayerProfileVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { joueurs, error, loading, playersByFullName } = useSelector(
    (state) => state.joueurs
  );

  function generateCSV(data) {
    const header = "Fullname,dateOfBirth,numberPhone,position\n";
    const csv = data.map(
      (item) =>
        `${item.fullName},${item.dateOfBirth},${item.numberPhone},${item.position}`
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

  useEffect(() => {
    dispatch(fetchJoueurs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(t("Failed to retreive data. Please try again later."));
    }
  }, [error]);

  //search
  const [filteredJoueurs, setFilteredJoueurs] = useState([]);
  useEffect(() => {
    setFilteredJoueurs(joueurs);
  }, [joueurs]);

  const search = (e) => {
    let query = e.target.value;
    let data = [];
    let lesJoueurs;
    if (!filteredJoueurs) {
      lesJoueurs = joueurs;
    } else {
      lesJoueurs = filteredJoueurs;
    }
    data = lesJoueurs.filter((item) => {
      return query === "" ? item : item.fullName.toLowerCase().includes(query);
    });
    setFilteredJoueurs(data);
  };

  const showPlayerProfile = (info) => {
    setPlayerProfileVisible(true);
    setSelectedPlayer(info);
  };

  const closePlayerProfile = () => {
    setPlayerProfileVisible(false);
    setSelectedPlayer(null);
  };
  const addPlayer = () => {
    navigate(`/app/headcount/players/add`);
  };

  const showDeleteConfirm = async (id) => {
    confirm({
      title: t("Delete player"),
      icon: <ExclamationCircleOutlined />,
      content: t("Are you sure you want to delete this player?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        dispatch(deletePlayer(id))
          .unwrap()
          .then(() => {
            message.success({
              content: `${t("Deleted player")}`,
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
      <Menu.Item onClick={() => showPlayerProfile(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">{t("View Details")}</span>
        </Flex>
      </Menu.Item>
      <Menu.Item
        onClick={() => navigate(`/app/headcount/players/edit/${row._id}`)}
      >
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">{t("Edit profile")}</span>
        </Flex>
      </Menu.Item>

      <Divider className="m-0" />
      <Menu.Item onClick={() => showDeleteConfirm(row._id)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">{t("Delete")}</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  function generateAvatar(username) {
    const avatar = createAvatar(initials, {
      seed: username,
      radius: 50,
      backgroundColor: [
        "00acc1",
        "5e35b1",
        "1e88e5",
        "d81b60",
        "e53935",
        "7cb342",
      ],
    }).toDataUriSync();
    return avatar;
  }

  const tableColumns = [
    {
      title: t("Fullname"),
      dataIndex: "fullName",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            src={generateAvatar(record.fullName)}
            name={` ${record.fullName}`}
            // subTitle={record.email}
          />
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.fullName.toLowerCase();
          b = b.fullName.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },

    {
      title: t("playerslist.table.createdAtCell"),
      dataIndex: "dateOfBirth",
      render: (date) => (
        <span> {moment(new Date(date)).format("DD/MM/YYYY")} </span>
      ),
      // sorter: (a, b) => moment(a.dateOfBirth).unix() - moment(b.dateOfBirth).unix(),
    },
    {
      title: t("playerslist.table.phoneCell"),
      dataIndex: "numberPhone",
      render: (phone) => <span>{phone}</span>,
    },
    {
      title: t("playerslist.table.posteCell"),
      dataIndex: "position",
      render: (poste) => <span>{poste}</span>,
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
  const filterBycategory = (selectedcategory) => {
    let data;

    if (selectedcategory.length === 0) {
      // If no category is selected, display all Joueurs
      data = joueurs;
    } else {
      // Otherwise, filter the Joueurs based on selected categorys
      data = joueurs.filter((joueur) =>
        selectedcategory.includes(joueur.category)
      );
    }

    setFilteredJoueurs(data);
  };

  return (
    <Card bodyStyle={{ padding: "0px" }}>
      <Flex
        alignItems="center"
        justifyContent="between"
        mobileFlex={false}
        className="p-3"
      >
        <Flex className="mb-1" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}>
            <Input
              placeholder={t("Search")}
              allowClear
              onChange={(e) => {
                search(e);
              }}
              style={{ marginBottom: 16 }}
              // disabled={loading || error ? true :  false}
            />
          </Flex>
        </Flex>
        {/* <Select
          placeholder={t("Choose the category")}
          maxTagCount="responsive"
          style={{
            width: "50%",
            marginBottom: 16,
          }}
          options={[
            {
              value: "Senior",
              label: "Senior",
            },
            {
              value: "Junior",
              label: "Junior",
            },
            {
              value: "Cadet",
              label: "Cadet",
            },
            {
              value: "Minime",
              label: "Minime",
            },
            {
              value: "Pupilles",
              label: "Pupilles",
            },
          ]}
          onChange={(e) => {
            filterBycategory(e);
          }}
        /> */}
        <div>
          <Space>
            <Button
              onClick={addPlayer}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              {t("Add player")}
            </Button>
            <Button
              onClick={() => downloadAsZip(filteredJoueurs)}
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
      {/* <div className="table-responsive">
        {
          loading ? (
            <LoadingData />
          ) : error? 
          <Result
          status="error"
          title={t("Error")}
          subTitle={t("Something wrong, we can't retrieve this data")}/>  : 
          <Table columns={tableColumns} dataSource={Array.isArray(filteredUsers) ? filteredUsers : []}rowKey="_id" />
        }
        
      </div> */}
      <div className="table-responsive">
        {loading ? (
          <LoadingData />
        ) : error ? (
          <Result
            status="error"
            title="Error"
            subTitle="Something went wrong. We can't retrieve this data."
          />
        ) : (
          <Table
            columns={tableColumns}
            dataSource={filteredJoueurs}
            rowKey="_id"
          />
        )}
      </div>
      <PlayerView
        data={selectedPlayer}
        visible={playerProfileVisible}
        close={closePlayerProfile}
      />
    </Card>
  );
};

export default PlayersList;
