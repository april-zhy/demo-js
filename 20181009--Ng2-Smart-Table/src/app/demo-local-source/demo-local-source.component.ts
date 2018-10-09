import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-local-source',
  template: `<ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>`,

})
export class DemoLocalSourceComponent implements OnInit {
  data = [
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      email: 'Karley_Dach@jasper.info',
    },

    {
      id: 7,
      name: 'Kurtis Weissnat',
      email: 'Telly.Hoeger@billy.biz',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      email: 'Sherwood@rosamond.me',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      email: 'Chaim_McDermott@dana.io',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      email: 'Rey.Padberg@karina.biz',
    },
    {
      id: 11,
      name: 'Nicholas DuBuque',
      email: 'Rey.Padberg@rosamond.biz',
    },
  ];

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      email: {
        title: 'Email'
      }
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
