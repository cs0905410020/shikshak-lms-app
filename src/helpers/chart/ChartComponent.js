import React, { useEffect, useState } from 'react';
import CanvasJSReact from './canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
CanvasJSReact.CanvasJS.addColorSet("customColorSet1", [
    "#4661EE",
    "#EC5657",
    "#1BCDD1",
    "#8FAABB",
    "#B08BEB",
]);

CanvasJSReact.CanvasJS.options = {
    license: "YOUR_LICENSE_KEY_HERE",
};

export const ChartComponent = ({ chartDataSet, chartType }) => {
    const [finalDataSet, setFinalDataSet] = useState(null);

    useEffect(() => {
        if (!chartDataSet || !chartType) return;

        const basicChartObject = {
            animationEnabled: true,
            maintainAspectRatio: false,
            backgroundColor: "#ccc0",
            data: [
                {
                    type: chartType,
                    showInLegend: false,
                    indexLabel: "{name}: {y}",
                    yValueFormatString: "#,###'%'",
                    dataPoints: chartDataSet?.dataPoints,
                },
            ],
        };

        if (chartType === 'doughnut') {
            basicChartObject.subtitles = [
                {
                    text: `${chartDataSet?.totalPercentage}% Progress`,
                    verticalAlign: "center",
                    fontSize: 20,
                    dockInsidePlotArea: true,
                },
            ];
        }

        setFinalDataSet(basicChartObject);
    }, [chartType, chartDataSet]);

    if (!finalDataSet) return <div>Loading chart...</div>;

    return <CanvasJSChart options={finalDataSet} />;
};
