import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import { resolve } from "path";
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default function configAutoPlugin() {
  const plugins = [];
  plugins.push(
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "@vueuse/core"],
      eslintrc: {
        enabled: false, //  Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({}),
      ],
      vueTemplate: true, // 是否在 vue 模板中自动导入
      dts: resolve(pathResolve("src"), "types", "auto-imports.d.ts"), //  自动导入组件类型声明文件位置，默认根目录; false 关闭自动生成
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"], //@iconify-json/ep 是 Element Plus 的图标库
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
      dts: resolve(pathResolve("src"), "types", "components.d.ts"), //  自动导入组件类型声明文件位置，默认根目录; false 关闭自动生成
    })
  );
  return plugins;
}
