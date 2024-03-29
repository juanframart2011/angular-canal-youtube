import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from '../../models/youtube.models';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos:Video[] = [];

  constructor( private youtubeService:YoutubeService) { }

  _getList(){

    this.youtubeService.getVideos().subscribe( result => {
      
      this.videos.push( ...result );
    });
  }

  ngOnInit(): void {

    this._getList();
  }

  loadVideo(){
    this._getList();
  }

  showVideo( video:Video ){

    Swal.fire({
      html: '<h4>'+video.title+'</h4><iframe width="100%" height="315" src="https://www.youtube.com/embed/'+video.resourceId.videoId+'" frameborder="0" allowfullscreen></iframe>'
    });
  }
}