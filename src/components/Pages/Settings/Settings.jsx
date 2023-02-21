import { ErrorMessage, Form, Formik } from "formik";
import Avatar from "../../UI/Avatar/Avatar";
import PhotoPreview from "./PhotoPreview/PhotoPreview";
import * as yup from "yup";

import styles from "./Settings.module.scss";
import { useSelector } from "react-redux";
import InputFile from "../../UI/FormElements/InputFile";
import Input from "../../UI/FormElements/Input/Input";
import Textarea from "../../UI/FormElements/Textarea/Textarea";
import Checkbox from "../../UI/FormElements/Checkbox/Checkbox";

const Settings = () => {
  const {
    userId,
    fullName,
    lookingForAJob,
    lookingForAJobDescription,
    contacts,
    photos,
  } = useSelector((state) => state.auth.profile);
  const status = useSelector((state) => state.auth.status);
  //helper to change null to undefined from server response for inputs
  const checkValue = (value) => {
    return value === null ? "" : value;
  };
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const FILE_SIZE = 2500000;

  const profileSchema = yup.object({
    photoFile: yup
      .mixed()
      .nullable()
      .test("fileSize", "Photo shall be less than 5MB", (value) => {
        if (value === null) return true;
        return value && value.size <= FILE_SIZE;
      })
      .test("fileType", "Choose supported formats: jpg,jpeg,png", (value) => {
        if (value === null) return true;
        return value && SUPPORTED_FORMATS.includes(value.type);
      }),
    status: yup.string().required("blabla"),
  });
  return (
    <div className={styles.settingsWrapper}>
      <Formik
        initialValues={{
          photoFile: null,
          status,
          userId,
          fullName,
          lookingForAJob,
          lookingForAJobDescription: checkValue(lookingForAJobDescription),
          contacts: {
            github: checkValue(contacts.github),
            vk: checkValue(contacts.vk),
            facebook: checkValue(contacts.facebook),
            instagram: checkValue(contacts.instagram),
            twitter: checkValue(contacts.twitter),
            website: checkValue(contacts.website),
            youtube: checkValue(contacts.youtube),
            mainLink: checkValue(contacts.mainLink),
          },
        }}
        validationSchema={profileSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue, setFieldTouched, ...other }) => (
          <Form className={styles.form}>
            <div className={styles.formHeader}>
              <h2 className={styles.title}>Edit profile</h2>
              <div className={styles.avatarInput}>
                <div className={styles.inputFile}>
                  <InputFile
                    name="photoFile"
                    accept="image/*"
                    onChange={(e) => {
                      setFieldValue("photoFile", e.target.files[0]);
                      setFieldTouched("photoFile");
                      debugger;
                      console.log(other);
                    }}
                    className={styles.inputBtn}
                  >
                    {values.photoFile ? (
                      <PhotoPreview
                        photoFile={values.photoFile}
                        className={styles.preview}
                      />
                    ) : (
                      <Avatar photos={photos} className={styles.preview} />
                    )}
                  </InputFile>
                  <ErrorMessage
                    name="photoFile"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>
            </div>
            <div className={styles.formGeneralInfo}>
              <h3 className={styles.subTitle}>Account information:</h3>
              <div className={styles.fields}>
                <Input label="Name" type="text" name="fullName" />
                <Textarea label="Status" name="status" rows="2" />
                <Checkbox label="Looking for a job?" name="lookingForAJob" />
                {values.lookingForAJob ? (
                  <Textarea label="Skills" name="lookingForAJobDescription" />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={styles.formContactsInfo}>
              <h3 className={styles.subTitle}>Contact information:</h3>
              <div className={styles.fieldsContacts}>
                <Input label="Github" type="text" name="contacts.github" />
                <Input label="VK" type="text" name="contacts.vk" />
                <Input label="Facebook" type="text" name="contacts.facebook" />
                <Input
                  label="Instagram"
                  type="text"
                  name="contacts.instagram"
                />
                <Input label="Twitter" type="text" name="contacts.twitter" />
                <Input label="Website" type="text" name="contacts.website" />
                <Input label="YouTube" type="text" name="contacts.youtube" />
                <Input label="Main Link" type="text" name="contacts.mainLink" />
              </div>
            </div>
            <div className={styles.formActions}>
              <button type="button">Cancel</button>
              <button type="submit">Save</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Settings;

{
  /* <input
type="file"
name="photoFile"
accept="image/*"
ref={inputRef}
onChange={(e) => {
  setFieldValue("photoFile", e.target.files[0]);
}}
/>
<button
type="button"
onClick={() => {
  inputRef.current.click();
}}
>
Load Photo
</button> */
}
{
  /* <div className={styles.accountInputs}>
  <h3 className={styles.title}>Account information:</h3>
  <Input
    label="Name"
    type="text"
    name="fullName"
    className={styles.textInput}
  />
  <TextareaField label="Status" name="status" className={styles.textarea} />
  <Input
    label="Looking for a job?"
    type="checkbox"
    name="lookingForAJob"
    className={styles.checkbox}
  />
  {values.lookingForAJob ? (
    <TextareaField
      label="Skills"
      name="lookingForAJobDescription"
      className={styles.textarea}
    />
  ) : (
    ""
  )}
</div>; */
}
