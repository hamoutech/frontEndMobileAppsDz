import { Drawer, Avatar, Divider, Button } from "antd"
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons"
import { t } from "i18next"
import { IMAGE_URL } from "constants/imageUrl"

const ClientView = ({ data, visible, close }) => {
  const url = `${IMAGE_URL}${data?.image[0]?.filename}`
  return (
    <Drawer
      width={300}
      placement="right"
      onClose={close}
      visible={visible}
      closable={false}
    >
      <div className="text-center mt-3">
        <Avatar size={64} src={url} icon={!data?.image && <UserOutlined />} />
        <h3 className="mt-2 mb-0">{data?.pseudo}</h3>
        <p className="text-muted">
          {data?.status ? t("Active") : t("Inactive")}
        </p>
      </div>
      <Divider dashed />
      <div>
        <h6 className="text-muted text-uppercase mb-3">
          {t("Client Information")}
        </h6>
        <p>
          <MailOutlined />
          <span className="ml-3">{data?.email}</span>
        </p>
        <p>
          <PhoneOutlined />
          <span className="ml-3">{data?.phoneNumber}</span>
        </p>
        <p>
          <UserOutlined />
          <span className="ml-3">
            {t("Club Name")}: {data?.clubName}
          </span>
        </p>
        <p>
          <UserOutlined />
          <span className="ml-3">
            {t("Gender")}: {data?.gender}
          </span>
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button type="primary" onClick={close}>
          {t("Close")}
        </Button>
      </div>
    </Drawer>
  )
}

export default ClientView
