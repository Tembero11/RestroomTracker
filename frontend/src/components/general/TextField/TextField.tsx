import { useState } from "react";
import styles from "./TextField.module.scss";

type TextFieldType = "search" | "text";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: TextFieldType;
  label?: string;
  fullWidth?: boolean;
}

export default function TextField(props: IProps) {
  const [isFocus, setFocus] = useState(false);
  const [value, setValue] = useState("");

  const type = props.type || "text";

  return (
    <label className={styles.container}>
      <span className={styles["label-span"]} data-is-focus={isFocus || value.length != 0}>
        {props.label}
      </span>
      <input
        type={props.type}
        className={styles[`input-${type}`]}
        {...props}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        onChange={(e) => {
            setValue(e.target.value);
            if (props.onChange) props.onChange(e);
        }}
      />
    </label>
  );
}
