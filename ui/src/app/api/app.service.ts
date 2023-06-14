import { Injectable } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import * as saveAs from 'file-saver';
import { NextObserver, map, share } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { pb } from 'src/pb';
import { sleep } from './utils';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  onOpen$: NextObserver<Event> = {
    next: () => this.onOpen(),
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
  dot = `digraph {a -> b}`;
  private _old = '';
  svg = '';
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.onMsg$.subscribe((msg) => {
      console.log(msg);
      this._old = this.dot;
      switch (msg.format) {
        case pb.Format.svg:
          this.svg = msg.svg;

          return;
        case pb.Format.err:
          this.error(msg.err);

          return;
        case pb.Format.source:
          this.dot = msg.dot;

          return;
        case pb.Format.dot:
          saveAs(
            new Blob([msg.dot], { type: 'text/plain;charset=utf-8' }),
            'ge.gv'
          );
          this.info('File download completed.');

          return;
        case pb.Format.png:
          saveAs(new Blob([msg.png], { type: 'image/png' }), 'ge.png');
          this.info('File download completed.');

          return;
        case pb.Format.jpg:
          saveAs(new Blob([msg.jpg], { type: 'image/jpeg' }), 'ge.jpg');
          this.info('File download completed.');

          return;
      }
    });
  }

  send(format = pb.Format.svg) {
    if (this._old == this.dot && format == pb.Format.svg) {
      return;
    }

    this.ws.next(pb.Msg.encode({ dot: this.dot, format }).finish());
  }

  async error(message: string) {
    const alert = await this.alertCtrl.create({
      message,
      header: 'Error',
      subHeader: 'Generate',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async info(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
    });

    await toast.present();
  }

  async download() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select File Type',
      buttons: [
        {
          text: 'Source',
          role: 'selected',
          data: pb.Format.source,
        },
        {
          text: 'SVG',
          data: pb.Format.svg,
        },
        {
          text: 'XDOT',
          data: pb.Format.dot,
        },
        {
          text: 'PNG',
          data: pb.Format.png,
        },
        {
          text: 'JPG',
          data: pb.Format.jpg,
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: pb.Format.err,
        },
      ],
    });

    await actionSheet.present();

    const ret = await actionSheet.onDidDismiss();
    if (!ret.data) {
      return;
    }

    switch (ret.data) {
      case pb.Format.source:
        saveAs(
          new Blob([this.dot], { type: 'text/plain;charset=utf-8' }),
          'ge.dot'
        );
        this.info('File download completed.');

        return;
      case pb.Format.svg:
        this.send();
        await sleep(100);
        saveAs(
          new Blob([this.dot], { type: 'text/xml;charset=utf-8' }),
          'ge.svg'
        );
        this.info('File download completed.');

        return;
      default:
        this.send(ret.data);
    }
  }

  private onOpen() {
    console.log('on open');
    this.send();
  }
}
