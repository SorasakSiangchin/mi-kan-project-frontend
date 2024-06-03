"use client"

import React, { Fragment, useLayoutEffect } from 'react'
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Box, Divider, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const HomePage = () => {

    useLayoutEffect(() => {
        const root = am5.Root.new("chartdiv");

        root._logo?.dispose();

        // set theme ขแง chat
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let data = [{
            name: "ภาษา",
            steps: 45688,
            pictureSettings: {
                src: "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg"
            }
        }, {
            name: "คณิตศาสตร์",
            steps: 35781,
            pictureSettings: {
                src: "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg"
            }
        }, {
            name: "ธรรมชาติวิทยา",
            steps: 25464,
            pictureSettings: {
                src: "https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg"
            }
        }, {
            name: "ความเข้าใจตนเอง",
            steps: 18788,
            pictureSettings: {
                src: "https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg"
            }
        }, {
            name: "ด้านมิติสัมพันธ์",
            steps: 15465,
            pictureSettings: {
                src: "https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg"
            }
        }, {
            name: "ดนตรี",
            steps: 11561,
            pictureSettings: {
                src: "https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg"
            }
        },
        {
            name: "ด้านร่างกายและการเคลื่อนไหว",
            steps: 11561,
            pictureSettings: {
                src: "https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg"
            }
        },
        {
            name: "มนุษย์สัมพันธ์",
            steps: 11561,
            pictureSettings: {
                src: "https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg"
            }
        }];

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "none",
                wheelY: "none",
                paddingBottom: 50,
                paddingTop: 40,
                paddingLeft: 0,
                paddingRight: 0
            })
        );

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

        let xRenderer = am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
            minGridDistance: 60
        });
        xRenderer.grid.template.set("visible", false);

        let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                paddingTop: 40,
                categoryField: "name",
                renderer: xRenderer
            })
        );


        let yRenderer = am5xy.AxisRendererY.new(root, {});
        yRenderer.grid.template.set("strokeDasharray", [3]);

        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                renderer: yRenderer
            })
        );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Income",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "steps",
                categoryXField: "name",
                sequencedInterpolation: true,
                calculateAggregates: true,
                maskBullets: false,
                tooltip: am5.Tooltip.new(root, {
                    dy: -30,
                    pointerOrientation: "vertical",
                    labelText: "{valueY}"
                })
            })
        );

        series.columns.template.setAll({
            strokeOpacity: 0,
            cornerRadiusBR: 10,
            cornerRadiusTR: 10,
            cornerRadiusBL: 10,
            cornerRadiusTL: 10,
            maxWidth: 50,
            fillOpacity: 0.8
        });

        let currentlyHovered: any;

        series.columns.template.events.on("pointerover", function (e) {
            handleHover(e.target.dataItem);
        });

        series.columns.template.events.on("pointerout", function (e) {
            handleOut();
        });

        function handleHover(dataItem: any) {
            if (dataItem && currentlyHovered != dataItem) {
                handleOut();
                currentlyHovered = dataItem;
                let bullet = dataItem.bullets[0];
                bullet.animate({
                    key: "locationY",
                    to: 1,
                    duration: 600,
                    easing: am5.ease.out(am5.ease.cubic)
                });
            }
        }

        function handleOut() {
            if (currentlyHovered) {
                let bullet = currentlyHovered.bullets[0];
                bullet.animate({
                    key: "locationY",
                    to: 0,
                    duration: 600,
                    easing: am5.ease.out(am5.ease.cubic)
                });
            }
        }

        let circleTemplate: any = am5.Template.new({});

        series.bullets.push(function (root, series, dataItem) {
            let bulletContainer = am5.Container.new(root, {});
            let circle = bulletContainer.children.push(
                am5.Circle.new(
                    root,
                    {
                        radius: 34
                    },
                    circleTemplate
                )
            );

            let maskCircle = bulletContainer.children.push(
                am5.Circle.new(root, { radius: 27 })
            );

            // only containers can be masked, so we add image to another container
            let imageContainer = bulletContainer.children.push(
                am5.Container.new(root, {
                    mask: maskCircle
                })
            );

            let image = imageContainer.children.push(
                am5.Picture.new(root, {
                    templateField: "pictureSettings",
                    centerX: am5.p50,
                    centerY: am5.p50,
                    width: 60,
                    height: 60
                })
            );

            return am5.Bullet.new(root, {
                locationY: 0,
                sprite: bulletContainer
            });
        });

        // heatrule
        series.set("heatRules", [
            {
                dataField: "valueY",
                min: am5.color(0xe5dc36),
                max: am5.color(0x5faa46),
                target: series.columns.template,
                key: "fill"
            },
            {
                dataField: "valueY",
                min: am5.color(0xe5dc36),
                max: am5.color(0x5faa46),
                target: circleTemplate,
                key: "fill"
            }
        ]);

        series.data.setAll(data);
        xAxis.data.setAll(data);

        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineX.set("visible", false);
        cursor.lineY.set("visible", false);

        cursor.events.on("cursormoved", function () {
            let dataItem: any = (series.get("tooltip") as any).dataItem;
            if (dataItem) {
                handleHover(dataItem);
            } else {
                handleOut();
            }
        });

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
        chart.appear(1000, 100);
        return () => { root.dispose() };
    }, []);

    return (
        <Box sx={{ width: "100%" }}>
            <Typography className='text-center' variant='h6'>
                จำนวนนักเรียนที่พบแววความสามารถพิเศษในแต่ละด้าน
            </Typography>
            <Box id="chartdiv"
                sx={{
                    width: "100%",
                    height: 500,
                    mb: 3
                }}
            />
            {/* <Divider sx={{ my : 3 }}/> */}
            <Typography variant='h5' >
                รายชื่อโรงเรียน
            </Typography>
            <Box sx={{
                height: 500,
            }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection={false}
                    rowSelection={false}
                />
            </Box>
        </Box>
    )
}

export default HomePage