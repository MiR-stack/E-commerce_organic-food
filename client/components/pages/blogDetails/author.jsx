import React from "react";
import { customerQuery, getCustomer } from "../../../utils/customer";
import { Stack, Typography } from "@mui/material";
import CustomAvater from "../../utils/avatar";
import { getStrapiMedia } from "../../../utils";

async function Author({ authorId }) {
  const { firstName, lastName, avatar } = await getCustomer(
    authorId,
    customerQuery
  );

  const avatarUrl = getStrapiMedia(avatar.formats.thumbnail.url);
  const name = `${firstName} ${lastName}`;

  return (
    <Stack direction={"row"} gap={1} alignItems={"center"}>
      <CustomAvater avatarUrl={avatarUrl} name={name} size="md" />
      <Typography variant="subtitle1" textTransform={"capitalize"}>
        {name}{" "}
      </Typography>
    </Stack>
  );
}

export default Author;
