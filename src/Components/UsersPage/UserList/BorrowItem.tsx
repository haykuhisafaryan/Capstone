import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { BorrowItemProps } from "../types";

function BorrowItem({ borrow }: BorrowItemProps) {
  return (
    <TableRow key={borrow.bookInstanceId + borrow.createDate}>
      <TableCell component="th" scope="row">
      { borrow.book ? `${borrow.book.title} by ${borrow.book.author?.name}` : 'Book not available'}
      </TableCell>
      <TableCell>{borrow.bookInstanceId}</TableCell>
      <TableCell align="right">
        {new Date(borrow.createDate).toLocaleString()}
      </TableCell>
      <TableCell align="right">
        {new Date(borrow.dueDate).toLocaleString()}
      </TableCell>
      <TableCell align="right">
        {new Date(borrow.returnDate).toLocaleString()}
      </TableCell>
    </TableRow>
  );
}

export default BorrowItem;
