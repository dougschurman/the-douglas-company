import * as React from "react";
import OrderHome from "./OrderHome";
import axios from "axios";
import "regenerator-runtime/runtime";
import { useQuery } from "react-query";
import OrderToolbar from "./OrderToolbar";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { APIURL } from "../url";

export interface orderTypes {
  orderID?: number;
  customerName?: string;
  orderType?: string;
  createdByUserName?: string;
  createdDate?: string;
}

export enum filterFields {
  desOrderID = "orderID_desc",
  ascCreatedDate = "createdDate",
  descCreatedDate = "createdDate_desc"
}

export default function OrderPage() {
  const [searchValue, setSearchValue] = React.useState<string>(null);
  const [filterValue, setFilterValue] = React.useState<filterFields | undefined>(undefined);
  const { data: ordersValues, refetch } = useQuery(
    ["orders", filterValue],
    async () => {
      const response = searchValue
        ? await axios.get(`${APIURL}/Order?searchValue=${searchValue}`)
        : await axios.get(`${APIURL}/Order/GetOrders?filterValue=${filterValue}`);
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
          setSearchValue,
          refetchOrders,
          setFilterValue
        }}
      />
    </>
  );
}
