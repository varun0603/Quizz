import {Client, Room} from "colyseus";
import {MapSchema, Schema, type} from '@colyseus/schema';


class State extends Schema {
  @type('string') name: string;
  @type({map: 'string'}) players = new MapSchema<boolean>();
  @type({map: 'string'}) data = new MapSchema<string>();
}

export class MyRoom extends Room {

  onCreate (options: any) {
    this.maxClients = 2;
    this.setState(new State());
  }

  onJoin (client: Client, options: any) {
    console.log(options.username, 'joined', client.id);
    this.state.players[client.sessionId] = client.sessionId;
    if (this.hasReachedMaxClients()) {
      this.sendState(client);
      this.lock().then(() => console.log('max limit reached'));
    }
  }

  onMessage (client: Client, message: any) {

  }

  onLeave (client: Client, consented: boolean) {
  }

  onDispose() {
  }

}

