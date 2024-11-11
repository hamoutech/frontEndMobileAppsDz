import { Drawer, Button, Divider, Image } from "antd"
import { t } from "i18next"
import {
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import moment from "moment"
import { IMAGE_URL } from "constants/imageUrl"

const CardView = ({ data, visible, close }) => {
  const creationDate = moment(data?.creationDate).format("DD/MM/YYYY")

  return (
    <Drawer width={300} placement="right" onClose={close} open={visible}>
      <h3>{data?.titled}</h3>
      <Divider dashed />
      <p>
        <CalendarOutlined /> {t("Creation Date")}: {creationDate}
      </p>
      <p>
        <DollarOutlined /> {t("Total Price")}: ${data?.totalPrice}
      </p>
      <p>
        <TeamOutlined /> {t("Number of Matches")}: {data?.numberOfMatches}
      </p>
      <p>
        {t("Description")}: {data?.description}
      </p>
      <Divider />
      {data?.image?.map((img, idx) => (
        <Image
          key={idx}
          src={`${IMAGE_URL}${img.filename}`}
          alt={`card-image`}
          style={{ marginBottom: 10 }}
        />
      ))}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button type="primary" onClick={close}>
          {t("Close")}
        </Button>
      </div>
    </Drawer>
  )
}

export default CardView
