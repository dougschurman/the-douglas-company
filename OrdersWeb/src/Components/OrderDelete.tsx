import Button from '@mui/material/Button';
import axios from "axios";
import { useQueryClient } from "react-query";


interface IProps{
    ordersToDelete: number[];
}

export default function OrderDelete(props: IProps){
    const { ordersToDelete } = props;
    const queryCache = useQueryClient();

    const handleSubmit = () => {
        axios.delete("https://localhost:5001/Order", { data: ordersToDelete })
            .then((response: any) => {
            queryCache.invalidateQueries("orders");
            //when done
         }).catch((error: any) => {
            console.error('Something went wrong!', error);
         });
    }

    return (
        <div>
            <Button disabled={props.ordersToDelete?.length === 0} variant="contained" color='primary' onClick={handleSubmit}>
                Delete Orders
            </Button>
        </div>
        
    );
}