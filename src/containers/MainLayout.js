import React from "react";
// COMPONENTs
import AppRouter from "@/AppRouter";
// CONTEXT
import AppContext from "@/contexts/AppContext";
import {
  useFetchUserInfo,
} from "@/hooks/useFetchUserInfo";
import {
  useFetchCategory,
} from "@/hooks/useFetchCategory";
// import {
//   useFetchActivities,
// } from "@/hooks/useFetchActivities";


const MainLayout = ({
  user,
}) => {

  // APP CONTEXT
  const userContext = useFetchUserInfo(user && user.uid);
  const categoryContext = useFetchCategory({ deps: [user] });
  // const activityContext = useFetchActivities();

  const appContext = {
    userContext: userContext,
    categoryContext: categoryContext,
    // activityContext: activityContext,
  };


  return (
    <AppContext.Provider value={appContext}>
      <AppRouter />
    </AppContext.Provider>
  );
};


export default MainLayout;