import {
  CaretDownFilled,
  DashboardOutlined,
  UserAddOutlined,
} from "@ant-design/icons"
import { IdcardOutlined } from "@ant-design/icons"

import CollectionsIcon from "@mui/icons-material/Collections"
import { UserOutlined } from "@ant-design/icons"
import { UnorderedListOutlined } from "@ant-design/icons"
import { UsergroupAddOutlined } from "@ant-design/icons"
import { MedicineBoxOutlined } from "@ant-design/icons"
import {
  HomeOutlined,
  MailOutlined,
  VideoCameraOutlined,
  EnvironmentOutlined,
  TagOutlined,
} from "@ant-design/icons"
import { CardMembership } from "@mui/icons-material"

import { APP_PREFIX_PATH } from "configs/AppConfig"

const dashBoardNavTree = [
  {
    key: "Acceuil",
    path: `${APP_PREFIX_PATH}/acceuil`,
    title: "Acceuil",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Club",
    path: `${APP_PREFIX_PATH}/club`,
    title: "Club",
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Stadium",
    path: `${APP_PREFIX_PATH}/stadium`,
    title: "Stadium",
    icon: EnvironmentOutlined,
    breadcrumb: false,
    submenu: [],
  },

  {
    key: "Partner",
    path: `${APP_PREFIX_PATH}/partner`,
    title: "Partner",
    icon: UsergroupAddOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Ad",
    path: `${APP_PREFIX_PATH}/ad`,
    title: "Ad",
    icon: TagOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "headcount",
    path: `${APP_PREFIX_PATH}/headcount`,
    title: "Effectif",
    icon: UserOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: "Players",
        path: `${APP_PREFIX_PATH}/headcount/players`,
        title: "Joueurs",
        icon: "",
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "Staff",
        path: `${APP_PREFIX_PATH}/headcount/staff`,
        title: "Staff",
        icon: "",
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
  {
    key: "Matchs",
    path: `${APP_PREFIX_PATH}/matchs`,
    title: "Matchs",
    icon: UnorderedListOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "News",
    path: `${APP_PREFIX_PATH}/news`,
    title: "News",
    icon: MedicineBoxOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "clients",
    path: `${APP_PREFIX_PATH}/clients`,
    title: "Clients",
    icon: UserAddOutlined,
    breadcrumb: false,
    submenu: [],
  },

  {
    key: "cartes",
    path: `${APP_PREFIX_PATH}/cards`,
    title: "Cards",
    icon: IdcardOutlined,
    breadcrumb: false,
    submenu: [],
  },

  {
    key: "TV",
    path: `${APP_PREFIX_PATH}/lives`,
    title: "TV",
    icon: VideoCameraOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Message",
    path: `${APP_PREFIX_PATH}/messages`,
    title: "Message",
    icon: MailOutlined,
    breadcrumb: false,
    submenu: [],
  },
]

const navigationConfig = [...dashBoardNavTree]

export default navigationConfig
