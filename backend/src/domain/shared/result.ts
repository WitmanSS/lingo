export class Result<T, E> {
  private constructor(
    private readonly _isOk: boolean,
    private readonly _value?: T,
    private readonly _error?: E
  ) {}

  static ok<T, E>(value: T): Result<T, E> {
    return new Result(true, value);
  }

  static err<T, E>(error: E): Result<T, E> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Result(false, undefined, error) as any;
  }

  isOk(): boolean {
    return this._isOk;
  }

  isErr(): boolean {
    return !this._isOk;
  }

  unwrap(): T {
    if (!this._isOk) {
      throw new Error('Called unwrap on an Err result');
    }
    return this._value!;
  }

  unwrapErr(): E {
    if (this._isOk) {
      throw new Error('Called unwrapErr on an Ok result');
    }
    return this._error!;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    return this._isOk ? Result.ok(fn(this._value!)) : Result.err(this._error!);
  }

  mapErr<F>(fn: (error: E) => F): Result<T, F> {
    return this._isOk ? Result.ok(this._value!) : Result.err(fn(this._error!));
  }

  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    return this._isOk ? fn(this._value!) : Result.err(this._error!);
  }

  get value(): T | undefined {
    return this._value;
  }

  get error(): E | undefined {
    return this._error;
  }
}