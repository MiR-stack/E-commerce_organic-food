"use client";

import { Box, Stack, Typography } from "@mui/material";
import useComments from "../../../hooks/useComments";
import Comments from "../../shared/comments";

function BlogComments({ id }) {
  const modalName = "api::blog.blog:";
  const { comments, totalComments, commentsRefetch } = useComments(
    modalName,
    id
  );
  console.log(comments);

  return (
    <Stack gap={2}>
      <Typography variant="h4"> Comments ({totalComments}):</Typography>
      {comments && (
        <Comments
          modalName={modalName}
          id={id}
          comments={comments}
          refetch={commentsRefetch}
        />
      )}
    </Stack>
  );
}

export default BlogComments;
