import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { venueBaseURL } from '../../constants/http-urls';
import { VenueModel } from '../../model/venue/venue';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(
    private http: HttpClient
  ) { }

  async getAllVenue(): Promise<any> {
    return await this.http.get<VenueModel>(venueBaseURL, { observe: 'response' }).toPromise();
  }
}
