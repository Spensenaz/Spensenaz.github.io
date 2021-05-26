import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'
import { Team } from './Models/team'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'full-sports-feed'
  dotaMatches: any | null
  dotaTeams: any | null
  display = false;
  pageNumber: number = 1

  constructor(private apiService: ApiService){}

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
  }

  nextPage(){
    this.pageNumber += 1
    let response = this.apiService.getMatchesPage(this.pageNumber)
    response.subscribe(res => {
      this.dotaMatches = res.body
    })
  }

}
