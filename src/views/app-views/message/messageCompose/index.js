import React from "react";
import MailCompose from "./MailCompose";
import InnerAppLayout from "layouts/inner-app-layout";
import MailMenu from "../messageList/MailMenu";
const MessageCompose = () => {
  return (
    <div className="mail">
      <InnerAppLayout
        sideContent={<MailMenu url="app/messages/liste/" />}
        mainContent={<MailCompose />}
        border
      />
    </div>
  );
};

export default MessageCompose;
