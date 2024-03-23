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

export default function Button({variant, style, fullWidth, isFloating, ...props}: IProps) {
  variant = variant ?? "primary";

  return (
    <button
      {...props}
      className={styles[`button-${variant}`]}
      style={{
        ...style,
        boxShadow: isFloating ? "0px 5px 5px rgba(0, 0, 0, 0.3)" : undefined,
        width: fullWidth ? "100%" : undefined,
      }}
    />
  );
}
