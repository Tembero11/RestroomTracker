import { forwardRef, useEffect, useState } from "react";
import styles from "./Chip.module.scss";

interface IProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "type"
  > {
  leading?: React.ReactNode;
  label: string;
}

const Chip = forwardRef<HTMLInputElement, IProps>(
  ({ label, leading, ...props }, ref) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      setChecked(props.checked ?? false);
    }, [props.checked]);

    return (
      <label className={styles.container}>
        <div className={styles.chip} data-checked={checked}>
          {leading ? <div className={styles.leading}>{leading}</div> : <></>}
          <span>{label}</span>
        </div>
        <input
          {...props}
          ref={ref}
          type="checkbox"
          onChange={(e) =>
            props.onChange ? props.onChange(e) : setChecked(e.target.checked)
          }
        />
      </label>
    );
  }
);

export default Chip;
