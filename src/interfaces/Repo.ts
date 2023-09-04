interface Repo<T> {
    save(value: T): void;
    get(): T | null;
}

export default Repo;