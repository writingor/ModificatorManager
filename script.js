class BlockModificatorManager {
    constructor(block, mod) {
        this.className.block = block
        this.className.mod = mod
    }

    className = {
        block: '',
        mod: ''
    }

    setMark = (el, block, mod) => {
        const time = Date.now().toString()
        el?.setAttribute(`data-mark${block}${mod}`, `${time}${block}${mod}`)
        return time
    }

    getMark = (el, block, mod) => {
        return el?.getAttribute(`data-mark${block}${mod}`)
    }

    getAllBlocks = () => {
        return document.querySelectorAll(`.${this.className.block}`)
    }

    getClosestBlock = (e) => {
        return e?.target?.closest(`.${this.className.block}`)
    }

    addMod = (e, element) => {
        const el = e ? this.getClosestBlock(e) : element
        el?.classList?.add(this.className.mod)
    }

    removeMod = (e, element) => {
        const el = e ? this.getClosestBlock(e) : element
        el?.classList?.remove(this.className.mod)
    }

    manageMod = (e) => {
        const el = this.getClosestBlock(e)
        const mark = this.setMark(el, this.className.block, this.className.mod)
        const allEls = this.getAllBlocks()
    
        allEls?.forEach(el => {
            if (this.getMark(el, this.className.block, this.className.mod) !== mark) {
                this.removeMod(null, el)
            }
        })
    
        this.addMod(null, el)
    }
}

// Active 1
const ActiveManager = new BlockModificatorManager('--manage-active', '_active')
window.addEventListener('click', ActiveManager.manageMod, {passive: true})

// Active 2
const ActiveManager2 = new BlockModificatorManager('--manage-active-2', '_active')
window.addEventListener('click', ActiveManager2.manageMod, {passive: true})

// Green
const GreenManager = new BlockModificatorManager('--manage-green', '_green')
window.addEventListener('click', GreenManager.manageMod, {passive: true})

// Blue
const BlueManager = new BlockModificatorManager('--manage-blue', '_blue')
window.addEventListener('click', BlueManager.manageMod, {passive: true})