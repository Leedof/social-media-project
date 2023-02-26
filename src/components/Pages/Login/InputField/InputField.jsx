import { ErrorMessage, Field } from "formik";
import styles from "./InputField.module.scss";

const InputField = ({ name, title, ...props }) => {
  return (
    <div className={styles.inputField}>
      <span className={styles.inputField__title}>{title}</span>
      <Field name={name} className={styles.inputField__input} {...props} />
      <ErrorMessage
        name={name}
        component="div"
        className={styles.inputField__error}
      />
    </div>
  );
};

export default InputField;
