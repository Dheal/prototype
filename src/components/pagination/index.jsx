import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";

const Paginations = ({ count, page, setPage }) => {
  const [setSearchParams] = useSearchParams();
  const handleChange = (event, value) => {
    setPage(value);
    setSearchParams({
      page: value,
    });
  };

  return (
    <Stack spacing={2}>
      <Pagination count={count} page={+page} onChange={handleChange} />
    </Stack>
  );
};

export default Paginations;
