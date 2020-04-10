import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $myInjectedFunction(message: string): void
        $myInjectedFunction2(message: string): void
        // readonly $axioss: string
    }
}

Vue.prototype.$myInjectedFunction = (message: string) => console.log(message)
