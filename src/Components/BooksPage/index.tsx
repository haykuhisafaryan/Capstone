import "./books-page.css";

import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";

import { AxiosError } from "axios";
import { Button, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";

import AddBook from "./AddBook";
import BookList from "./BookList";
import EditBook from "./EditBook";
import Title from "../common/Title";
import axios from "../../utils/axios";
import Search from "../common/Search";
import Loading from "../common/Loading";

import { BookObject } from "./types";
import { useDebounce, useUnAuthorized } from "../../utils/hooks";

function BookPage() {
  const handleError = useUnAuthorized();
  const theme = useTheme();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openCreateModal, setOpenCreateModal] = React.useState(false);

  const debouncedValue = useDebounce(search, 2000);

  const handleOpenCreateModal = () => setOpenCreateModal(true);

  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleOpenEditModal = () => setOpenEditModal(true);

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    openingTabRef.current = "1";
  };

  const onBookEditClick = (book: BookObject) => {
    setEditingBook(book);
    handleOpenEditModal();
  };
  const openingTabRef = useRef("1");

  const updateBooksList = (searchValue?: string) => {
    return axios
      .get(
        "/books" +
          (searchValue
            ? `?keywords=${searchValue.trim().replaceAll(" ", ",")}`
            : "")
      )
      .then((response) => setBooks(response.data.response))
      .catch(handleError);
  };

  useEffect(() => {
    setIsLoading(true);
    updateBooksList(debouncedValue).finally(() => setIsLoading(false));
  }, [debouncedValue]);

  useEffect(() => {
    const newEditingBook = books.find(
      (book: BookObject) => book.id === editingBook?.id
    );
    setEditingBook(newEditingBook);
  }, [books]);

  const handleBookCreate = async (book: BookObject) => {
    try {
      const res = await axios.post("/books", book);
      setEditingBook(res.data.response);
      handleCloseCreateModal();
      await updateBooksList();
    } catch (error: any) {
      handleError(error as AxiosError);
    }
  };

  const handleBookEdit = async (book: BookObject) => {
    await axios
      .put(`/books/${book.id}`, { ...book, id: undefined })
      .catch(handleError);
    await updateBooksList();
  };

  const addBookButtonStyles = {
    paddingX: 12,
    color: theme.palette.text.secondary,
    fontSize: 16,
  };
  const title = <Title>Books</Title>;

  const loading = <Loading />;

  const content = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search
          value={search}
          onChange={(e: BaseSyntheticEvent) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          sx={addBookButtonStyles}
          onClick={handleOpenCreateModal}
        >
          Add Book
        </Button>
      </div>
      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddBook
          onCancel={handleCloseCreateModal}
          onSave={handleBookCreate}
          updateBooksList={updateBooksList}
        />
      </Modal>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditBook
          onCancel={handleCloseEditModal}
          book={editingBook}
          onSave={handleBookEdit}
          updateBooksList={updateBooksList}
          openTab={openingTabRef.current}
        />
      </Modal>
      <BookList
        books={books}
        onBookEdit={onBookEditClick}
        updateBooksList={updateBooksList}
        onQRClick={(book: any) => {
          openingTabRef.current = "2";
          setEditingBook(book);
          handleOpenEditModal();
        }}
      />
    </>
  );

  return (
    <div className="books-page-container">
      {title}
      {isLoading ? loading : content}
    </div>
  );
}

export default BookPage;
