import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import {
  getFormatedImage,
  getRelatedItems,
  readingTimeCounter,
} from "../../../../utils";
import Image from "next/image";
import Link from "next/link";
import { AccessTime } from "@mui/icons-material";
import BlogsLayout from "./blogsLayout";

const Card = ({ title, slug, description, urlToImage, content, updatedAt }) => {
  const image = urlToImage ? getFormatedImage(urlToImage) : null;

  const readTime = readingTimeCounter(content);
  return (
    <Stack direction={"row"} gap={1}>
      <Stack>
        <Link href={`/blogs/${slug}`} legacyBehavior>
          <Typography
            sx={{
              fontFamily: "'Teko', sans-serif",
              lineHeight: "1.5rem",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            variant="h6"
          >
            {title.length > 50 ? `${String(title).substring(0, 50)}...` : title}{" "}
          </Typography>
        </Link>

        <Stack direction={"row"}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <AccessTime fontSize="20px" />
            <Typography variant="body2">{readTime} minutes</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Box
        sx={{
          height: 80,
          width: 80,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src={image.srcs.thumbnail}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100%"
          alt={image.alt || "blog image"}
        />
      </Box>
    </Stack>
  );
};

const query = {
  populate: ["urlToImage", "category"],
  fields: ["slug", "title", "content"],
};

async function RelatedBlogs({ blogs, slug, category }) {
  const Blogs = await getRelatedItems(blogs, slug, query, category, "blogs", 3);

  return (
    <BlogsLayout title={"related blogs"}>
      <Stack gap={1}>
        {Blogs?.map((blog) => (
          <>
            <Card {...blog.attributes} />
            <Divider />
          </>
        ))}
      </Stack>
    </BlogsLayout>
  );
}

export default RelatedBlogs;
