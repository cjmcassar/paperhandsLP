import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "./LineChart.module.css";

const RiskLabel = ({ color, text }) => (
	<div className="flex gap-2 items-center">
		<div className={`w-4 h-4 rounded-full ${color}`}></div>
		<div>{text}</div>
	</div>
);

export default function LineChart() {
	const chartContainer = useRef(null);

	useEffect(() => {
		if (chartContainer.current) {
			const ctx = chartContainer.current.getContext("2d");

			if (ctx) {
				const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

				gradientStroke.addColorStop(1, "rgba(94, 114, 228, 0.2)");
				gradientStroke.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
				gradientStroke.addColorStop(0, "rgba(94, 114, 228, 0)");

				new Chart(ctx, {
					type: "line",
					data: {
						labels: [
							"Jan",
							"Feb",
							"Mar",
							"Apr",
							"May",
							"Jun",
							"Jul",
							"Aug",
							"Sep",
							"Oct",
							"Nov",
							"Dec",
						],
						datasets: [
							{
								label: "High Risk",
								tension: 0.4,
								pointRadius: 0,
								borderColor: "#FC62FF",
								// fill: true,
								// backgroundColor: gradientStroke,
								borderWidth: 2,
								data: [0, 25, 76, 50, 40, 300, 220, 500, 250, 400, 230, 500],
							},
							{
								label: "Medium Risk",
								tension: 0.4,
								pointRadius: 0,
								borderColor: "#FFF507",
								// fill: true,
								// backgroundColor: gradientStroke,
								borderWidth: 2,
								data: [0, 90, 34, 40, 76, 76, 50, 76, 56, 230, 500, 230],
							},
							{
								label: "Low Risk",
								tension: 0.4,
								pointRadius: 0,
								borderColor: "#62FF97",
								// fill: true,
								// backgroundColor: gradientStroke,
								borderWidth: 2,
								data: [0, 50, 30, 76, 30, 34, 230, 230, 40, 76, 76, 150],
							},
						],
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							legend: {
								display: false,
							},
						},
						interaction: {
							intersect: false,
							mode: "index",
						},
						scales: {
							y: {
								grid: {
									display: true,
									color: "#1e293b",
									drawOnChartArea: true,
									drawTicks: false,
									tickBorderDashOffset: 5,
								},
								ticks: {
									display: true,
									padding: 10,
									color: "#64748b",
									font: {
										size: 12,
										family: "Open Sans",
										style: "normal",
										lineHeight: 2,
									},
									callback: function (value, index, ticks) {
										return `${value}k`;
									},
								},
							},
							x: {
								grid: {
									display: false,
									drawOnChartArea: false,
									drawTicks: false,
									tickBorderDashOffset: 5,
								},
								ticks: {
									display: true,
									color: "#64748b",
									padding: 20,
									font: {
										size: 12,
										family: "Open Sans",
										style: "normal",
										lineHeight: 2,
									},
								},
							},
						},
					},
				});
			}
		}
	}, []);

	return (
		<div className={styles.outerContainer}>
			<div className={styles.container}>
				<div className={styles.chartWrapper}>
					<div className={styles.header}>
						<div>
							<h2 className={`${styles.title} md:text-3xl sm:text-lg`}>
								Types
							</h2>
						</div>
						<div className="flex gap-4 md:text-lg sm:text-xs">
							<RiskLabel color="bg-phPink" text="High Risk" />
							<RiskLabel color="bg-phYellow" text="Medium Risk" />
							<RiskLabel color="bg-phGreen" text="Low Risk" />
						</div>
						<div className="md:text-lg sm:text-xs">Last 7 Days</div>
					</div>
					<div className={styles.canvasContainer}>
						<div>
							<canvas
								id="chart-line"
								ref={chartContainer}
								height="300"
							></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
