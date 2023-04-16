import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import "./home_page.css";

import Exit from "../../assets/icons/exit.png";
import ProfileCard from "../../components/ProfileCard";
import Modal from "../../components/Modal/Modal";
import axios from "../../utils/axios";
import PageSpinner from "../../components/page-spinner/PageSpinner";
import { useGlobalContext } from "../../store/Context";

const ENDPOINT = "http://localhost:8080/";
var socket;

const HomePage = () => {
  const { isAuthenticated, logout, getIdTokenClaims, isLoading } = useAuth0();
  const navigate = useNavigate();

  const {
    localUser,
    profiles,
    setProfiles,
    unchattedProfiles,
    setunchattedProfiles,
    allUsers,
    unchatData,
    notifications,
    getAllUsers,
    getUnchattedUsers,
    setNotifications,
    removeNotification,
  } = useGlobalContext();

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [userData, setUserData] = useState(undefined);

  const getToken = async () => {
    const token = await getIdTokenClaims();
    return token;
  };
  const onClose = () => {
    setLogoutOpen(false);
  };

  const removeNotifications = (id) => {
    removeNotification(id);
    navigate(`/chat/${id}`);
  };

  useEffect(() => {
    if (userData?._id || localStorage.getItem("chat-user")?._id) {
      getAllUsers(userData?._id || localStorage.getItem("chat-user")._id);
    }
    return () => {};
  }, [userData, localStorage.getItem("chat-user")]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !localStorage.getItem("chat-user")) {
      navigate("/login");
    }
    if (!isLoading && isAuthenticated && !localStorage.getItem("chat-user")) {
      getToken().then(async (res) => {
        const { data } = await axios.post("/users", {
          username: res.name,
          email: res?.email ?? res.name + "@gmail.com",
          avatarImage: res.picture,
        });
        setUserData(data);
        localStorage.setItem(
          "chat-user",
          JSON.stringify({ ...res, _id: data._id })
        );
        getUnchattedUsers(data._id);
      });
    } else if (
      !isLoading &&
      isAuthenticated &&
      localStorage.getItem("chat-user")
    ) {
      getAllUsers(localUser._id);
      getUnchattedUsers(localUser._id);
    }

    return () => {};
  }, [isLoading]);

  useEffect(() => {
    if (localUser) {
      const user = localUser;
      socket = io(ENDPOINT);
      socket.emit("setup", user);
    }
    return () => {};
  }, [localUser]);

  useEffect(() => {
    if (localUser) {
      socket.on("message-received", (newMsgReceived) => {
        if (localUser._id !== newMsgReceived.users[0]) {
          // give notification
          if (!notifications.includes(newMsgReceived)) {
            setNotifications([newMsgReceived, ...notifications]);
            if (profiles.length === 0) {
              const knownUsers = allUsers.filter((user) => {
                return newMsgReceived.sender === user._id;
              });

              const unknownUsers = allUsers.filter((user) => {
                return user._id !== newMsgReceived.sender;
              });
              setProfiles(knownUsers);
              setunchattedProfiles(unknownUsers);
            }
          }
        }
      });
    }
  });
  useEffect(() => {
    if (allUsers.length !== 0 && unchatData.length !== 0) {
      const knownUsers = allUsers.filter((user) => {
        return unchatData.filter((profile) => user._id === profile._id)[0];
      });
      const unknownUsers =
        allUsers.length === knownUsers.length
          ? []
          : allUsers.filter((user) => {
              return unchatData.filter(
                (profile) => user._id !== profile._id
              )[0];
            });
      setProfiles(knownUsers);
      setunchattedProfiles(unknownUsers);
    } else if (unchatData.length === 0) {
      setProfiles([]);
    }

    return () => {};
  }, [allUsers, unchatData]);

  return (
    <>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <>
          <Modal open={logoutOpen} onClose={onClose} logout={logout} />
          <div className="home-main-container">
            <div className="home-container-header">
              <div className="app-title">iChat</div>
              <button onClick={() => setLogoutOpen(true)}>
                <img src={Exit} alt="exit" />{" "}
              </button>
            </div>
            <div className="profiles-heading user-chats">
              <p>Your Chats</p>
            </div>
            <section className="home-container-profiles">
              <div
                className="profiles-container"
                style={{ justifyContent: profiles.length < 4 && "center" }}
              >
                {profiles.length > 0 ? (
                  profiles.map((item, index) => (
                    <div
                      className="profile"
                      key={item._id}
                      onClick={() => removeNotifications(item._id)}
                    >
                      <img src={item.avatarImage} />
                      {notifications.length > 0 &&
                        notifications.map(
                          (notif, ind) =>
                            notif.users.includes(item._id) &&
                            notif.users.includes(localUser?._id) && (
                              <div
                                className="profile-notification"
                                key={notif._id}
                              />
                            )
                        )}
                    </div>
                  ))
                ) : (
                  <div className="no-profile-container">
                    Click on the profile to start connection
                  </div>
                )}
              </div>
            </section>
            <div className="profiles-heading">
              <p>Unchatted Profiles</p>
            </div>
            <div className="unchatted-main-profiles-container">
              <div className="unchatted-profiles-container">
                {unchattedProfiles.length > 0 ? (
                  unchattedProfiles.map((card, index) => (
                    <ProfileCard
                      key={index}
                      name={card.username}
                      email={card.email}
                      id={card._id}
                      profileImage={card.avatarImage}
                    />
                  ))
                ) : (
                  <div className="no-unchatted-users">
                    All users are in your contact list
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
