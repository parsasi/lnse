import { createStore, type Store, createCustomPersister } from "tinybase";

export const isInstanceOf = (
  thing: unknown,
  cls: MapConstructor | SetConstructor | ObjectConstructor,
): boolean => thing instanceof cls;

const jsonString = (obj: unknown): string =>
  JSON.stringify(obj, (_key, value) =>
    isInstanceOf(value, Map) ? Object.fromEntries([...value]) : value,
  );

export const createRemotePersister = (store: Store, load: (data: string) => Promise<void>) => {
  const getPersisted = async () => {
    throw new Error(
      "This persister should only be used to transform data into the tinybase format",
    );
  };

  const setPersisted = async (getContent: () => void) => load(jsonString(getContent()));

  return createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    () => {},
    () => {},
  );
};
