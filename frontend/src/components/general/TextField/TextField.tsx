import { forwardRef, useState } from "react";
import styles from "./TextField.module.scss";

type TextFieldType = "search" | "text" | "number";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: TextFieldType;
  label?: string;
  fullWidth?: boolean;
}

const TextField = forwardRef<HTMLInputElement, IProps>((props: IProps, ref) => {
  const [isFocus, setFocus] = useState(false);
  const [value, setValue] = useState("");

  const type = props.type || "text";

  return (
    <label className={styles.container}>
      <span
        className={styles["label-span"]}
        data-is-focus={isFocus || value.length != 0}
      >
        {props.label}
      </span>
      <input
        ref={ref}
        type={props.type}
        value={props.value || value}
        className={styles[`input-${type}`]}
        {...props}
        onBlur={(e) => {
          setFocus(false);
          if (props.onBlur) props.onBlur(e);
        }}
        onFocus={(e) => {
          setFocus(true);
          if (props.onFocus) props.onFocus(e);
        }}
        onChange={(e) => {
          setValue(e.target.value);
          if (props.onChange) props.onChange(e);
        }}
      />
    </label>
  );
});

export default TextField;
