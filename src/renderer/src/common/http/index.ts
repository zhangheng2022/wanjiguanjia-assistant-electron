import { createAlova } from "alova";
import VueHook from "alova/vue";
import adapterFetch from "alova/fetch";
import { useAuthStoreHook } from "@renderer/pinia/stores/auth";
import { usePlatformStoreHook } from "@renderer/pinia/stores/platform";
/** 退出登录并强制刷新页面（会重定向到登录页） */
function logout(): void {
  // usePlatformStore().platformType = "";
  useAuthStoreHook().clear();
  ElMessage.error("登录过期，请重新登录");
  location.reload();
}
export const alovaInstance = createAlova({
  baseURL: import.meta.env.RENDERER_VITE_BASE_URL,
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  async beforeRequest(method) {
    // method.config.headers.token = "user token";
    const { meta = {} } = method;
    const { skipToken = true } = meta;

    // 获取 token
    let token = "";
    if (skipToken) {
      token = useAuthStoreHook().token || "";
    }

    const arr = [
      "/check-device/auth/login",
      "/check-device/auth/lite/register",
      "/check-device/auth/erp/register",
    ];
    if (arr.includes(method.url)) {
      method.config.headers = {
        ...method.config.headers,
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        "from-source": "inner",
      };
      //
    } else {
      method.config.headers = {
        ...method.config.headers,
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        "from-source": "MarketTrade",
        "plat-type": usePlatformStoreHook().platformType || 2,
      };
    }
  },

  responded: {
    // 请求成功的拦截器
    // 当使用 `alova/fetch` 请求适配器时，第一个参数接收Response对象
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onSuccess: async (response) => {
      // const responseType = response?.responseType;
      // if (responseType === "blob" || responseType === "arraybuffer") return response.data;
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      if (json.code !== 200) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        ElMessage.error(json.msg);
        throw new Error(json.msg);
      }
      if (json.code === undefined) {
        ElMessage.error("非本系统的接口");
        return Promise.reject(new Error("非本系统的接口"));
      }
      switch (json.code) {
        case 200:
          // 本系统采用 code === 0 来表示没有业务错误
          return json.data;
        case 401:
          // Token 过期时
          return logout();
        default:
          // 不是正确的 code
          ElMessage.error(json.data.msg || "系统错误，请稍后再试");
          return Promise.reject(new Error("系统错误，请稍后再试"));
      }
      // 解析的响应数据将传给method实例的transform钩子函数，这些函数将在后续讲解
    },

    // 请求失败的拦截器
    // 请求错误时将会进入该拦截器。
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onError: (err) => {
      alert(err.message);
    },

    // 请求完成的拦截器
    // 当你需要在请求不论是成功、失败、还是命中缓存都需要执行的逻辑时，可以在创建alova实例时指定全局的`onComplete`拦截器，例如关闭请求 loading 状态。
    // 接收当前请求的method实例
    onComplete: async () => {
      // 处理请求完成逻辑
    },
  },
});
