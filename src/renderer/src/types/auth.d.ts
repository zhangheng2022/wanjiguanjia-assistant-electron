export interface LoginParams {
  username: string;
  password: string;
  code?: string;
  uuid?: string;
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
  data: {
    access_token: string;
    token?: string;
  };
}
export interface RegisterType {
  companyName: string;
  mobile: string;
  city: string;
  teamSize: string;
  businessModel: string;
  manageInvType: string;
}
