import { router } from "@renderer/router"
import { installPlugins } from "@renderer/plugins"
import App from "./App.vue"

// css
import "./common/assets/styles/index.css"

// 创建应用实例
const app = createApp(App)

// 安装插件（全局组件、自定义指令等）
installPlugins(app)

// 安装 pinia 和 router
app.use(router)

app.mount("#app")
