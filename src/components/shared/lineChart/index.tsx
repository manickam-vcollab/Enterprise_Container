import { ResponsiveLine } from '@nivo/line';
import { forwardRef, useEffect } from 'react';
// import {data} from './data'
import { useAppSelector } from 'store/storeHooks';
import { selectLineChartData, setChartData } from 'store/chartSlice';
import { data, firstThreeLineChartData, lastThreeLineChartData } from './data';
import { useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/styles";


const selectionStyle = makeStyles((theme: any) => ({
    
    tile:{
 
    backgroundRepeat:"repeat"
 
    },
    center:{
   
     backgroundPosition:"center",
     backgroundRepeat:"no-repeat",
  
 
 
    },
    stretch:{
     backgroundSize:"100% 100%"
    },
    fitview:{
     backgroundPosition:"center",
     backgroundRepeat:"no-repeat",
     backgroundSize: "contain",
    }
 
   }));

function LineChart(props:any,ref:any) {


    // const chartDataList = useAppSelector(selectLineChartData);
    const dispatch = useDispatch();
    const {lineChartData, chartBackgroundColor, chartBackgroundImage, imageStyle, chartTitleFected,isActive, chartXAxistTitleFected, chartYAxistTitleFected, chartXAxisMaxFetched, chartYAxisMaxFetched, xScaleFetched, yScaleFetched, yTickValues,chartFontColor,chartBorderColor} = props;
    const xAxisLegend = (chartXAxistTitleFected !== undefined) ? chartXAxistTitleFected : 'X-Axis'
    const yAxisLegend = chartYAxistTitleFected !== undefined ? chartYAxistTitleFected : 'Y-Axis'
    const LabelId:string = props.LabelId;
    const classes=selectionStyle();
    // let chartTitleFected = (chartDataList.length>0) ? (chartDataList.filter((item) => (item.id === LabelId))?.[0].chartTitle) : null

const getClassName=()=>{
    if(imageStyle === 0){
        return classes.tile
    }
    else if(imageStyle==1){
        return classes.center
    }
    else if(imageStyle==2){
        return classes.stretch
    }
    else if(imageStyle==3){
        return classes.fitview
    }
}
    // useEffect(() =>{
    //     // dispatch(setChartData({id:myLabelId,lineChartData:dataArray}))
    //     console.log("label Id ======>",props.LabelId)
    //     console.log('ChartDataList =====>',chartDataList)
    // },[])
 
  return (
    <div className={getClassName()} style={{ height: '100%', width: "100%" , backgroundImage:isActive===true ? `url("${chartBackgroundImage}")` : ""  , backgroundColor:isActive==false ? chartBackgroundColor : "", color:chartFontColor,border:`1px solid ${chartBorderColor}`}}>
        <div style={{marginTop:'0px',position:"relative",top:"0px",display:"flex", justifyContent:"center", alignItems:"center"}} >
        <text style={{width:'max-content' ,fontWeight: 'bold' , marginTop:'10px'}}>{(chartTitleFected !== null && chartTitleFected !== undefined)?chartTitleFected:"Chart Title"}</text>
        </div>
        <ResponsiveLine
           data={lineChartData}
           margin={{ top: 10, right: 60, bottom: 75, left: 60 }}
          colors={chartFontColor}
           xScale={xScaleFetched ? xScaleFetched : { type:'linear', min:0 , max:100, stacked:false, reverse:false}}
           yScale={yScaleFetched ? yScaleFetched : {
               type: 'linear',
               min: 0, 
               max: 750,
               stacked: false,
               reverse: false
           }}
           yFormat=" >-.4f"
           axisTop={null}
           axisRight={null}
           axisBottom={{
               // orient: 'bottom',
               tickSize: 5,
               tickPadding: 5,
               tickRotation: 0,
               legend:xAxisLegend,
               legendOffset: 36,
               legendPosition: 'middle',
               
           }}
           axisLeft={{
               // orient: 'left',
               tickSize:2,
               
            //    tickValues:yTickValues,
               tickPadding: 5,
               tickRotation: 0,
               legend:yAxisLegend,
               legendOffset: -40,
               legendPosition: 'middle',
            
           }}
           lineWidth={1}
           pointSize={3}
        theme={{
            axis:{
                ticks:{
                    text:{
                        fill: chartFontColor
                    }
                },
                legend:{
                    text:{
                        fill:chartFontColor
                    }
                }
            },
            
        }}
           pointColor={{ theme: 'background' }}
           pointBorderWidth={1}
           pointBorderColor={{ from: 'serieColor' }}
           pointLabelYOffset={-12}
           useMesh={true}
        //    legends={[
        //        {
        //            anchor: 'bottom-right',
        //            direction: 'column',
        //            justify: false,
        //            translateX: 100,
        //            translateY: 0,
        //            itemsSpacing: 0,
        //            itemDirection: 'left-to-right',
        //            itemWidth: 80,
        //            itemHeight: 20,
        //            itemOpacity: 0.75,
        //            symbolSize: 12,
        //            symbolShape: 'circle',
        //            symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //            effects: [
        //                {
        //                    on: 'hover',
        //                    style: {
        //                        itemBackground: 'rgba(0, 0, 0, .03)',
        //                        itemOpacity: 1
        //                    }
        //                }
        //            ]
        //        }
        //    ]}
        legends={[]}
        />
    </div>
  )
}

export default forwardRef(LineChart);