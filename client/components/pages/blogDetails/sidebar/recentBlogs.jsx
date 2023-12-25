import React from "react";
import { getBlogs } from "../../../../utils";
import qs from "qs";
import BlogsLayout from "./blogsLayout";
import { Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Card = ({ title, slug }) => {
  return (
    <Stack>
      <Link href={`/blogs/${slug}`} legacyBehavior>
        <Typography
          sx={{
            fontSize: "16px !important",
            lineHeight: "1.5rem",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          variant="h6"
        >
          {title.length > 50 ? `${String(title).substring(0, 50)}...` : title}{" "}
        </Typography>
      </Link>
    </Stack>
  );
};

// create blog query
const query = qs.stringify({
  fields: ["slug", "title", "updatedAt"],
  sort: ["updatedAt:desc"],
  pagination: {
    limit: 4,
  },
});

async function RecentBlogs() {
  const recent_blogs = await getBlogs(query, { cache: "no-store" });

  const blogs = recent_blogs?.data.map((blog) => ({
    id: blog.id,
    ...blog.attributes,
  }));

  if (blogs.length < 1) return "";

  return (
    <BlogsLayout title={"recent blogs"}>
      <Stack gap={2}>
        {blogs.map((blog) => (
          <>
            <Card {...blog} />
            <Divider />
          </>
        ))}
      </Stack>
    </BlogsLayout>
  );
}

export default RecentBlogs;
