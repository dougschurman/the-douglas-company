import OrderToolbar from "./OrderToolbar";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function OrderDetails() {
  return (
    <>
      <OrderToolbar title="Details" icon={<AssessmentIcon />} />
      <div>hi</div>
    </>
  );
}
