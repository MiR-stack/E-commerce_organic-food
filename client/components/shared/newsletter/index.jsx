import {
  Box,
  Button,
  Container,
  Divider,
  Input,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { getData, getStrapiUrl } from "../../../utils";
import Subscribe from "./subscribe";

async function Newsletter({ widht = "lg" }) {
  const url = getStrapiUrl("/shared?populate=newsletter");

  const { data } = await getData(url, ["revalidate", "newsletter"]);
  const { title, shortDescription, placeholder, buttonLabel } =
    data.attributes.newsletter;

  return (
    <>
      <Container maxWidth={widht}>
        <Divider />
        <Stack
          direction={{ md: "row" }}
          gap={3}
          py={{ md: 5, sm: 4, xs: 3 }}
          alignItems={"center"}
        >
          <Stack gap={1}>
            <Typography variant="h4">{title} </Typography>
            <Typography variant="body1">{shortDescription} </Typography>
          </Stack>
          <Subscribe buttonLabel={buttonLabel} placeholder={placeholder} />
        </Stack>
      </Container>
    </>
  );
}

export default Newsletter;
