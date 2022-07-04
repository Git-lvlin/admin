import { Chart, Line, Point, Tooltip, Legend, Axis } from 'bizcharts'

const LineChart = ({data, type, unit}) => {
  const scale = {
    value: { 
      min: 0,
      alias: unit
    },
    dateTime: {
      mask: type === 2 ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'
    }
  }

  const chartUnit = {
    style: {
      fontSize: 12,
      textAlign: 'center',
      fill: '#E66101'
    },
    position: 'start',
    rotate: 0,
		offset: 50
  }

  return (
    <Chart
      scale={scale} 
      padding={[40, 25, 20, 90]} 
      autoFit 
      height={320} 
      data={data}
      interactions={['element-active']}
      filter={{
        reportName: v => (v === 'B端普适品' || v === 'B端精品生鲜' || v === 'B端散装生鲜' || v === '秒约订单')
      }}
    >
      <Point position="dateTime*value" color="reportName" shape="circle"/>
      <Axis name="value" title={chartUnit}/>
      <Line shape="line" position="dateTime*value" color="reportName"/>
      <Tooltip shared showCrosshairs/>
      <Legend name="reportName" position="top"/>
    </Chart>
  )
}

export default LineChart