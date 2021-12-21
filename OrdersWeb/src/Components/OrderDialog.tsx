import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OrderForm from "./OrderForm";
import axios from "axios";
import { useQueryClient } from "react-query";

export interface OrderFormValues {
    customerName?: string;
    orderType?: string;
    createdByUserName?: string;
    createdDate?: string;
}

export default function OrderDialog() {
    const [open, setOpen] = React.useState(false);
    const [formValues, setFormValues] = React.useState<OrderFormValues>({createdDate: new Date().toISOString()});
    const queryCache = useQueryClient();
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormValues({createdDate: new Date().toISOString()});
    };

    const handleSubmit = () => {

        var dateObj = new Date();


        axios.post('https://localhost:5001/Order', formValues)
            .then((response: any) => {
                console.log(formValues);
                queryCache.invalidateQueries("orders");
                //when done
                handleClose();
            }).catch((error: any) => {
                console.error('Something went wrong!', error);
            });
    };

    return (
        <div>
            <Button variant="contained" color='primary' onClick={handleClickOpen}>
                Create Order
            </Button>
            <Dialog open={open} maxWidth="md" fullWidth>
                <DialogTitle>Create an Order: </DialogTitle>
                <DialogContent>
                    <div>
                        <OrderForm {...{ formValues, setFormValues }} />
                    </div>
                </DialogContent>
                <DialogActions >
                    <Button variant='contained' color='primary' onClick={handleSubmit}>Submit</Button>
                    <Button variant='contained' color='primary' onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}