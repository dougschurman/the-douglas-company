import * as React from "react";
import OrderHome from "./OrderHome";
import axios from "axios";
import "regenerator-runtime/runtime";
import { useQuery } from "react-query";
import OrderToolbar from "./OrderToolbar";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

export interface orderTypes {
  orderID?: number;
  customerName?: string;
  orderType?: string;
  createdByUserName?: string;
  createdDate?: string;
}

export default function OrderPage() {
  const [searchValue, setSearchValue] = React.useState<string>(null);
  const { data: ordersValues, refetch } = useQuery(
    ["orders"],
    async () => {
      const response = searchValue
        ? await axios.get(
            `http://www.dougschurman.com/Order?searchValue=${searchValue}`
          )
        : await axios.get("http://www.dougschurman.com/Order/GetOrders");
      return response.data || ([] as orderTypes[]);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const refetchOrders = () => {
    refetch();
  };

  const [ordersToDelete, setOrdersToDelete] = React.useState<number[]>([]);

  return (
    <>
      <OrderToolbar title="Home" icon={<BusinessCenterIcon />} />
      <OrderHome
        ordersValues={ordersValues || []}
        {...{
          ordersToDelete,
          setOrdersToDelete,
          searchValue,
          setSearchValue,
          refetchOrders,
        }}
      />
    </>
  );
}
