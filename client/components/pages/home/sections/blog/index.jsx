import qs from "qs";
import { getData, getFormatedImage, getStrapiUrl } from "../../../../../utils";
import BlogCard from "../../../../shared/blogCard";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
const query = qs.stringify({
  populate: {
    profile: {
      fields: ["firstName", "lastName"],
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
  const url = getStrapiUrl(`/blogs?${query}`);
  const blogsData = await getData(url);

  const blogs = blogsData.data.map((blog) => {
    const { title, description, profile, urlToImage } = blog.attributes;
    const { firstName, lastName } = profile.data.attributes;
    const { srcs, alt } = getFormatedImage(urlToImage);

    const readTime = Math.ceil(description.length / 200);

    return {
      title,
      description,
      author: `${firstName} ${lastName}`,
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
