import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login, loginWithGoogle, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { login as loginUser } from "../store/user/user.slice";
import { currentUserSelector } from "../store/user/user.selector";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();
  
  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
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
      navigate("/", { replace: true });
    } catch (error) {
      console.log("user sign in failed", error);
    }
  };

  const handleGoogleLogin = async () => {
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
    createUserDocumentFromAuth(user, {displayName: user.displayName})
    dispatch(loginUser(pickedUser));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
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
            <main>
              <div>
                <div>
                  <label htmlFor="email">Your email</label>
                  <Field type="email" name="email" id="email" />
                  <ErrorMessage name="email" />
                </div>
                <div>
                  <label htmlFor="password">Your Password</label>
                  <Field type="password" name="password" id="password" />
                  <ErrorMessage name="password" />
                </div>
                <div>
                  <button type="submit">Sign in</button>
                </div>
              </div>
            </main>
            {user?.displayName}
            <div>
              <Link to="/todo-app-v3/sign-up">
                new here ? create an account
              </Link>
              <button type="button" onClick={handleGoogleLogin}>
                Sign in with google
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;