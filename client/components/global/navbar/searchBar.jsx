"use client";

import { IconButton, InputBase, Paper, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const SearcIconWraper = styled(Link)(() => ({
  background: "transparent",
}));

const Input = styled(InputBase)(() => ({}));

const SearchBar = () => {
  const pathName = usePathname();

  const Search = styled(Paper)(({ theme }) => ({
    borderRadius: "10px",
    padding: "2px 10px",
    paddingLeft: "15px",
    display: pathName === "/products" ? "none" : "flex",
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

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Search elevation={0} variant="outlined">
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearcIconWraper href={`/products?s=${searchTerm.split(" ").join("%")}`}>
        <IconButton aria-label="search" disableRipple={true}>
          <SearchIcon />
        </IconButton>
      </SearcIconWraper>
    </Search>
  );
};

export default SearchBar;
