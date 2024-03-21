import { useState } from "react";
import styles from "./SnackBar.module.scss";

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  label: string;
  onClose: () => void;
}

export default function SnackBar({
  label,
  onClose,
  ...props
}: IProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      {...props}
      className={styles["snack-bar"]}
      data-is-open={isOpen}
      onClick={() => {
        setIsOpen(false);
        setTimeout(onClose, 200);
      }}
    >
      {label}
    </div>
  );
}
