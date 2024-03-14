import { createStore, createCustomPersister, type Store } from "tinybase";

export function getPersistedData(dataImporter: (store: Store) => Store) {
  const store = createStore();
  dataImporter(store);

  return new Promise((resolve, reject) => {
    store.addDidFinishTransactionListener((store) => {
      resolve(JSON.stringify(store));
    });
  });
}

//If we can just stringify the store it self, we don't need this function.
function createJsonPersister(
  store: Store,
  {
    get,
    set,
  }: {
    get: () => Promise<string>;
    set: (content: string) => Promise<void>;
  },
) {
  let interval: NodeJS.Timeout;

  return createCustomPersister(
    store,
    async () => JSON.parse(await get()),
    async (store) => await set(JSON.stringify(store)),
    (listener) => (interval = setInterval(listener, 1000)),
    () => clearInterval(interval),
  );
}
