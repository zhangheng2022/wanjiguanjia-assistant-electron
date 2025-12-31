/// <reference types="vite/client" />
/** 声明 vite 环境变量的类型（如果未声明则默认是 any） */
interface ImportMetaEnv {
  /** 主进程：是否使用系统标题栏（true 使用系统标题栏） */
  readonly MAIN_VITE_IS_SYSTEM_TITLE: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
