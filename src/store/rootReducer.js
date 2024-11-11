import { combineReducers } from "redux"
import theme from "./slices/themeSlice"
import auth from "./slices/authSlice"
import users from "./slices/usersSlice"
import staffs from "./slices/staffSlice"
import joueurs from "./slices/joueurSlice"
import matchs from "./slices/matchSlice"
import account from "./slices/accountSlice"
import news from "./slices/newsSlice"
import partner from "./slices/partnerSlice"
import lives from "./slices/liveSlice"
import stadium from "./slices/stadiumSlice"
import messages from "./slices/messageSlice"
import roles from "./slices/roleSlice"
import ad from "./slices/adSlice"
import client from "./slices/clientSlice"
import card from "./slices/carteSlice"

const rootReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    theme,
    auth,
    users,
    staffs,
    joueurs,
    matchs,
    account,
    news,
    lives,
    stadium,
    messages,
    partner,
    roles,
    ad,
    client,
    card,

    ...asyncReducers,
  })
  return combinedReducer(state, action)
}

export default rootReducer
