import { Rating, Stack, Typography } from "@mui/material";
import CSR from "./CSR";
import Share from "./CSR/Share";
import { TitleText } from "./CSR/utils";

function Content({
  id,
  name,
  thumbnail,
  avarageRating,
  stockStatus,
  weight,
  salePrice,
  price,
  shortDescription,
}) {
  const cartData = {
    id,
    name,
    salePrice,
    price,
    thumbnail,
    stockStatus,
  };

  const stockStatusColors = {
    "stock out": "#F443363D",
    available: "#00695C45",
    "coming soon": "#bbdefb",
  };

  return (
    <Stack gap={1} alignItems={"flex-start"}>
      <Typography variant="h4">{name}</Typography>{" "}
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Rating readOnly value={avarageRating} />
        <Typography variant="h6">{avarageRating} </Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <TitleText>Stock:</TitleText>
        <Typography
          sx={{
            bgcolor: stockStatusColors[stockStatus] || "pink",
            p: "4px",
            px: "10px",
            borderRadius: "4px",
          }}
        >
          {stockStatus}
        </Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <TitleText> Weight:</TitleText>
        <Typography>{weight}</Typography>
      </Stack>
      {/* <Stack direction={"row"} alignItems={"center"} gap={1}>
        <TitleText> Variations:</TitleText>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          defaultValue={"red"}
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="red" control={<Radio />} label="red" />
          <FormControlLabel value="green" control={<Radio />} label="green" />
          <FormControlLabel value="black" control={<Radio />} label="black" />
        </RadioGroup>
      </Stack> */}
      <CSR data={cartData} />
      <Typography variant="body1">{shortDescription}</Typography>
      <Share />
    </Stack>
  );
}

export default Content;
