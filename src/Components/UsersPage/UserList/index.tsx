import React, { useMemo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";

import UserItem from "../UserItem";
import { BorrowMap, UserObject, UserListProps } from "../types";

function createData(
  { id, name, email, profileImageUrl, role }: UserObject,
  borrowsMap: BorrowMap
) {
  return {
    name,
    email,
    profileImageUrl,
    role,
    borrows: borrowsMap[id],
  };
}

export default function UsersList({ users, borrowsMap }: UserListProps) {
  const rows = useMemo(
    () => users.map((user: UserObject) => createData(user, borrowsMap)),
    [users, borrowsMap]
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }}>
            <TableCell />
            <TableCell align="left" />
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <UserItem key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
