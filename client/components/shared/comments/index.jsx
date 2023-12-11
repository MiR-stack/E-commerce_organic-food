import { Box, Button, Stack, Typography } from "@mui/material";
import CommentBar from "./commentBar";
import CustomAvater from "../../utils/avatar";
import { useEffect, useState } from "react";
import { useDeleteProductCommentMutation } from "../../../store/apis/comment";
import { useSelector } from "react-redux";
import EmptyComments from "./emptyComments";
import PropTypes from "prop-types";

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
  modalName,
  componentId,
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

  const { token } = useSelector((state) => state.authentication);
  const { user } = useSelector((state) => state.user);
  const [deleteComment] = useDeleteProductCommentMutation();
  const handleDelete = () => {
    deleteComment({ modalName, componentId, commentId, authorId, token });
  };

  return (
    <Stack gap={2}>
      <Stack
        direction={"row"}
        spacing={{ sm: 2 }}
        sx={{
          bgcolor: { xs: "background.offWhite", sm: "transparent" },
          p: { xs: 1, sm: 0 },
          borderRadius: 2,
        }}
      >
        <CustomAvater
          name={name}
          styles={reply ? styles.reply : styles.comment}
          config={{ name: "sm" }}
        />
        <Stack spacing={{ sm: 2 }} sx={{ width: "100%" }}>
          <Stack
            sx={{
              p: { sm: 2, xs: 1 },
              bgcolor: { sm: "background.offWhite" },
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
                <Button
                  size={reply ? "small" : "large"}
                  onClick={handleReplybar}
                >
                  reply
                </Button>
                {authorId && authorId === user?.id ? (
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
        </Stack>
      </Stack>
      {repliesIsOpen ? (
        <Stack spacing={2} sx={{ ml: { sm: 8, xs: 3 } }}>
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              modalName={modalName}
              commentId={reply.id}
              authorId={reply.author.id}
              id={id}
              componentId={componentId}
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

      <CommentBar
        modalName={modalName}
        id={componentId}
        isOpen={replybar}
        reply
        threadOf={id}
      />
    </Stack>
  );
};

function Comments({ modalName, id, comments, refetch }) {
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
              modalName={modalName}
              id={comment.id}
              commentId={comment.id}
              authorId={comment.author.id}
              name={comment.author.name}
              content={comment.content}
              replies={comment.children}
              componentId={id}
            />
          ))}
        </Stack>
      ) : (
        <EmptyComments />
      )}
      <CommentBar modalName={modalName} id={id} />
    </Box>
  );
}

export default Comments;

Comments.propTypes = {
  modalName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      content: PropTypes.string.isRequired,
      children: PropTypes.array,
    })
  ),
  refetch: PropTypes.func,
};
