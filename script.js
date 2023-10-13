/**
 * Modificator
 * manager
 * 
 * v 1.0.2
 * 
 * Code
 * https://github.com/writingor/ModificatorManager
 * 
 * Example
 * https://writingor.github.io/ModificatorManager/
 */

class ModificatorManager {
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

    addMod = (e, elem) => {
        const el = e ? this.getClosestBlock(e) : elem
        el?.classList?.add(this.className.mod)
    }

    removeMod = (e, elem) => {
        const el = e ? this.getClosestBlock(e) : elem
        el?.classList?.remove(this.className.mod)
    }

    toggleMod = (e, elem) => {
        const el = e ? this.getClosestBlock(e) : elem
        el?.classList?.toggle(this.className.mod)
    }

    toggleByScrollTop = (el, distance = 100) => {
        document.documentElement.scrollTop > distance ? this.addMod(null, el) : this.removeMod(null, el)
    }

    toggleSibling = (e, elem, pos = 'next') => {
        const el = e ? this.getClosestBlock(e) : elem
        const sibling = pos === 'next' ? el?.nextElementSibling : el?.previousElementSibling
        sibling?.classList?.toggle(this.className.mod)
    }

    togglePrevSibling = (e, elem) => {
        this.toggleSibling(e, elem, 'prev');
    }

    toggleNextSibling = (e, elem) => {
        this.toggleSibling(e, elem, 'next');
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
const ActiveManager = new ModificatorManager('--manage-active', '_active')
window.addEventListener('click', ActiveManager.manageMod, {passive: true})

// Active 2
const ActiveManager2 = new ModificatorManager('--manage-active-2', '_active')
window.addEventListener('click', ActiveManager2.manageMod, {passive: true})

// Green
const GreenManager = new ModificatorManager('--manage-green', '_green')
window.addEventListener('click', GreenManager.manageMod, {passive: true})

// Blue
const BlueManager = new ModificatorManager('--manage-blue', '_blue')
window.addEventListener('click', BlueManager.manageMod, {passive: true})

// Scrolled
const ScrolledManager = new ModificatorManager('--manage-scrolled', '_scrolled')
const fixedBlock = document.querySelector('.fixed');
window.addEventListener('scroll', () => {
    ScrolledManager.toggleByScrollTop(fixedBlock, 10)
}, {passive: true})

// Toggle Next
const NextHiddenManager = new ModificatorManager('--manage-next-hidden', '_hidden')
window.addEventListener('click', NextHiddenManager.toggleNextSibling, {passive: true})
