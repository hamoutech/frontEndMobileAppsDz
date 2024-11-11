import { t } from "i18next";
import moment from "moment";
export const rules = {
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
      message: t("Position required"),
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

  image: [
    {
      required: true,
      message: t("Picture required"),
    },
  ],
  goals: [{ required: true, message: t("Goals required") }],
  birthdate: [
    {
      required: true,
      message: t("birthdate required"),
    },
  ],
  birthPlace: [
    {
      required: true,
      message: t("birthPlace required"),
    },
  ],

  phoneNumber: [
    {
      required: true,
      message: t("Phone number required"),
    },
  ],
  categorie: [
    {
      required: true,
      message: t("Categorie required"),
    },
  ],
};
