import { CategoryScale, LinearScale, PointElement, LineElement, Title, type ChartOptions } from "chart.js";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';

const emptyData = {
    labels: [],
    datasets: [
        {
            label: 'Dataset 1',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },

    ],
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const URL = "https://gist.githubusercontent.com/SlepoRus/e4c30ec8b943db07ab7dfd17ef3a3c68/raw/d0a0bc7eb1f5341a8592985c8cb30b474e5db359/payments.json"

export const LineChart = () => {

    const [data, setData] = useState(emptyData)

    useEffect(() => {

        const getData = async () => {
            try {

                const response = await fetch(URL)

                if (!response.ok) {
                    throw Error('Error')
                }

                const data = await response.json()

                // const labels = data.map((item) => item.date)

                const dataSets = data.map((item) => {

                    // Method 2: More reliable - split and create date
                    const [month, day, year] = item.date.split('.');
                    const milliseconds = new Date(year, month - 1, day).getTime();

                    return { x: milliseconds, y: item.value }
                })

                const mappedData = {
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: dataSets,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },

                    ],
                };


                /**
                 * 
                 * 
                 * 
                 * 
                 * 
                const data = {
  datasets: [{
    borderColor: Utils.CHART_COLORS.red,
    borderWidth: 1,
    data: pointData,
    label: 'Large Dataset',
    radius: 0,
  }]
}; 


                 * const labels = Utils.months({count: 7});
                const data = {
                  labels: labels,
                  datasets: [{
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                  }]
                };
                 */



                setData(mappedData)


            } catch (error) {

            }

        }

        getData()

    }, [])

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        spanGaps: true,
        indexAxis: 'x',
        parsing: false,
        scales: {
            x: {
                type: 'time',
            }
        },
        plugins: {
            decimation: {
                enabled: true,
                algorithm: 'lttb',
                threshold: 2,
                samples: 100,
            },
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
        }}>
            <Line
                options={options}
                data={data}
            />
        </div>
    )


}