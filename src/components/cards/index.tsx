import { CardProps } from "../../pages/home/types";
import Card from "../card";

import styles from "./styles.module.scss";
import { CardsProps } from "./types";

const Cards: React.FC<CardsProps> = ({
  cards,
  onItemUpdate,
  deleteItem,
  addGlobalBounce,
}): JSX.Element => {
  return (
    <div className={styles.container}>
      {cards?.map((card: CardProps) => (
        <Card
          key={card.id}
          card={card}
          onItemUpdate={onItemUpdate}
          deleteItem={deleteItem}
          addGlobalBounce={addGlobalBounce}
        />
      ))}
    </div>
  );
};

export default Cards;
