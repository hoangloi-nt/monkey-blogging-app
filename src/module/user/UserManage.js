import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { db } from "../../firebase/firebase-config";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";

const USER_PER_PAGE = 10;

const UserManage = () => {
  const [filter, setFilter] = useState("");
  const [userList, setUserList] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const handleLoadMoreUser = async () => {
    const nextRef = query(
      collection(db, "users"),
      startAfter(lastDoc),
      limit(USER_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList([...userList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("username", ">=", filter),
            where("username", "<=", filter + "utf8")
          )
        : query(colRef, limit(USER_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });

      setLastDoc(lastVisible);
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
    }
    fetchData();
  }, [filter]);
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  // const { userInfo } = useAuth();
  // if (userInfo.role !== userRole.ADMIN) return null;
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex items-center justify-end gap-5 mb-10 lg:gap-10">
        <input
          type="text"
          placeholder="Search username..."
          className="p-2 border border-gray-400 rounded-lg placeholder:text-sm lg:placeholder:text-base lg:p-3"
          onChange={handleInputFilter}
        />
        <Button to="/manage/add-user" kind="ghost">
          Add new user
        </Button>
      </div>
      <UserTable userList={userList}></UserTable>
      <div className="mt-10">
        {total > userList.length && (
          <Button
            onClick={handleLoadMoreUser}
            className="mx-auto"
            kind="primary"
            style={{ width: "100%", maxWidth: 200, margin: "0 auto" }}
          >
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserManage;
