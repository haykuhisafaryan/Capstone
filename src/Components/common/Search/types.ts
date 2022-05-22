import { BaseSyntheticEvent } from "react";

export interface SearchProps {
  value?: string;
  onChange?: (e: BaseSyntheticEvent) => void;
}
