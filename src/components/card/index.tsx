import ProgressBar from "../progressbar";
import { CardComponentProps } from "./types";

import styles from "./styles.module.scss";

const Card: React.FC<CardComponentProps> = ({
  card,
  onItemUpdate,
  deleteItem,
  addGlobalBounce,
}): JSX.Element => {
  const onProgressComplate = (): void => {
    onItemUpdate({
      ...card,
      progressed: true,
    });
  };

  const onAddBounce = (): void => {
    onItemUpdate({
      ...card,
      bonuse: (card?.bonuse ?? 0) + 1,
    });
    addGlobalBounce();
  };

  const onUploadImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files?.length) {
      Array.from(event.target.files).forEach((file: File) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          onItemUpdate({
            ...card,
            imageUrl: e.target?.result as string,
          });
        };

        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.presonal}>
          <div>Name: {card?.name}</div>
          <div>Email: {card?.email}</div>
        </div>
        <div className={styles.bonuse}>
          <div>Bunuse</div>
          <div>{card?.bonuse}</div>
        </div>
        <div className={styles.imageContent}>
          <div className={styles.uploadImage}>
            <label htmlFor={card?.id}>
              {card?.imageUrl ? (
                <img src={card?.imageUrl} alt={card?.name} />
              ) : (
                <div>Upload Photo</div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onUploadImage}
              style={{ display: "none" }}
              id={card?.id}
            />
          </div>
          <div
            className={styles.closeIcon}
            onClick={() => deleteItem(card?.id as string)}
          >
            &#x2715;
          </div>
        </div>
      </div>
      {!card?.progressed && (
        <>
          <div className={styles.addButton} onClick={onAddBounce}>
            Add Bounese
          </div>
          <div className={styles.progressbar}>
            <ProgressBar duration={5000} onComplete={onProgressComplate} />
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
