"use client";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Reviews from "../reviews";
import Comments from "../../../shared/comments";
import useDetails from "./useDetails";

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
  const {
    value,
    handleChange,
    comments,
    totalComments,
    commentsRefetch,
    reviews,
    reviewsLimit,
    handleReviewsLimit,
    reviewsRefetch,
  } = useDetails(id);

  return (
    <Box sx={{ width: "100%", pt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="details" {...a11yProps(0)} />
          <Tab label={`comments (${totalComments || 0})`} {...a11yProps(1)} />
          <Tab
            label={`reviews (${reviews?.meta.pagination.total || 0})`}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div dangerouslySetInnerHTML={{ __html: details }} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Comments
          modalName={"api::product.product:"}
          id={id}
          comments={comments}
          refetch={commentsRefetch}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Reviews
          id={id}
          reviews={reviews?.data}
          handleReviewsLimit={handleReviewsLimit}
          total={reviews?.meta.pagination.total}
          limit={reviewsLimit}
          refetch={reviewsRefetch}
        />
      </CustomTabPanel>
    </Box>
  );
}
