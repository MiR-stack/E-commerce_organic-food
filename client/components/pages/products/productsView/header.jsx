import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { GridView, ViewList } from "@mui/icons-material";
import useDynamicUrl from "../../../../hooks/useDynamicUrl";
import { useEffect, useState } from "react";
import MobileFilter from "../mobileFilter";

function Header({ handleView, view, categories }) {
  const { setRouter, searchParams } = useDynamicUrl();

  const initSort = searchParams.get("sort");

  const [sort, setSort] = useState(initSort || "asc");
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    setRouter("sort", sort);
  }, [sort]);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <ToggleButtonGroup
          value={view}
          exclusive
          color="primary"
          onChange={handleView}
          aria-label="text alignment"
          size="small"
        >
          <ToggleButton
            value="grid"
            aria-label="grid view"
            sx={{ border: "none" }}
          >
            <GridView />
          </ToggleButton>
          <ToggleButton
            value="list"
            aria-label="list view"
            sx={{ border: "none" }}
          >
            <ViewList />
          </ToggleButton>
        </ToggleButtonGroup>
        <MobileFilter categories={categories} />
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        <Typography
          variant="subtitle1"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          short by:
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={sort}
            onChange={handleSort}
            inputProps={{ "aria-label": "Without label" }}
            size="small"
            name="sort"
          >
            <MenuItem value={"asc"}>lowest to highest</MenuItem>
            <MenuItem value={"desc"}>highest to lowest</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}

export default Header;
