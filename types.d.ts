declare module 'vue/types/vue' {
    interface Vue {
        $myInjectedFunction(message: string): void
    }
}
