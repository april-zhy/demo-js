import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NgoTranslateService } from '../ngo-translate.service';

@Component({
  selector: 'app-demo-server-source',
  template: `
  <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
`,
  styles: [``]
})
export class DemoServerSourceComponent implements OnInit {
  settings = {};
  source: ServerDataSource;

  constructor(
    private http: HttpClient,
    private ngoTranslate: NgoTranslateService
  ) {
    this.ngoTranslate.getTranslation().subscribe(trans => {
      const settings = this.getTableSetting();
      console.error('11111', trans)
      this.settings = this.translateColumns(settings, trans);
    });
  }

  getTableSource() {
    const self = this;
    const config = {
      endPoint: 'https://jsonplaceholder.typicode.com/photos'
    };
    this.source = new ServerDataSource(self.http, config);
  }

  translateColumns(settings, trans) {
    const translation = trans['TABLE'];
    const columns = settings.columns;
    if (translation) {
      for (const key of Object.keys(columns)) {
        console.log(key, columns);
        columns[key].title = translation[columns[key].title];
      }
      return settings;
    }
  }

  getTableSetting() {
    const settings = {
      columns: {
        id: {
          title: 'ID',
        },
        albumId: {
          title: 'ALBUM',
        },
        title: {
          title: 'TITLE',
        },
        url: {
          title: 'URL',
        },
      },
    };
    return JSON.parse(JSON.stringify(settings));
  }

  ngOnInit() {
    this.getTableSource();
    this.settings = this.getTableSetting();
  }

}
