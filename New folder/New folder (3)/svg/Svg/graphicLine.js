import React,{useState} from 'react'


import LineChart from "./assests/LineChart";
import Label from "./assests/AxisLabel";
import ChartTitle from "./assests/ChartTitle";

const GraphicLine = (props) => {

  

  
const [data,setData] = [props.data];

console.log(data);

const styles = {
    chartComponentsContainer: {
      display: 'grid', gridTemplateColumns: 'max-content 80%', alignItems: 'center'
    },
    chartWrapper: {/* maxWidth: 700,*/ alignSelf: 'flex-start' }
  }


return (
  <div style={styles.chartComponentsContainer}>
  <div/>
  <ChartTitle text="Bookings over the Year"/>
  <Label text="Bookings" rotate/>
  <div style={styles.chartWrapper}>
    <LineChart
    width={500 }
      height={300}
      data={data}
      horizontalGuides={0}
      precision={2}
      verticalGuides={0}
    />
  </div>
  <div/>
 <Label text="Months"/>
</div>

)


}

export default GraphicLine;