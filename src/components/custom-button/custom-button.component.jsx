import React from "react";

import "./custom-button.styles.scss";

//pull children of any props that are passed into button
//aplly styling of specific childrens className 
const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
  <button
    className={` ${inverted ? "inverted" : ""} ${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
