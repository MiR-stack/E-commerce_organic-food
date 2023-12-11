import qs from "qs";
import { getBlogs } from "../../../utils";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Main from "../../../components/pages/blogDetails";

async function BlogDetails({ params }) {
  const blogQuery = qs.stringify({
    populate: {
      profile: {
        fields: ["customer_id"],
      },
      urlToImage: {
        populate: "*",
      },
    },
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
  });

  const blog = await getBlogs(blogQuery, {
    tags: ["blogDetails", params.slug],
    cache: false,
  });

  const { title, content, urlToImage, permalink, profile } =
    blog.data[0].attributes;

  const contentProps = {
    title,
    content,
    urlToImage,
    permalink,
    authorId: profile.data.attributes.customer_id,
  };

  return (
    <Container>
      <Grid container>
        <Grid md={8}>
          <Main contentProps={contentProps} id={blog.data[0].id} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default BlogDetails;
