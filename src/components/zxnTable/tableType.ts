import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
export type SortParams<T> = {
  column: TableColumnCtx<T | any>;
  prop: string;
  order: Table.Order;
};
