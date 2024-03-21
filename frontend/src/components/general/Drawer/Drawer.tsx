import { useEffect, useState } from "react";
import styles from "./Drawer.module.scss";

interface IProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer(props: IProps) {
    const [display, setDisplay] = useState("none");

useEffect(() => {
    if (props.isOpen) {
        setDisplay("block");
    }else {
        setTimeout(() => {
            setDisplay("none");
        }, 300);
    }
}, [props.isOpen]);

  function onContainerClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();

    const attr = (e.target as any).attributes as NamedNodeMap;

    if (attr.getNamedItem("data-drawer-bg")?.value == "true") {
      props.onClose();
    }
  }

  return (
    <div
      className={styles.container}
      style={{ display }}
      data-drawer-bg="true"
      onClick={onContainerClick}
    >
      <div data-is-open={props.isOpen} className={styles.drawer}>
        {props.children}
      </div>
    </div>
  );
}
