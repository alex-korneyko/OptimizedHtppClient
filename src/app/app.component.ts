import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OptimizedHttpClientProject';


  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.post("/users", null).subscribe((data) => {
      console.log("HttpClient: ", data)
    })
  }
}
