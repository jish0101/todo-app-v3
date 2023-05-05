import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { emailRegex } from "../utils/regex";
import {
  createUser, createUserDocumentFromAuth
} from "../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../store/user/user.selector";

const Signup = () => {
  const user = useSelector(currentUserSelector);

  const handleSubmit = async (values) => {
    console.log(values);
    const { email, password } = values;
    try {
      const { user } = await createUser(email, password);
      if (user) {
        createUserDocumentFromAuth(user, {displayName: values.name})
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Formik
        initialValues={{  name: "", email: "", password: "", confirmPassword: "" }}
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
            <main>
              <div>
                <div>
                  <label htmlFor="name">Your name</label>
                  <Field type="text" name="name" id="name" />
                  <ErrorMessage name="name" />
                </div>
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
                  <label htmlFor="confirmPassword">Confirm Your Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                  />
                  <ErrorMessage name="confirmPassword" />
                </div>
                <div>
                  <button type="submit">Sign up</button>
                </div>
              </div>
            </main>
            <div>
              <Link to="/todo-app-v3/login">
                Already have an account? Login here
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;