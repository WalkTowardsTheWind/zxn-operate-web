import { isNumber, isStringNumber, isString } from "@/utils/is";
import { dateUtil } from "./dateUtil";
import currency from "currency.js";

/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}

export function transformTimeRange(
  params: any,
  oldField = "timeData",
  isTime = false
) {
  const _params = JSON.parse(JSON.stringify(params));
  if (_params[oldField] && _params[oldField].length) {
    _params.start_time = _params[oldField][0] || "";
    _params.end_time = _params[oldField][1] || "";
  }
  if (isTime) {
    _params.start_time = _params.start_time
      ? dateUtil(_params.start_time).unix()
      : "";
    _params.end_time = _params.end_time
      ? dateUtil(_params.end_time)
          .add(24 * 60 - 1, "minute")
          .unix()
      : "";
  }
  delete _params[oldField];
  return _params;
}

export function getPercentValue(arrList, index, precision) {
  if (!arrList[index]) {
    return 0;
  }
  if (!precision) precision = 2;
  const sum = arrList.reduce((acc, val) => {
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  if (sum === 0) {
    return 0;
  }
  const digits = Math.pow(10, precision);
  const votesPerQuota = arrList.map((val) => {
    return ((isNaN(val) ? 0 : val) / sum) * digits * 100;
  });

  const targetSeats = digits * 100;
  const seats = votesPerQuota.map((votes) => {
    return Math.floor(votes);
  });

  let currentSum = seats.reduce((acc, val) => {
    return acc + val;
  }, 0);

  const remainder = votesPerQuota.map(function (votes, index) {
    return votes - seats[index];
  });

  while (currentSum < targetSeats) {
    let max = Number.NEGATIVE_INFINITY;
    let maxId = null;
    for (let i = 0, len = remainder.length; i < len; ++i) {
      if (remainder[i] > max) {
        max = remainder[i];
        maxId = i;
      }
    }
    ++seats[maxId];
    remainder[maxId] = 0;
    ++currentSum;
  }

  return seats[index] / digits;
}

export function addUnit(value?: string | number, defaultUnit = "px") {
  if (!value) return "";
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
}

export function flatten(arr: any) {
  let result = [] as any;
  // 此处也可使用for...of遍历
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

/**
 * 根据树子节点value查找所有父节点value
 * @param {array} dataSource 树形结构数据源
 * @param {number} nodeId 子节点value
 * @returns {array} 包含所有父节点value的数组，按照从根节点到直接父节点的顺序排序
 */

export function categoryTransformNumber(dataSource: any, nodeId: any) {
  const parentIds = [] as any; // 用于存储所有父节点ID的数组

  // 定义一个递归函数，用于遍历整棵树并查找子节点的所有父节点
  function traverse(node: any, nodeId: any) {
    if (node.value == nodeId) {
      // 如果当前节点的value等于子节点的value，则表示已经找到了子节点，可以开始向上查找父节点
      return true; // 返回true表示已经找到了子节点
    }

    if (node.children) {
      // 如果当前节点有子节点，则继续遍历子节点
      for (const childNode of node.children) {
        if (traverse(childNode, nodeId)) {
          // 如果在子节点中找到了子节点的父节点，则将当前节点的value添加到父节点ID数组中，并返回true表示已经找到了子节点
          parentIds.push(node.value);
          return true;
        }
      }
    }

    return false; // 如果当前节点不是子节点的父节点，则返回false
  }

  // 从根节点开始遍历整棵树，并调用递归函数查找子节点的所有父节点
  for (const node of dataSource) {
    if (traverse(node, nodeId * 1)) {
      // 如果在当前节点的子树中找到了子节点的父节点，则直接退出循环
      parentIds.push(nodeId);
      break;
    }
  }

  return parentIds; // 返回所有父节点value的数组
}
/**
 * 根据树子节点value查找所有父节点value
 * @param {array} dataSource 树形结构数据源
 * @param {array} nodeIdS 子节点数组
 * @returns {array} 包含所有父节点value的数组，按照从根节点到直接父节点的顺序排序
 */

export function categoryTransformArray(dataSource: any, nodeIdS: any) {
  let parentIds = [] as any; // 用于存储所有子节点ID的数组
  const childrenIds = [] as any; // 用于存储子节点ID的数组

  // 定义一个递归函数，用于遍历整棵树并查找子节点的所有父节点
  function traverse(node: any, nodeId: any) {
    if (node.value == nodeId) {
      // 如果当前节点的value等于子节点的value，则表示已经找到了子节点，可以开始向上查找父节点
      return true; // 返回true表示已经找到了子节点
    }

    if (node.children) {
      // 如果当前节点有子节点，则继续遍历子节点
      for (const childNode of node.children) {
        if (traverse(childNode, nodeId)) {
          // 如果在子节点中找到了子节点的父节点，则将当前节点的value添加到父节点ID数组中，并返回true表示已经找到了子节点
          childrenIds.push(node.value);
          return true;
        }
      }
    }

    return false; // 如果当前节点不是子节点的父节点，则返回false
  }

  // 从根节点开始遍历整棵树，并调用递归函数查找子节点的所有父节点

  for (const nodeIdNumber of nodeIdS) {
    // 字符串转数字
    const nodeId = nodeIdNumber * 1;
    for (const node of dataSource) {
      if (traverse(node, nodeId)) {
        // 如果在当前节点的子树中找到了子节点的父节点，则直接退出循环
        childrenIds.push(nodeId);
        break;
      }
    }
    parentIds.push(childrenIds);
    parentIds = JSON.parse(JSON.stringify(parentIds));
    childrenIds.length = 0;
  }

  return parentIds; // 返回所有父节点value的数组
}
/**
 * 根据数据返回所有数据返回子数组的最后一项
 * @param {array} dataSource 数据源
 * @returns {array} 包含所有子数组的最后一项的数组
 */

export function newArrayTransform(dataSource: any) {
  let parentIds = [] as any; // 用于存储子数组的最后一项的数组
  parentIds = dataSource.map((item: any) => item[item.length - 1]);
  return parentIds; // 返回子数组的最后一项的数组
}
/**
 * 根据数据返回所有数据返回子数组的最后一项
 * @param {array} dataSource 数据源
 * @returns {Number} 子数组的最后一项
 */

export function newNumberTransform(dataSource: any) {
  // 用于存储子数组的最后一项
  const parentIds = dataSource[dataSource.length - 1];
  return parentIds; // 返回子数组的最后一项
}
/**
 * 将数组中字符串数字转化为数字
 * @param {array} dataSource 数据源
 * @returns {array} 数字数组
 */

export function StringTransformNumber(dataSource: any) {
  // 用于存储子数组的最后一项
  const parentIds = dataSource.map((item: any) => {
    return item * 1;
  });
  return parentIds; // 返回子数组的最后一项
}

/**
 *
 * @param {string, number} value
 * @param {number} precision
 * @returns {*}
 */
export function currencyFormat(value: string | number, precision = 2) {
  if (!isNumber(value) && !value) {
    return "";
  }
  // @ts-ignore
  return currency(value, { precision, symbol: "" }).format();
}

export function openWindow(
  url: string,
  opt?: { target?: string; noopener?: boolean; noreferrer?: boolean }
) {
  const { target = "__blank", noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push("noopener=yes");
  noreferrer && feature.push("noreferrer=yes");

  window.open(url, target, feature.join(","));
}
