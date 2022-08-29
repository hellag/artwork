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

  private url = "http://localhost:3000/getart"

  public currentPage = 1;

  constructor() { }

  ngOnInit(): void {
    this.getArtwork();
  }

  getArtwork() {

    fetch(this.url, {
      method: 'GET',

    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)

        this.paginationData = data.pagination;
        this.totalItems = data.pagination.total;
        console.log(this.paginationData);
        this.artworks = data.mainData;
      })
      .catch(err => {
        console.log(err);
      })
  }


  pageChanged(ev: any ){
    console.log("changed");

    return 2;
  }

}
