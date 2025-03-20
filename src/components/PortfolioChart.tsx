import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Asset } from '../store/portfolioSlice';

const PortfolioChart = ({ assets }: { assets: Asset[] }) => {
  const data = assets.map(asset => ({
    name: asset.symbol,
    value: asset.totalValue,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;