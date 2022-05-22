import UserList from "./UserList";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import Search from "../common/Search";
import "./user-page.css";
import Title from "../common/Title";
import axios from "../../utils/axios";
import { AxiosError } from "axios";
import { useDebounce, useUnAuthorized } from "../../utils/hooks";
import { BorrowMap } from "./types";

function UserPage() {
  const handleError = useUnAuthorized();
  const [users, setUsers] = useState([]);
  const [borrowsMap, setBorrowsMap] = useState<BorrowMap>({});

  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce(search, 2000);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "/users" + (search ? `?prefix=${search.trim()}` : "")
        );
        const usersList = response.data.response;
        setUsers(usersList);

        for (const user of usersList) {
          const response = await axios.get(`/users/${user.id}/borrows`);
          setBorrowsMap((prevBorrows: BorrowMap) => ({
            ...prevBorrows,
            [user.id]: response.data.response,
          }));
        }
      } catch (error) {
        handleError(error as AxiosError);
      }
    })();
  }, [debouncedValue]);

  return (
    <div className="user-page-container">
      <Title>Users</Title>
      <Search
        value={search}
        onChange={(e: BaseSyntheticEvent) => setSearch(e.target.value)}
      />
      <UserList users={users} borrowsMap={borrowsMap} />
    </div>
  );
}

export default UserPage;
