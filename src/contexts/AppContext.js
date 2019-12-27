import {
  createContext,
} from "react";


const AppContext = createContext({
  userContext: {},
  categoryContext: {},
  activityContext: {},
});


export default AppContext;