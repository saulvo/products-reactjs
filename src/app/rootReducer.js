import { combineReducers } from "redux";
import langReducer from "../components/Header/languageSlice";
import authSlice from "../components/Header/authSlice";
import cartReducer from "../features/Cart/cartSlice";


const rootReducer = combineReducers({
  language: langReducer,
  cart: cartReducer,
  auth: authSlice
})

export default rootReducer;