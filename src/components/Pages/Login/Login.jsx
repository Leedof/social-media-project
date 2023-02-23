import React from "react";
import { Field, Form, Formik } from "formik";
import InputField from "./InputField/InputField";
import * as yup from "yup";
import styles from "./Login.module.scss";
import { Navigate, useLocation } from "react-router-dom";

//Validation scheme for LOGIN form
const loginSchema = yup.object({
  email: yup.string().email("Enter correct email").required("Required field"),
  password: yup
    .string()
    .min(6, "Must be 6 symbols minimum")
    .required("Required field"),
});

const Login = ({ isAuth, onSumbitHandler }) => {
  const location = useLocation();
  if (isAuth) {
    //Check previous page path, if client was redirected
    const fromPage = location.state?.from?.pathname || "/";

    return <Navigate to={fromPage} replace={true} />;
  }

  const onSubmit = (values, onSubmitProps) => {
    const { email, password, rememberMe } = values;
    const { setStatus, setSubmitting } = onSubmitProps;

    onSumbitHandler(email, password, rememberMe, setStatus, setSubmitting);
    setSubmitting(true);
  };

  return (
    <div className={styles.loginPage}>
      <h1 className={styles.title}>Sign in</h1>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {({ status, isSubmitting }) => (
          <Form className={styles.loginForm}>
            <div className={styles.loginForm__inputs}>
              <InputField
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
              <InputField
                type="password"
                name="password"
                placeholder="*******"
              />
            </div>
            <label htmlFor="rememberMe">
              <Field
                type="checkbox"
                name="rememberMe"
                className={styles.inputCheckbox}
              />
              Remember me
            </label>

            <button type="submit" disabled={isSubmitting}>
              Log in
            </button>
            <div>{status}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
