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
import { deleteStaff, fetchStaffs } from "store/slices/staffSlice";
import LoadingData from "components/shared-components/LoadingData";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import StaffView from "./staffView";

const { confirm } = Modal;

const StafList = () => {
  const [staffProfileVisible, setStaffProfileVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, error, loading } = useSelector((state) => state.staffs);

  function generateCSV(data) {
    if (data) {
      const header = "Fullname,Email,Phone,Job\n";
      const csv = data.map(
        (item) =>
          `${item.fullName},${item.email},${item.numberPhone},${item.job}`
      );

      return header + csv.join("\n");
    } else {
      console.error("Data is undefined");
      return "";
    }
  }

  function downloadAsZip(data) {
    if (data) {
      const zip = new JSZip();
      const csvData = generateCSV(data);

      zip.file("exported_data.csv", csvData);
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "exported_data.zip");
      });
    } else {
      console.error("Data is undefined");
    }
  }

  useEffect(() => {
    dispatch(fetchStaffs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(t("Failed to retreive data. Please try again later."));
    }
  }, [error]);

  // useEffect(() => {
  //   if (searchText.trim() === "") {
  //     setFilteredUsers(users);
  //   } else {
  //     const filtered = users.filter(
  //       (user) =>
  //         user.email.toLowerCase().includes(searchText.trim().toLowerCase()) ||
  //         user.lastname
  //           .toLowerCase()
  //           .includes(searchText.trim().toLowerCase()) ||
  //         user.firstname.toLowerCase().includes(searchText.trim().toLowerCase())
  //     );
  //     setFilteredUsers(filtered);
  //   }
  // }, [users, searchText]);
  //search
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const search = (e) => {
    let query = e.target.value;
    let data = [];
    data = users.filter((item) => {
      return query === "" ? item : item.fullName.toLowerCase().includes(query);
    });
    setFilteredUsers(data);
  };

  const showStaffProfile = (info) => {
    setStaffProfileVisible(true);
    setSelectedStaff(info);
  };

  const closeStaffProfile = () => {
    setStaffProfileVisible(false);
    setSelectedStaff(null);
  };
  const stafParent = () => {
    navigate(`/app/headcount/staff/add`);
  };

  const showDeleteConfirm = async (id) => {
    confirm({
      title: t("Delete staff"),
      icon: <ExclamationCircleOutlined />,
      content: t("Are you sure you want to delete this staff?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        dispatch(deleteStaff(id))
          .unwrap()
          .then(() => {
            message.success({
              content: `${t("Deleted staff")} `,
              duration: 5,
            });
          })
          .catch((error) => {
            message.error(error);
          });
      },
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success(t("Text copied to clipboard!"));
      })
      .catch((error) => {
        message.error(t("Error copying text to clipboard"));
      });
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => showStaffProfile(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">{t("View Details")}</span>
        </Flex>
      </Menu.Item>
      <Menu.Item
        onClick={() => navigate(`/app/headcount/staff/edit/${row._id}`)}
        // disabled={row?.status === "PENDING" || row?.status === "REFUSED"}
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
      title: t("email_label"),
      dataIndex: "email",
      render: (email) => <span>{email}</span>,
    },
    {
      title: t("playerslist.table.phoneCell"),
      dataIndex: "numberPhone",
      render: (numberPhone) => <span>{numberPhone}</span>,
    },
    {
      title: t("Job"),
      dataIndex: "job",
      render: (job) => <span>{job}</span>,
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
              style={{ marginBottom: 16 }}
              onChange={(e) => {
                search(e);
              }}
              disabled={loading || error ? true : false}
            />
          </Flex>
        </Flex>
        <div>
          <Space>
            <Button
              onClick={stafParent}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              {t("Add player")}
            </Button>
            <Button
              onClick={() => downloadAsZip(filteredUsers)}
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
            columns={tableColumns}
            dataSource={filteredUsers}
            rowKey="_id"
          />
        )}
      </div>
      <StaffView
        data={selectedStaff}
        visible={staffProfileVisible}
        close={closeStaffProfile}
      />
    </Card>
  );
};

export default StafList;
