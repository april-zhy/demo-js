import { Component } from '@angular/core';
import { NgoTranslateService } from './ngo-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'NG2-Smart-Table';

  constructor(
    private ngoTranslate: NgoTranslateService
  ) { }

  onLangChange(lang) {
    this.ngoTranslate.setLang(lang);
  }

}
