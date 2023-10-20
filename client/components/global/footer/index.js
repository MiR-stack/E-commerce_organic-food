import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Items from "./items";

function Footer({
  footerData: {
    footer: { brand, bottom_footer },
    footer_links,
  },
}) {
  return (
    <Box sx={{ pt: 5 }}>
      <Container maxWidth="xl">
        <Divider />

        <Grid container spacing={3} sx={{ py: 5 }}>
          <Grid md={4} sm={6} xs={12}>
            <Typography component="h4" variant="h4" gutterBottom>
              {" "}
              {brand.name}{" "}
            </Typography>
            <Typography variant="body1">{brand.description}</Typography>
          </Grid>
          {footer_links.map((footer_link) => (
            <Items footer_link={footer_link} />
          ))}
        </Grid>
      </Container>
      <Paper
        elevation={0}
        sx={{
          textAlign: "center",
          bgcolor: "background.offWhite",
          p: 2,
          textTransform: "capitalize",
        }}
      >
        {bottom_footer}{" "}
      </Paper>
    </Box>
  );
}

export default Footer;
