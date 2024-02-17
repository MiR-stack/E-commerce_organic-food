import qs from "qs";
import { getBlogs } from "../../../utils";
import { Container, Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Main from "../../../components/pages/blogDetails";
import Sidebar from "../../../components/pages/blogDetails/sidebar";
import { MASTER_TAG } from "../../../constants";

async function BlogDetails({ params }) {
  const blogQuery = qs.stringify({
    populate: {
      profile: {
        fields: ["customer_id"],
      },
      urlToImage: {
        populate: "*",
      },
      related_blogs: {
        populate: ["urlToImage"],
        fields: ["title", "slug", "description", "content", "updatedAt"],
      },
      category: {
        fields: ["slug", "name"],
      },
      tags: {
        fields: ["slug", "name"],
      },
    },
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
  });

  const blog = await getBlogs(blogQuery, {
    tags: [MASTER_TAG, params.slug],
    cache: false,
  });

  const {
    slug,
    title,
    content,
    urlToImage,
    permalink,
    profile,
    category,
    related_blogs,
    tags,
  } = blog.data[0].attributes;

  const contentProps = {
    title,
    content,
    urlToImage,
    permalink,
    authorId: profile.data.attributes.customer_id,
  };

  return (
    <Container sx={{ mt: { sm: 3, xs: 2 } }}>
      <Grid container gap={3}>
        <Grid md={8}>
          <Main contentProps={contentProps} id={blog.data[0].id} />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid md={3}>
          <Sidebar
            related_blogs={related_blogs?.data}
            slug={slug}
            category={category}
            tags={tags}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default BlogDetails;
