export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function conditionCall(
  call: () => void,
  condition: () => boolean,
  interval: number
) {
  while (true) {
    if (condition()) {
      call();

      return;
    }

    await sleep(interval);
  }
}
const items: any[] = [];
let isConsume = false;
export function orderCall<T>(obj: T, call: (item: T) => Promise<void>) {
  items.push(obj);

  if (!isConsume) {
    isConsume = true;
    consume(call);
  }
}

async function consume<T>(call: (item: T) => Promise<void>) {
  while (items.length > 0) {
    await call(items.shift());
  }

  isConsume = false;
}
