import type { InjectionKey } from "vue";
import type { tabsContext } from "@/types/inject";

export const TabsContextKey: InjectionKey<tabsContext> =
  Symbol("TabsContextKey");
