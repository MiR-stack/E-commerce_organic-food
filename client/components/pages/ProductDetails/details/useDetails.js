import { useState } from "react";
import { useGetReviewsQuery } from "../../../../store/apis/review";
import useComments from "../../../../hooks/useComments";

function useDetails(id) {
  const [value, setValue] = useState(0);
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  // get comments funtionality
  const { comments, totalComments, commentsRefetch } = useComments(
    "api::product.product:",
    id
  );

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
