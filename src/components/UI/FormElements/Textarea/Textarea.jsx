import { useField } from "formik";
import styles from "./Textarea.module.scss";

const Textarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label + ":"}</span>
      <textarea className={styles.textarea} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Textarea;
