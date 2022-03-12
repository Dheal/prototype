import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import { Pagination } from "@mui/material";

import Table from "components/table";
import { columns, getOrderHistory, rows } from "pages/orders/helper";
import { theme } from "config/theme";
import InputField from "components/input-field";
import SearchIcon from "@mui/icons-material/Search";

const OrderWorkList = () => {
  const classes = useStyles();
  const { register, control } = useForm();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [tableLoader, setTableLoader] = useState(true);
  const [sortParam, setSortParam] = useState("");

  useEffect(() => {
    getOrderHistory();
  }, []);

  return (
    <>
      <div className={classes.inputField}>
        <InputField
          type={"text"}
          register={register}
          placeholder="Search Patient Name | IC Number"
          fieldName={"firstName"}
        />
        <SearchIcon className={classes.icon} />
      </div>
      <Table
        columns={columns}
        rows={rows}
        sortParam={sortParam}
        setSortParam={setSortParam}
      />

      <div className={classes.paginationContainer}>
        <Pagination count={count} page={+page} setPage={setPage} />
      </div>
    </>
  );
};

export default OrderWorkList;

const useStyles = makeStyles({
  inputField: {
    position: "relative",
    width: "40%",
    marginBottom: "15px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  icon: {
    position: "absolute",
    right: "5px",
    top: "16px",
    cursor: "pointer",
    color: "#DADADA",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
  },
});
