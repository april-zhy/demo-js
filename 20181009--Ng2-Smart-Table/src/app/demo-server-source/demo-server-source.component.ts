import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-demo-server-source',
  template: `
  <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
`,
  styles: [``]
})
export class DemoServerSourceComponent implements OnInit {
  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      albumId: {
        title: 'Album',
      },
      title: {
        title: 'Title',
      },
      url: {
        title: 'Url',
      },
    },
  };

  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: 'https://jsonplaceholder.typicode.com/photos' });
  }
  ngOnInit() {
  }

}
