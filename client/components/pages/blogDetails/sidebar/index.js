import { Stack } from "@mui/material";
import RelatedBlogs from "./relatedBlogs";
import Ads from "./ads";
import RecentBlogs from "./recentBlogs";
import Tags from "./tags";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

function Sidebar({ related_blogs, slug, category, tags }) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid md={12} sm={6} xs={12}>
        {related_blogs ? (
          <span>
            <RelatedBlogs
              blogs={related_blogs}
              slug={slug}
              category={category}
            />
          </span>
        ) : (
          ""
        )}
      </Grid>
      <Grid md={12} sm={6} xs={12}>
        <Ads />
      </Grid>
      <Grid xs={12}>
        <span>
          <RecentBlogs />
        </span>
      </Grid>
      <span>{tags?.data?.length > 0 ? <Tags tags={tags.data} /> : ""}</span>
    </Grid>
  );
}

export default Sidebar;
