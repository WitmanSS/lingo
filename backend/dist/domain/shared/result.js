"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    _isOk;
    _value;
    _error;
    constructor(_isOk, _value, _error) {
        this._isOk = _isOk;
        this._value = _value;
        this._error = _error;
    }
    static ok(value) {
        return new Result(true, value);
    }
    static err(error) {
        return new Result(false, undefined, error);
    }
    isOk() {
        return this._isOk;
    }
    isErr() {
        return !this._isOk;
    }
    unwrap() {
        if (!this._isOk) {
            throw new Error('Called unwrap on an Err result');
        }
        return this._value;
    }
    unwrapErr() {
        if (this._isOk) {
            throw new Error('Called unwrapErr on an Ok result');
        }
        return this._error;
    }
    map(fn) {
        return this._isOk ? Result.ok(fn(this._value)) : Result.err(this._error);
    }
    mapErr(fn) {
        return this._isOk ? Result.ok(this._value) : Result.err(fn(this._error));
    }
    andThen(fn) {
        return this._isOk ? fn(this._value) : Result.err(this._error);
    }
    get value() {
        return this._value;
    }
    get error() {
        return this._error;
    }
}
exports.Result = Result;
//# sourceMappingURL=result.js.map