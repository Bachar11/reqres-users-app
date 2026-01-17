import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { ReqResUser } from '../../models/reqres.models';
import { ReqresService } from '../../core/services/reqres.service';
import { finalize } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-users',
  imports: [SharedModule, RouterLink,],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: ReqResUser[] = [];
  total = 0;
  perPage = 6;
  pageIndex = 0;
isLoading = true;
skeletons = Array(6);
  constructor(private api: ReqresService) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
  this.isLoading = true;

  this.api.getUsersPage(page)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: res => {
        this.users = res.data;
        this.total = res.total;
        this.perPage = res.per_page;
        this.pageIndex = page - 1;
      },
      error: err => {
        console.error('Failed to load users', err);
        this.users = [];
      },
    });
}


  onPageChange(event: any): void {
    this.loadPage(event.pageIndex + 1);
  }
}
 