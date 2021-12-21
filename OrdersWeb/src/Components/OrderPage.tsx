import * as React from 'react';
import OrderDialog from "./OrderDialog";
import OrderDelete from "./OrderDelete";
import OrderGrid from "./OrderGrid";
import axios from "axios";
import 'regenerator-runtime/runtime';
import { useQuery, QueryCache } from "react-query";

export interface orderTypes{
    orderID?: number;
    customerName?: string;
    orderType?: string;
    createdByUserName?: string;
    createdDate?: string;
}


export default function OrderPage(){
    const [ searchValue, setSearchValue ] = React.useState<string>(null);
    const { data: ordersValues, refetch } = useQuery(["orders"], async () => {
        const response = searchValue ? await axios.get(`https://localhost:5001/Order?searchValue=${searchValue}`) : await axios.get('https://localhost:5001/Order/GetOrders');
        return (response.data || [] as orderTypes[]);
    },{
        refetchOnWindowFocus: false
    });

    const refetchOrders = () => {
        refetch();
    }

    const [ordersToDelete, setOrdersToDelete] = React.useState<number[]>([]);

    return(
        <>
            <div style={{display: 'flex', width: 325, justifyContent: 'space-between', marginBottom: 10}}>
                <OrderDialog/>
                <OrderDelete {...{ ordersValues, ordersToDelete }}/>
            </div>
            
            <OrderGrid ordersValues={ordersValues || []} {...{ ordersToDelete, setOrdersToDelete, searchValue, setSearchValue, refetchOrders }} />
        </>
    );
}