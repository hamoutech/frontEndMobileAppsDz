import React from "react"
import {
  AUTH_PREFIX_PATH,
  APP_PREFIX_PATH,
  REGISTER_PREFIX_PATH,
  REGISTER_ENTRY_KEY,
} from "configs/AppConfig"

export const publicRoutes = [
  {
    key: "login",
    path: `${AUTH_PREFIX_PATH}/login`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/login")
    ),
  },
  {
    key: "register",
    path: `${REGISTER_PREFIX_PATH}/register/${REGISTER_ENTRY_KEY}`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/register")
    ),
  },
  // {
  //   key: "forgot-password",
  //   path: `${AUTH_PREFIX_PATH}/forgot-password`,
  //   component: React.lazy(() =>
  //     import("views/auth-views/authentication/forgot-password")
  //   ),
  // },
  // {
  //   key: "forgot-password-changePassword",
  //   path: `${AUTH_PREFIX_PATH}/forgot-password/changePasswords/:token`,
  //   component: React.lazy(() =>
  //     import(
  //       "views/auth-views/authentication/forgot-password/ChangePasswordForm"
  //     )
  //   ),
  // },
]

export const protectedRoutes = [
  {
    key: "Acceuil",
    path: `${APP_PREFIX_PATH}/acceuil`,
    component: React.lazy(() => import("views/app-views/acceuil")),
  },
  // {
  //   key: "Users",
  //   path: `${APP_PREFIX_PATH}/users/*`,
  //   component: React.lazy(() => import("views/app-views/users")),
  // },
  // {
  //   key: "Users.liste",
  //   path: `${APP_PREFIX_PATH}/users/liste`,
  //   component: React.lazy(() => import("views/app-views/users/usersList")),
  // },
  // {
  //   key: "Users.add",
  //   path: `${APP_PREFIX_PATH}/users/add`,
  //   component: React.lazy(() => import("views/app-views/users/userAdd")),
  // },
  // {
  //   key: "Users.addRole",
  //   path: `${APP_PREFIX_PATH}/users/addRole`,
  //   component: React.lazy(() => import("views/app-views/users/roleAdd")),
  // },
  {
    key: "News",
    path: `${APP_PREFIX_PATH}/news/*`,
    component: React.lazy(() => import("views/app-views/news")),
  },
  {
    key: "News.list",
    path: `${APP_PREFIX_PATH}/news/liste`,
    component: React.lazy(() => import("views/app-views/news/newsList")),
  },
  {
    key: "News.add",
    path: `${APP_PREFIX_PATH}/news/add`,
    component: React.lazy(() => import("views/app-views/news/newsAdd")),
  },
  {
    key: "News.edit",
    path: `${APP_PREFIX_PATH}/news/edit/:id `,
    component: React.lazy(() => import("views/app-views/news/newsEdit")),
  },
  {
    key: "News.profile",
    path: `${APP_PREFIX_PATH}/news/profil/:id`,
    // component: React.lazy(() => import("views/app-views/news/newsProfile")),
  },
  {
    key: "Partner",
    path: `${APP_PREFIX_PATH}/partner/*`,
    component: React.lazy(() => import("views/app-views/partner")),
  },
  {
    key: "Partner.list",
    path: `${APP_PREFIX_PATH}/partner/liste`,
    component: React.lazy(() => import("views/app-views/partner/partnerList")),
  },
  {
    key: "Partner.add",
    path: `${APP_PREFIX_PATH}/partner/add`,
    component: React.lazy(() => import("views/app-views/partner/partnerAdd")),
  },
  {
    key: "Partner.edit",
    path: `${APP_PREFIX_PATH}/partner/edit/:id `,
    component: React.lazy(() => import("views/app-views/partner/partnerEdit")),
  },
  {
    key: "Partner.profile",
    path: `${APP_PREFIX_PATH}/partner/profil/:id`,
    // component: React.lazy(() => import("views/app-views/partner/partnerProfile")),
  },
  {
    key: "Ad",
    path: `${APP_PREFIX_PATH}/ad/*`,
    component: React.lazy(() => import("views/app-views/ad")),
  },
  {
    key: "Ad.list",
    path: `${APP_PREFIX_PATH}/ad/liste`,
    component: React.lazy(() => import("views/app-views/ad/adList")),
  },
  {
    key: "Ad.add",
    path: `${APP_PREFIX_PATH}/ad/add`,
    component: React.lazy(() => import("views/app-views/ad/adAdd")),
  },
  {
    key: "Ad.edit",
    path: `${APP_PREFIX_PATH}/ad/edit/:id `,
    component: React.lazy(() => import("views/app-views/ad/adEdit")),
  },
  {
    key: "Ad.profile",
    path: `${APP_PREFIX_PATH}/ad/profil/:id`,
    // component: React.lazy(() => import("views/app-views/ad/adProfile")),
  },

  {
    key: "Headcount",
    path: `${APP_PREFIX_PATH}/headcount/*`,
    component: React.lazy(() => import("views/app-views/headcount")),
  },
  {
    key: "Players.list",
    path: `${APP_PREFIX_PATH}/headcount/players`,
    component: React.lazy(() => import("views/app-views/headcount/playerList")),
  },
  {
    key: "Players.add",
    path: `${APP_PREFIX_PATH}/headcount/players/add`,
    component: React.lazy(() => import("views/app-views/headcount/playerAdd")),
  },
  {
    key: "Players.edit",
    path: `${APP_PREFIX_PATH}/headcount/players/edit/:id`,
    component: React.lazy(() => import("views/app-views/headcount/playerEdit")),
  },
  {
    key: "Staff.list",
    path: `${APP_PREFIX_PATH}/headcount/staff`,
    component: React.lazy(() => import("views/app-views/headcount/stafList")),
  },
  {
    key: "Staff.add",
    path: `${APP_PREFIX_PATH}/headcount/staff/add`,
    component: React.lazy(() => import("views/app-views/headcount/staffAdd")),
  },
  {
    key: "Staff.edit",
    path: `${APP_PREFIX_PATH}/headcount/staff/edit/:id`,
    component: React.lazy(() => import("views/app-views/headcount/stafEdit")),
  },

  {
    key: "Matchs",
    path: `${APP_PREFIX_PATH}/matchs/*`,
    component: React.lazy(() => import("views/app-views/match")),
  },
  {
    key: "Matchs.list",
    path: `${APP_PREFIX_PATH}/matchs/liste`,
    component: React.lazy(() => import("views/app-views/match/matchsList")),
  },
  {
    key: "Matchs.add",
    path: `${APP_PREFIX_PATH}/matchs/add`,
    component: React.lazy(() =>
      import("views/app-views/match/matchApplicationAdd")
    ),
  },
  {
    key: "Matchs.edit",
    path: `${APP_PREFIX_PATH}/matchs/edit/:id`,
    component: React.lazy(() =>
      import("views/app-views/match/matchApplicationEdit")
    ),
  },
  {
    key: "Staduim",
    path: `${APP_PREFIX_PATH}/stadium`,
    component: React.lazy(() => import("views/app-views/stadium")),
  },
  {
    key: "Club",
    path: `${APP_PREFIX_PATH}/club`,
    component: React.lazy(() => import("views/app-views/club")),
  },
  {
    key: "Live",
    path: `${APP_PREFIX_PATH}/lives`,
    component: React.lazy(() => import("views/app-views/live")),
  },
  {
    key: "Lives.list",
    path: `${APP_PREFIX_PATH}/lives/liste`,
    component: React.lazy(() => import("views/app-views/live/liveList")),
  },
  {
    key: "Live.add",
    path: `${APP_PREFIX_PATH}/lives/add`,
    component: React.lazy(() =>
      import("views/app-views/live/liveApplicationAdd")
    ),
  },
  {
    key: "Live.edit",
    path: `${APP_PREFIX_PATH}/lives/edit/:id`,
    component: React.lazy(() =>
      import("views/app-views/live/liveApplicationEdit")
    ),
  },
  {
    key: "Message",
    path: `${APP_PREFIX_PATH}/messages`,
    component: React.lazy(() => import("views/app-views/message")),
  },
  {
    key: "Messages.list",
    path: `${APP_PREFIX_PATH}/messages/liste`,
    component: React.lazy(() => import("views/app-views/message/messageList")),
  },
  {
    key: "Message.detail",
    path: `${APP_PREFIX_PATH}/messages/detail/:id`,
    component: React.lazy(() =>
      import("views/app-views/message/messageApplicationDetail")
    ),
  },
  {
    key: "Message.compose",
    path: `${APP_PREFIX_PATH}/messages/compose`,
    component: React.lazy(() =>
      import("views/app-views/message/messageCompose")
    ),
  },
  {
    key: "Message.Inbox",
    path: `${APP_PREFIX_PATH}/messages/inbox`,
    component: React.lazy(() => import("views/app-views/message/messageInbox")),
  },
  {
    key: "User.manageAccount",
    path: `${APP_PREFIX_PATH}/mon_compte/*`,
    component: React.lazy(() => import("views/app-views/account")),
  },
  {
    key: "Clien",
    path: `${APP_PREFIX_PATH}/clients/*`,
    component: React.lazy(() => import("views/app-views/clients")),
  },
  {
    key: "Client.list",
    path: `${APP_PREFIX_PATH}/clients/list`,
    component: React.lazy(() => import("views/app-views/clients/clientList")),
  },

  {
    key: "Cards",
    path: `${APP_PREFIX_PATH}/cards/*`,
    component: React.lazy(() => import("views/app-views/card")),
  },

  {
    key: "Cards",
    path: `${APP_PREFIX_PATH}/cards/list`,
    component: React.lazy(() => import("views/app-views/card/cardsList")),
  },
  {
    key: "Cards.add",
    path: `${APP_PREFIX_PATH}/cards/add`,
    component: React.lazy(() => import("views/app-views/card/cardAdd")),
  },
  {
    key: "cards.edit",
    path: `${APP_PREFIX_PATH}/cards/edit/:id`,
    component: React.lazy(() => import("views/app-views/card/cardEdit")),
  },
]
