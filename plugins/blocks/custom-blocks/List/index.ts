// eslint-ignore
import './styles.scss'
import CustomBlock from '../CustomBlock'
// import toolboxIcon from './toolbox-icon.svg'
// import settingsIcon from './list-icon-settings.svg'

const icons = {
    toolboxIcon: `toolboxIcon`,
    settingsOrderedListIcon: `settingsIcon`
}

export default class List extends CustomBlock {
    enableLineBreaks = true
    toolbox = {
        icon: icons.toolboxIcon,
        title: `List`
    }

    conversionConfig = {
        export(data: any) {
            return data.items.join(`. `)
        },
        import(string: string) {
            return {
                items: [string],
                style: `unordered`
            }
        }
    }

    sanitize = {
        style: {},
        items: {
            br: true
        }
    }

    settings = [
        {
            name: `ordered`,
            title: `Ordered`,
            icon: ``,
            default: true
        }
    ]

    api: any = null
    _data: any = null

    constructor({ data, api }: any) {
        super()
        this._data = {
            style: this.settings[0].name,
            description: data && data.description,
            items: data.items || []
        }

        this.api = api
        this.data = data
    }

    drawParagraph(): HTMLDivElement {
        const div = this._make(`div`, [`description-list`, `h5`], {
            contentEditable: true,
            onkeydown: this.onKeyDown.bind(this)
        }) as HTMLDivElement
        return div
    }

    onKeyDown(e: KeyboardEvent) {
        if (e.keyCode === 13) e.preventDefault()
        if (e.keyCode === 9) {
            e.stopPropagation()
            e.preventDefault()
            return
        }
        if (e.code !== `Backspace` && e.code !== `Delete`) {
        }
    }

    render() {
        const style =
            this._data.style === `ordered`
                ? this.CSS.wrapperOrdered
                : this.CSS.wrapperUnordered
        const tag = this._data.style === `ordered` ? `ol` : `ul`

        this.element = this._make(`div`, [this.CSS.baseBlock])

        const list = this._make(
            tag,
            [this.CSS.baseBlock, this.CSS.wrapper, style],
            {
                contentEditable: true
            }
        )

        if (this._data.items.length) {
            this._data.items.forEach((item: any) => {
                list.appendChild(
                    this._make(`li`, [this.CSS.item], {
                        innerHTML: item
                    })
                )
            })
        } else {
            list.appendChild(this._make(`li`, [this.CSS.item]))
        }

        list.addEventListener(
            `keydown`,
            (event: KeyboardEvent) => {
                const [ENTER, BACKSPACE] = [13, 8] // key codes

                switch (event.keyCode) {
                    case ENTER:
                        this.getOutofList(event)
                        break
                    case BACKSPACE:
                        this.backspace(event)
                        break
                    default:
                        break
                }
            },
            false
        )

        this.element?.appendChild(this.drawParagraph())
        this.element?.appendChild(list)

        return this.element
    }

    save(blockEl: any) {
        return Object.assign({}, this.data, {
            description: blockEl.querySelector(`.description-list`).textContent
        })
    }

    renderSettings() {
        const wrapper = this._make(`div`, [this.CSS.settingsWrapper], {})

        this.settings.forEach((item) => {
            const itemEl = this._make(`div`, this.CSS.settingsButton, {
                innerHTML: item.icon
            })

            itemEl.addEventListener(`click`, () => {
                this.toggleTune(item.name)
                const buttons = itemEl.parentNode.querySelectorAll(
                    `.` + this.CSS.settingsButton
                )
                Array.from(buttons).forEach((button: any) =>
                    button.classList.remove(this.CSS.settingsButtonActive)
                )
                itemEl.classList.toggle(this.CSS.settingsButtonActive)
            })

            if (this._data.style === item.name) {
                itemEl.classList.add(this.CSS.settingsButtonActive)
            }

            wrapper.appendChild(itemEl)
        })

        return wrapper
    }

