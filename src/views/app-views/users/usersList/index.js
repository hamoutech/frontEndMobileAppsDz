import { useEffect, useState } from "react";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  MedicineBoxOutlined,
  UsergroupAddOutlined,
  PlusOutlined,
  ToolOutlined,
  DeleteOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleOutlined,
  LineChartOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {
  Pagination,
  Button,
  Row,
  Col,
  Tag,
  Avatar,
  Menu,
  Card,
  Collapse,
  List,
  Drawer,
  Form,
  Switch,
  Modal,
  message,
  Result,
} from "antd";
import { Link } from "react-router-dom";
import { bottts } from "@dicebear/collection";
import Icon from "components/util-components/Icon/index.js";
import { createAvatar } from "@dicebear/core";
import { useNavigate } from "react-router-dom";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  fetchOneUser,
  updateUser,
  deleteUser,
} from "store/slices/usersSlice.js";
import LoadingData from "components/shared-components/LoadingData";

const { confirm } = Modal;
const { Panel } = Collapse;

const ItemAction = ({ data, handleVisible, handledelete }) => (
  <EllipsisDropdown
    menu={
      <Menu>
        {!(data.roles === "ADMIN") && (
          <Menu.Item key="1" onClick={() => handleVisible(data.id)}>
            <ToolOutlined />
            <span className="ml-2">{t("Manage privileges")}</span>
          </Menu.Item>
        )}
        <Menu.Item key="2" onClick={() => handledelete(data.id)}>
          <DeleteOutlined />
          <span className="ml-2">{t("Delete")}</span>
        </Menu.Item>
      </Menu>
    }
  />
);

const ItemHeader = ({ username, email, roles }) => {
  const avatar = createAvatar(bottts, {
    seed: username,
    radius: 50,
  }).toDataUriSync();

  return (
    <Flex className="mb-3">
      <Avatar size={"large"} src={avatar} />
      <div className="pl-2">
        <h4 className="mb-2">{username}</h4>
        <h5 className="mb-2">{email}</h5>
        <Tag color={roles === "MANAGER" ? "orange" : "magenta"}>{t(roles)}</Tag>
      </div>
    </Flex>
  );
};

const ListItem = ({ data, handleVisible, handledelete }) => {
  return (
    <Card className={` rounded mb-3 border`}>
      <Flex alignItems="center" justifyContent="between">
        <ItemHeader username={data.name} email={data.email} roles={data.role} />

        <ItemAction
          data={data}
          handleVisible={handleVisible}
          handledelete={handledelete}
        />
      </Flex>
      {data.roles === "MANAGER" && (
        <div className="mt-2">
          <Collapse ghost>
            <Panel header={t("See the privileges")} key="1">
              <List
                itemLayout="horizontal"
                dataSource={data.privileges}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      item.hasAccess ? (
                        <CheckCircleTwoTone
                          style={{ fontSize: "20px" }}
                          twoToneColor={"#52c41a"}
                        />
                      ) : (
                        <CloseCircleTwoTone
                          style={{ fontSize: "20px" }}
                          twoToneColor={"red"}
                        />
                      ),
                    ]}
                  >
                    <List.Item.Meta title={t(item.id)} />
                  </List.Item>
                )}
              />
            </Panel>
          </Collapse>
        </div>
      )}
    </Card>
  );
};

