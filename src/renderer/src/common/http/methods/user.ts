import { alovaInstance } from '@renderer/common/http';


export const getUserInfo = (params: any) => alovaInstance.Get('/user', { params });
