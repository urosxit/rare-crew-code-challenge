import { Component, OnInit } from '@angular/core';
import { EmployeeWorkingHours } from 'src/models/employeeWorkingHours';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  chartData: Array<any> = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService
      .getWorkingHours()
      .subscribe((data: EmployeeWorkingHours[]) => {
        if (!data) return;

        let workingHours = data;
        if (workingHours) {
          console.log(workingHours);
          this.mapDataTest(workingHours);
        }
      });
  }

  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  mapDataTest(workingHours: Array<EmployeeWorkingHours>) {
    let total = workingHours.reduce((sum, current) => sum + current.Hours, 0);
    workingHours.forEach((entry: EmployeeWorkingHours) => {
      this.chartData.push({
        name: entry.EmployeeName,
        value: (entry.Hours / total) * 100,
      });
    });
  }
}
