import React, { useEffect, useContext, useState, useRef } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import io from "socket.io-client";
import HomeIcon from "@mui/icons-material/Home";
import AuthContext from "../contexts/AuthContext";
import ChatList from "../components/chats/ChatList";
import { getChats, ChatGetUserInfo } from "../apis";
import { useHistory, useLocation } from "react-router-dom";
import Banner from "../components/Messages/Banner";
import MessageInputField from "../components/Messages/MessageInputField";
import Message from "../components/Messages/Message";
import { useSelector } from "react-redux";

const MessagePage = () => {
  const history = useHistory();

  const { search } = useLocation();
  const { user } = useSelector((state) => ({ ...state }));
  const socket = useRef();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [bannerData, setBannerData] = useState({
    firstName: "",
    lastName: "",
    profilePicUrl: "",
  });

  const openChatId = useRef("");

  // const auth = useContext(AuthContext)
  const queryMessage = new URLSearchParams(search).get("message");

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(process.env.REACT_APP_API2);
    }

    if (socket.current) {
      socket.current.emit("join", { userId: user._id });

      socket.current.on("connectedUsers", ({ users }) => {
        users.length > 0 && setConnectedUsers(users);
      });
    }

    if (chats.length > 0 && !queryMessage) {
      history.push(`/messages?message=${chats[0].messagesWith}`, undefined, {
        shallow: true,
      });
    }

    return () => {
      if (socket.current) {
        socket.current.emit("logout");
        socket.current.off();
      }
    };
  }, [chats]);

  useEffect(() => {
    const getAllChats = async (token) => {
      try {
        setLoading(true);
        const res = await getChats(token);
        if (res) {
          setChats(res);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getAllChats(user.token);
  }, []);

  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit("loadMessages", {
        userId: user._id,
        messagesWith: queryMessage,
      });

      socket.current.on("messagesLoaded", async ({ chat }) => {
        setMessages(chat.messages);
        setBannerData({
          firstName: chat.messagesWith.firstName,
          lastName: chat.messagesWith.lastName,
          profilePicUrl: chat.messagesWith.profilePicUrl,
        });

        openChatId.current = chat.messagesWith._id;
      });

      socket.current.on("noChatFound", async () => {
        const { firstName, lastName, profilePicUrl } = await ChatGetUserInfo(
          queryMessage,
          user.token
        );

        setBannerData({ firstName, lastName, profilePicUrl });
        setMessages([]);

        openChatId.current = queryMessage;
      });
    };

    if (socket.current) {
      loadMessages();
    }
  }, [queryMessage]);

  const sendMsg = (msg) => {
    if (socket.current) {
      socket.current.emit("sendNewMsg", {
        userId: user._id,
        msgSendToUserId: openChatId.current,
        msg,
      });
    }
  };

  // Confirming msg is sent and receving the messages useEffect
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msgSent", ({ newMsg }) => {
        console.log("MESSAGE SENT", newMsg);
        if (newMsg.receiver === openChatId.current) {
          setMessages((prev) => [...prev, newMsg]);

          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMsg.receiver
            );
            previousChat.lastMessage = newMsg.msg;
            previousChat.date = newMsg.date;

            return [...prev];
          });
        }
      });

      socket.current.on("newMsgReceived", async ({ newMsg }) => {
        let senderFirstName;
        let senderLastName;

        console.log("NewMsg", newMsg);

        // WHEN CHAT WITH SENDER IS CURRENTLY OPENED INSIDE YOUR BROWSER
        if (newMsg.sender === openChatId.current) {
          setMessages((prev) => [...prev, newMsg]);

          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMsg.sender
            );
            previousChat.lastMessage = newMsg.msg;
            previousChat.date = newMsg.date;

            senderFirstName = previousChat.firstName;
            senderLastName = previousChat.lastName;

            return [...prev];
          });
        }
        //
        else {
          const ifPreviouslyMessaged =
            chats.filter((chat) => chat.messagesWith === newMsg.sender).length >
            0;

          if (ifPreviouslyMessaged) {
            setChats((prev) => {
              const previousChat = prev.find(
                (chat) => chat.messagesWith === newMsg.sender
              );
              previousChat.lastMessage = newMsg.msg;
              previousChat.date = newMsg.date;

              senderFirstName = previousChat.firstName;
              senderLastName = previousChat.lastName;

              return [
                previousChat,
                ...prev.filter((chat) => chat.messagesWith !== newMsg.sender),
              ];
            });
          }

          // IF NO PREVIOUS CHAT WITH THE SENDER
          else {
            const { firstName, lastName, profilePicUrl } =
              await ChatGetUserInfo(newMsg.sender);
            senderFirstName = firstName;
            senderLastName = lastName;

            const newChat = {
              messagesWith: newMsg.sender,
              firstName,
              lastName,
              profilePicUrl,
              lastMessage: newMsg.msg,
              date: newMsg.date,
            };
            setChats((prev) => [newChat, ...prev]);
          }
        }

        // newMsgSound(senderFirstName);
      });
    }
  }, [chats]);

  return (
    <Container>
      <Box
        sx={{
          my: 4,
          display: "flex",
          // flexDirection: 'column',
          alignItems: "center",
          cursor: "pointer",
          // justifyContent: 'center',
        }}
        onClick={history.goBack}
      >
        <IconButton>
          <HomeIcon sx={{ fontSize: 40, color: "#000" }} />
        </IconButton>
        <Typography variant="" component="h5">
          Go Back
        </Typography>
      </Box>
      {chats.length > 0 ? (
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Paper elevation={1} sx={{ p: 3 }}>
              {chats.map((chat, i) => (
                <ChatList
                  key={i}
                  chat={chat}
                  connectedUsers={connectedUsers}
                  // deleteChat={deleteChat}
                />
              ))}
            </Paper>
          </Grid>

          <Grid item xs={8}>
            {queryMessage && (
              <Box
                sx={{
                  overflow: "auto",
                  overflowX: "hidden",
                  maxHeight: "35rem",
                  height: "35rem",
                  backgroundColor: "whitesmoke",
                }}
              >
                <>
                  {messages.length > 0 && (
                    <>
                      <Box sx={{ position: "sticky", top: "0" }}>
                        <Banner bannerData={bannerData} />
                      </Box>
                      {messages.map((message, i) => (
                        <Message
                          key={i}
                          message={message}
                          user={user}
                          setMessages={setMessages}
                          bannerProfilePic={bannerData.profilePicUrl}
                          messagesWith={queryMessage}
                        />
                      ))}
                    </>
                  )}
                </>
                <MessageInputField sendMsg={sendMsg} />
              </Box>
            )}
          </Grid>
        </Grid>
      ) : (
        <Container>
          <Paper>
            <Typography>No Messages</Typography>
          </Paper>
        </Container>
      )}
    </Container>
  );
};

export default MessagePage;
