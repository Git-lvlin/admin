import {
	Chart,
	Interval,
	Tooltip,
	Axis,
	Coordinate,
  getTheme
} from "bizcharts"

import type { FC } from 'react'
import type { PieChartProps } from './data'

const PieChart:FC<PieChartProps> = ({data}) => {

  data = data.map((res: any) => ({
    remark: res.remark,
    point: Number(res.point)
  }))

  const colors = data.reduce((pre: any, cur: any, idx: number) => {
		pre[cur.remark] = getTheme().colors10[idx]
		return pre
	}, {})

  const cols = {
		point: {
			formatter: (val: any) => {
				val = val + "%"
				return val
			}
		}
	}

  return (
    <Chart height={400} data={data} scale={cols} interactions={['element-active']} autoFit>
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />
      <Interval
        position="point"
        adjust="stack"
        color="remark"
        style={{
          lineWidth: 1,
          stroke: "#fff",
        }}
        label={[
          "remark",
          (remark) => {
            return {
              offset: 20,
              content: (data) => {
                return `${data.remark}\n ${data.point}%`
              },
              style: {
                fill: colors[remark],
              },
            };
          },
        ]}
      />
    </Chart>
  )
}

export default PieChart
