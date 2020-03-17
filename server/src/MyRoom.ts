import { Room, Client } from "colyseus";
import {type, Schema, MapSchema} from '@colyseus/schema';


class State extends Schema{
  @type('string') name: string;
  @type({map: 'string'}) players = new MapSchema<boolean>();

}

export class MyRoom extends Room {

  onCreate (options: any) {
    this.maxClients = 2;
    this.setState(new State());
  }

  onJoin (client: Client, options: any) {
    console.log(options.username, 'joined', client.id);
    console.log(client.auth);
    this.state.players[client.sessionId] = client.sessionId;
    console.log(this.state);
    this.clients.forEach(console.log);
  }

  onMessage (client: Client, message: any) {

  }

  onLeave (client: Client, consented: boolean) {
  }

  onDispose() {
  }

}

