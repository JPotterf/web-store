import React from "react";

import "./custom-button.styles.scss";

//pull children of any props that are passed into button
//aplly styling from specific button
const CustomButton = ({ children, ...otherProps }) => (
  <button className='custom-button' {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
