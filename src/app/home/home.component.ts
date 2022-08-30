import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public artworks = []
  public paginationData = {}
  public totalItems = ''

  public currentPage = 1;

  constructor() { }

  ngOnInit(): void {
    this.getArtwork();
  }

  /**
   * Main data function. Retrieves artwork data.
   */
  getArtwork() {
    let url = "http://localhost:3000/getart/"

    url = url + this.currentPage.toString();

    fetch(url, {
      method: 'GET',

    })
      .then(response => response.json())
      .then(data => {

        this.paginationData = data.pagination;
        this.totalItems = data.pagination.total;

        this.artworks = data.mainData;
      })
      .catch(err => {
        console.log(err);
      })
  }


  /**
   * Paginator. Changes the page number and recalls the api for the new results
   * @param ev
   */
  pageChanged(ev: any ){
    this.currentPage = ev;

    this.getArtwork()
  }

}
