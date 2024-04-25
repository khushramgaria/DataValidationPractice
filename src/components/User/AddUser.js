import React, { useState, useRef } from "react";
import styles from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const [error, setError] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    const enternedName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    if (enternedName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please Enter a valid age and name (non-empty values).",
      });
      return;
    }
    if (+enteredAge <= 0) {
      setError({
        title: "Invalid Age",
        message: "Please Enter a valid age (> 0).",
      });
      return;
    }

    props.onAddUser(enternedName, enteredAge);
    nameInputRef.current.value=""
    ageInputRef.current.value=""
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
