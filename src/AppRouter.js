import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  Error400,
  Error401,
  Error403,
  Error404,
  Error500,
  Error503,
  Empty,
  Email,
  ProfilePage,

  HomePage,

  // BLOGs
  BlogsTablePage,
  BlogsListPage,
  AddBlogPage,
  EditBlogPage,
} from "./pages";

import FormElementsPage from "./FormElementsPage.react";


function AppRouter() {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/400" component={Error400} />
          <Route exact path="/401" component={Error401} />
          <Route exact path="/403" component={Error403} />
          <Route exact path="/404" component={Error404} />
          <Route exact path="/500" component={Error500} />
          <Route exact path="/503" component={Error503} />

          {/* BLOGs */}
          <Route exact path="/blogs/table" component={BlogsTablePage} />
          <Route exact path="/blogs/list" component={BlogsListPage} />
          <Route exact path="/blogs/add" component={AddBlogPage} />
          <Route exact path="/blogs/edit/:pid" component={EditBlogPage} />

          <Route exact path="/email" component={Email} />
          <Route exact path="/empty-page" component={Empty} />
          <Route exact path="/form-elements" component={FormElementsPage} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
}


export default AppRouter;
