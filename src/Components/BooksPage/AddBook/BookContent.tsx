import React, { BaseSyntheticEvent, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import axios from "../../../utils/axios";
import { getPhotoUrl } from "../../../utils";
import { AuthorObject, BookObject, ValueObject } from "../types";

function AuthorItem({ name, imageId }: AuthorObject) {
  return (
    <span className="author-item-container">
      <Avatar src={imageId ? getPhotoUrl(imageId) : undefined} />
      <Typography component="p" sx={{ lineHeight: 2.5 }}>
        {name}
      </Typography>
    </span>
  );
}

export default function BookContent({ onCancel, onSave, book, setBook }: any) {
  const [genres, setGenres] = useState<(ValueObject | string)[]>([]);
  const [authors, setAuthors] = useState<AuthorObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState(
    book.coverImageId || ""
  );

  useEffect(() => {
    axios
      .get("/authors")
      .then((data) => {
        setAuthors(data.data.response);
      })
      .catch(console.log);

    axios
      .get("/genres")
      .then((data) => {
        setGenres(
          data.data.response.map((genre: { genre: ValueObject }) => genre.genre)
        );
      })
      .catch(console.log);
  }, []);

  const handleTextFieldChange = (e: BaseSyntheticEvent, field: string) => {
    setBook((prevBook: any) => ({
      ...prevBook,
      [field]: e?.target?.value,
    }));
  };

  const handleFileUpload = (e: BaseSyntheticEvent) => {
    const [file] = e.target.files;
    if (!file) return;

    const fileName = file.name;

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    axios
      .post("/files", formData)
      .then((data) => {
        setUploadedImageName(fileName);
        setBook((prevBook: BookObject) => ({
          ...prevBook,
          coverImageId: data.data.fileId,
        }));
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  };

  const handleFileRemove = () => {
    setBook((prevBook: BookObject) => ({
      ...prevBook,
      coverImageId: undefined,
    }));
  };

  const handleAuthorChange = (event: SelectChangeEvent) => {
    setBook((prevBook: BookObject) => ({
      ...prevBook,
      authorId: event?.target?.value,
    }));
  };

  const handleDateChange = (value: any) => {
    setBook((prevBook: BookObject) => ({
      ...prevBook,
      publishDate: value.toISOString(),
    }));
  };

  const handleBookSave = () => {
    onSave(book);
  };

  const handleGenreChange = (e: SelectChangeEvent<[]>) => {
    setBook((prevBook: BookObject) => ({
      ...prevBook,
      genres: e?.target?.value,
    }));
  };

  return (
    <>
      <div className="create-book-fields-container">
        <TextField
          label="Title"
          className="create-book-field"
          value={book.title}
          onChange={(e) => handleTextFieldChange(e, "title")}
        />
        <TextField
          label="Description"
          value={book.description}
          className="create-book-field"
          onChange={(e) => handleTextFieldChange(e, "description")}
        />
        <div className="create-book-upload-container">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={handleFileUpload}
          />
          {isLoading ? (
            <CircularProgress />
          ) : book.coverImageId ? (
            <Typography color="primary" component="h4">
              {uploadedImageName}
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={handleFileRemove}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
          ) : (
            <label htmlFor="raised-button-file">
              <Button variant="outlined" component="span" size="large">
                Upload Cover
              </Button>
            </label>
          )}
        </div>
        <FormControl>
          <InputLabel id="demo-controlled-open-select-label">Author</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={book.authorId}
            label="Author"
            onChange={handleAuthorChange}
          >
            {!authors.length ? (
              <CircularProgress />
            ) : (
              authors.map((author: AuthorObject) => (
                <MenuItem value={author.id}>
                  {" "}
                  <AuthorItem {...author} />
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-multiple-chip-label">Genre</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={book.genres}
            onChange={handleGenreChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => {
                  console.log(value);
                  return <Chip key={value} label={value} />;
                })}
              </Box>
            )}
          >
            {genres.map((name: any) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="dd/MM/yyyy"
            value={new Date(book.publishDate)}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="create-button-footer">
        <div className="placeholder" />
        <div className="create-button-container">
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleBookSave}
            disabled={isLoading}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
