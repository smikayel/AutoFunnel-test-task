import { CardProps } from "../../pages/home/types";

export interface CardsProps {
  cards: CardProps[];
  onItemUpdate: (item: CardProps) => void;
  deleteItem: (id: string) => void;
  addGlobalBounce: () => void;
}
