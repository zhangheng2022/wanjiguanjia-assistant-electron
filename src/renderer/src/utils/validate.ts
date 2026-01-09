/**
 * 判断是否为数组
 * @param arg - 待检测的值
 * @returns 是否为数组
 */
export const isArray = (arg: unknown): arg is unknown[] => {
  return Array.isArray
    ? Array.isArray(arg)
    : Object.prototype.toString.call(arg) === "[object Array]";
};

/**
 * 判断是否为字符串
 * @param str - 待检测的值
 * @returns 是否为字符串
 */
export const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};

/**
 * 判断是否为外链
 * @param path - 待检测的路径
 * @returns 是否为外链
 */
export const isExternal = (path: string): boolean => {
  const reg = /^(https?:|mailto:|tel:)/;
  return reg.test(path);
};

/**
 * 判断是否为网址（带协议）
 * @param url - 待检测的URL
 * @returns 是否为网址
 */
export const isUrl = (url: string): boolean => {
  const reg =
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
  return reg.test(url);
};

/**
 * 判断是否为网址或 IP（带端口）
 * @param url - 待检测的URL
 * @returns 是否为带端口的网址
 */
export const isUrlPort = (url: string): boolean => {
  const reg = /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/;
  return reg.test(url);
};

/**
 * 判断是否为域名（不带协议）
 * @param domain - 待检测的域名
 * @returns 是否为域名
 */
export const isDomain = (domain: string): boolean => {
  const reg = /^([0-9a-zA-Z-]{1,}\.)+([a-zA-Z]{2,})$/;
  return reg.test(domain);
};

/**
 * 判断版本号格式是否为 X.Y.Z
 * @param version - 待检测的版本号
 * @returns 是否为有效的版本号格式
 */
export const isVersion = (version: string): boolean => {
  const reg = /^\d+(?:\.\d+){2}$/;
  return reg.test(version);
};

/**
 * 判断时间格式是否为 24 小时制（HH:mm:ss）
 * @param time - 待检测的时间字符串
 * @returns 是否为24小时制时间格式
 */
export const is24H = (time: string): boolean => {
  const reg = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
  return reg.test(time);
};

/**
 * 判断是否为手机号（1 开头）
 * @param str - 待检测的字符串
 * @returns 是否为手机号
 */
export const isPhoneNumber = (str: string): boolean => {
  const reg = /^(?:(?:\+|00)86)?1\d{10}$/;
  return reg.test(str);
};

/**
 * 判断是否为第二代身份证（18 位）
 * @param str - 待检测的字符串
 * @returns 是否为身份证号
 */
export const isChineseIdCard = (str: string): boolean => {
  const reg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
  return reg.test(str);
};

/**
 * 判断是否为 Email（支持中文邮箱）
 * @param email - 待检测的邮箱地址
 * @returns 是否为邮箱
 */
export const isEmail = (email: string): boolean => {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return reg.test(email);
};

/**
 * 判断是否为 MAC 地址
 * @param mac - 待检测的MAC地址
 * @returns 是否为MAC地址
 */
export const isMAC = (mac: string): boolean => {
  const reg =
    /^(([a-f0-9][0,2,4,6,8,a,c,e]:([a-f0-9]{2}:){4})|([a-f0-9][0,2,4,6,8,a,c,e]-([a-f0-9]{2}-){4}))[a-f0-9]{2}$/i;
  return reg.test(mac);
};

/**
 * 判断是否为 IPv4 地址
 * @param ip - 待检测的IP地址
 * @returns 是否为IPv4地址
 */
export const isIPv4 = (ip: string): boolean => {
  const reg =
    /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/;
  return reg.test(ip);
};

/**
 * 判断是否为车牌（兼容新能源车牌）
 * @param str - 待检测的车牌号
 * @returns 是否为车牌号
 */
export const isLicensePlate = (str: string): boolean => {
  const reg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;
  return reg.test(str);
};
