import { useField } from "formik";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.wrapper}>
      <label className={styles.checkbox}>
        <input type="checkbox" {...field} {...props} />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
