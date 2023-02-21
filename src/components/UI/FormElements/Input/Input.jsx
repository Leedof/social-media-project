import { useField } from "formik";
import styles from "./Input.module.scss";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label + ":"}</span>
      <input {...field} {...props} className={styles.input} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
