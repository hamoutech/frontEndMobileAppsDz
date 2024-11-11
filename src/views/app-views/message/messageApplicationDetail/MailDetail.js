import React, { useState, useEffect } from "react";
import MailData from "assets/data/mail.data.json";
import { ReplySVG } from "assets/svg/icon";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { Modal, Tooltip, message as antdmessage } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  LeftCircleOutlined,
  StarOutlined,
  DeleteOutlined,
  StarFilled,
  DownloadOutlined,
} from "@ant-design/icons";

import { useParams, useNavigate } from "react-router-dom";
import CustomIcon from "components/util-components/CustomIcon";
import { deleteMessage, fetchOneMessage } from "store/slices/messageSlice";
import { getUser } from "store/slices/authSlice";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { t } from "i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const MailDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, message, loading } = useSelector((state) => state.messages);
  useEffect(() => {
    dispatch(fetchOneMessage(id));
  }, [dispatch, id]);
  const [starred, setStarred] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);

  //   useEffect(() => {
  //     dispatch(hideError());
  //   }, []);
  const tick = () => {
    setStarred(!starred);
  };

  const back = () => {
    navigate(-1);
  };
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
  const { confirm } = Modal;
  const showDeleteConfirm = async (id) => {
    confirm({
      title: t("Delete message"),
      icon: <ExclamationCircleOutlined />,
      content: t("Are you sure to delete this message?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk() {
        dispatch(deleteMessage(id))
          .unwrap()
          .then(() => {
            antdmessage.success({
              content: `${t("Deleted message")}`,
              duration: 5,
            });
            back();
          })
          .catch((error) => {
            antdmessage.error(error);
          });
      },
    });
  };

  const { email, createdDate, lastName, firstName } = message;

  return (
    <div className="mail-detail">
      <div className="d-lg-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center mb-3">
          <div
            className="font-size-md mr-3"
            onClick={() => {
              back();
            }}
          >
            <LeftCircleOutlined className="mail-detail-action-icon font-size-md ml-0" />
          </div>
          <AvatarStatus
            src={generateAvatar(firstName)}
            name={firstName}
            subTitle={`To: ${user.email}`}
          />
        </div>
        <div className="mail-detail-action mb-3">
          <span className="mr-2 font-size-md">{createdDate}</span>
          <Tooltip title="Reply">
            <CustomIcon className="mail-detail-action-icon" svg={ReplySVG} />
          </Tooltip>
          <Tooltip
            title="Star"
            onClick={() => {
              tick();
            }}
          >
            {starred ? (
              <StarFilled className="mail-detail-action-icon star checked" />
            ) : (
              <StarOutlined className="mail-detail-action-icon star" />
            )}
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              className="mail-detail-action-icon"
              onClick={() => showDeleteConfirm(message._id)}
            />
          </Tooltip>
        </div>
      </div>
      <div className="mail-detail-content">
        <h3 className="mb-4">{email}</h3>
        <div dangerouslySetInnerHTML={{ __html: message.message }} />
      </div>
    </div>
  );
};

export default MailDetail;
