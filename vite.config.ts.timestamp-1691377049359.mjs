// vite.config.ts
import { loadEnv, defineConfig } from "file:///C:/Users/Lenovo/Desktop/%E8%BF%90%E8%90%A5%E7%AB%AF/web/node_modules/.pnpm/registry.npmmirror.com+vite@4.1.4_@types+node@20.4.5_sass@1.58.3/node_modules/vite/dist/node/index.js";

// build/vite/plugin/index.ts
import vue from "file:///C:/Users/Lenovo/Desktop/%E8%BF%90%E8%90%A5%E7%AB%AF/web/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.0.0_vite@4.1.4_vue@3.2.45/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///C:/Users/Lenovo/Desktop/%E8%BF%90%E8%90%A5%E7%AB%AF/web/node_modules/.pnpm/registry.npmmirror.com+unocss@0.50.1_vite@4.1.4/node_modules/unocss/dist/vite.mjs";
import Icons from "file:///C:/Users/Lenovo/Desktop/%E8%BF%90%E8%90%A5%E7%AB%AF/web/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.15.1/node_modules/unplugin-icons/dist/vite.mjs";
import { createSvgIconsPlugin } from "file:///C:/Users/Lenovo/Desktop/%E8%BF%90%E8%90%A5%E7%AB%AF/web/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-svg-icons@2.0.1_vite@4.1.4/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { resolve as resolve2 } from "path";

// build/vite/plugin/autoImportPlugin.ts
import AutoImport from "file:///C:/Users/Lenovo/Desktop/%E8%BF%90%E8%90%A5%E7%AB%AF/web/node_modules/.pnpm/registry.npmmirror.com+unplugin-auto-import@0.13.0_@vueuse+core@9.1.1/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/Users/Lenovo/Desktop/%E8%BF%90%E8%90%A5%E7%AB%AF/web/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.23.0_vue@3.2.45/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import IconsResolver from "file:///C:/Users/Lenovo/Desktop/%E8%BF%90%E8%90%A5%E7%AB%AF/web/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.15.1/node_modules/unplugin-icons/dist/resolver.mjs";
import Components from "file:///C:/Users/Lenovo/Desktop/%E8%BF%90%E8%90%A5%E7%AB%AF/web/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.23.0_vue@3.2.45/node_modules/unplugin-vue-components/dist/vite.mjs";
import { resolve } from "path";
function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}
function configAutoPlugin() {
  const plugins = [];
  plugins.push(
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "@vueuse/core"],
      eslintrc: {
        enabled: false,
        //  Default `false`
        filepath: "./.eslintrc-auto-import.json",
        // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true
        // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({})
      ],
      vueTemplate: true,
      // 是否在 vue 模板中自动导入
      dts: resolve(pathResolve("src"), "types", "auto-imports.d.ts")
      //  自动导入组件类型声明文件位置，默认根目录; false 关闭自动生成
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"]
          //@iconify-json/ep 是 Element Plus 的图标库
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: resolve(pathResolve("src"), "types", "components.d.ts")
      //  自动导入组件类型声明文件位置，默认根目录; false 关闭自动生成
    })
  );
  return plugins;
}

