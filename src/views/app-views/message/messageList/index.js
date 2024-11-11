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
import { fetchMessages } from "store/slices/messageSlice";

import InnerAppLayout from "layouts/inner-app-layout";
import MailMenu from "./MailMenu";
import MailItem from "../messageInbox/MailItem";
const { Title } = Typography;

const { confirm } = Modal;

const MessagesList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, messages, error } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(t("Failed to retreive data. Please try again later."));
    }
  }, [error]);

  return (
    <>
      {/* <div>
          {loading ? (
            <LoadingData />
          ) : error ? (
            <Result
              status="error"
              title={t("Error")}
              subTitle={t("Something wrong, we can't retrieve this data")}
            />
          ) : (
            <Table columns={columns} dataSource={messages} rowKey="_id" />
          )}
        </div> */}
      <div className="mail">
        <InnerAppLayout
          sideContent={<MailMenu url="app/messages/liste/" />}
          mainContent={<MailItem />}
          border
        />
      </div>
    </>
  );
};

export default MessagesList;
