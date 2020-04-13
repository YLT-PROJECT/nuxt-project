export function getSpanFor(el: HTMLElement) {
    const span = document.createElement(`span`)
    span.textContent = el.textContent
    span.classList.add(`wb`)
    span.classList.add(`b`)
    return span
}
export function getInputFor(el: HTMLElement) {
    const input = document.createElement(`input`)
    input.type = `text`
    input.setAttribute(`data-response`, el.textContent as string)
    input.classList.add(`wb`)
    return input
}
