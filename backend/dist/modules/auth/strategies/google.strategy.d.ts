import { Strategy } from 'passport-google-oauth20';
declare const GoogleStrategy_base: new (...args: [options: import("passport-google-oauth20").StrategyOptionsWithRequest] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptions] | [options: import("passport-google-oauth20").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any): Promise<{
        googleId: any;
        email: any;
        firstName: any;
        lastName: any;
        avatar: any;
        accessToken: string;
        refreshToken: string;
    }>;
}
export {};
