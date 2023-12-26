import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { getData, getStrapiUrl } from "../../../../../utils";

async function AboutUs() {
  const url = getStrapiUrl("/about-us?populate=goals");
  const { data } = await getData(url, ["homeAbout"]);
  return (
    <Grid container justifyContent={"center"}>
      {data.attributes.goals.map((goal) => (
        <Grid md={4} sm={6} key={goal.id}>
          <Stack
            sx={{
              p: 2,
              m: 2,
              border: "1px solid black",
              bgcolor: "background.offWhite",
            }}
            gap={2}
          >
            <Typography variant="h5">{goal.title} </Typography>
            <Typography variant="body1">
              {" "}
              {`${goal.description}`.length > 330
                ? `${goal.description.substr(0, 330)}...`
                : goal.description}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

export default AboutUs;
