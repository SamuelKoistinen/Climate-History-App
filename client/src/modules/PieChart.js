import { Pie } from "recharts";

export default function PieChart() {
  const renderPie = (
    <>
      <PieChart width={400} height={400}>
        <Pie data={data3} />
      </PieChart>
    </>
  );
}

data3 = [
  {
    Sector: "Energy",
    "Share of global greenhouse gas emissions (%)": 73.2,
  },
  {
    Sector: "Industrial processes",
    "Share of global greenhouse gas emissions (%)": 5.2,
  },
  {
    Sector: "Waste",
    "Share of global greenhouse gas emissions (%)": 3.2,
  },
  {
    Sector: "Agriculture, Forestry & Land Use (AFOLU)",
    "Share of global greenhouse gas emissions (%)": 18.4,
  },
];
