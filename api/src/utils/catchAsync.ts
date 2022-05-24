const catchAsync: Function = (fn: Function) => {
  return (req: Request, res: Response, next: any) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
