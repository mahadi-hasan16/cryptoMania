import { Component } from '@angular/core';
import { Header } from "../header/header";
import { BarChart } from "../bar-chart/bar-chart";

@Component({
  selector: 'app-layout',
  imports: [Header, BarChart],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
