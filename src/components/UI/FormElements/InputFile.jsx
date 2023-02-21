import { useRef } from "react";

const InputFile = ({ className, children, ...props }) => {
  const inputRef = useRef(null);

  return (
    <>
      <input type="file" ref={inputRef} {...props} />
      <button
        type="button"
        onClick={() => {
          inputRef.current.click();
        }}
        className={className}
      >
        {children}
      </button>
    </>
  );
};

export default InputFile;
