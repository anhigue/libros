import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-foundation';
import { Observable } from 'rxjs';
import { ModalMessageComponent } from '../components/modal-message/modal-message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  bsModalRef: BsModalRef;

  constructor(private bsModalService: BsModalService) { }

  confirm(title: string, message: string, options: string[]): Observable<string> {
    const initialState = {
      title,
      message,
      options,
    };
    this.bsModalRef = this.bsModalService.show(ModalMessageComponent, { initialState });

    return new Observable<string>(this.getConfirmSubscriber());
  }

  private getConfirmSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((reason: string) => {
        observer.next(this.bsModalRef.content.answer);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    };
  }
}
