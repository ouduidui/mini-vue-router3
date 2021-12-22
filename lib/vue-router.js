import ouRouterLink from './router-link';
import ouRouterView from './router-view';

let Vue; // 保存Vue的构造函数，插件中需要用到

class VueRouter {
  /*
   * options:
   *   mode: 'hash'
   *   base: process.env.BASE_URL
   *   routes
   * */
  constructor(options) {
    this.$options = options;

    switch (options.mode) {
      case 'hash':
        this.hashModeHandle();
        break;
      case 'history':
        this.historyModeHandle();
        break;
    }
  }

  // Hash模式处理
  hashModeHandle() {
    // 将current设置为响应式数据，即current变化时router-view的render函数能够再次执行
    this.current = window.location.hash.slice(1) || '/';
    Vue.util.defineReactive(this, 'matched', []);
    // match方法可以递归遍历路由表，获得匹配关系的数组
    this.match();

    // 监听hash变化
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1);
      this.matched = [];
      this.match();
    });
  }

  // History模式处理
  historyModeHandle() {
    this.current = window.location.pathname || '/';
    Vue.util.defineReactive(this, 'matched', []);
    this.match();
  }

  match(routes) {
    routes = routes || this.$options.routes;

    // 递归遍历
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route);
        return;
      }

      // 不是根路径
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route);
        // 判断是否有嵌套页面
        if (route.children && route.children.length) {
          this.match(route.children);
        }
        return;
      }
    }
  }
}

/*
 * 插件：实现install方法，注册$router
 *   参数1是Vue.use()一定会传入
 * */
VueRouter.install = function (_Vue) {
  Vue = _Vue; // 引用构造函数，VueRouter中要使用

  /* 挂载$router */
  /*
   * 全局混入
   *   全局混入的目的是为了延迟下面逻辑到router创建完毕并且附加到选项上时才执行
   * */
  Vue.mixin({
    beforeCreate() {
      // 此钩子在每个组件创建实例时都会调用
      /* this.$options即创建Vue实例的第一个参数 */
      if (this.$options.router) {
        // 只在根组件拥有router选项
        Vue.prototype.$router = this.$options.router; // vm.$router
      }
    }
  });

  /* 注册全局组件router-link和router-view */
  Vue.component('router-link', ouRouterLink);
  Vue.component('router-view', ouRouterView);
};

export default VueRouter;
