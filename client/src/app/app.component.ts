import {Component, OnInit} from '@angular/core';
import {Client} from 'colyseus.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
  }
  constructor() {
  }

  join(name: string) {
    const client = new Client('ws://localhost:3000');
    const room = client.joinOrCreate('my_room', {
      username: name
    });
    console.log(name);
    room.then(value => value.send('hello'));
    room.then(value => value.onMessage((msg) => {
      console.log(msg);
    }));
    room.then(value => console.log(value.state));
  }
}
