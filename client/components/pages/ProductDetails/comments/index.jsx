import { Box, Button, Stack, Typography } from "@mui/material";
import CommentBar from "./commentBar";
import CustomAvater from "../../../utils/avatar";
import { useEffect, useState } from "react";
import { useDeleteProductCommentMutation } from "../../../../store/apis/comment";
import { useSelector } from "react-redux";
import EmptyComments from "./emptyComments";

const styles = {
  comment: {
    height: 50,
    width: 50,
  },
  reply: {
    height: 40,
    width: 40,
  },
};

const Comment = ({
  productId,
  id,
  commentId,
  authorId,
  name,
  content,
  replies,
  reply,
}) => {
  const [repliesIsOpen, setRepliesIsOpen] = useState(false);
  const handleReplies = () => {
    setRepliesIsOpen(true);
  };

  const [replybar, setReplybar] = useState(false);
  const handleReplybar = () => {
    setReplybar(!replybar);
    setRepliesIsOpen(true);
  };

  const { token, user } = useSelector((state) => state.authentication);
  const [deleteComment] = useDeleteProductCommentMutation();
  const handleDelete = () => {
    deleteComment({ productId, commentId, authorId, token });
  };

  return (
    <Stack direction={"row"} spacing={2}>
      <CustomAvater
        name={name}
        styles={reply ? styles.reply : styles.comment}
      />
      <Stack spacing={2} sx={{ width: reply ? "80%" : "100%" }}>
        <Stack
          sx={{
            p: 2,
            bgcolor: "background.offWhite",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6">{name} </Typography>
          <Stack>
            <Typography variant={reply ? "body2" : "body1"}>
              {content}{" "}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              {!repliesIsOpen && !reply && replies.length > 0 && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    cursor: "pointer",
                    color: "text.secondary",
                    ":hover": {
                      textDecoration: "underline",
                      color: "text.primary",
                    },
                  }}
                  onClick={handleReplies}
                >
                  View Replies ({replies.length})
                </Typography>
              )}
              <Button size={reply ? "small" : "large"} onClick={handleReplybar}>
                reply
              </Button>
              {authorId === user?.id ? (
                <Button
                  size={reply ? "small" : "large"}
                  color="warning"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </Stack>
        {repliesIsOpen ? (
          <Stack spacing={2}>
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                commentId={reply.id}
                authorId={reply.author.id}
                id={id}
                productId={productId}
                name={reply.author.name}
                content={reply.content}
                replies={reply.children}
                reply
              />
            ))}
          </Stack>
        ) : (
          ""
        )}
        <CommentBar id={productId} isOpen={replybar} reply threadOf={id} />
      </Stack>
    </Stack>
  );
};

function Comments({ id, comments, refetch }) {
  useEffect(() => {
    refetch();
  }, []);
  return (
    <Box>
      {comments.length > 0 ? (
        <Stack spacing={2} sx={{ pb: 3 }}>
          {comments?.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              commentId={comment.id}
              authorId={comment.author.id}
              name={comment.author.name}
              content={comment.content}
              replies={comment.children}
              productId={id}
            />
          ))}
        </Stack>
      ) : (
        <EmptyComments />
      )}
      <CommentBar id={id} />
    </Box>
  );
}

export default Comments;
