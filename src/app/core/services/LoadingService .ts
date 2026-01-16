import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoadingService  {
  private pending= 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);


  get Loading$(): Observable<boolean>{
    return this.loadingSubject.asObservable();
  }

  start(): void{
    this.pending++;
    this.loadingSubject.next(true);
  }

  end(): void{
    this.pending= Math.max(0,this.pending-1);
    if(this.pending===0)this.loadingSubject.next(false);
  }
  
}
