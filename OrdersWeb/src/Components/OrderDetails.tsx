import OrderToolbar from "./OrderToolbar";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";

interface graphTypes {
  customerName: string;
  count: number;
}

export default function OrderDetails() {
  const [graphData, setGraphData] = useState<graphTypes[]>([]);

  const getGraphData = async () => {
    const response = await axios(
      "http://www.dougschurman.com/Order/GetGraphData"
    );
    setGraphData(response.data);
  };

  useEffect(() => {
    getGraphData();
  }, []);

  return (
    <>
      <OrderToolbar title="Details" icon={<AssessmentIcon />} />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="customerName" />
              <YAxis>
                <Label
                  value="Number of Orders"
                  offset={10}
                  position="insideLeft"
                  angle={-90}
                  fill="#0571dd"
                />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0571dd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Container>
    </>
  );
}
