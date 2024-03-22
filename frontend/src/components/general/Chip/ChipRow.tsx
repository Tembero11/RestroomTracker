import styles from "./Chip.module.scss";

interface IProps {
  children?: React.ReactNode;
}

export default function ChipRow({ children }: IProps) {
  return <div className={styles["chip-row"]}>{children}</div>;
}
