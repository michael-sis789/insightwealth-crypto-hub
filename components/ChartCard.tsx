"use client";

import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Row = { date: string; price?: number; invested?: number; value?: number };

export function ChartCard({ title, data }: { title: string; data: Row[] }) {
  return (
    <section className="premium-card rounded-lg p-5">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 0, right: 12, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d6aa3d" stopOpacity={0.34} />
                <stop offset="95%" stopColor="#d6aa3d" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1f2b43" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#7d8aa5" tickLine={false} axisLine={false} />
            <YAxis stroke="#7d8aa5" tickLine={false} axisLine={false} tickFormatter={(v) => `$${Math.round(Number(v) / 1000)}k`} />
            <Tooltip contentStyle={{ background: "#0c1220", border: "1px solid #1f2b43", color: "#fff" }} />
            {data.some((row) => row.value) && <Area type="monotone" dataKey="value" stroke="#d6aa3d" fill="url(#goldArea)" strokeWidth={2} />}
            {data.some((row) => row.invested) && <Line type="monotone" dataKey="invested" stroke="#2f81f7" strokeWidth={2} dot={false} />}
            {data.some((row) => row.price) && <Line type="monotone" dataKey="price" stroke="#20c997" strokeWidth={2} dot={false} />}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
