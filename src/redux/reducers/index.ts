import { combineReducers } from "@reduxjs/toolkit";

import membershipSlice from "./membership";
import informationSlice from "./information";
import transactionSlice from "./transaction";

export default combineReducers({
  membership: membershipSlice,
  information: informationSlice,
  transaction: transactionSlice,
});
