"use client";

import { useGetBlogsMutation } from "../../../store/apis/blogs";
import blogsAdapter from "../../../adapters/blog";
import { Divider, Stack, Box, Button, Typography } from "@mui/material";
import BlogCard from "./blogCard";
import qs from "qs";
import { useEffect, useState } from "react";
import LoadingBlogs from "./LoadingBlogs";
import { useSearchParams } from "next/navigation";

const blogQuery = (data) => {
  return qs.stringify({
    populate: {
      profile: {
        fields: ["name"],
      },
      urlToImage: {
        fields: ["name", "alternativeText", "formats"],
      },
    },
    filters: {
      title: {
        $containsi: data?.searchTerms,
      },
    },
    fields: ["title", "description", "content", "slug", "permalink"],
    pagination: {
      page: data?.page || 1,
      pageSize: data?.pageSize || 5,
    },
  });
};

function Blogs() {
  const [getBlogs, { data, isSuccess, isLoading }] = useGetBlogsMutation();
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    getBlogs(blogQuery());
  }, []);

  if (isSuccess) {
    var blogs = blogsAdapter(data.data);
  }

  useEffect(() => {
    if (isSuccess) {
      setBlogData([...blogData, ...blogs]);
    }
  }, [isSuccess]);

  const params = useSearchParams();
  const searchTerms = params.get("s");

  useEffect(() => {
    getBlogs(blogQuery({ searchTerms }));
  }, [searchTerms]);

  useEffect(() => {
    if (searchTerms && isSuccess) {
      setBlogData(blogs);
    }
  }, [searchTerms, isSuccess]);

  const handleLoadMore = (e, pageSize = 5) => {
    getBlogs(blogQuery({ page: data.meta.pagination.page + 1, pageSize }));
  };

  if (blogData.length < 1)
    return (
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "40vh", width: "100%" }}
      >
        <Typography variant="h3">no blogs found</Typography>
      </Stack>
    );

  return (
    <>
      <Stack
        gap={3}
        sx={{ pt: { xs: 2, sm: 3 } }}
        direction={{ sm: "row", md: "column" }}
        flexWrap={{ sm: "wrap" }}
      >
        {blogData.length < 1 && isLoading ? (
          <LoadingBlogs />
        ) : (
          blogData?.map((blog, index) => (
            <Box key={index} width={{ sm: "48%", md: "100%" }}>
              <BlogCard {...blog} index={index} />
              <Divider
                sx={{
                  mt: { md: 5, xs: 2 },
                  display: { sm: "none", md: "block" },
                }}
              />
            </Box>
          ))
        )}
      </Stack>
      {data?.meta.pagination.pageCount > data?.meta.pagination.page ? (
        <Stack alignItems={"center"} mt={2}>
          <Button onClick={handleLoadMore}>
            {isLoading ? "loading..." : "Load more..."}{" "}
          </Button>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}

export default Blogs;
