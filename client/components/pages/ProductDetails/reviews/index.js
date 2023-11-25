import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";
import Review from "./review";
import EmptyReviews from "./emptyReviews";
import TakeReview from "../../../shared/review";
import useModal from "../../../shared/modal/useModal";
import { useCreateReviewMutation } from "../../../../store/apis/review";
import { useDispatch, useSelector } from "react-redux";
import { handleOpen as handleOpenAuth } from "../../../../store/slices/authSlice";
import { useEffect } from "react";

function Reviews({ id, reviews, handleReviewsLimit, total, limit, refetch }) {
  //handle review creator modal
  const { open, handleClose, handleOpen } = useModal();

  // create review
  const { token } = useSelector((state) => state.authentication);
  const { isLoggedIn } = useSelector((state) => state.user);

  const [createReview] = useCreateReviewMutation();
  const dispatch = useDispatch();
  const handleSubmit = ({ rating, content }) => {
    if (!content) return;
    if (!isLoggedIn) {
      dispatch(handleOpenAuth("login"));
      return;
    }
    createReview({
      product_id: String(id),
      token,
      rating,
      review: content,
    });
  };

  // calculate avarage rating
  const avarageRating =
    reviews.reduce((acc, cur) => {
      acc += cur.attributes.rating;
      return acc;
    }, 0) / reviews.length;

  // refresh reviews
  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box>
      {reviews.length > 0 ? (
        <Box>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Typography variant="h6"> Avarage Rating </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
              {avarageRating.toFixed(1)}
            </Typography>
            <Star />
          </Stack>
          <Stack gap={3} sx={{ p: { xs: 1, sm: 2 } }}>
            {reviews.map(({ attributes: { rating, review, customer }, id }) => {
              const { avatar, firstName, lastName } = customer;
              const data = {
                avatar: avatar ? { data: { attributes: avatar } } : null,
                name: `${firstName} ${lastName}`,
                rating,
                content: review,
              };
              return <Review key={id} {...data} />;
            })}
          </Stack>
        </Box>
      ) : (
        <EmptyReviews />
      )}
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        direction={"row"}
        spacing={2}
      >
        {limit < total ? (
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
            onClick={handleReviewsLimit}
          >
            {" "}
            load more reviews
          </Typography>
        ) : (
          ""
        )}
        <Button variant="contained" onClick={handleOpen}>
          {" "}
          Write a review
        </Button>
      </Stack>
      <TakeReview
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
}

export default Reviews;
