import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingService } from './core/services/LoadingService ';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MatProgressBarModule, NgIf, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('reqres-users-app');
  loading$!: Observable<boolean>;

  constructor(private loading: LoadingService) {
    this.loading$ = this.loading['loading$'];
  }
}

