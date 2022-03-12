import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Pagination } from "@mui/material";

import Table from "components/table";
import { columns, getOrderHistory } from "pages/orders/helper";

const OrderHistory = () => {
  const classes = useStyles();
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
      <Table
        columns={columns}
        rows={data}
        sortParam={sortParam}
        setSortParam={setSortParam}
        loading={tableLoader}
      />
      {!tableLoader && data.length !== 0 && (
        <div className={classes.paginationContainer}>
          <Pagination count={count} page={+page} setPage={setPage} />
        </div>
      )}
    </>
  );
};

export default OrderHistory;

const useStyles = makeStyles({});
