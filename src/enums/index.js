const enumsDir = import.meta.glob("./*.ts", { eager: true });
const modulesEnum = Object.keys(enumsDir).reduce((modules, modulePath) => {
  const _modules = modules;
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const _enumsList = enumsDir[modulePath];
  Object.keys(_enumsList).forEach((it) => {
    _modules[`${moduleName}.${it}`] = _enumsList[it];
  });
  return _modules;
}, {});
const enumConst = Object.keys(modulesEnum).reduce((modules, cru) => {
  const _modules = modules;
  const cruEnum = modulesEnum[cru];
  _modules[cru] = Object.keys(cruEnum).reduce((arr, key) => {
    if (!isNaN(1 * key)) {
      arr.push({ label: cruEnum[key], value: key });
    }
    return arr;
  }, []);
  return _modules;
}, {});
const install = (app) => {
  app.config.globalProperties.$enumSet = modulesEnum;
  app.config.globalProperties.$const = enumConst;
};
export default install;
