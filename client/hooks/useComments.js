import { useGetProductCommentsQuery } from "../store/apis/comment";
import qs from "qs";

const commentsQuery = qs.stringify({
  filters: {
    blocked: {
      $eq: false,
    },
  },
  sort: ["createdAt:desc"],
});

function useComments(modalName, id) {
  // FIXME: pagination is not working
  const {
    data: comments,
    isLoading,
    refetch: commentsRefetch,
  } = useGetProductCommentsQuery({ modalName, id, url: commentsQuery });
  const totalComments = comments?.reduce((acc, curr) => {
    acc += curr.children.length + 1;
    return acc;
  }, 0);

  return {
    comments,
    totalComments,
    commentsRefetch,
  };
}

export default useComments;
