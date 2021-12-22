import { Grid,  MenuItem, Select, TextField } from "@mui/material";
import { OrderFormValues } from "./OrderDialog";

interface IProps {
   formValues: OrderFormValues;
   setFormValues: (newState: OrderFormValues) => void;
}

export default function OrderForm(props: IProps) {
   const { formValues, setFormValues } = props;

   return (
      <Grid container>
         <Grid item xs={12}>
            <TextField
               id="customerName-input"
               name="customerName"
               label="Customer Name"
               type="text"
               value={formValues.customerName || ""}
               onChange={(e) => setFormValues({ ...formValues, customerName: e.target.value })}
               fullWidth
               required
            />
         </Grid>
         <Grid item xs={12}>
            <Select
               labelId='order-label'
               id='order-select'
               value={formValues.orderType || ""}
               onChange={(event) => {
                  setFormValues({ ...formValues, orderType: event.target.value as string })
               }}
               fullWidth
               required
            >
               <MenuItem key="standard" value="Standard">
                  Standard
               </MenuItem>
               <MenuItem key="sale" value="SaleOrder">
                  Sale
               </MenuItem>
               <MenuItem key="purchase" value="PurchaseOrder">
                  Purchase
               </MenuItem>
               <MenuItem key="transfer" value="TransferOrder">
                  Transfer
               </MenuItem>
               <MenuItem key="return" value="ReturnOrder">
                  Return
               </MenuItem>
            </Select>
         </Grid>
         <Grid item xs={12}>
            <TextField
               id="createdBy-input"
               name="createdByUserName"
               label="Created By"
               type="text"
               value={formValues.createdByUserName || ""}
               onChange={(e) => setFormValues({ ...formValues, createdByUserName: e.target.value })}
               fullWidth
               required
            />
         </Grid>
      </Grid>
   );
};