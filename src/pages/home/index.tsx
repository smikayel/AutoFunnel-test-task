import { useEffect, useState } from "react";
import InputForm from "../../components/form";
import Cards from "../../components/cards";
import generateRandomId from "../../utils/generateRandomId";
import { CardProps } from "./types";

import styles from "./styles.module.scss";

const Home: React.FC = (): JSX.Element => {
  const [cards, setCards] = useState<CardProps[]>(
    JSON.parse(localStorage.getItem("cards") as string) ?? []
  );
  const [globalBounce, setGlobalBounce] = useState<number>(
    Number(localStorage.getItem("bounce")) ?? 0
  );

  useEffect(() => {
    const storageCards = localStorage.getItem("cards");
    setCards(JSON.parse(storageCards as string));
  }, []);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem("bounce", globalBounce.toString());
  }, [globalBounce]);

  const onForSubmit = (item: { name: string; email: string }): void => {
    const id = generateRandomId();
    setCards((prevCards: CardProps[]) => [
      { id, name: item.name, email: item.email, bonuse: 0, progressed: false },
      ...prevCards,
    ]);
  };

  const onItemUpdate = (item: CardProps): void => {
    setCards((prevCards: CardProps[]) =>
      prevCards.map((card) =>
        card.id === item.id ? { ...card, ...item } : card
      )
    );
  };

  const deleteItem = (id: string): void => {
    setCards((prevCards: CardProps[]) => {
      const cardToDelete = prevCards.find((card) => card.id === id);
      if (cardToDelete) {
        setGlobalBounce(globalBounce - (cardToDelete?.bonuse ?? 0));
      }
      return prevCards.filter((card) => card.id !== id);
    });
  };

  const addGlobalBounce = () => {
    setGlobalBounce((e: number) => e + 1);
  };

  return (
    <div className={styles.container}>
      <p>Total Bonus: {globalBounce}</p>
      <div className={styles.contentContainer}>
        <InputForm onSubmit={onForSubmit} />
        <Cards
          cards={cards}
          onItemUpdate={onItemUpdate}
          deleteItem={deleteItem}
          addGlobalBounce={addGlobalBounce}
        />
      </div>
    </div>
  );
};

export default Home;
