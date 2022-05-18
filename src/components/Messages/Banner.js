import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const Banner = ({ bannerData }) => {
  const { firstName, lastName, profilePicUrl } = bannerData;
  return (
    <Box
      sx={{
        backgroundColor: "#EE960A",
        p: 2,
        display: "flex",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <Avatar src={profilePicUrl} sx={{ mr: 3 }} />

      <Typography
        component="h4"
        variant="body"
      >{`${firstName} ${lastName}`}</Typography>
    </Box>
  );
};

export default Banner;
