"use client";
import { Typography, useMediaQuery } from "@mui/material";
import SearchBar from "../../components/shared/searchBar";
import { useSearchParams } from "next/navigation";

function BannerContent() {
  const searchParam = useSearchParams();
  const searchTerm = searchParam.get("s");
  const match = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const SearchConfig = {
    width: match ? "400px" : "100%",
    maxWidth: match ? "400px" : "250px",
    zIndex: 3,
  };
  return (
    <>
      <SearchBar open config={SearchConfig} />
      <Typography
        variant="h6"
        sx={{ textTransform: "capitalize", zIndex: 3, color: "white" }}
      >
        {searchTerm?.split("%").join(" ")}
      </Typography>
    </>
  );
}

export default BannerContent;
