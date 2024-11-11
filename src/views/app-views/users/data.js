// import {
//   DashboardOutlined,
//   WomanOutlined,
//   UserOutlined,
//   UnorderedListOutlined,
// } from "@ant-design/icons";

// export const privileges = [
//   {
//     key: "key-dashboards",
//     title: "Tableau de bord",
//     icon: DashboardOutlined,
//     allow: false,
//   },
//   {
//     key: "key-nannies",
//     title: "Nounou",
//     icon: WomanOutlined,
//     allow: false,
//   },
//   {
//     key: "key-parents",
//     title: "Parents",
//     icon: UserOutlined,
//     allow: false,
//   },
//   {
//     key: "key-jobs",
//     title: "Jobs",
//     icon: UnorderedListOutlined,
//     allow: false,
//   },
// ];

// export const users = [
//   {
//     id: 27,
//     name: "Uzumaki Naruto",
//     category: "Admin",
//     privileges: [
//       { id: "Tableau de bord", hasAccess: false },
//       { id: "Nounous", hasAccess: false },
//       { id: "Parents", hasAccess: false },
//       { id: "Jobs", hasAccess: true },
//     ],
//   },
//   {
//     id: 28,
//     name: "Gojo Satoru",
//     category: "Manager",
//     privileges: [
//       { id: "Tableau de bord", hasAccess: false },
//       { id: "Nounous", hasAccess: true },
//       { id: "Parents", hasAccess: false },
//       { id: "Jobs", hasAccess: true },
//     ],
//   },

//   {
//     id: 29,
//     name: "Kamado Tanjiro",
//     category: "Admin",
//     privileges: [
//       { id: "Tableau de bord", hasAccess: true },
//       { id: "Nounous", hasAccess: true },
//       { id: "Parents", hasAccess: false },
//       { id: "Jobs", hasAccess: false },
//     ],
//   },
//   {
//     id: 30,
//     name: "Shinsetsuna hito",
//     category: "Manager",
//     privileges: [
//       { id: "Tableau de bord", hasAccess: false },
//       { id: "Nounous", hasAccess: true },
//       { id: "Parents", hasAccess: true },
//       { id: "Jobs", hasAccess: true },
//     ],
//   },
//   {
//     id: 31,
//     name: "Uchiha Sasuke",
//     category: "Manager",
//     privileges: [
//       { id: "Tableau de bord", hasAccess: false },
//       { id: "Nounous", hasAccess: true },
//       { id: "Parents", hasAccess: false },
//       { id: "Jobs", hasAccess: true },
//     ],
//   },
//   {
//     id: 32,
//     name: "Mashle Burnehead",
//     category: "Admin",
//     privileges: [
//       { id: "Tableau de bord", hasAccess: false },
//       { id: "Nounous", hasAccess: true },
//       { id: "Parents", hasAccess: false },
//       { id: "Jobs", hasAccess: true },
//     ],
//   },
//   {
//     id: 33,
//     name: "Finance Reviewer APP",
//     category: "Satsuki aruko",
//     privileges: [
//       { id: "Tableau de bord", hasAccess: false },
//       { id: "Nounous", hasAccess: true },
//       { id: "Parents", hasAccess: false },
//       { id: "Jobs", hasAccess: true },
//     ],
//   },
// ];

import {
  DashboardOutlined,
  WomanOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export const privileges = [
  {
    key: "key-dashboards",
    title: "Dashboards",
    icon: DashboardOutlined,
    allow: false,
  },
  {
    key: "key-nannies",
    title: "Nannies",
    icon: WomanOutlined,
    allow: false,
  },
  {
    key: "key-parents",
    title: "Parents",
    icon: UserOutlined,
    allow: false,
  },
  {
    key: "key-jobs",
    title: "Jobs",
    icon: UnorderedListOutlined,
    allow: false,
  },
];

export const users = [
  {
    id: 27,
    name: "Uzumaki Naruto",
    category: "Admin",
    privileges: [
      { id: "Dashboards", hasAccess: false },
      { id: "Nannies", hasAccess: false },
      { id: "Parents", hasAccess: false },
      { id: "Jobs", hasAccess: true },
    ],
  },
  {
    id: 28,
    name: "Gojo Satoru",
    category: "Manager",
    privileges: [
      { id: "Dashboards", hasAccess: false },
      { id: "Nannies", hasAccess: true },
      { id: "Parents", hasAccess: false },
      { id: "Jobs", hasAccess: true },
    ],
  },

  {
    id: 29,
    name: "Kamado Tanjiro",
    category: "Admin",
    privileges: [
      { id: "Dashboards", hasAccess: true },
      { id: "Nannies", hasAccess: true },
      { id: "Parents", hasAccess: false },
      { id: "Jobs", hasAccess: false },
    ],
  },
  {
    id: 30,
    name: "Shinsetsuna hito",
    category: "Manager",
    privileges: [
      { id: "Dashboards", hasAccess: false },
      { id: "Nannies", hasAccess: true },
      { id: "Parents", hasAccess: true },
      { id: "Jobs", hasAccess: true },
    ],
  },
  {
    id: 31,
    name: "Uchiha Sasuke",
    category: "Manager",
    privileges: [
      { id: "Dashboards", hasAccess: false },
      { id: "Nannies", hasAccess: true },
      { id: "Parents", hasAccess: false },
      { id: "Jobs", hasAccess: true },
    ],
  },
  {
    id: 32,
    name: "Mashle Burnehead",
    category: "Admin",
    privileges: [
      { id: "Dashboards", hasAccess: false },
      { id: "Nannies", hasAccess: true },
      { id: "Parents", hasAccess: false },
      { id: "Jobs", hasAccess: true },
    ],
  },
  {
    id: 33,
    name: "Satsuki aruko",
    category: "Manager",
    privileges: [
      { id: "Dashboards", hasAccess: false },
      { id: "Nannies", hasAccess: true },
      { id: "Parents", hasAccess: false },
      { id: "Jobs", hasAccess: true },
    ],
  },
];
