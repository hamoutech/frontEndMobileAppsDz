import React from "react";
import MailDetail from "./MailDetail";
import InnerAppLayout from "layouts/inner-app-layout";
import MailMenu from "../messageList/MailMenu";
const MessageDetail = () => {
  return (
    <div className="mail">
      <InnerAppLayout
        sideContent={<MailMenu url="app/messages/liste/" />}
        mainContent={<MailDetail />}
        border
      />
    </div>
  );
};

export default MessageDetail;
