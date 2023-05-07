import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  login,
  loginWithGoogle,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { login as loginUser } from "../../store/user/user.slice";
import { currentUserSelector } from "../../store/user/user.selector";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./login.css";
import { ColorRing } from "react-loader-spinner";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      setIsLoading(true);
      const { user } = await login(email, password);

      const pickedUser =
        user &&
        (({ accessToken, email, uid, photoUrl, displayName }) => ({
          accessToken,
          email,
          uid,
          photoUrl,
          displayName,
        }))(user);

      dispatch(loginUser(pickedUser));
      setIsLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      setIsLoading(false);
      console.log("user sign in failed", error);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading2(true);
    try {
      const { user } = await loginWithGoogle();

      const pickedUser =
        user &&
        (({ accessToken, email, uid, photoURL, displayName }) => ({
          accessToken,
          email,
          uid,
          photoURL,
          displayName,
        }))(user);
      createUserDocumentFromAuth(user, { displayName: user.displayName });
      dispatch(loginUser(pickedUser));
      setIsLoading2(false);
    } catch (err) {
      console.log(err);
      setIsLoading2(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values }) => (
          <Form>
            <main className="container">
              <div>
                <h1 className="primary-heading">Sign in</h1>
                <div className="form-container">
                  <label htmlFor="email">Your email</label>
                  <Field type="email" name="email" id="email" />
                  <ErrorMessage
                    component="span"
                    className="error-msg"
                    name="email"
                  />
                </div>
                <div className="form-container">
                  <label htmlFor="password">Your Password</label>
                  <Field type="password" name="password" id="password" />
                  <ErrorMessage
                    component="span"
                    className="error-msg"
                    name="password"
                  />
                </div>
                <div className="flex justify-center items-center gap my">
                  <button disabled={isLoading} className="primaryBtn" type="submit">
                    {isLoading ? (
                      <ColorRing
                        visible={true}
                        height="16"
                        width="42"
                        ariaLabel="blocks-loading"
                        wrapperClass="blocks-wrapper"
                        colors={[
                          "#ffff",
                          "#ffff",
                          "#ffff",
                          "#ffff",
                          "#ffff",
                        ]}
                      />
                    ) : (
                      "Sign in"
                    )}
                  </button>
                  <button
                    className="red-btn"
                    type="button"
                    disabled={isLoading2}
                    onClick={handleGoogleLogin}
                  >
                    {isLoading2 ? (
                      <ColorRing
                        visible={true}
                        height="18"
                        width="110"
                        ariaLabel="blocks-loading"
                        wrapperClass="blocks-wrapper"
                        colors={[
                          "#ffff",
                          "#ffff",
                          "#ffff",
                          "#ffff",
                          "#ffff",
                        ]}
                      />
                    ) : (
                      "Sign in with google"
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Link to="/sign-up">New here ? Create an account here..</Link>
              </div>
            </main>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;