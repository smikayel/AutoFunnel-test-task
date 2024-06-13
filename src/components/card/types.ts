import { CardProps } from "../../pages/home/types";

export interface CardComponentProps {
  card: CardProps;
  onItemUpdate: (item: CardProps) => void;
  deleteItem: (id: string) => void;
  addGlobalBounce: () => void;
}
