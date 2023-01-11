import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
	IMonthAggregatedEmployeeStatistics,
	ITimeLogFilters
} from '@gauzy/contracts';
import { NbThemeService } from '@nebular/theme';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChartComponent } from 'angular2-chartjs';
import { ChartUtil } from "./chart-utils";

export interface IChartData {
	labels?: any[];
	datasets: {
		label?: string;
		backgroundColor?: string;
		borderColor?: string;
		borderWidth?: number;
		pointRadius?: number;
		pointHoverRadius?: number;
		pointBorderWidth?: number;
		pointHoverBorderWidth?: number;
		pointBorderColor?: string;
		fill?: boolean;
		data?: any[];
	}[];
}

@UntilDestroy()
@Component({
	selector: ' ngx-line-chart',
	templateUrl: './line-chart.component.html',
	styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {
	options: any;
	incomeStatistics: number[] = [];
	expenseStatistics: number[] = [];
	labels: string[] = [];
	selectedDate: Date;
	noData = false;
	chartUpdated = false;
	tooltipStyles = {
		enabled: true,
		mode: 'point',
		position: 'average',
		displayColors: false,
		caretSize: 0,
		titleFontStyle: 'bold',
		bodyFontColor: 'rgba(0,0,0,0.5)',
		borderWidth: 3,
		titleFontColor: 'rgba(0,0,0,0.8)',
		backgroundColor: 'white',
		borderColor: "rgba(0,0,0,0.1)",
	}

	logRequest: ITimeLogFilters = {};

	@ViewChild('chart') chart: ChartComponent;

	private _data: IChartData;

	@Input()
	public get data(): IChartData {
		return this._data;
	}
	public set data(value: IChartData) {
		this._data = value;
		if (this.chart && this.chart.chart) {
			this.chart.chart.update();
		}
	}

	@Input()
	employeeStatistics: IMonthAggregatedEmployeeStatistics[];
	weekDayList: string[];

	constructor(private themeService: NbThemeService) {}

	getTooltip(tooltipItem, data) {
		let tooltip = tooltipItem.label;
		if (this.chart && this.chart.chart) {
			tooltip = this.chart.chart.data.datasets[tooltipItem.datasetIndex].label
			tooltip = tooltip[0] + tooltip.slice(1).toLocaleLowerCase()
			tooltip += ": " + tooltipItem.value
		}

		return tooltip
	}

	ngOnInit() {
		this.themeService
			.getJsTheme()
			.pipe(untilDestroyed(this))
			.subscribe((config) => {
				const chartJs: any = config.variables.chartjs;

				this.options = {
					responsive: true,
					maintainAspectRatio: false,
					color: [
						config.variables.primary,
						config.variables.primaryLight
					],
					backgroundColor: [
						config.variables.primary,
						config.variables.primaryLight
					],
					elements: {
						rectangle: {
							borderWidth: 2
						}
					},
					scales: {
						xAxes: [
							{
								gridLines: {
									display: true,
									color: chartJs.axisLineColor
								},
								ticks: {
									fontColor: chartJs.textColor,
									maxTicksLimit: 10
								}
							}
						],
						yAxes: [
							{
								gridLines: {
									display: true,
									color: chartJs.axisLineColor
								},
								ticks: {
									fontColor: chartJs.textColor
								}
							}
						]
					},
					legend: {
						position: 'bottom',
						align: 'start',
						usePointStyle: true,
						labels: {
							fontColor: chartJs.textColor,
						}
					},
					hover: {
						mode: 'point',
						intersect: false,
					},
					onHover: (evt, activeElements) => {
						if (!activeElements || !activeElements.length) {
							if (this.data && this.data.datasets) {
								this.data.datasets.forEach(x => {
									x.borderWidth = 2
									x.pointRadius = 2
									x.pointBorderWidth = 2
									x.pointBorderColor = x.borderColor
									x.backgroundColor = ChartUtil.transparentize(x.backgroundColor, 1)
									evt.target.style.cursor = 'default'
								})
								if (!this.chartUpdated) {
									this.chart.chart.update()
									this.chartUpdated = true
								}
							}
						} else {
							this.chartUpdated = false
							evt.target.style.cursor = 'pointer'
							const datasetIndex = activeElements[0]._datasetIndex
							const activeDataset = this.data.datasets[datasetIndex]

							activeDataset.borderWidth = 4
							activeDataset.pointRadius = 4
							activeDataset.pointBorderWidth = 4
							activeDataset.pointBorderColor = 'rgb(255, 255, 255)'
							activeDataset.backgroundColor = ChartUtil.transparentize(activeDataset.backgroundColor, 0.4)
							activeDataset.fill = true
							this.chart.chart.update()
						}
					},

					tooltips: this.selectedDate
						? {
						...this.tooltipStyles,
						callbacks: {
							title: this.getTooltip,
							label: function (tooltipItem, data) {
								const label = data.datasets[tooltipItem.datasetIndex].label || '';
								return label;
							},
						}
					} : {
							...this.tooltipStyles,
							callbacks: {
								label: (tooltipItem, data) => this.getTooltip(tooltipItem, data),
							}
					},
				};
				if (this.chart && this.chart.chart) {
					this.chart.chart.update();
				}
			});
	}

	ngOnDestroy() {}
}
