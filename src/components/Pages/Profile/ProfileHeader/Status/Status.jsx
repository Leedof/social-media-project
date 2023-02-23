import { useEffect, useState } from "react";
import styles from "./Status.module.scss";
import { useDispatch } from "react-redux";
import { putStatus } from "../../../../../store/slices/authSlice";

const Status = (props) => {
  const [status, setStatus] = useState(props.status);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const toggleEditMode = () => {
    if (props.isOwner) {
      setEditMode(!editMode);
    }
  };
  // Set status localy
  const onChangeHandler = (e) => {
    setStatus(e.target.value);
  };

  const onStatusChanged = () => {
    //skip same status request
    if (status === props.status) {
      toggleEditMode();
      return;
    }
    dispatch(putStatus(status));
    toggleEditMode();
  };

  //In case props will be not updated with latest state while async requests(status + profile)
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <div className={styles.status}>
      {editMode ? (
        <input
          type="text"
          value={status}
          onChange={onChangeHandler}
          onBlur={onStatusChanged}
          autoFocus={true}
        />
      ) : (
        <span onDoubleClick={toggleEditMode}>
          {!props.status ? "No status" : props.status}
        </span>
      )}
    </div>
  );
};

export default Status;
