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

export function Stack({
  dir,
  gap,
  children,
  justify,
  alignItems,
  w,
  h,
  style,
  ...props
}: IProps) {
  return (
    <div
      className={styles["stack"]}
      style={{
        gap,
        justifyContent: justify,
        alignItems,
        flexDirection: dir,
        width: w,
        height: h,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function HStack({
  fullWidth,
  ...props
}: Omit<IProps, "dir"> & { fullWidth?: boolean }) {
  return (
    <Stack
      dir="row"
      {...props}
      w={fullWidth ? "100%" : props.w}
    />
  );
}
export function VStack({
  fullHeight,
  style,
  ...props
}: Omit<IProps, "dir"> & { fullHeight?: boolean }) {
  return (
    <Stack
      dir="column"
      {...props}
      h={fullHeight ? "100%" : props.w}
    />
  );
}

export function Center(props: Omit<IProps, "dir">) {
  return (
    <Stack
      dir="column"
      justify="center"
      alignItems="center"
      w="100%"
      h="100%"
      {...props}
    />
  );
}
