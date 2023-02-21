import { useCallback } from "react";
import { useState, useEffect } from "react";
import Loader from "../../../UI/Loader/Loader";

const PhotoPreview = ({ photoFile, ...props }) => {
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (photoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(photoFile);
    } else {
      setPreview(null);
    }
  }, [photoFile]);

  return (
    <div {...props}>
      {preview ? <img src={preview} alt="avatar" /> : <Loader />}
    </div>
  );
};

export default PhotoPreview;
