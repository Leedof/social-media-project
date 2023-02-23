//hoc
import authRequired from "./../../../hoc/authRequired";
//Components
import InputFile from "../../UI/FormElements/InputFile";
import Input from "../../UI/FormElements/Input/Input";
import Textarea from "../../UI/FormElements/Textarea/Textarea";
import Checkbox from "../../UI/FormElements/Checkbox/Checkbox";
import Avatar from "../../UI/Avatar/Avatar";
import PhotoPreview from "./PhotoPreview/PhotoPreview";
//Libs
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import _ from "lodash";
//styles
import styles from "./Settings.module.scss";
//hooks + thunksCreators
import { useSelector, useDispatch } from "react-redux";
import { editProfile } from "../../../store/slices/authSlice";
import Loader from "../../UI/Loader/Loader";

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
  const dispatch = useDispatch();

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
    fullName: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(40, "Your name is too long")
      .required("Required field"),
    status: yup.string().max(300, "Maximum 300 symbols"),
    contacts: yup.object({
      github: yup.string().url("Enter valid URL"),
      vk: yup.string().url("Enter valid URL"),
      facebook: yup.string().url("Enter valid URL"),
      instagram: yup.string().url("Enter valid URL"),
      twitter: yup.string().url("Enter valid URL"),
      website: yup.string().url("Enter valid URL"),
      youtube: yup.string().url("Enter valid URL"),
      mainLink: yup.string().url("Enter valid URL"),
    }),
  });
  const initialValues = {
    aboutMe: "emptyAlways",
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
  };

  const onSubmit = (values, onSubmitProps) => {
    const { setStatus, setSubmitting } = onSubmitProps;
    const { photoFile, status, ...profile } = values;
    const {
      photoFile: prevPhotoFile,
      status: prevStatus,
      ...prevProfile
    } = initialValues;

    const payload = {
      photo: photoFile,
      status: status === prevStatus ? null : status,
      profile: _.isEqual(profile, prevProfile) ? null : profile,
    };

    dispatch(
      editProfile({ data: payload, helpers: { setStatus, setSubmitting } })
    );
    // handler
    setSubmitting(true);
  };

  return (
    <div className={styles.settingsWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={profileSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldTouched, isSubmitting }) => (
          <Form className={styles.form}>
            {isSubmitting ? (
              <div className={styles.loader}>
                <Loader />{" "}
              </div>
            ) : (
              ""
            )}
            <div className={styles.formHeader}>
              <h2 className={styles.title}>Edit profile</h2>
              <div className={styles.avatarInput}>
                <div className={styles.inputFile}>
                  <InputFile
                    name="photoFile"
                    accept="image/*"
                    className={styles.inputBtn}
                    value={undefined}
                    onChange={(e) => {
                      setFieldValue("photoFile", e.target.files[0]);
                    }}
                    onBlur={() => {
                      setFieldTouched("photoFile");
                    }}
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
              <button type="submit" disabled={isSubmitting}>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default authRequired(Settings);
