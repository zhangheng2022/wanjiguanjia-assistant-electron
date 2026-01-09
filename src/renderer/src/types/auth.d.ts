export interface LoginParams {
  username: string;
  password: string;
  code?: string;
  uuid?: string;
  loginType?: number;
}

export interface LoginRequestParams {
  account: string;
  password: string;
  code?: string;
  uuid?: string;
}
export interface LoginResponse {
  code: number;
  message: string;
  access_token: string;
  token?: string;
}
export interface RegisterType {
  companyName: string;
  mobile: string;
  city: string;
  teamSize: string;
  businessModel: string;
  manageInvType: string;
}
export interface UserInfoType {
  code: number;
  data: {
    phoneNumber: string;
    platSource: number;
    tenantName: string;
    userName: string;
  };
  msg: string;
}
