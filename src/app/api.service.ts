import { Injectable, ɵɵsetComponentScope } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Team } from './Models/team'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = 'https://api.pandascore.co/'
  teamUrl: string = "teams?"
  filterUrl1: string = "filter["
  filterUrl2: string = "]="
  myToken: string = '&token=YMjgWp44V9BDfS4-F8T0zdkmDvjIQ63xQdUosX4Na0V-TPF5pZ0'

  constructor(private httpClient: HttpClient) {}
  
  public getTeams(){
    return this.httpClient.get<Team[]>(`${this.apiUrl + this.teamUrl + 'page[10]' + this.myToken}`, {observe: 'response'})
  }

  public getTeamsFilter(accessor:string, input: string){
    return this.httpClient.get<Team[]>(`${this.apiUrl + this.teamUrl + this.filterUrl1 + accessor + this.filterUrl2 + input + this.myToken}`, {observe: 'response'})
  }

  public getMatches(){
    return this.httpClient.get(`${this.apiUrl + 'matches?/page[10]' + this.myToken}`, {observe: 'response'})
  }

  public getMatchesPage(pageNumber: number){
    return this.httpClient.get(`${this.apiUrl + 'matches?/' + 'page[10]=' + pageNumber + this.myToken}`, {observe: 'response'})
  }
}