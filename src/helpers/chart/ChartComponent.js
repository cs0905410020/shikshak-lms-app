import React, {useEffect, useState} from 'react';
import CanvasJSReact from './canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;



export const ChartComponent = ({chartDataSet,chartType})=>{

    const [finalDataSet,setFinalDataSet] = useState(null);

    useEffect(()=>{
        setFinalDataSet(null);
        let basicChartObject = {
            animationEnabled: true,
            maintainAspectRatio: false,
            backgroundColor: "#ccc0",
            data: [{
                type: chartType,
                showInLegend: false,
                indexLabel: "{name}: {y}",
                yValueFormatString: "#,###'%'",
                dataPoints:chartDataSet?.dataPoints
            }]
        }
        if(chartType === 'doughnut'){
            basicChartObject.subtitles = [{
                text: `${chartDataSet?.totalPercentage}% Progress`,
                verticalAlign: "center",
                fontSize: 20,
                dockInsidePlotArea: true
            }]
        }
        setFinalDataSet(basicChartObject);

    },[chartType,chartDataSet])

    return (
        <CanvasJSChart options={finalDataSet}/>
    )
}