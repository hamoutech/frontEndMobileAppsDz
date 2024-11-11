import { t } from "i18next"
export const rules = {
  title: [
    {
      required: true,
      message: t("the company name is required"),
    },
  ],

  description: [
    {
      required: true,
      message: t("the description is required"),
    },
  ],
  image: [
    {
      required: true,
      message: t("the image is required"),
    },
  ],

  duration: [
    {
      required: true,
      message: t("the duration is required"),
    },
  ],
  location: [
    {
      required: true,
      message: t("the location is required"),
    },
  ],
}
