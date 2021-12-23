import { DataGrid, GridCallbackDetails, GridColDef, GridOverlay, GridSelectionModel } from '@mui/x-data-grid';
import { orderTypes } from "./OrderPage";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import * as moment from 'moment';
import { makeStyles } from '@mui/styles';
import { useDebouncedCallback } from 'use-debounce';
import { createTheme } from '@mui/material/styles';
import OrderDialog from './OrderDialog';
import OrderDelete from './OrderDelete';
import { Typography } from '@mui/material';

const theme = createTheme();

const useStyles = makeStyles({
    headerClass: {
        backgroundColor: theme.palette.primary.main
    },
    headerLabelClass: {
        color: '#ffffff'
    }
})

interface IProps{
    ordersValues: orderTypes[];
    ordersToDelete: number[];
    setOrdersToDelete: (newState: number[]) => void;
    searchValue: string;
    setSearchValue: (newState: string) => void;
    refetchOrders: () => void;
}

 const columns: GridColDef[] = [
    { field: 'orderID', headerName: 'Order ID', flex: 1, minWidth: 100 },
    { field: 'customerName', headerName: 'Customer', flex: 1, minWidth: 130 },
    { field: 'orderType', headerName: 'Order Type', flex: 1, minWidth: 130 },
    { field: 'createdByUserName', headerName: 'Created By', flex: 1, minWidth: 130 },
    { field: 'createdDate', headerName: 'Date Created', flex: 1, minWidth: 130 }
 ];

export default function OrderGrid(props: IProps){
    const classes = useStyles();
    const { ordersValues, ordersToDelete, setOrdersToDelete, searchValue, setSearchValue, refetchOrders } = props;

    const handleSelection = (selectionModel: GridSelectionModel, details: GridCallbackDetails) => {
        setOrdersToDelete(selectionModel.map((s) => Number(s)));
        console.log(ordersToDelete);
    }

    const debounceSearch = useDebouncedCallback(
        async () => {
            refetchOrders();
        },
        300,
    );
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchValue(e.target.value);
        debounceSearch();
    }

    return ( 
        <div>
            <div style={{ boxShadow: '0px 1px 3px #626262' }}>
                <Typography sx={{color: theme.palette.primary.main, fontSize: '32', display: 'flex', fontWeight: 'bold', marginLeft: '30px'}}>Orders</Typography>
            </div>
        <div style={{display: 'flex', width: '100%', height: '60px', justifyContent: 'space-between', 
            alignItems: 'center', padding: '0px 20px', boxSizing: 'border-box'}}>
                <div style={{display: 'flex', width: 320, justifyContent: 'space-between'}}>
                    <OrderDialog/>
                    <OrderDelete {...{ ordersValues, ordersToDelete }}/>
                </div>
            <TextField
                label="Search"
                variant="outlined"
                type="text"
                onChange={handleChange}
                size="small"
            />
        </div>
        <div>
            <DataGrid
                getRowId={(row) => row.orderID}
                rows={ordersValues.map((o) => ({ ...o, createdDate: moment(o.createdDate).format("MM/DD/YYYY")}))}
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[12]}
                checkboxSelection={true}
                onSelectionModelChange={handleSelection} 
                autoHeight
                components={{ NoRowsOverlay: () => (
                    <GridOverlay>
                        <div>No Results</div>
                    </GridOverlay>
                )}}
                classes={{
                    columnHeaderWrapper: classes.headerClass,
                    columnHeaderTitle: classes.headerLabelClass
                }}
            />
        </div>
        </div>
    );
}