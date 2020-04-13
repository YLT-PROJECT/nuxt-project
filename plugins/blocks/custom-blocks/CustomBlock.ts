interface IBlock {
    toolbox: { title: string; icon: string }
}

interface IBlockContent {}

export default abstract class CustomBlock {
    element: HTMLElement | null = null

    _make(tagName: string, classNames?: string[], attributes?: any) {
        const el: any = document.createElement(tagName)

        if (Array.isArray(classNames)) {
            el.classList.add(...classNames)
        } else if (classNames) {
            el.classList.add(classNames)
        }

        for (const attrName in attributes) {
            el[attrName] = attributes[attrName]
        }

        return el
    }

    abstract render(): void
    abstract save(blockContent: IBlockContent): any
}
