import { axiosPrivate } from "api/axios";
import { AUTH_TOKEN, REFRESH_TOKEN } from "constants/AuthConstant";

const MessageService = {};
// MessageService.addmessage = function (data) {
//   if (data instanceof FormData) {
//     for (let obj of data) {
//       console.log(obj, "Message");
//     }
//     console.log(data, "data Message is FormData");
//   } else {
//     console.log("data Message is not FormData");
//   }

//   return axiosPrivate({
//     method: "post",
//     url: "/api/message/createMessage",
//     data: data,
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// MessageService.UpdateMessage = function (id, data) {
//   return axiosPrivate({
//     method: "put",
//     url: `/api/message/updateMessage/${id}`,
//     data: data,
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

MessageService.getMessages = function () {
  return axiosPrivate({
    method: "get",
    url: `/api/message/getAllMessages`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

MessageService.getOneMessage = function (id) {
  return axiosPrivate({
    method: "get",
    url: `/api/message/getMessageById/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};
MessageService.deleteMessage = function (id) {
  return axiosPrivate({
    method: "delete",
    url: `/api/message/deleteMessageById/${id}`,

    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
    },
  });
};

export default MessageService;
