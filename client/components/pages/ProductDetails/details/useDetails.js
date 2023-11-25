import { useGetProductCommentsQuery } from "../../../../store/apis/comment";
import { useState } from "react";
import qs from "qs";
import { useGetReviewsQuery } from "../../../../store/apis/review";

const commentsQuery = qs.stringify({
  sort: ["createdAt:desc"],
});

function useDetails(id) {
  const [value, setValue] = useState(0);
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  // FIXME: pagination is not working
  const {
    data: comments,
    isLoading,
    refetch: commentsRefetch,
  } = useGetProductCommentsQuery({ id, url: commentsQuery });
  const totalComments = comments?.reduce((acc, curr) => {
    acc += curr.children.length + 1;
    return acc;
  }, 0);

  // reviews
  const [reviewsLimit, setReviewsLimit] = useState(5);
  const {
    data: reviews,
    isSuccess: reviewsSuccess,
    refetch: reviewsRefetch,
  } = useGetReviewsQuery({
    productId: id,
    limit: reviewsLimit,
  });
  const handleReviewsLimit = () => {
    setReviewsLimit((prev) => prev + 5);
  };

  return {
    value,
    handleChange,
    comments,
    totalComments,
    commentsRefetch,
    reviews,
    reviewsLimit,
    reviewsRefetch,
    handleReviewsLimit,
  };
}

export default useDetails;