export const getIcon = (id, classname) => {
  switch (id) {
    case "Acceuil":
      return <DashboardOutlined className={classname} />;
    case "Dashboards":
      return <LineChartOutlined className={classname} />;
    case "Club":
      return <HomeOutlined className={classname} />;
    case "Stadium":
      return <EnvironmentOutlined className={classname} />;
    case "Partner":
      return <UsergroupAddOutlined className={classname} />;
    case "headcount":
      return <UserOutlined className={classname} />;
    case "Matchs":
      return <UnorderedListOutlined className={classname} />;
    case "News":
      return <MedicineBoxOutlined className={classname} />;
    case "TV":
      return <VideoCameraOutlined className={classname} />;
    case "Message":
      return <MailOutlined className={classname} />;
    case "Boutique":
      return <ShopOutlined className={classname} />;
    default:
      return <UserOutlined className={classname} />;
  }
};
const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { users, user, loading, error } = useSelector((state) => state.users);

  const [visible, setVisible] = useState(false); // for the drawer
  const [page, setPage] = useState(1); // for the pagination
  const [pageSize, setPageSize] = useState(10); // for the number of results to display perpage
  const [config, setConfig] = useState([]); // the object of the privileges

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, visible]);

  useEffect(() => {
    if (user) {
      setConfig(user?.privileges);
    }
  }, [user]);

  const handleSwitchChange = (checked, item) => {
    const updatedConfig = config.map((elm) => {
      if (elm.id === item.id) {
        return { ...elm, hasAccess: checked };
      }
      return elm;
    });
    setConfig(updatedConfig);
  };

  const onUpdatePrivileges = () => {
    dispatch(updateUser({ id: user.id, data: config }))
      .then(() => message.success(t("Privileges updated!")))
      .catch((error) => message.error(error));
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const itemsToDisplay = users.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const showDeleteConfirm = async (id) => {
    confirm({
      title: t("Delete user"),
      icon: <ExclamationCircleOutlined />,
      content: t("Are you to delete this user?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        dispatch(deleteUser(id))
          .unwrap()
          .then(() => {
            message.success({
              content: `${t("Deleted user")} ${id}`,
              duration: 2,
            });
          })
          .catch((error) => {
            message.error(error);
          });
        dispatch(fetchUsers);
      },
    });
  };

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center" className="py-4">
            <div>
              <Icon className="font-size-lg" type={UsergroupAddOutlined} />
              <h2 style={{ display: "inline-block", margin: "10px" }}>
                {t("All users")}
              </h2>
            </div>
            <Link to={"/app/users/addRole"}>
              <Button
                size="large"
                type="default"
                className="mr-5"
                style={{ backgroundColor: "red", color: "white" }}
              >
                <PlusOutlined />
                <span>{t("New Role")}</span>
              </Button>
            </Link>
            <Link to={"/app/users/add"}>
              <Button size="large" type="primary" className="mr-5">
                <PlusOutlined />
                <span>{t("New user")}</span>
              </Button>
            </Link>
          </Flex>
        </div>
      </PageHeaderAlt>
      {loading ? (
        <>
          <LoadingData />
          <LoadingData />
        </>
      ) : error ? (
        <Result
          status="error"
          title={t("Error")}
          subTitle={t("Something wrong, we can't retrieve this data")}
        />
      ) : (
        <Row gutter={16} className={"my-4 container-fluid"}>
          {itemsToDisplay?.map((elm) => (
            <Col xs={24} sm={24} lg={12} xl={12} xxl={8} key={elm._id}>
              <ListItem
                data={elm}
                handledelete={() => showDeleteConfirm(elm._id)}
                handleVisible={(id) => {
                  setVisible(true);
                  dispatch(fetchOneUser(id));
                }}
              />
            </Col>
          ))}
          <Col xs={24} sm={24} lg={24} xl={24} xxl={24}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                current={page}
                pageSize={pageSize}
                total={users.length}
                onChange={handlePageChange}
              />
            </div>
          </Col>
        </Row>
      )}

      <Drawer
        title={`${t("Privilege Management")} : ${user?.username} `}
        placement="right"
        closable={true}
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onUpdatePrivileges}
          name="user-form"
          className="ant-advanced-search-form"
        >
          <Flex flexDirection="column">
            <div>
              <List
                itemLayout="horizontal"
                dataSource={config}
                renderItem={(item) => (
                  <List.Item>
                    <Flex
                      justifyContent="between"
                      alignItems="center"
                      className="w-100"
                    >
                      <div className="d-flex align-items-center">
                        {getIcon(item.id, "h1 mb-0 text-primary")}
                        <div className="ml-3">
                          <h4 className="mb-0">{t(item.id)}</h4>
                        </div>
                      </div>

                      <Switch
                        onChange={(checked) =>
                          handleSwitchChange(checked, item)
                        }
                        checked={
                          user?.privileges &&
                          user?.privileges.length > 0 &&
                          item.hasAccess
                        }
                      />
                    </Flex>
                  </List.Item>
                )}
              />
            </div>
            <div className="mt-5">
              <Button type="primary" htmlType="submit" className="mr-2">
                {t("Submit")}
              </Button>

              <Button onClick={() => setVisible(false)}>{t("Cancel")}</Button>
            </div>
          </Flex>
        </Form>
      </Drawer>
    </>
  );
};

export default UsersList;
