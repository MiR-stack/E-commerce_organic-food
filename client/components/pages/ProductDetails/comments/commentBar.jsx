import {
  Button,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import useComment from "./useComment";
import { useCreateProductCommentMutation } from "../../../../store/apis/comment";
import { useDispatch, useSelector } from "react-redux";
import { handleOpen } from "../../../../store/slices/authSlice";

function CommentBar({ id, reply, isOpen, threadOf }) {
  const { content, handleContent, resetComment } = useComment();
  const [createComment] = useCreateProductCommentMutation();

  const { isLoggedIn, token } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!content) return;

    if (!isLoggedIn) {
      dispatch(handleOpen("login"));
      return;
    }
    createComment({ id, content, threadOf, token });
    resetComment();
    isOpen = false;
  };

  return reply ? (
    <Stack
      direction={"row"}
      spacing={1}
      sx={{ display: isOpen ? "flex" : "none" }}
    >
      <TextField
        id={String(Math.random())}
        variant="outlined"
        size="small"
        value={content}
        onChange={handleContent}
      />
      <Button variant="contained" size="small" onClick={handleSubmit}>
        reply
      </Button>
    </Stack>
  ) : (
    <Stack spacing={2} sx={{ maxWidth: { sm: 400 } }}>
      <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
        Leave a comment:
      </Typography>
      <TextareaAutosize
        id="comment"
        minRows={5}
        value={content}
        onChange={handleContent}
      />
      <Button variant="contained" onClick={handleSubmit}>
        comment
      </Button>
    </Stack>
  );
}

export default CommentBar;
