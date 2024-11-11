import { t } from "i18next";
import moment from "moment";
export const rules = {
  email: [
    {
      required: true,
      message: t("Please enter email"),
    },
    {
      type: "email",
      message: t("Email is not valid"),
    },
  ],

  fullName: [
    {
      required: true,
      message: t("fullName required"),
    },
    () => ({
      validator(_, value) {
        const pattern = /^[\sa-zA-Z\b]*$/; // regular expression pattern to match letters only
        if (value && !pattern.test(value)) {
          return Promise.reject(t("Field is not valid"));
        }
        return Promise.resolve();
      },
    }),
  ],
  position: [
    {
      required: true,
      message: t("Job required"),
    },
    // () => ({
    //   validator(_, value) {
    //     const pattern = /^[\sa-zA-Z\b]*$/; // regular expression pattern to match letters only
    //     if (value && !pattern.test(value)) {
    //       return Promise.reject(t("Field is not valid"));
    //     }
    //     return Promise.resolve();
    //   },
    // }),
  ],
  lastName: [
    {
      required: true,
      message: t("fullName required"),
    },
    () => ({
      validator(_, value) {
        const pattern = /^[\sa-zA-Z\b]*$/; // regular expression pattern to match letters only
        if (value && !pattern.test(value)) {
          return Promise.reject(t("Field is not valid"));
        }
        return Promise.resolve();
      },
    }),
  ],
  firstname: [
    {
      required: true,
      message: t("Firstame required"),
    },
    () => ({
      validator(_, value) {
        const pattern = /^[\sa-zA-Z\b]*$/; // regular expression pattern to match letters only
        if (value && !pattern.test(value)) {
          return Promise.reject(t("Field is not valid"));
        }
        return Promise.resolve();
      },
    }),
  ],
  image:[{
    required:true,
    message:t("Picture required")
  }

  ],
  goals:[{ required: true, message: t("Goals required") }],
  birthdate: [
    {
      required: true,
      message: t("birthdate required"),
    },
    // () => ({
    //   validator(_, birthdate) {
    //     if (moment().diff(birthdate, "years") < 18) {
    //       return Promise.reject(t("You must be over 18 years old"));
    //     }
    //     return Promise.resolve();
    //   },
    // }),
  ],
  countryId: [
    {
      required: true,
      message: "Please select a country code",
    },
  ],
  gender: [
    {
      required: true,
      message: t("gender required"),
    },
  ],
  situation: [
    {
      required: true,
      message: t("Please select yout current situation"),
    },
  ],
  address: [
    {
      required: true,
      message: t("Address required"),
    },
  ],
  phoneNumber: [
    {
      required: true,
      message: t("Phone number required"),
    },
  ],
  NbrOfOwnedChildren:[
    {
      required: true,
      message: t("Field required"),
    },
  ]
,

  zipCode: [
    {
      required: true,
      message: t("Zip code required"),
    },
  ],
};
