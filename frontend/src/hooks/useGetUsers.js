import { useEffect, useState } from "react";
import api from "../services/api";

function useGetUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await api.get("/users");

        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return users;
}

export default useGetUsers;