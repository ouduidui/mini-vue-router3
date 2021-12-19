export default {
    render(createElement) {
        // 标记当前router-view的深度
        this.$vnode.data.routerView = true;  // 当前虚拟DOM的data，添加一个routerView属性

        let depth = 0;
        let parent = this.$parent;

        while (parent) {
            if (parent.$vnode && parent.$vnode.data && parent.$vnode.data.routerView) {
                // 说明当前parent是一个router-view
                depth++;
            }
            parent = parent.$parent;
        }

        //获取path对应的component
        let component = null;
        const route = this.$router.matched[depth];
        if (route) {
            component = route.component;
        }

        console.log(component);
        return createElement(component)
    }
}

