import React, {
  useState,
} from "react";
import Loading from "@/components/common/Loading";
import { RegisterPage as TablerRegisterPage } from "tabler-react";
import {
  addUser,
} from "@/actions/user";
import {
  withRouter,
} from "react-router-dom";


function RegisterPage({
  history,
}) {

  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);


  const _handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    setFormValues(state => ({
      ...state,
      [field]: value,
    }));
  };


  const _handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      displayName: formValues.name && formValues.name.trim(),
      email: formValues.email && formValues.email.trim(),
      password: formValues.password && formValues.password.trim(),
      confirmPassword: formValues.password && formValues.password.trim(),
    };


    setLoading(true);

    try {
      await addUser(requestData);

      history.push("/login");
    } catch (error) {
      console.error("Register failed", error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <Loading />;
  }


  return (
    <TablerRegisterPage
      values={formValues}
      onChange={_handleChange}
      onSubmit={_handleSubmit}
    />
  );
}

export default withRouter(RegisterPage);
