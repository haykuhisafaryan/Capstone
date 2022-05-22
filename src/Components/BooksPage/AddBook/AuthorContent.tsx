import React, { BaseSyntheticEvent, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import axios from "../../../utils/axios";
import { AuthorObject } from "../types";

const defaultAuthorState = { name: "", id: "" };

export default function AuthorContent() {
  const [author, setAuthor] = useState<AuthorObject>(defaultAuthorState);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState("");

  const handleReset = () => {
    setUploadedImageName("");
    setAuthor(defaultAuthorState);
  };

  const handleChange = (e: BaseSyntheticEvent, field: string) => {
    setAuthor((prevAuthor: AuthorObject) => ({
      ...prevAuthor,
      [field]: e?.target?.value,
    }));
  };

  const onFileUpload = (e: BaseSyntheticEvent) => {
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
        setAuthor((prevAuthor: AuthorObject) => ({
          ...prevAuthor,
          imageId: data.data.fileId,
        }));
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  };

  const handleFileRemove = () => {
    setAuthor((prevAuthor: AuthorObject) => ({
      ...prevAuthor,
      imageId: undefined,
    }));
  };

  const addAuthor = async () => {
    await axios.post("/authors", author).then(console.log).catch(console.log);
    handleReset();
  };

  const authorImageContent = author.imageId ? (
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
        Upload Image
      </Button>
    </label>
  );

  return (
    <>
      <div className="create-book-fields-container">
        <TextField
          label="Name"
          value={author.name}
          className="create-book-field"
          onChange={(e) => handleChange(e, "name")}
        />
        <div className="create-book-upload-container">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={onFileUpload}
          />
          {isLoading ? <CircularProgress /> : authorImageContent}
        </div>
      </div>
      <div className="create-button-footer">
        <div className="placeholder" />
        <div className="create-button-container">
          <Button variant="contained" onClick={addAuthor} disabled={isLoading}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
