import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FormControl } from '@angular/forms';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  of,
  catchError,
} from 'rxjs';
import { SharedModule } from '../../shared-module';
import { ReqResUser } from '../../../models/reqres.models';
import { ReqresService } from '../../../core/services/reqres.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchId = new FormControl<string>('');
  filteredUsers: ReqResUser[] = [];
  private destroy$ = new Subject<void>();

  constructor(private api: ReqresService, private router: Router) {}

  
onNumericInput(event: Event) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '');
  this.searchId.setValue(input.value, { emitEvent: false });
}
  ngOnInit(): void {
    

    this.searchId.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((val) => {
          const raw = String(val).trim();
          if (!raw) return of([]);

          const id = Number(raw);
          if (Number.isInteger(id) && id > 0) {
            return this.api.getUserById(id).pipe(
              catchError(() => of(null)),
              switchMap((user) => (user ? of([user]) : of([])))
            );
          } else {
            return of([]);
          }
        })
      )
      .subscribe((users: ReqResUser[]) => {
        this.filteredUsers = users;
      });
  }

  openResultFromOption(user: ReqResUser) {
    if (user && user.id) {
      this.router.navigate(['/users', user.id]);
      this.searchId.setValue('');
      this.filteredUsers = [];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
