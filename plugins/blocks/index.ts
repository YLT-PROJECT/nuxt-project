// @ts-nocheck
import { IBlock } from '../components/types'
import { getSpanFor, getInputFor } from './study/paragraph'

const transforms = {
    study: {
        paragraph: getSpanFor
    },
    exam: {
        paragraph: getInputFor
    }
}

export default {
    paragrpah(block: IBlock, mode = `study`) {
        const p = document.createElement(`p`)
        p.innerHTML = block.data.text
        const bs = p.querySelectorAll(`b`)
        for (let index = 0; index < bs.length; index++) {
            const b = bs[index]
            const fn = transforms[mode].paragraph
            p.replaceChild(fn(b), b)
        }
        return p.innerHTML
    }
}
