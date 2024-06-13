import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ProgressBarProps } from "./types";

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className={styles.container}>
      <div
        className={styles.progressbar}
        style={{
          width: `${progress}%`,
        }}
      ></div>
      <div className={styles.text}>progress {progress}%</div>
    </div>
  );
};

export default ProgressBar;
