import qs from "qs";
import { getFormatedImage } from "../../../../../utils";
import BlogCard from "../../../../shared/blogCard";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { getData } from "../../../../../utils/utils";
import { MASTER_TAG } from "../../../../../constants";
const query = qs.stringify({
  populate: {
    profile: {
      fields: ["name"],
    },
    urlToImage: {
      fields: ["name", "alternativeText", "formats"],
    },
  },
  fields: ["title", "description"],
  pagination: {
    limit: 3,
  },
});

async function Blog() {
  const blogsData = await getData(`/blogs?${query}`, {
    authorization: process.env.NEXT_PUBLIC_APP_TOKEN,
    revalidation: 60 * 60 * 24,
    tags: [MASTER_TAG, "blogs"],
  });

  const blogs = blogsData.data.map((blog) => {
    const { title, description, profile, urlToImage } = blog.attributes;
    const { name } = profile.data.attributes;
    const { srcs, alt } = getFormatedImage(urlToImage);

    const readTime = Math.ceil(description.length / 200);

    return {
      title,
      description,
      author: name,
      image: { url: srcs.medium, alt },
      readTime,
    };
  });

  return (
    <Grid container spacing={3}>
      {blogs.map((blog) => (
        <Grid md={4} sm={6} key={blog.id}>
          <BlogCard {...blog} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Blog;
