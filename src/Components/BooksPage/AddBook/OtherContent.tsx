import MultiselectTags from "../../common/MuliselectTags";
import { Button } from "@mui/material";
import * as React from "react";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { MultiselectNewValue } from "../../common/MuliselectTags/type";
import { ValueObject } from "../types";

export default function OtherContent() {
  const [genres, setGenres] = useState<any>([]);
  const [coverTypes, setCoverTypes] = useState<any>([]);

  useEffect(() => {
    axios
      .get("/genres")
      .then((data) => {
        setGenres(data.data.response);
      })
      .catch(console.log);

    axios
      .get("/coverTypes")
      .then((data) => {
        setCoverTypes(data.data.response);
      })
      .catch(console.log);
  }, []);

  const handleGenreChange = (
    event: BaseSyntheticEvent,
    newValue: MultiselectNewValue
  ) => {
    setGenres(newValue);
  };

  const handleCoverTypeChange = (
    event: BaseSyntheticEvent,
    newValue: MultiselectNewValue
  ) => {
    setCoverTypes(newValue);
  };

  const handleSave = async () => {
    const newGenres = genres.filter(
      (genre: ValueObject | string) => typeof genre === "string"
    );
    const newCoverTypes = coverTypes.filter(
      (coverType: ValueObject | string) => typeof coverType === "string"
    );

    const newGenresPromises = newGenres.map((genre: ValueObject | string) =>
      axios.post("/genres", { genre })
    );

    await Promise.all(newGenresPromises);

    const newCoverTypesPromises = newCoverTypes.map(
      (coverType: ValueObject | string) =>
        axios.post("/coverTypes", { coverType })
    );

    await Promise.all(newCoverTypesPromises);

    axios
      .get("/genres")
      .then((data) => {
        setGenres(data.data.response);
      })
      .catch(console.log);

    axios
      .get("/coverTypes")
      .then((data) => {
        setCoverTypes(data.data.response);
      })
      .catch(console.log);
  };

  return (
    <div className="other-content-container">
      <MultiselectTags
        title="Genres"
        defaultValue={genres}
        getOptionLabel={(option: any) =>
          typeof option === "string" ? option : option.genre
        }
        onChange={handleGenreChange}
      />
      <MultiselectTags
        title="Cover Types"
        defaultValue={coverTypes}
        getOptionLabel={(option: any) =>
          typeof option === "string" ? option : option.coverType
        }
        onChange={handleCoverTypeChange}
      />
      <div className="create-button-footer">
        <div className="placeholder" />
        <div className="create-button-container">
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
