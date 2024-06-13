import React, { useState } from "react";
import { InputFormProps } from "./types";

import styles from "./styles.module.scss";

const InputForm: React.FC<InputFormProps> = ({ onSubmit }): JSX.Element => {
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
    };

    const name = target.name.value.trim();
    const email = target.email.value.trim();

    const namePattern = /^[A-Za-z\s]{1,40}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    if (!namePattern.test(name)) {
      setNameError("Name must be alphabetic and can contain spaces.");
      valid = false;
    } else {
      setNameError(null);
    }

    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format.");
      valid = false;
    } else {
      setEmailError(null);
    }

    if (valid) {
      onSubmit({ name, email });
      event.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className={styles.inputForm}>
      <div className={styles.inputContent}>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Name:</label>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              onChange={() => setNameError("")}
            />
            {nameError && <p className={styles.error}>{nameError}</p>}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email:</label>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              onChange={() => setEmailError("")}
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
        </div>
      </div>
      <input
        type="submit"
        name="add"
        value="Add"
        className={styles.submitButton}
      />
    </form>
  );
};

export default InputForm;
