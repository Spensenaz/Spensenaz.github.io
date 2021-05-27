import { Component, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Team } from './Models/team'
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

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
  pageSizeOptions: number[] = [5, 10, 25, 100];

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
    this.dataSource = new MatTableDataSource(ELEMENT_DATA)
  }

  /*ngOnInit(){
    let responseMatches = this.apiService.getMatches()
    responseMatches.subscribe(res => {
      this.dotaMatches = res.body
      console.log(res.body)
    })
    let responseTeams = this.apiService.getTeams()
    responseTeams.subscribe(res => {
      this.dotaTeams = res.body
    })
    this.dataSource = new MatTableDataSource(ELEMENT_DATA)
    this.dataSource.paginator = this.paginator
  }*/

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
