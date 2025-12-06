'use client'

import { Box, Flex, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

interface FancyDonutProps {
    value: number
    total: number
    label: string
}

export default function FancyDonut({ value, total, label }: FancyDonutProps) {
    const percentage = Number(((value / total) * 100).toFixed(2))

    // ------------------------------
    // ANEL AZUL EXTERNO (decorativo)
    // ------------------------------
    const segments = 40
    const pieSeries = Array(segments).fill(100 / segments)

    const pieOptions: ApexCharts.ApexOptions = {
        chart: { type: "donut", sparkline: { enabled: true } },
        colors: Array(segments).fill("#4DA3D9"),
        stroke: { width: 0.5, colors: ["#ffffff"] },
        plotOptions: { pie: { donut: { size: "70%" } } },
        dataLabels: { enabled: false },
        tooltip: { enabled: false },
    }

    // ------------------------------
    // ANEL VERMELHO (base 100%)
    // ------------------------------
    const redOptions: ApexCharts.ApexOptions = {
        chart: { type: "radialBar", sparkline: { enabled: true } },
        colors: ["#FF0000"], // vermelho
        plotOptions: {
            radialBar: {
                hollow: { size: "50%" }, // mantém o centro
                track: { show: false },
                dataLabels: { show: false },
                
            },
        },
        stroke: { 
            lineCap: "round",
       
        
        },
    }
    const redSeries = [100] // base completa

    // ------------------------------
    // ANEL AMARELO (progresso)
    // ------------------------------
    const yellowOptions: ApexCharts.ApexOptions = {
        chart: { type: "radialBar", sparkline: { enabled: true } },
        colors: ["#FFD700"], // amarelo
        plotOptions: {
            radialBar: {
                hollow: { size: "50%" }, // mesmo centro do vermelho
                track: { show: false },
                dataLabels: {
                    name: { show: false },
                    value: {
                        show: true,
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#000",
                        offsetY: 5,
                        formatter: () => `${percentage}%`,
                    },
                },
             
            },
        },
        stroke: {
             lineCap: "round",
                  width: 0

        },
    }
    const yellowSeries = [percentage] // progresso real

    // ------------------------------
    // RENDER
    // ------------------------------
    return (
        <Box w="360px" bg="#d4effa" p={0} rounded="lg" borderWidth="1px" borderColor="#003049">
            <Flex direction="column">
                {/* Header */}
                <Flex bg="#003049" p={2} align="center" gap={2} roundedTop="lg">
                    <Box w="12px" h="12px" bg="#21D4B4" borderRadius="4px" />
                    <Text fontWeight="bold" fontSize="lg" color="white">{label}</Text>
                </Flex>

                <Flex direction="row" align="center" justify="space-between" p={3} pl={4}>
                    {/* Texto */}
                    <Text fontSize="3xl" fontWeight="extrabold" color="#000">{value}/{total}</Text>

                    {/* Área do gráfico */}
                    <Box position="relative" w="140px" h="140px" mt="-40px">
                        {/* Anel azul */}
                        <Box position="absolute" inset={0}>
                            <Chart options={pieOptions} series={pieSeries} type="donut" />
                        </Box>

                        {/* Anel vermelho (base 100%) */}
                        <Box position="absolute" inset={0}>
                            <Chart options={redOptions} series={redSeries} type="radialBar" />
                        </Box>

                        {/* Anel amarelo (progresso) */}
                        <Box position="absolute" inset={0}>
                            <Chart options={yellowOptions} series={yellowSeries} type="radialBar" />
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}
