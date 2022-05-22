import * as React from "react";
import Box from "@mui/material/Box";
import "./edit-book.css";
import { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import BookContent from "../AddBook/BookContent";
import AuthorContent from "../AddBook/AuthorContent";
import OtherContent from "../AddBook/OtherContent";
import InstancesContent from "./InstancesContent";

function EditBook({ onCancel, onSave, updateBooksList, book, openTab }: any) {
  const [data, setData] = useState<any>({
    ...book,
    authorId: book.author.id,
    author: undefined,
  });

  const style = {
    p: 4,
    top: "50%",
    left: "50%",
    width: "50%",
    boxShadow: 24,
    borderRadius: 2,
    bgcolor: "background.paper",
    transform: "translate(-50%, -50%)",
    position: "absolute" as "absolute",
  };

  useEffect(() => {
    setData({ ...book, authorId: book.author.id, author: undefined });
  }, [book]);

  const [value, setValue] = React.useState(openTab || "1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={style}>
      <div className="edit-book-container">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
              >
                <Tab label="Book" value="1" />
                <Tab label="Instances" value="2" />
                <Tab label="Author" value="3" />
                <Tab label="Other" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <BookContent
                onCancel={onCancel}
                onSave={onSave}
                book={data}
                setBook={setData}
              />
            </TabPanel>
            <TabPanel value="2">
              <InstancesContent book={data} updateBooksList={updateBooksList} />
            </TabPanel>
            <TabPanel value="3">
              <AuthorContent />
            </TabPanel>
            <TabPanel value="4">
              <OtherContent />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </Box>
  );
}

export default EditBook;
