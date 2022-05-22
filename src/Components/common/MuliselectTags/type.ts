import { BaseSyntheticEvent } from "react";

export type MultiselectNewValue = (string | string[])[];

export interface MultiselectTagsProps {
  title: string;
  defaultValue: string[];
  onChange: (event: BaseSyntheticEvent, newValue: MultiselectNewValue) => void;
  getOptionLabel?: (option: any) => string;
}
