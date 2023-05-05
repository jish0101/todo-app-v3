import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  createUser,
} from "../utils/firebase/firebase.utils";

const Signup = () => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = async (values) => {
    console.log(values);
    const { email, password } = values;
    try {
      const { user } = await createUser(email, password);
      console.log(user);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
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