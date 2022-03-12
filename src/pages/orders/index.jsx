import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/material";

import Tabs from "components/tabs";
import NewOrder from "./new-order";
import OrderWorkList from "./order-worklist";
import OrderHistory from "./order-history";

const Orders = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [tabActive, setTabActive] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const queryPage = searchParams.get("page");

  useEffect(() => {
    if (queryPage !== null && queryPage !== undefined && queryPage !== 1) {
      setPage(queryPage);
    }
  }, [queryPage]);

  return (
    <>
      <Container maxWidth="lg">
        <div className={classes.main}>
          <Tabs
            tabActive={tabActive}
            setTabActive={setTabActive}
            tabs={tabs}
            setPage={setPage}
          />
          {tabActive === tabs[0]?.value && <NewOrder />}
          {tabActive === tabs[1]?.value && <OrderWorkList />}
          {tabActive === tabs[2]?.value && <OrderHistory />}
        </div>
      </Container>
    </>
  );
};

export default Orders;

const tabs = [
  {
    value: "/eorders",
    label: "New Order",
    key: "eorders",
  },
  {
    value: "/eorders/worklist",
    label: "Order Worklist",
    key: "worklist",
  },
  {
    value: "/eorders/histories",
    label: "Order History",
    key: "history",
  },
];

const useStyles = makeStyles({
  main: {
    marginTop: "40px",
  },
});
