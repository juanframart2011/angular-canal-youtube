import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { YoutubeModel } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = environment.youtubeKey;
  private playList = environment.playListId;
  private nextPageToken:string = '';

  constructor( private http:HttpClient ) {}

  getVideos(){
    
    const url = this.youtubeUrl + '/playlistItems';
    const params = new HttpParams()
    .set( 'part', 'snippet' )
    .set( 'key', this.apikey )
    .set( 'pageToken', this.nextPageToken )
    .set( 'playlistId', this.playList )
    .set( 'maxResults', '10' );

    return this.http.get<YoutubeModel>( url, { params } ).pipe(
      map( resp => {
        this.nextPageToken = resp.nextPageToken;
        return resp.items;
      }),
      map( items => items.map( video => video.snippet ) )
    )
  }
}