import "./add-book.css";

import React, { useState } from "react";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useTheme } from "@mui/material";
import TabContext from "@mui/lab/TabContext";

import BookContent from "./BookContent";
import OtherContent from "./OtherContent";
import AuthorContent from "./AuthorContent";

function AddBook({ onCancel, onSave }: any) {
  const theme = useTheme();

  const defaultBook = {
    title: "",
    description: "",
    genres: [],
    publishDate: new Date().toISOString(),
  };

  const style = {
    p: 4,
    top: "50%",
    left: "50%",
    width: "50%",
    boxShadow: 24,
    position: "absolute",
    bgcolor: "background.paper",
    transform: "translate(-50%, -50%)",
    borderRadius: theme.shape.borderRadius,
  };

  const [book, setBook] = useState<any>(defaultBook);
  const [value, setValue] = React.useState("1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={style}>
      <div className="create-book-container">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
              >
                <Tab label="Book" value="1" />
                <Tab label="Author" value="2" />
                <Tab label="Other" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <BookContent
                onCancel={onCancel}
                onSave={onSave}
                book={book}
                setBook={setBook}
              />
            </TabPanel>
            <TabPanel value="2">
              <AuthorContent />
            </TabPanel>
            <TabPanel value="3">
              <OtherContent />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </Box>
  );
}

export default AddBook;
