import React, { useEffect, useState } from "react";

import QRGenerate from "qrcode";
import AddIcon from "@mui/icons-material/Add";
import QrIcon from "@mui/icons-material/QrCode2";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  Paper,
  Select,
  Button,
  Divider,
  MenuItem,
  useTheme,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  InputLabel,
  IconButton,
  FormControl,
  OutlinedInput,
  TableContainer,
  SelectChangeEvent,
} from "@mui/material";

import axios from "../../../utils/axios";
import { BookObject, ValueObject } from "../types";

export default function InstancesContent({
  book,
  updateBooksList,
}: {
  book: BookObject;
  updateBooksList: () => {};
}) {
  const theme = useTheme();
  const instances = book.instances;
  const [coverTypes, setCoverTypes] = useState<any>([]);
  const [isAddingInstance, setIsAddingInstance] = useState(false);
  const [newInstance, setNewInstance] = useState("");

  useEffect(() => {
    axios
      .get("/coverTypes")
      .then((data) => {
        setCoverTypes(
          data.data.response.map(
            (coverType: { coverType: ValueObject }) => coverType.coverType
          )
        );
      })
      .catch(console.log);
  }, []);

  const handleCoverTypeChange = (e: SelectChangeEvent) => {
    setNewInstance(e.target.value);
  };

  const handleInstanceCreate = async () => {
    await axios
      .post(`/books/${book.id}/instances`, {
        coverType: newInstance,
      })
      .then(console.log)
      .catch(console.log);
    updateBooksList();
  };

  const handleInstanceDelete = async (id: string) => {
    await axios
      .delete(`/books/instances/${id}`)
      .then(console.log)
      .catch(console.log);
    updateBooksList();
  };

  const onQRClick = (instanceId: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    QRGenerate.toCanvas(canvas, `${book.id};${instanceId}`, (err) => {
      const a = document.createElement("a");
      a.download = `${book.title}_${instanceId}`;
      a.href = canvas.toDataURL();
      a.click();

      console.log(err);
    });
  };

  const instanceTable = (
    <TableContainer
      component={Paper}
      sx={{ overflowY: "scroll", maxHeight: "40vh" }}
    >
      <Table stickyHeader aria-label="simple table">
        <TableHead component={Paper}>
          <TableRow>
            <TableCell>QR</TableCell>
            <TableCell>Cover Type</TableCell>
            <TableCell>Availability</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {instances.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <IconButton onClick={() => onQRClick(row.id)}>
                  <QrIcon />
                </IconButton>
              </TableCell>
              <TableCell>{row.coverType}</TableCell>
              <TableCell>
                {row.taken ? <em>Not Available</em> : <em>Available</em>}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  sx={{ border: `1px solid ${theme.palette.error.light}` }}
                  onClick={() => handleInstanceDelete(row.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      {!!instances.length && instanceTable}
      {!!instances.length && <Divider sx={{ mt: 4, mb: 4 }} />}
      {!isAddingInstance && (
        <Button onClick={() => setIsAddingInstance(true)}>
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
          Add Instance
        </Button>
      )}
      {isAddingInstance && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl fullWidth>
            <InputLabel
              id="demo-multiple-chip-label-1"
              sx={{ background: theme.palette.background.paper }}
            >
              Cover Type
            </InputLabel>
            <Select
              labelId="demo-multiple-chip-label-1"
              value={newInstance}
              label="Cover Type"
              onChange={handleCoverTypeChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            >
              {coverTypes.map((name: string) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
      {isAddingInstance && (
        <div className="create-button-footer">
          <div className="placeholder" />
          <div className="create-button-container">
            <Button onClick={() => setIsAddingInstance(false)}>Cancel</Button>
            <Button variant="outlined" onClick={handleInstanceCreate}>
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