    onPaste(event: any) {
        const list = event.detail.data
        this.data = this.pasteHandler(list)
    }

    static get pasteConfig() {
        return {
            tags: [`OL`, `UL`, `LI`]
        }
    }

    toggleTune(style: any) {
        this.element?.classList.toggle(
            this.CSS.wrapperOrdered,
            style === `ordered`
        )
        this.element?.classList.toggle(
            this.CSS.wrapperUnordered,
            style === `unordered`
        )

        this._data.style = style
    }

    get CSS() {
        return {
            baseBlock: this.api.styles.block,
            wrapper: `cdx-list`,
            wrapperOrdered: `cdx-list--ordered`,
            wrapperUnordered: `cdx-list--unordered`,
            item: `cdx-list__item`,
            settingsWrapper: `cdx-list-settings`,
            settingsButton: this.api.styles.settingsButton,
            settingsButtonActive: this.api.styles.settingsButtonActive
        }
    }

    set data(listData) {
        if (!listData) {
            listData = {}
        }

        this._data.style =
            listData.style ||
            this.settings.find((tune) => tune.default === true)?.name
        this._data.items = listData.items || []

        const oldView = this.element

        if (oldView) {
            oldView.parentNode?.replaceChild(
                this.render() as HTMLElement,
                oldView
            )
        }
    }

    get data() {
        this._data.items = []

        const items = this.element?.querySelectorAll(`.${this.CSS.item}`)

        if (items) {
            for (let i = 0; i < items.length; i++) {
                const value = items[i].innerHTML.replace(`<br>`, ` `).trim()

                if (value) {
                    this._data.items.push(items[i].innerHTML)
                }
            }
        }

        return this._data
    }

    get currentItem() {
        let currentNode: any = window.getSelection()?.anchorNode

        if (currentNode?.nodeType !== Node.ELEMENT_NODE) {
            currentNode = currentNode?.parentNode
        }

        return currentNode.closest(`.${this.CSS.item}`)
    }

    getOutofList(event: KeyboardEvent) {
        const items = this.element?.querySelectorAll(`.` + this.CSS.item)

        if (items) {
            if (items.length < 2) {
                return
            }

            const lastItem = items[items.length - 1]
            const { currentItem } = this
            if (
                currentItem === lastItem &&
                !lastItem.textContent?.trim().length
            ) {
                currentItem.parentElement.removeChild(currentItem)
                this.api.blocks.insertNewBlock()
                event.preventDefault()
                event.stopPropagation()
            }
        }
    }

    backspace(event: KeyboardEvent) {
        const items: any = this.element?.querySelectorAll(`.` + this.CSS.item)
        const firstItem = items[0]

        if (!firstItem) {
            return
        }

        if (
            items.length < 2 &&
            !firstItem.innerHTML.replace(`<br>`, ` `).trim()
        ) {
            event.preventDefault()
        }
    }

    selectItem(event: Event) {
        event.preventDefault()

        const selection = window.getSelection()
        const currentNode: any = selection?.anchorNode?.parentNode
        const currentItem = currentNode?.closest(`.` + this.CSS.item)
        const range = new Range()

        range.selectNodeContents(currentItem)

        selection?.removeAllRanges()
        selection?.addRange(range)
    }

    pasteHandler(element: HTMLElement) {
        const { tagName: tag } = element
        let type

        switch (tag) {
        case `OL`:
            type = `ordered`
            break
            case `UL`:
        case `LI`:
            type = `unordered`
            break
            default:
            break
        }

        const data: { type: string; items: string[] } = {
            type: type || ``,
            items: []
        }

        if (tag === `LI`) {
            data.items = [element.innerHTML]
        } else {
            const items = Array.from(element.querySelectorAll(`LI`))

            data.items = items
                .map((li) => li.innerHTML)
                .filter((item) => !!item.trim())
        }

        return data
    }
}
