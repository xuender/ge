import { Injectable } from '@angular/core';
import { NextObserver, map, share } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { pb } from 'src/pb';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  onOpen$: NextObserver<Event> = {
    next: () => {
      console.log('on open');
    },
  };
  onClose$: NextObserver<CloseEvent> = {
    next: () => {
      console.log('on close');
    },
  };
  private ws: WebSocketSubject<ArrayBuffer> = webSocket({
    url: `ws://${location.host}/ws`,
    openObserver: this.onOpen$,
    closeObserver: this.onClose$,
    binaryType: 'arraybuffer',
    serializer: (v) => v as ArrayBuffer,
    deserializer: (v) => v.data,
  });
  onMsg$ = this.ws.pipe(
    map((msg) => {
      const buf = new Uint8Array(msg as ArrayBuffer);

      return pb.Msg.decode(buf);
    }),
    share()
  );
  constructor() {
    this.onMsg$.subscribe((msg) => console.log(msg));
  }
}
