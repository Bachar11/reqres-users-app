import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared-module';
import { ReqResUser } from '../../models/reqres.models';
import { ReqresService } from '../../core/services/reqres.service';

@Component({
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: ReqResUser | null = null;
  isLoading = true;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private api: ReqresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          const id = Number(params.get('id'));

          // 🔑 CRITICAL: reset state immediately
          this.isLoading = true;
          this.user = null;
          this.error = null;

          if (!id || isNaN(id)) {
            this.error = 'Invalid user ID';
            this.isLoading = false;
            return of(null);
          }

          return this.api.getUserById(id);
        })
      )
      .subscribe({
        next: (user) => {
          this.user = user;
          if (!user) this.error = 'User not found';
          this.isLoading = false;
        },
        error: () => {
          this.error = 'Failed to load user';
          this.isLoading = false;
        }
      });
  }

  back(): void {
    this.router.navigate(['/users']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
