"use client";

import { IconButton, InputBase, Paper, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SearcIconWraper = styled(Link)(() => ({
  background: "transparent",
}));

const Input = styled(InputBase)(() => ({}));

const Search = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  padding: "2px 10px",
  paddingLeft: "15px",
  alignItems: "center",
  gap: "5px",
  height: "35px",

  [theme.breakpoints.down("sm")]: {
    height: "30px",
    padding: "2px",
    paddingLeft: "5px",
    gap: "2px",
  },
}));

const SearchBar = ({ open, styles, prefix = "products" }) => {
  const pathName = usePathname();
  const blackLists = ["/products", "/blogs"];

  const params = useSearchParams();
  const searchQuery = params.get("s");

  const [searchTerm, setSearchTerm] = useState(searchQuery || "");

  return (
    <Search
      elevation={0}
      variant="outlined"
      sx={{
        display: !open && blackLists.includes(pathName) ? "none" : "flex",
        ...styles,
      }}
    >
      <Input
        name="search"
        key={"search"}
        placeholder="Search..."
        value={searchTerm}
        type="search"
        sx={{ width: "100%" }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearcIconWraper href={`/${prefix}?s=${searchTerm.split(" ").join("%")}`}>
        <IconButton aria-label="search" disableRipple={true}>
          <SearchIcon />
        </IconButton>
      </SearcIconWraper>
    </Search>
  );
};

export default SearchBar;
