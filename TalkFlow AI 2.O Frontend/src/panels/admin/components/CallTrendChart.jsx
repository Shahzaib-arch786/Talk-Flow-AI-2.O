import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function CallTrendChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm ">
      <h3 className="font-semibold mb-3">Call Volume Trends</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="inbound" />
          <Bar dataKey="outbound" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}