import React from "react";
import {
  Formik,
} from "formik";
import {
  LoginPage as TablerLoginPage,
  Button,
} from "tabler-react";
import {
  withRouter,
} from "react-router-dom";
// FIREBASE
import * as firebase from "firebase/app";



function LoginPage({
  history,
}) {

  const _handleSignIn = async (
    values,
    {
      setSubmitting,
      setErrors,
    }
  ) => {
    const {
      email,
      password,
    } = values || {};


    setSubmitting(true);
    setErrors({});


    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      console.error("Sign in failed", error);
      if (error.message.includes("email")) {
        setErrors({ email: error.message });
      } else {
        setErrors({ password: error.message });
      }
      
    } finally {
      setSubmitting(false);
    }

  };


  const _handleClickSignUp = () => {
    history.push("/register");
  };


  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={values => {
        // same as above, but feel free to move this into a class method now.
        let errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={_handleSignIn}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {

        return (
          <>
            <div style={{
              display: "flex",
              justifyContent: "center",
              padding: "40px 0 0",
            }}>
              <Button
                onClick={_handleClickSignUp}
                color="orange"
                size="lg"
              >
                Sign up
              </Button>
            </div>

            <TablerLoginPage
              onSubmit={handleSubmit}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
              loading={isSubmitting}
            />
          </>
        );
      }}
    />
  );

}


export default withRouter(LoginPage);
