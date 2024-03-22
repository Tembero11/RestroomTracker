import styles from "./Button.module.scss";

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary";
  isFloating?: boolean;
  fullWidth?: boolean;
}

export default function Button(props: IProps) {
  const variant = props.variant ?? "primary";

  return (
    <button
      {...props}
      className={styles[`button-${variant}`]}
      style={{
        boxShadow: props.isFloating ? "0px 5px 5px rgba(0, 0, 0, 0.3)" : undefined,
        width: props.fullWidth ? "100%" : undefined
      }}
    />
  );
}
