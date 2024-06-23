"use client";
import { useEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { fetchMultipleIntelligencesBySchoolId, useMultipleIntelligencesSelector } from '@/store/slices/multipleIntelligencesSlice';
import { useAppDispatch } from '@/store/store';
import { userSelector } from '@/store/slices/userSlice';
import ReportAbilityBySchoolTable from './ReportAbilityBySchoolTable';
import ReportAbilityBySchoolAllTable from './ReportAbilityBySchoolAllTable';
import { RoleCodeData } from '@/utils/constant';
import { screenWidth } from '@/utils/util';

interface IChart {
    name: string;
    steps: number;
    pictureSettings: {
        src: string;
    }
}


const HomePage = () => {

    const dispatch = useAppDispatch();
    const { userInfo } = useSelector(userSelector);
    const { multipleIntelligencesBySchoolIdLoaded }
        = useSelector(useMultipleIntelligencesSelector);

    const [chartDate, setChartDate] = useState<IChart[]>([]);

    const [loadedSetting, setLoadedSetting] = useState<boolean>(false);

    // ดึงข้อมูล พหุปัญญา 8 ด้านพร้อมจำนวนคนที่มีความสามารถพิเศษในแต่ละด้าน
    useEffect(() => {
        const loadData = async () => {
            // console.log(userInfo)
            if (userInfo) {
                const { data, success } = await dispatch(fetchMultipleIntelligencesBySchoolId(userInfo.schoolId ? userInfo.schoolId : "")).unwrap();
                setLoadedSetting(false);
                if (success) {
                    const result = data.map((e) => {
                        return {
                            name: e.multipleIntelligencesName,
                            pictureSettings: {
                                src: ""
                            },
                            steps: e ? e.abilities?.length : 0
                        } as IChart
                    })
                    setChartDate(result)
                    setLoadedSetting(true);
                } else {
                    setChartDate([]);
                    setLoadedSetting(true);
                }
            }
        }

        loadData();

    }, [dispatch, multipleIntelligencesBySchoolIdLoaded, userInfo]);

    useEffect(() => {
        const root = am5.Root.new("chartdiv");

        root._logo?.dispose();

        // set theme ของ chat
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // ข้อมูลที่ใช้ในการสร้างกราฟ

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

        series.data.setAll(chartDate);
        xAxis.data.setAll(chartDate);

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

    }, [loadedSetting]);

    return (
        <Box sx={{ width: screenWidth }} >
            <Typography className='text-center' variant='h6'>
                จำนวนนักเรียนที่มีความสามารถพิเศษในแต่ละด้าน
            </Typography>
            <Box
                id="chartdiv"
                sx={{
                    width: "100%",
                    height: 500,
                    mb: 3
                }}
            />
            {/* <Divider sx={{ my : 3 }}/> */}
            <Box>
                <ReportAbilityBySchoolTable userInfo={userInfo} />
            </Box>

            <Box className="mt-10" >
                {userInfo?.role.roleCode === RoleCodeData.ADMIN ? <ReportAbilityBySchoolAllTable userInfo={userInfo} /> : ""}
            </Box>
        </Box>
    )
}

export default HomePage