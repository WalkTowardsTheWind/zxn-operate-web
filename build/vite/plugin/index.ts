import { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import Icons from "unplugin-icons/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";
import autoImportPlugin from "./autoImportPlugin";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default function createVitePlugins() {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    ...autoImportPlugin(),
    Icons({
      // 自动安装图标库
      autoInstall: true,
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(pathResolve("src"), "assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ];
  // vite-plugin-windicss
  vitePlugins.push(UnoCSS());

  return vitePlugins;
}
