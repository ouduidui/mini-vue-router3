export default {
    props: {
        to: {
            type: String,
            required: true
        },
    },
    render(createElement) {      // 返回虚拟Dom
        if(this.$router.$options.mode === 'hash'){
            return createElement('a',
                {
                    attrs: {href: '#' + this.to}    // 设置a标签的href属性
                },
                this.$slots.default    // 获取标签插槽内容
            );
        }else{
            const self = this;
            const route = this.$router.$options.routes
                .find(route => route.path === this.to);
            return createElement('a',
                {
                    attrs: {href: this.to},    // 设置a标签的href属性
                    on: {
                        click(e) {
                            e.preventDefault();   // 取消a标签的默认事件，即刷新页面
                            history.pushState({}, route.name, self.to);   // 通过history.pushState来改变url
                            self.$router.current = self.to;
                            self.$router.matched = [];
                            self.$router.match();
                        }
                    }
                },
                this.$slots.default    // 获取标签插槽内容
            );
        }
    }
}