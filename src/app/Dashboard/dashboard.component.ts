import { Component } from '@angular/core';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  //The time to show the next photo
  private NextPhotoInterval:number = 5000;
  //Looping or not
  private noLoopSlides:boolean = true;
  //Photos
  private slides:Array<any> = [];

  constructor() {
    this.addNewSlide();
  }
  public addNewSlide() {
    this.slides.push(
      {image:'assets/images/home1.jpg',text:''},
      {image:'assets/images/home2.jpg',text:''},
      {image:'assets/images/home3.jpg',text:''},
    );
  }

  private removeLastSlide() {
    this.slides.pop();
  }
}
