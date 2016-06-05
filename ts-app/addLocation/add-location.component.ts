import {Component} from '@angular/core';

@Component({
  selector: 'location-add',
  templateUrl: "../templates/add-location.html"    
})

export class AddLocationComponent implements OnInit{
  title = 'Add Location';  
  ngOnInit() {      
  }   
  
  getTitle(){
      return this.title;
  }
}



