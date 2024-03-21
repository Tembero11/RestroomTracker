import styles from "./Stack.module.scss";

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  dir: React.CSSProperties["flexDirection"];
  gap?: React.CSSProperties["gap"];
  justify?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  w?: React.CSSProperties["width"];
  h?: React.CSSProperties["height"];
}

export function Stack({dir, gap, children, justify, alignItems, w, h, ...props}: IProps) {
  return (
    <div
      className={styles["stack"]}
      style={{ gap, justifyContent: justify, alignItems, flexDirection: dir, width: w, height: h }}
      {...props}
    >
      {children}
    </div>
  );
}

export function HStack(props: Omit<IProps, "dir">) {
  return <Stack dir="row" {...props}/>;
}
export function VStack(props: Omit<IProps, "dir">) {
  return <Stack dir="column" {...props}/>;
}

export function Center(props: Omit<IProps, "dir">) {
  return <Stack dir="column" justify="center" alignItems="center" w="100%" h="100%" {...props}/>;
}
