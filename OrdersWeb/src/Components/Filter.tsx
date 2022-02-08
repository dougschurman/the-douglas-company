import * as React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Menu, MenuItem } from '@mui/material';
import { filterFields } from "./OrderPage";

interface IProps{
    setFilterValue: (newState?: filterFields) => void;

}
export default function Filter(props: IProps) {
   const {setFilterValue} = props;
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
   }
   const handleClose = () => {
        setAnchorEl(null);
   }

   return(
       <>
       <Button variant="contained" sx={{
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
          ":hover": { backgroundColor: "secondary.dark" },
        }} onClick={handleClick}>
           <FilterListIcon/>
       </Button>
       <Menu
       anchorEl={anchorEl}
       open={open}
       onClose={handleClose}>
           <MenuItem onClick={(e) => {setFilterValue(null); handleClose()}}>Order ID</MenuItem>
           <MenuItem onClick={(e) => {setFilterValue(filterFields.desOrderID); handleClose()}}>Order ID Descending</MenuItem>
           <MenuItem onClick={(e) => {setFilterValue(filterFields.ascCreatedDate); handleClose()}}>Created Date</MenuItem>
           <MenuItem onClick={(e) => {setFilterValue(filterFields.descCreatedDate); handleClose()}}>Created Date Descending</MenuItem>
       </Menu>
       </>
   )
}