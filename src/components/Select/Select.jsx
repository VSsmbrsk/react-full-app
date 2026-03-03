//import cls from "./Select.module.css";
import { memo } from "react";

export const Select = memo((props) => {
  const { value, onChange, options, placeholder, name, id, className } = props;

  return (
    <select
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      className={className}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.content}
        </option>
      ))}
    </select>
  );
});
