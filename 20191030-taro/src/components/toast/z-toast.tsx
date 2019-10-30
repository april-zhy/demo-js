
export interface IToastParam {
  title: string;
  type?: string;
  duration?: number;
  complete?: Function;
}

export const ZToast = {
  info: (param: IToastParam) => { },
  success: (param: IToastParam) => { },
  warning: (param: IToastParam) => { },
  error: (param: IToastParam) => { }
}