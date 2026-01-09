import { resolve } from "path";
import { defineConfig } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "unplugin-auto-import/vite";
import SvgComponent from "unplugin-svg-component/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  main: {
    resolve: {
      alias: {
        "@main": resolve("src/main"),
        "@preload": resolve("src/preload"),
      },
    },
  },
  preload: {
    resolve: {
      alias: {
        "@preload": resolve("src/preload"),
        "@main": resolve("src/main"),
      },
    },
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
      },
    },
    // vite 相关配置
    server: {
      port: 5174,
      host: true,
      open: false,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        "/find-goods-api": {
          // target: 'http://localhost:8080',
          target: "http://192.168.3.141:83", // 测试地址
          // target: 'http://192.168.3.132:8080', // 月白地址
          changeOrigin: true,
        },
      },
    },
    plugins: [
      vue(),
      // 支持将 SVG 文件导入为 Vue 组件
      svgLoader({
        defaultImport: "url",
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  // @see https://github.com/svg/svgo/issues/1128
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
      // 自动生成 SvgIcon 组件和 SVG 雪碧图
      SvgComponent({
        iconDir: [resolve(__dirname, "src/renderer/src/common/assets/icons")],
        preserveColor: resolve(__dirname, "src/renderer/src/common/assets/icons/preserve-color"),
        dts: true,
        dtsDir: resolve(__dirname, "src/renderer/src/types/auto"),
      }),
      tailwindcss(), // 自动按需导入 API
      AutoImport({
        eslintrc: {
          enabled: true, // 开启eslint
          filepath: "./.eslintrc-auto-import.mjs",
        },
        imports: ["vue", "vue-router", "pinia"],
        dts: "src/types/auto/auto-imports.d.ts",
        resolvers: [ElementPlusResolver()],
      }),
      // 自动按需导入组件
      Components({
        dts: "src/types/auto/components.d.ts",
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
});
