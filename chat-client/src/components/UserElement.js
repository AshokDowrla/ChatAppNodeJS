import React from "react";
import {
  Box,
  Badge,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Chat } from "phosphor-react";
import { socket } from "../socket";
import { CLOUDINARY_CLOUDNAME } from "../config";

const user_id = window.localStorage.getItem("user_id");

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserElement = ({
  avatar,
  firstName,
  lastName,
  status,
  _id,
  alreadySent,
}) => {
  const theme = useTheme();
  // console.log(status)
  const name = `${firstName} ${lastName}`;
  const user_img = `https://res.cloudinary.com/${CLOUDINARY_CLOUDNAME}/image/upload/c_scale,w_100/v${avatar?.version}/${avatar?.public_id}.${avatar?.format}`;
  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {" "}
          {status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={user_img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={user_img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {!alreadySent && (
            <Button
              onClick={() => {
                socket.emit(
                  "friend_request",
                  { to: _id, from: user_id },
                  () => {
                    alert("request sent");
                  }
                );
              }}
            >
              Send Request
            </Button>
          )}
          {alreadySent && (
            <Typography variant="subtitle2">Request Sent</Typography>
          )}
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const FriendRequestElement = ({
  avatar,
  firstName,
  lastName,
  incoming,
  missed,
  status,
  id,
}) => {
  const theme = useTheme();

  const name = `${firstName} ${lastName}`;
  const user_img = `https://res.cloudinary.com/${CLOUDINARY_CLOUDNAME}/image/upload/c_scale,w_100/v${avatar?.version}/${avatar?.public_id}.${avatar?.format}`;
  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {" "}
          {status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={user_img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={user_img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Button
            onClick={() => {
              //  emit "accept_request" event
              socket.emit("accept_request", { request_id: id });
            }}
          >
            Accept Request
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

// FriendElement

const FriendElement = ({
  avatar,
  firstName,
  lastName,
  incoming,
  missed,
  status,
  _id,
  onSelect,
}) => {
  const theme = useTheme();

  const name = `${firstName} ${lastName}`;
  const user_img = `https://res.cloudinary.com/${CLOUDINARY_CLOUDNAME}/image/upload/c_scale,w_100/v${avatar?.version}/${avatar?.public_id}.${avatar?.format}`;
  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {" "}
          {status === "Online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={user_img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={user_img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <IconButton
            onClick={() => {
              // start a new conversation
              socket.emit("start_conversation", { to: _id, from: user_id });
              onSelect();
            }}
          >
            <Chat />
          </IconButton>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export { UserElement, FriendRequestElement, FriendElement };
