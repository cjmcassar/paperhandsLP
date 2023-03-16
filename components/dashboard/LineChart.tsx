import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

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
								label: "Mobile apps",
								tension: 0.4,
								pointRadius: 0,
								borderColor: "#5e72e4",
								backgroundColor: gradientStroke,
								borderWidth: 3,
								fill: true,
								data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
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
									drawOnChartArea: true,
									drawTicks: false,
									tickBorderDashOffset: 5,
								},
								ticks: {
									display: true,
									padding: 10,
									color: "#fbfbfb",
									font: {
										size: 11,
										family: "Open Sans",
										style: "normal",
										lineHeight: 2,
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
									color: "#ccc",
									padding: 20,
									font: {
										size: 11,
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
		<div className="flex flex-wrap mt-6 -mx-3">
			<div className="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
				<div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
					<div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
						<h6 className="capitalize dark:text-white">Sales overview</h6>
						<p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
							<i className="fa fa-arrow-up text-emerald-500"></i>
							<span className="font-semibold">4% more</span> in 2021
						</p>
					</div>
					<div className="flex-auto p-4">
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
