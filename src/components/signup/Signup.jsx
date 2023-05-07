import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { emailRegex } from "../../utils/regex";
import {
  createUser,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../store/user/user.selector";
import { ColorRing } from "react-loader-spinner";

const Signup = () => {
  const user = useSelector(currentUserSelector);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      setIsLoading(true);
      const { user } = await createUser(email, password);
      if (user) {
        createUserDocumentFromAuth(user, { displayName: values.name });
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
      setIsLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Enter your name.."),
          email: Yup.string()
            .required("Email is required")
            .matches(emailRegex, "Invalid email format"),
          password: Yup.string().required("Password is required"),
          confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        })}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values }) => (
          <Form>
            <main className="container">
              <h1 className="primary-heading">Sign up</h1>
              <div>
                <div className="form-container">
                  <label htmlFor="name">Your name</label>
                  <Field type="text" name="name" id="name" />
                  <ErrorMessage
                    component="span"
                    className="error-msg"
                    name="name"
                  />
                </div>
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
                <div className="form-container">
                  <label htmlFor="confirmPassword">Confirm Your Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                  />
                  <ErrorMessage
                    component="span"
                    className="error-msg"
                    name="confirmPassword"
                  />
                </div>
                <div className="my">
                  <button disabled={isLoading} className="primaryBtn" type="submit">
                    {isLoading ? (
                      <ColorRing
                        visible={true}
                        height="16"
                        width="42"
                        ariaLabel="blocks-loading"
                        wrapperClass="blocks-wrapper"
                        colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
                      />
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Link to="/login">Already have an account? Login here..</Link>
              </div>
            </main>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;