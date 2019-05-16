import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NgoTranslateService implements OnDestroy {

  currentLang: string = 'zh';
  evtLang: BehaviorSubject<string> = new BehaviorSubject('zh');
  evtTranslation: BehaviorSubject<any> = new BehaviorSubject('');

  subArr: Array<Subscription> = [];

  constructor(
    private ngTranslate: TranslateService
  ) {
    this.setLang(this.currentLang);
  }

  ngOnDestroy() {
    this.subArr.forEach(item => {
      item.unsubscribe();
    });
  }

  setLang(lang) {
    this.currentLang = lang;
    const sub = this.ngTranslate.getTranslation(this.currentLang).subscribe(res => {
      console.error('----', res);
      this.evtTranslation.next(res);
    });
    this.ngTranslate.use(lang);
    this.evtLang.next(this.currentLang);
    this.subArr.push(sub);
  }

  getCurrentLang() {
    return this.evtLang.asObservable();
  }

  getTranslation() {
    return this.evtTranslation.asObservable();
  }
}
