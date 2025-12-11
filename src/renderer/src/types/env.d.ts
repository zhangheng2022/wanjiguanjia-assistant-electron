/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
/** 声明 vite 环境变量的类型（如果未声明则默认是 any） */
interface ImportMetaEnv {
  readonly RENDERER_VITE__APP_TITLE: string
  readonly RENDERER_VITE_ROUTER_HISTORY: 'hash' | 'html5'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
