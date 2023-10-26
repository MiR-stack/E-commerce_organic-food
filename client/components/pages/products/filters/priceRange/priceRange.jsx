"use client";
import { ArrowRightAlt } from "@mui/icons-material";
import { Stack, Typography, Slider, Box, TextField } from "@mui/material";
import usePriceRange from "./usePriceRange";

function PriceRange() {
  const {
    priceRange,
    handlePriceRange,
    handleMinPriceRange,
    handleMaxPriceRange,
  } = usePriceRange();
  return (
    <Stack>
      <Typography variant="subtitle1">Price Range</Typography>
      <Box sx={{ width: "100%", maxWidth: 250 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={priceRange}
          onChange={handlePriceRange}
          valueLabelDisplay="auto"
          // min={Number(range.min)}
          // max={Number(range.max)}
          disableSwap
          // getAriaValueText={valuetext}
        />
      </Box>
      <Stack direction={"row"} alignItems={"center"}>
        <TextField
          name="min-range"
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          type="number"
          value={priceRange[0]}
          onChange={handleMinPriceRange}
          size="small"
        />
        <ArrowRightAlt />
        <TextField
          name="outlined-basic"
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={priceRange[1]}
          onChange={handleMaxPriceRange}
          type="number"
          size="small"
        />
      </Stack>
    </Stack>
  );
}

export default PriceRange;
