import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

export default function IntentDonutChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm ">
      <h3 className="font-semibold mb-3">Intent Distribution</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
          >
            {data.map((_, i) => (
              <Cell key={i} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}