import { createAction } from "../../utils/reducer/reducer.utils"
import { USER_ACTION_TYPEs } from "./user.types"

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPEs.SET_CURRENT_USER, user)
