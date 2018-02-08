export interface BasicsOption {
    required ? : boolean;
    message ? : string;
}
export interface LengthOption extends BasicsOption {
    length ? : number;
    minLength ? : number;
    maxLength ? : number;
}

export interface CheckResult {
    vali: boolean;
    message ? : string;
}