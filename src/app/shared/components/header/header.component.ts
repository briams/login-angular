import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../../pages/auth/auth.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin = null;
  isLogged = false;

  private $suscription: Subscription = new Subscription();
  private $destroy = new Subject<any>();

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    private authSvc: AuthService,
  ) { }

  ngOnInit(): void {
    this.$suscription.add(
      this.authSvc.isLogged.subscribe(res => this.isLogged = res)
    );
    this.authSvc.isAdmin
      .pipe(takeUntil(this.$destroy))
      .subscribe(res => (this.isAdmin = res));
  }

  ngOnDestroy(): void {
    this.$suscription.unsubscribe();

    this.$destroy.next({});
    this.$destroy.complete();
  }

  onTtoggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authSvc.logout();
  }

}
