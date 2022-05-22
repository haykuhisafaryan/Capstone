import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";
import { MultiselectTagsProps } from "./type";
import { ReactNode } from "react";
import {
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete/Autocomplete";

export default function MultiselectTags({
  title,
  defaultValue,
  onChange,
  getOptionLabel,
}: MultiselectTagsProps) {
  const styles = {
    width: "100%",
  };

  const renderInput = (params: AutocompleteRenderInputParams): ReactNode => (
    <TextField {...params} label={title} placeholder="Add more ..." />
  );

  const renderTags = (
    tagValue: (string | any)[],
    getTagProps: AutocompleteRenderGetTagProps
  ) =>
    tagValue.map((option, index) => {
      const props = getTagProps({ index });

      if (typeof option !== "string") {
        // @ts-ignore
        delete props.onDelete;
      }

      return (
        <Chip label={getOptionLabel && getOptionLabel(option)} {...props} />
      );
    });

  return (
    <Autocomplete
      multiple
      id="multiple-limit-tags"
      options={[]}
      value={defaultValue}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      disableClearable
      renderInput={renderInput}
      renderTags={renderTags}
      freeSolo
      sx={styles}
    />
  );
}
