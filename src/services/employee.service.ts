import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entry } from 'src/models/entry';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeWorkingHours } from 'src/models/employeeWorkingHours';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  entriesUrl =
    'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';

  entries: Entry[] = [];

  private source: BehaviorSubject<Entry[]> = new BehaviorSubject<Entry[]>(
    this.entries
  );
  public valuesObs$: Observable<Entry[]> = this.source.asObservable();

  fetchEntriesFromDB(): Observable<any> {
    return this.http.get(this.entriesUrl);
  }

  setEntries(entries: Entry[]) {
    this.source.next(entries);
  }

  getEntries() {
    return this.valuesObs$;
  }

  workingHours: EmployeeWorkingHours[] = [];

  private srcWorkingHours: BehaviorSubject<EmployeeWorkingHours[]> =
    new BehaviorSubject<EmployeeWorkingHours[]>(this.workingHours);
  public workingHoursValuesObs$: Observable<EmployeeWorkingHours[]> =
    this.srcWorkingHours.asObservable();

  setWorkingHours(workingHours: EmployeeWorkingHours[]) {
    this.srcWorkingHours.next(workingHours);
  }

  getWorkingHours() {
    return this.workingHoursValuesObs$;
  }
}
