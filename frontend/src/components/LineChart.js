import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

let rates = [
  {
    "currency": "ETC",
    "rate": 812.5457396813313563553934952
  },
  {
    "currency": "USD",
    "rate": 5147.2929526926966769575080127
  },
  {
    "currency": "ADX",
    "rate": 30330.124807831309504679563627
  },
  {
    "currency": "ZEC",
    "rate": 74.806389872496276591088153322
  },
  {
    "currency": "ETH",
    "rate": 31.013070074714826037813814404
  },
  {
    "currency": "18C",
    "rate": 744490.76831447290053603335319
  }];


const MyLineChart = () => (
  <div style={{marginTop:'50px', display: 'flex', justifyContent: 'center' }}>
    <LineChart
      width={400}
      height={400}
      data={rates}
      margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
    >
      <XAxis dataKey="name" />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="currency" stroke="#ff7300" yAxisId={0} />
      <Line type="monotone" dataKey="rate" stroke="#387908" yAxisId={1} />
    </LineChart>
  </div>

);

export default MyLineChart;