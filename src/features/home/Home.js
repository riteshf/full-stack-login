import React from "react";
import { useDispatch } from "react-redux";

import styles from "./Counter.module.css";
import { logoutAsync } from "../authenticate/authenticate.slice";

export function Counter() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAsync());
  };

  return (
    <div>
      <div className={styles.row}>
        <button className={styles.button} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
