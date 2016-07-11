import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { createStaticWorker } from '../utils'

export function filterWorker(cb: Function) {
  const subject: Subject<any> = new Subject();
  const worker: Worker = createStaticWorker(cb);
  let data;

  worker.onmessage = e => {
    if (data && e.data) {
      subject.next(data)
    } else {
      subject.next(null);
    }
  }

  this.subscribe(value => {
    data = value;

    worker.postMessage(value);
  });

  return subject;
}
