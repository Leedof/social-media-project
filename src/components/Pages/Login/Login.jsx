import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import styles from "./Login.module.scss";
import React from "react";
import InputField from "./InputField/InputField";

const loginSchema = yup.object({
  email: yup.string().email("Enter correct email").required("Required field"),
  password: yup
    .string()
    .min(6, "Must be 6 symbols minimum")
    .required("Required field"),
});

const Login = () => {
  return (
    <div className={styles.loginPage}>
      <h1 className={styles.title}>Sign in</h1>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        onSubmit={(values) => console.log(values)}
        validationSchema={loginSchema}
      >
        <Form className={styles.loginForm}>
          <div className={styles.loginForm__inputs}>
            <InputField
              type="email"
              name="email"
              placeholder="example@gmail.com"
            />
            <InputField type="password" name="password" placeholder="*******" />
          </div>
          <label htmlFor="rememberMe">
            <Field
              type="checkbox"
              name="rememberMe"
              className={styles.inputCheckbox}
            />
            Remember me
          </label>

          <button type="submit">Log in</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
