"use client";
import {
  Box,
  Button,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import useDynamicUrl from "../../../../hooks/useDynamicUrl";

function FilterList({ param, title, lists }) {
  const { setRouter, searchParams, removeQueryParam } = useDynamicUrl();

  const values = searchParams.get(param)?.split(",");

  lists.forEach((list) => {
    const isSelected = values?.includes(list.slug);
    list.selected = isSelected ? true : false;
  });
  const [state, setState] = useState(lists);

  const handleState = (slug) => {
    const newState = state.map((item) => {
      if (item.slug === slug) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setState(newState);
  };

  const handleReset = () => {
    const newState = state.map((item) => {
      return { ...item, selected: false };
    });
    setState(newState);
  };

  useEffect(() => {
    const value = state.reduce((acc, cur) => {
      if (cur.selected) {
        acc += `${cur.slug},`;
      }
      return acc;
    }, "");

    if (value) {
      setRouter(param, value);
    } else {
      removeQueryParam(param);
    }
  }, [state]);

  return (
    <Box>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6">{title} </Typography>
        <Button onClick={handleReset} color="warning">
          reset
        </Button>
      </Stack>
      <Stack sx={{ pl: 2 }}>
        {state.map((list, index) => (
          <FormControlLabel
            key={index}
            label={list.name}
            control={
              <Checkbox
                name={list.slug}
                checked={list.selected}
                onChange={() => handleState(list.slug)}
              />
            }
          />
        ))}
      </Stack>
    </Box>
  );
}

export default FilterList;
