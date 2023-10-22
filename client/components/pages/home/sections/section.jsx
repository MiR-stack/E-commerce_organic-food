import { Box, Button, Container, Stack, Typography } from "@mui/material";
import SectionManager from "../sectionManager/sectionManager";
import Link from "next/link";

function Section({
  data: { title, shortDescription, subtitle, sectionFor, theme, ctaButton },
}) {
  return (
    <Stack
      sx={{
        py: 4,
        px: { xs: 1, sm: 2 },
        bgcolor: `background.${theme}`,
      }}
      alignItems={"center"}
    >
      <Stack gap={1} alignItems={"center"} sx={{ textAlign: "center" }}>
        {subtitle && (
          <Typography variant="subtitle1" component="h4" color="primary.main">
            {subtitle}
          </Typography>
        )}
        <Typography variant="h3" sx={{ textTransform: "capitalize" }}>
          {" "}
          {title}{" "}
        </Typography>
        {shortDescription && (
          <Typography
            variant="body2"
            component="p"
            sx={{
              maxWidth: { lg: "1000px", md: "800px", sm: "650px", xs: "500px" },
            }}
          >
            {shortDescription}
          </Typography>
        )}
      </Stack>
      <Box sx={{ py: 4, maxWidth: "100%" }}>
        <Container maxWidth="lg">
          <span>
            <SectionManager sectionFor={sectionFor} />
          </span>
        </Container>
      </Box>
      {ctaButton ? (
        <Link href={ctaButton.href} passHref legacyBehavior>
          <Button variant="contained">{ctaButton.label}</Button>
        </Link>
      ) : (
        ""
      )}
    </Stack>
  );
}

export default Section;
