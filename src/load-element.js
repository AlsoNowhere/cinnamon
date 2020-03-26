
export const loadElement = function(
    element
){
    if (!(element instanceof Element)) {
        throw new Error("Cinnamon, loadElement, element -- You must pass a DOM/HTML element.");
    }

    this.element = element;

    return this;
}
