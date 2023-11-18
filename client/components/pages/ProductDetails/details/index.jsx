"use client";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Reviews from "../reviews";
import Comments from "../comments";
import { useGetProductCommentsQuery } from "../../../../store/apis/comment";
import { useEffect, useState } from "react";
import qs from "qs";
import { useGetReviewsQuery } from "../../../../store/apis/review";

const commentsUrl = qs.stringify({
  sort: ["createdAt:desc"],
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { sm: 3, xs: 0 }, py: { xs: 2 } }}>{children}</Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Details({ id, details }) {
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  // FIXME: pagination is not working
  const {
    data: comments,
    isLoading,
    refetch: commentsRefetch,
  } = useGetProductCommentsQuery({ id, url: commentsUrl });
  const totalComments = comments?.reduce((acc, curr) => {
    acc += curr.children.length + 1;
    return acc;
  }, 0);

  // reviews
  const [reviewsLimit, setReviewsLimit] = useState(5);
  const { data: reviews, refetch: reviewsRefetch } = useGetReviewsQuery({
    productId: id,
    limit: reviewsLimit,
  });
  const handleReviewsLimit = () => {
    setReviewsLimit((prev) => prev + 5);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="details" {...a11yProps(0)} />
          <Tab label={`comments (${totalComments || 0})`} {...a11yProps(1)} />
          <Tab
            label={`reviews (${reviews?.meta.pagination.total})`}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div dangerouslySetInnerHTML={{ __html: details }} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Comments id={id} comments={comments} refetch={commentsRefetch} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Reviews
          id={id}
          reviews={reviews?.data}
          handleReviewsLimit={handleReviewsLimit}
          total={reviews?.meta.pagination.total}
          limit={reviewsLimit}
        />
      </CustomTabPanel>
    </Box>
  );
}
