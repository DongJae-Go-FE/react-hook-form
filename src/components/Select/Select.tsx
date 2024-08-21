import { forwardRef, Fragment } from "react";
import { UseFormRegister } from "react-hook-form";

import { SelectProps } from "./types";

import "./style.css";

const Select = forwardRef<
  HTMLSelectElement,
  SelectProps & ReturnType<UseFormRegister<any>>
>(({ onChange, onBlur, name, label }, ref) => {
  return (
    <Fragment>
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option value="">ㅎㅎ</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </Fragment>
  );
});

Select.displayName = "Select";

export default Select;
