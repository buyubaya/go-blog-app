import React, {
  useContext,
} from "react";

import {
  Container,
  Grid,
  Card,
  Button,
  Form,
  Avatar,
  Alert,
} from "tabler-react";
import {
  Formik,
} from "formik";
import Loading from "@/components/common/Loading";
import SiteWrapper from "../containers/SiteWrapper";
import AppContext from "@/contexts/AppContext";
import {
  updateUser,
} from "@/actions/user";


function ProfilePage() {

  const {
    userContext,
  } = useContext(AppContext);

  const userInfo = (userContext && userContext.data) || {};
  const userInfoLoading = userContext && userContext.loading;
  const reloadUserInfo = userContext && userContext.reload;


  const _handleSubmit = async (
    values,
    {
      setSubmitting,
      setErrors,
    }
  ) => {
    setSubmitting(true);
    setErrors({});

    try {
      await updateUser(
        userInfo.uid,
        {
          displayName: values.displayName && values.displayName.trim(),
          photoURL: values.photoURL && values.photoURL.trim(),
          email: values.email && values.email.trim(),
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
      );

      if (reloadUserInfo) {
        reloadUserInfo();
      }
    } catch (error) {
      console.error("Update User Info failed", error);
      setErrors({ _form: error.message });
    } finally {
      setSubmitting(false);
    }

  };


  return (
    <SiteWrapper>
      <div className="my-3 my-md-5">
        <Container>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid.Col lg={4} sm={6} xs={12}>

              <Card>
                <Card.Header>
                  <Card.Title>My Profile</Card.Title>
                </Card.Header>
                <Card.Body>

                  {
                    userInfoLoading && (
                      <Loading />
                    )
                  }

                  {
                    !userInfoLoading && (
                      <Formik
                        initialValues={{
                          displayName: (userInfo && userInfo.displayName) || "",
                          photoURL: (userInfo && userInfo.photoURL) || "",
                          email: (userInfo && userInfo.email) || "",
                          password: "",
                          confirmPassword: "",
                        }}
                        onSubmit={_handleSubmit}
                      >
                        {
                          ({
                            values,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                          }) => {

                            return (
                              <Form>

                                <div className="profile-avatar-area">
                                  <Avatar
                                    size="xl"
                                    imageURL={userInfo.photoURL}
                                    className="profile-avatar"
                                  />
                                </div>

                                <Form.Group>
                                  <Form.Label>Display Name</Form.Label>
                                  <Form.Input
                                    name="displayName"
                                    placeholder="Display Name"
                                    value={values.displayName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                  />
                                </Form.Group>

                                <Form.Group>
                                  <Form.Label>Avatar</Form.Label>
                                  <Form.Input
                                    name="photoURL"
                                    placeholder="Avatar"
                                    value={values.photoURL}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                  />
                                </Form.Group>

                                <Form.Group>
                                  <Form.Label>Email-Address</Form.Label>
                                  <Form.Input
                                    name="email"
                                    placeholder="your-email@domain.com"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                  />
                                </Form.Group>

                                <Form.Group>
                                  <Form.Label>Password</Form.Label>
                                  <Form.Input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                  />
                                </Form.Group>

                                <Form.Group>
                                  <Form.Label>Confirm Password</Form.Label>
                                  <Form.Input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                  />
                                </Form.Group>

                                {
                                  errors && errors._form && (
                                    <Alert type="danger">
                                      {errors._form}
                                    </Alert>
                                  )
                                }

                                <Form.Footer>
                                  <Button
                                    color="primary"
                                    block
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                  >
                                    Save
                                  </Button>
                                </Form.Footer>
                              </Form>
                            );
                          }
                        }
                      </Formik>
                    )
                  }

                </Card.Body>
              </Card>

            </Grid.Col>
          </div>
        </Container>
      </div>
    </SiteWrapper>
  );
}

export default ProfilePage;
