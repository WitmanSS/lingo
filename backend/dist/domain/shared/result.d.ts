export declare class Result<T, E> {
    private readonly _isOk;
    private readonly _value?;
    private readonly _error?;
    private constructor();
    static ok<T, E>(value: T): Result<T, E>;
    static err<T, E>(error: E): Result<T, E>;
    isOk(): boolean;
    isErr(): boolean;
    unwrap(): T;
    unwrapErr(): E;
    map<U>(fn: (value: T) => U): Result<U, E>;
    mapErr<F>(fn: (error: E) => F): Result<T, F>;
    andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E>;
    get value(): T | undefined;
    get error(): E | undefined;
}
