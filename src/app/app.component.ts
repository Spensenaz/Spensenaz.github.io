import { Component, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Team } from './Models/team'
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  title = 'full-sports-feed'

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25];

  dotaMatches: any | null
  dotaTeams: any | null
  display = false
  pageNumber: number = 1
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
  dataSource: any | null

  // MatPaginator Output
  pageEvent: PageEvent | undefined;

  constructor(private apiService: ApiService){}

  ngAfterViewInit(){
     this.dataSource.paginator = this.paginator
  }

  ngOnInit(){
    let responseMatches = this.apiService.getMatches()
    responseMatches.subscribe(res => {
      this.dotaMatches = res.body
      console.log(res.body)
    })
    let responseTeams = this.apiService.getTeams()
    responseTeams.subscribe(res => {
      this.dotaTeams = res.body
    })
    this.dataSource = new MatTableDataSource(this.dotaMatches)
    this.dataSource.paginator = this.paginator
  }

  nextPage(){
    this.pageNumber += 1
    let response = this.apiService.getMatchesPage(this.pageNumber)
    response.subscribe(res => {
      this.dotaMatches = res.body
    })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  
}