// build/vite/plugin/index.ts
function pathResolve2(dir) {
  return resolve2(process.cwd(), ".", dir);
}
function createVitePlugins() {
  const vitePlugins = [
    // have to
    vue(),
    ...configAutoPlugin(),
    Icons({
      // 自动安装图标库
      autoInstall: true
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve2(pathResolve2("src"), "assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
    })
  ];
  vitePlugins.push(UnoCSS());
  return vitePlugins;
}

// vite.config.ts
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Lenovo\\Desktop\\\u8FD0\u8425\u7AEF\\web";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        "@": pathSrc
      }
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        //define global scss variable
        scss: {
          javascriptEnabled: true,
          additionalData: `
            @use "@/styles/variables.scss" as *;
          `
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: true
      // 运行是否自动打开浏览器
      // 反向代理解决跨域
      // proxy: {
      //   [env.VITE_APP_BASE_API]: {
      //     // 线上接口API地址
      //     target: "http://adminapi.zhongxinneng.lol",
      //     // 本地接口API地址
      //     // target: 'http://localhost:8989',
      //     changeOrigin: true,
      //     rewrite: (path) =>
      //       // localhost:3000/dev-api/users/me → http://vapi.youlai.tech/users/me
      //       path.replace(
      //         new RegExp("^" + env.VITE_APP_BASE_API),
      //         env.VITE_APP_BASE_API
      //       ),
      //   }
      // },
    },
    plugins: createVitePlugins(),
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "axios",
        "element-plus/es/components/form/style/css",
        "element-plus/es/components/form-item/style/css",
        "element-plus/es/components/button/style/css",
        "element-plus/es/components/input/style/css",
        "element-plus/es/components/input-number/style/css",
        "element-plus/es/components/switch/style/css",
        "element-plus/es/components/upload/style/css",
        "element-plus/es/components/menu/style/css",
        "element-plus/es/components/col/style/css",
        "element-plus/es/components/icon/style/css",
        "element-plus/es/components/row/style/css",
        "element-plus/es/components/tag/style/css",
        "element-plus/es/components/dialog/style/css",
        "element-plus/es/components/loading/style/css",
        "element-plus/es/components/radio/style/css",
        "element-plus/es/components/radio-group/style/css",
        "element-plus/es/components/popover/style/css",
        "element-plus/es/components/scrollbar/style/css",
        "element-plus/es/components/tooltip/style/css",
        "element-plus/es/components/dropdown/style/css",
        "element-plus/es/components/dropdown-menu/style/css",
        "element-plus/es/components/dropdown-item/style/css",
        "element-plus/es/components/sub-menu/style/css",
        "element-plus/es/components/menu-item/style/css",
        "element-plus/es/components/divider/style/css",
        "element-plus/es/components/card/style/css",
        "element-plus/es/components/link/style/css",
        "element-plus/es/components/breadcrumb/style/css",
        "element-plus/es/components/breadcrumb-item/style/css",
        "element-plus/es/components/table/style/css",
        "element-plus/es/components/tree-select/style/css",
        "element-plus/es/components/table-column/style/css",
        "element-plus/es/components/select/style/css",
        "element-plus/es/components/option/style/css",
        "element-plus/es/components/pagination/style/css",
        "element-plus/es/components/tree/style/css",
        "element-plus/es/components/alert/style/css",
        "@vueuse/core",
        "path-to-regexp",
        "echarts",
        "@wangeditor/editor",
        "@wangeditor/editor-for-vue",
        "vue-i18n"
      ]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vaW5kZXgudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vYXV0b0ltcG9ydFBsdWdpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEZXNrdG9wXFxcXFx1OEZEMFx1ODQyNVx1N0FFRlxcXFx3ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEZXNrdG9wXFxcXFx1OEZEMFx1ODQyNVx1N0FFRlxcXFx3ZWJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0xlbm92by9EZXNrdG9wLyVFOCVCRiU5MCVFOCU5MCVBNSVFNyVBQiVBRi93ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBVc2VyQ29uZmlnLCBDb25maWdFbnYsIGxvYWRFbnYsIGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCBjcmVhdGVWaXRlUGx1Z2lucyBmcm9tIFwiLi9idWlsZC92aXRlL3BsdWdpbi9pbmRleFwiO1xyXG5cclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuY29uc3QgcGF0aFNyYyA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiBwYXRoU3JjLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICAvLyBDU1MgXHU5ODg0XHU1OTA0XHU3NDA2XHU1NjY4XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICAvL2RlZmluZSBnbG9iYWwgc2NzcyB2YXJpYWJsZVxyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcclxuICAgICAgICAgICAgQHVzZSBcIkAvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtcclxuICAgICAgICAgIGAsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXHJcbiAgICAgIHBvcnQ6IE51bWJlcihlbnYuVklURV9BUFBfUE9SVCksXHJcbiAgICAgIG9wZW46IHRydWUsIC8vIFx1OEZEMFx1ODg0Q1x1NjYyRlx1NTQyNlx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OFxyXG4gICAgICAvLyBcdTUzQ0RcdTU0MTFcdTRFRTNcdTc0MDZcdTg5RTNcdTUxQjNcdThERThcdTU3REZcclxuICAgICAgLy8gcHJveHk6IHtcclxuICAgICAgLy8gICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xyXG4gICAgICAvLyAgICAgLy8gXHU3RUJGXHU0RTBBXHU2M0E1XHU1M0UzQVBJXHU1NzMwXHU1NzQwXHJcbiAgICAgIC8vICAgICB0YXJnZXQ6IFwiaHR0cDovL2FkbWluYXBpLnpob25neGlubmVuZy5sb2xcIixcclxuICAgICAgLy8gICAgIC8vIFx1NjcyQ1x1NTczMFx1NjNBNVx1NTNFM0FQSVx1NTczMFx1NTc0MFxyXG4gICAgICAvLyAgICAgLy8gdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4OTg5JyxcclxuICAgICAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgLy8gICAgIHJld3JpdGU6IChwYXRoKSA9PlxyXG4gICAgICAvLyAgICAgICAvLyBsb2NhbGhvc3Q6MzAwMC9kZXYtYXBpL3VzZXJzL21lIFx1MjE5MiBodHRwOi8vdmFwaS55b3VsYWkudGVjaC91c2Vycy9tZVxyXG4gICAgICAvLyAgICAgICBwYXRoLnJlcGxhY2UoXHJcbiAgICAgIC8vICAgICAgICAgbmV3IFJlZ0V4cChcIl5cIiArIGVudi5WSVRFX0FQUF9CQVNFX0FQSSksXHJcbiAgICAgIC8vICAgICAgICAgZW52LlZJVEVfQVBQX0JBU0VfQVBJXHJcbiAgICAgIC8vICAgICAgICksXHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKCksXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgIFwidnVlXCIsXHJcbiAgICAgICAgXCJ2dWUtcm91dGVyXCIsXHJcbiAgICAgICAgXCJwaW5pYVwiLFxyXG4gICAgICAgIFwiYXhpb3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Zvcm0vc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9mb3JtLWl0ZW0vc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9idXR0b24vc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbnB1dC9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2lucHV0LW51bWJlci9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3N3aXRjaC9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3VwbG9hZC9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL21lbnUvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb2wvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pY29uL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcm93L3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGFnL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZGlhbG9nL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbG9hZGluZy9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3JhZGlvL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmFkaW8tZ3JvdXAvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9wb3BvdmVyL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc2Nyb2xsYmFyL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdG9vbHRpcC9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Ryb3Bkb3duL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZHJvcGRvd24tbWVudS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Ryb3Bkb3duLWl0ZW0vc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zdWItbWVudS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL21lbnUtaXRlbS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2RpdmlkZXIvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jYXJkL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbGluay9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2JyZWFkY3J1bWIvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9icmVhZGNydW1iLWl0ZW0vc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWJsZS9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RyZWUtc2VsZWN0L3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGFibGUtY29sdW1uL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc2VsZWN0L3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvb3B0aW9uL3N0eWxlL2Nzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9zdHlsZS9jc3NcIixcclxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RyZWUvc3R5bGUvY3NzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9hbGVydC9zdHlsZS9jc3NcIixcclxuICAgICAgICBcIkB2dWV1c2UvY29yZVwiLFxyXG4gICAgICAgIFwicGF0aC10by1yZWdleHBcIixcclxuICAgICAgICBcImVjaGFydHNcIixcclxuICAgICAgICBcIkB3YW5nZWRpdG9yL2VkaXRvclwiLFxyXG4gICAgICAgIFwiQHdhbmdlZGl0b3IvZWRpdG9yLWZvci12dWVcIixcclxuICAgICAgICBcInZ1ZS1pMThuXCIsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEZXNrdG9wXFxcXFx1OEZEMFx1ODQyNVx1N0FFRlxcXFx3ZWJcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEZXNrdG9wXFxcXFx1OEZEMFx1ODQyNVx1N0FFRlxcXFx3ZWJcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0xlbm92by9EZXNrdG9wLyVFOCVCRiU5MCVFOCU5MCVBNSVFNyVBQiVBRi93ZWIvYnVpbGQvdml0ZS9wbHVnaW4vaW5kZXgudHNcIjtpbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IFVub0NTUyBmcm9tIFwidW5vY3NzL3ZpdGVcIjtcclxuaW1wb3J0IEljb25zIGZyb20gXCJ1bnBsdWdpbi1pY29ucy92aXRlXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IGF1dG9JbXBvcnRQbHVnaW4gZnJvbSBcIi4vYXV0b0ltcG9ydFBsdWdpblwiO1xyXG5cclxuZnVuY3Rpb24gcGF0aFJlc29sdmUoZGlyOiBzdHJpbmcpIHtcclxuICByZXR1cm4gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcIi5cIiwgZGlyKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnMoKSB7XHJcbiAgY29uc3Qgdml0ZVBsdWdpbnM6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9IFtcclxuICAgIC8vIGhhdmUgdG9cclxuICAgIHZ1ZSgpLFxyXG4gICAgLi4uYXV0b0ltcG9ydFBsdWdpbigpLFxyXG4gICAgSWNvbnMoe1xyXG4gICAgICAvLyBcdTgxRUFcdTUyQThcdTVCODlcdTg4QzVcdTU2RkVcdTY4MDdcdTVFOTNcclxuICAgICAgYXV0b0luc3RhbGw6IHRydWUsXHJcbiAgICB9KSxcclxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XHJcbiAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwYXRoUmVzb2x2ZShcInNyY1wiKSwgXCJhc3NldHMvaWNvbnNcIildLFxyXG4gICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxyXG4gICAgICBzeW1ib2xJZDogXCJpY29uLVtkaXJdLVtuYW1lXVwiLFxyXG4gICAgfSksXHJcbiAgXTtcclxuICAvLyB2aXRlLXBsdWdpbi13aW5kaWNzc1xyXG4gIHZpdGVQbHVnaW5zLnB1c2goVW5vQ1NTKCkpO1xyXG5cclxuICByZXR1cm4gdml0ZVBsdWdpbnM7XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMZW5vdm9cXFxcRGVza3RvcFxcXFxcdThGRDBcdTg0MjVcdTdBRUZcXFxcd2ViXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMZW5vdm9cXFxcRGVza3RvcFxcXFxcdThGRDBcdTg0MjVcdTdBRUZcXFxcd2ViXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXGF1dG9JbXBvcnRQbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0xlbm92by9EZXNrdG9wLyVFOCVCRiU5MCVFOCU5MCVBNSVFNyVBQiVBRi93ZWIvYnVpbGQvdml0ZS9wbHVnaW4vYXV0b0ltcG9ydFBsdWdpbi50c1wiO2ltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gXCJ1bnBsdWdpbi1pY29ucy9yZXNvbHZlclwiO1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuZnVuY3Rpb24gcGF0aFJlc29sdmUoZGlyOiBzdHJpbmcpIHtcclxuICByZXR1cm4gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcIi5cIiwgZGlyKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uZmlnQXV0b1BsdWdpbigpIHtcclxuICBjb25zdCBwbHVnaW5zID0gW107XHJcbiAgcGx1Z2lucy5wdXNoKFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBWdWUgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXHVGRjBDXHU1OTgyXHVGRjFBcmVmLCByZWFjdGl2ZSwgdG9SZWYgXHU3QjQ5XHJcbiAgICAgIGltcG9ydHM6IFtcInZ1ZVwiLCBcIkB2dWV1c2UvY29yZVwiXSxcclxuICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICBlbmFibGVkOiBmYWxzZSwgLy8gIERlZmF1bHQgYGZhbHNlYFxyXG4gICAgICAgIGZpbGVwYXRoOiBcIi4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25cIiwgLy8gRGVmYXVsdCBgLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbmBcclxuICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlLCAvLyBEZWZhdWx0IGB0cnVlYCwgKHRydWUgfCBmYWxzZSB8ICdyZWFkb25seScgfCAncmVhZGFibGUnIHwgJ3dyaXRhYmxlJyB8ICd3cml0ZWFibGUnKVxyXG4gICAgICB9LFxyXG4gICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxlbWVudCBQbHVzIFx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFx1RkYwQ1x1NTk4Mlx1RkYxQUVsTWVzc2FnZSwgRWxNZXNzYWdlQm94Li4uIChcdTVFMjZcdTY4MzdcdTVGMEYpXHJcbiAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxyXG4gICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxyXG4gICAgICAgIEljb25zUmVzb2x2ZXIoe30pLFxyXG4gICAgICBdLFxyXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU1NzI4IHZ1ZSBcdTZBMjFcdTY3N0ZcdTRFMkRcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcclxuICAgICAgZHRzOiByZXNvbHZlKHBhdGhSZXNvbHZlKFwic3JjXCIpLCBcInR5cGVzXCIsIFwiYXV0by1pbXBvcnRzLmQudHNcIiksIC8vICBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTdFQzRcdTRFRjZcdTdDN0JcdTU3OEJcdTU4RjBcdTY2MEVcdTY1ODdcdTRFRjZcdTRGNERcdTdGNkVcdUZGMENcdTlFRDhcdThCQTRcdTY4MzlcdTc2RUVcdTVGNTU7IGZhbHNlIFx1NTE3M1x1OTVFRFx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU2Q0U4XHU1MThDXHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XHJcbiAgICAgICAgSWNvbnNSZXNvbHZlcih7XHJcbiAgICAgICAgICBlbmFibGVkQ29sbGVjdGlvbnM6IFtcImVwXCJdLCAvL0BpY29uaWZ5LWpzb24vZXAgXHU2NjJGIEVsZW1lbnQgUGx1cyBcdTc2ODRcdTU2RkVcdTY4MDdcdTVFOTNcclxuICAgICAgICB9KSxcclxuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgRWxlbWVudCBQbHVzIFx1N0VDNFx1NEVGNlxyXG4gICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcclxuICAgICAgXSxcclxuICAgICAgZHRzOiByZXNvbHZlKHBhdGhSZXNvbHZlKFwic3JjXCIpLCBcInR5cGVzXCIsIFwiY29tcG9uZW50cy5kLnRzXCIpLCAvLyAgXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3RUM0XHU0RUY2XHU3QzdCXHU1NzhCXHU1OEYwXHU2NjBFXHU2NTg3XHU0RUY2XHU0RjREXHU3RjZFXHVGRjBDXHU5RUQ4XHU4QkE0XHU2ODM5XHU3NkVFXHU1RjU1OyBmYWxzZSBcdTUxNzNcdTk1RURcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcclxuICAgIH0pXHJcbiAgKTtcclxuICByZXR1cm4gcGx1Z2lucztcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1ULFNBQWdDLFNBQVMsb0JBQW9COzs7QUNDaFgsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFdBQVc7QUFDbEIsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxXQUFBQSxnQkFBZTs7O0FDTGlXLE9BQU8sZ0JBQWdCO0FBQ2haLFNBQVMsMkJBQTJCO0FBQ3BDLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsZUFBZTtBQUN4QixTQUFTLFlBQVksS0FBYTtBQUNoQyxTQUFPLFFBQVEsUUFBUSxJQUFJLEdBQUcsS0FBSyxHQUFHO0FBQ3hDO0FBRWUsU0FBUixtQkFBb0M7QUFDekMsUUFBTSxVQUFVLENBQUM7QUFDakIsVUFBUTtBQUFBLElBQ04sV0FBVztBQUFBO0FBQUEsTUFFVCxTQUFTLENBQUMsT0FBTyxjQUFjO0FBQUEsTUFDL0IsVUFBVTtBQUFBLFFBQ1IsU0FBUztBQUFBO0FBQUEsUUFDVCxVQUFVO0FBQUE7QUFBQSxRQUNWLGtCQUFrQjtBQUFBO0FBQUEsTUFDcEI7QUFBQSxNQUNBLFdBQVc7QUFBQTtBQUFBLFFBRVQsb0JBQW9CO0FBQUE7QUFBQSxRQUVwQixjQUFjLENBQUMsQ0FBQztBQUFBLE1BQ2xCO0FBQUEsTUFDQSxhQUFhO0FBQUE7QUFBQSxNQUNiLEtBQUssUUFBUSxZQUFZLEtBQUssR0FBRyxTQUFTLG1CQUFtQjtBQUFBO0FBQUEsSUFDL0QsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVztBQUFBO0FBQUEsUUFFVCxjQUFjO0FBQUEsVUFDWixvQkFBb0IsQ0FBQyxJQUFJO0FBQUE7QUFBQSxRQUMzQixDQUFDO0FBQUE7QUFBQSxRQUVELG9CQUFvQjtBQUFBLE1BQ3RCO0FBQUEsTUFDQSxLQUFLLFFBQVEsWUFBWSxLQUFLLEdBQUcsU0FBUyxp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
