import React, { createContext, useContext, useState } from "react";
import axios from "../utils/axios";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem("chat-user"));

  const [selectedUser, setSelectedUser] = useState({});
  const [isSelectedNewUser, setIsSelectedNewUser] = useState(false);

  const [allUsers, setAllUsers] = useState([]);
  const [profiles, setProfiles] = useState([
    { _id: "1" },
    { _id: "2" },
    { _id: "3" },
    { _id: "4" },
  ]);

  const [notifications, setNotifications] = useState([]);

  const [unchattedProfiles, setunchattedProfiles] = useState([]);
  const [unchatData, setUnChatData] = useState([]);

  const getAllUsers = async (id) => {
    const { data } = await axios.get(`/users/all/${id}`);
    setAllUsers(data);
    setunchattedProfiles(data);
  };
  const getUnchattedUsers = async (id) => {
    const { data } = await axios.get(`/profiles/${id}`);
    setUnChatData(data.data);
  };

  const removeNotification = (id) => {
    const newNotif = notifications.filter((notif) => notif.sender !== id);
    setNotifications(newNotif);
  };

  const returnObj = {
    selectedUser,
    setSelectedUser,
    isSelectedNewUser,
    setIsSelectedNewUser,
    localUser,
    senderId: localUser?._id ?? "",
    profiles,
    setProfiles,
    unchattedProfiles,
    setunchattedProfiles,
    allUsers,
    setAllUsers,
    notifications,
    setNotifications,
    unchatData,
    getAllUsers,
    getUnchattedUsers,
    removeNotification,
  };
  return (
    <AppContext.Provider value={returnObj}>{children}</AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext, AppContext };
