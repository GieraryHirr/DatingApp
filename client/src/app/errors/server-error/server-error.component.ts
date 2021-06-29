import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error: any;

  constructor(private router: Router) {
    //access to router have we only in constructor
    const navigation = this.router.getCurrentNavigation();
    //with question mark, error sometimes can get null og undefined value.
    this.error = navigation?.extras?.state?.error;
    
   }

  ngOnInit(): void {
  }

}
