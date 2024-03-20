import styles from "./Card.module.scss";

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card(props: IProps) {
  return <div className={styles.card} {...props}/>;
}
