import { Component, OnInit } from '@angular/core';
import { EmployeeWorkingHours } from 'src/models/employeeWorkingHours';
import { Entry } from 'src/models/entry';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  allEntries: Array<Entry> = [];
  workingHours: Array<EmployeeWorkingHours> = [];

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((data: any) => {
      this.allEntries = data;
      this.mapEntries();
      this.sortEntries();
    });
  }

  mapEntries() {
    this.allEntries.forEach((entry) => {
      if (!entry.EmployeeName) return;
      if (entry.DeletedOn) return;

      let hours = this.calculateTime(entry);

      if (this.employeeExistsInArray(entry.EmployeeName)) {
        if (hours === 0) return;
        var index = this.workingHours.findIndex(
          (item) => item.EmployeeName === entry.EmployeeName
        );
        this.workingHours[index].Hours += hours;
      } else {
        let employeeWorkingHours = new EmployeeWorkingHours(
          entry.EmployeeName,
          hours
        );
        this.workingHours.push(employeeWorkingHours);
      }
    });
  }

  calculateTime(entry: Entry) {
    if (!(entry.StarTimeUtc && entry.EndTimeUtc)) return 0;
    var time =
      new Date(entry.EndTimeUtc).getTime() -
      new Date(entry.StarTimeUtc).getTime();

    let minutes = time / 1000 / 60;
    let hours = minutes / 60;
    return Math.round(hours);
  }

  employeeExistsInArray(name: String) {
    return this.workingHours.some((person) => person.EmployeeName === name);
  }

  sortEntries() {
    return this.workingHours.sort((a, b) => b.Hours - a.Hours);
  }
}
