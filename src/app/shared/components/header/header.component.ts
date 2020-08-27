import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdmin = false;

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onTtoggleSidenav(): void {
    this.toggleSidenav.emit();
  }

}
