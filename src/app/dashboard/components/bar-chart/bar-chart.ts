import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CryptoCoin } from '../../../models/finance/cryptoCoin';
import { ApiCalls } from '../../../API/api-calls';

Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css'
})
export class BarChart implements OnInit {
  public chart: any;
  cryptoCoins: CryptoCoin[] = [];

  apiCalls = inject(ApiCalls);

  ngOnInit(): void {
    this.fetchChartData();
  }

  //#region Chart Related Functions
  createBarChart() {
    const colors = [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(199, 199, 199, 0.7)',
      'rgba(83, 102, 255, 0.7)',
      'rgba(255, 102, 153, 0.7)',
      'rgba(60, 179, 113, 0.7)'
    ];

    this.chart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: this.cryptoCoins.map(coin => coin.name),
        datasets: [
          {
            label: '',
            data: this.cryptoCoins.map(coin => coin.price_usd),
            backgroundColor: this.cryptoCoins.map((_, index) => colors[index % colors.length]), // multi-color
            borderColor: this.cryptoCoins.map((_, index) => colors[index % colors.length].replace('0.7', '1')), // matching border
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Cryptocurrency Names',
              font: {
                weight: 'bold'
              }
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Price in USD',
              font: {
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  //#endregion
  //#region Fetching Chart Data
  fetchChartData() {
    this.apiCalls.loadCoinloreData()
      .subscribe(response => {
        this.cryptoCoins = response.data;
        this.createBarChart();
        console.log(this.cryptoCoins);
      })
  }
  //#endregion
}
