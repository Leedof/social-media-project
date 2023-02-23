import { useRef } from "react";
import { useField } from "formik";

const InputFile = ({ className, children, ...props }) => {
  const [field] = useField(props);
  const inputRef = useRef(null);
  return (
    <>
      <input type="file" ref={inputRef} {...field} {...props} />
      <button
        type="button"
        onClick={() => {
          inputRef.current.click();
          inputRef.current.focus();
        }}
        className={className}
      >
        {children}
      </button>
    </>
  );
};

export default InputFile;
