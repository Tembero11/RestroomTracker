import { ReactNode, createContext, useRef, useState } from "react";
import SnackBar from "../../components/general/SnackBar/SnackBar";
import styles from "./SnackBarProvider.module.scss";

interface ISnackBarInfo {
  label: string;
}

interface ISnackBarContextState {
  showSnackBar: (snackBar: ISnackBarInfo) => number;
  hideSnackBar: (key: number) => void;
}

const initialState: ISnackBarContextState = {
  showSnackBar: () => -1,
  hideSnackBar: (key: number) => {},
};

export const SnackBarContext =
  createContext<ISnackBarContextState>(initialState);

export function SnackBarProvider({ children }: { children: ReactNode }) {
  const [snackBars, setSnackBars] = useState<
    (ISnackBarInfo & { key: number })[]
  >([]);
  const totalSnackBarCount = useRef(0);

  function hideSnackBar(key: number) {
    setSnackBars(snackBars.filter((snackBar) => key != snackBar.key));
  }

  function showSnackBar(snackBar: ISnackBarInfo): number {
    totalSnackBarCount.current += 1;
    const snackBarKey = totalSnackBarCount.current;
    setSnackBars([
      { ...snackBar, key: snackBarKey },
      ...snackBars,
    ]);
    return snackBarKey;
  }

  return (
    <SnackBarContext.Provider value={{ hideSnackBar, showSnackBar }}>
      <div className={styles.container}>
        {snackBars.map(({ label, key }, index) => (
          <SnackBar
            key={key}
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: `translate(-50%, calc(${-100 * index}% - ${
                16 * index
              }px))`,
            }}
            onClose={() => {
              hideSnackBar(key);
            }}
            label={label}
          />
        ))}
      </div>
      {children}
    </SnackBarContext.Provider>
  );
}
