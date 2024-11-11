import { t } from "i18next";
import moment from "moment";
export const rules = {
  articleName:[
    {required:true,
    message: t("actualite.addAndModify.step1.PersonnalInfoCard.articleName.errorMessage")
  }
  ],

  description:[
    {
      required: true,
      message: t(
        "actualite.addAndModify.step1.PersonnalInfoCard.description.errorMessage1"
      ),
    }
  ],
  adversaryLogo:[
    
      {
        required: true,
        message: `Logo de l'adversaire est requis`,
      }
    
  ],
  creationDate: [
    {
      required: true,
      message: t(
        "actualite.addAndModify.step1.PersonnalInfoCard.creationDate.errorMessage1"
      ),
    },

  ],

};
