import { useState } from "react";
const initState = {
  content: "",
  threadOf: null,
};

function useComment() {
  const [state, setState] = useState({ ...initState });
  const handleContent = (e) => setState({ ...state, content: e.target.value });
  const handleReply = (id) => setState({ ...state, threadOf: id });
  const resetComment = () => setState({ ...initState });
  return { content: state.content, handleContent, handleReply ,resetComment};
}

export default useComment;
