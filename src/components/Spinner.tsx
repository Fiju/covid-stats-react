import React from "react";

import styles from "./Spinner.module.scss";

const Spinner: React.FunctionComponent = () => {
  return (
    <div className={styles["lds-ripple"]}>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
