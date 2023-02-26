import React from "react";
import styles from "./Login.module.scss";
import InputField from "./InputField/InputField";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../store/slices/authSlice";

//Validation scheme for LOGIN form
const loginSchema = yup.object({
  email: yup.string().email("Enter correct email").required("Required field"),
  password: yup
    .string()
    .min(6, "Must be 6 symbols minimum")
    .required("Required field"),
});

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const location = useLocation();
  if (isAuth) {
    //Check previous page path, if client was redirected
    const fromPage = location.state?.from?.pathname || "/";
    return <Navigate to={fromPage} replace={true} />;
  }

  const onSubmit = (values, onSubmitProps) => {
    const { email, password, rememberMe } = values;
    const { setStatus, setSubmitting } = onSubmitProps;

    dispatch(signIn({ email, password, rememberMe, setStatus, setSubmitting }));
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
                title="Email address"
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
              <InputField
                title="Password"
                type="password"
                name="password"
                placeholder="*******"
              />
            </div>
            <label htmlFor="rememberMe" className={styles.checkboxLabel}>
              <Field type="checkbox" name="rememberMe" />
              Remember me
            </label>

            <button type="submit" disabled={isSubmitting}>
              Log in
            </button>
            <div className={styles.error}>{status}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
