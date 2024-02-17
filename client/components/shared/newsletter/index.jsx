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
import { MASTER_TAG } from "../../../constants";

async function Newsletter({ widht = "lg", divider = true }) {
  const url = getStrapiUrl("/shared?populate=newsletter");

  const { data } = await getData(url, [MASTER_TAG, "newsletter"]);
  const { title, shortDescription, placeholder, buttonLabel } =
    data.attributes.newsletter;

  return (
    <>
      <Container maxWidth={widht}>
        {divider ? <Divider /> : ""}
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
