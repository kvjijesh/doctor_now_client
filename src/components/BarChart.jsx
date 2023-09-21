import Chart from 'react-apexcharts'
import { useState } from 'react';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"



function BarChart({ appoints }) {
    const currentyear=new Date().getFullYear()
    const [year, setYear] = useState(`${currentyear}`)
    const handleChange = (event) => {
        setYear(event.target.value);
    };
    let monthCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    const distinctYears = Array.from(new Set(appoints?.map(el => el.createdAt.split('-')[0])))

    appoints.forEach((el) => {
        if (el.createdAt.split('-')[0] === year) {
            if (el.createdAt.split('-')[1] === '01') {
                monthCount[0] += 1
            } else if (el.createdAt.split('-')[1] === '02') {
                monthCount[1] += 1
            } else if (el.createdAt.split('-')[1] === '03') {
                monthCount[2] += 1
            } else if (el.createdAt.split('-')[1] === '04') {
                monthCount[3] += 1
            } else if (el.createdAt.split('-')[1] === '05') {
                monthCount[4] += 1
            } else if (el.createdAt.split('-')[1] === '06') {
                monthCount[5] += 1
            } else if (el.createdAt.split('-')[1] === '07') {
                monthCount[6] += 1
            } else if (el.createdAt.split('-')[1] === '08') {
                monthCount[7] += 1
            } else if (el.createdAt.split('-')[1] === '09') {
                monthCount[8] += 1
            } else if (el.createdAt.split('-')[1] === '10') {
                monthCount[9] += 1
            } else if (el.createdAt.split('-')[1] === '11') {
                monthCount[10] += 1
            } else if (el.createdAt.split('-')[1] === '12') {
                monthCount[11] += 1
            }
        }
    })

    return (
        <>

            <Box >
                <Grid container>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Year</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={year}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={2022}>2022</MenuItem>
                            {distinctYears && distinctYears.map(el => (
                                <MenuItem value={el} key={el}>{el}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Grid width={"100%"} height={500}>
                        <Chart
                            type='bar'
                            width={'100%'}
                            height={500}

                            series={[
                                {
                                    name: 'Appointments',
                                    data: monthCount
                                }
                            ]}
                            options={{
                                title: {
                                    text: "Appointments Chart",
                                    style: { fontSize: 20 }
                                },
                                chart: {
                                    background: '#ffffff',
                                },
                                colors: ["#27ba4e"],
                                theme: { mode: "light" },
                                xaxis: {
                                    tickPlacement: 'on',
                                    categories: [
                                        'jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'
                                    ],
                                    title: {
                                        text: 'Month',
                                        style: { fontSize: 20 }
                                    },
                                },
                                yaxis: {
                                    labels: {
                                        formatter: (val) => {
                                            return `${val}`
                                        },
                                        style: { fontSize: "15", colors: ['#f900000'] },
                                    },
                                    title: {
                                        text: "No.of Appointments",
                                        style: { fontSize: 20 }
                                    }
                                },
                                legend: {
                                    show: true,
                                    position: 'right'
                                },
                                dataLabels: {
                                    formatter: (val) => {
                                        return `${val}`
                                    },
                                    style: {
                                        colors: [`#f4f4f40`],
                                        fontSize: 15
                                    }
                                }
                            }}
                        />

                    </Grid>
                </Grid>

            </Box>




        </>
    )
}

export default BarChart