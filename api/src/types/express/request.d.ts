declare namespace Express {
  export interface Request {
    requestTime?: string;
    user?: Object;
    locals?: Object;
  }
}
