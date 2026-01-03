export class TOOLTIP {
    constructor (anchor, placementClass, { duration = 2000 } = {}) {
        this.anchor = anchor;
        this.duration = duration;
        this.timer = null;
        this.placementClass = placementClass;

        this.element = document.createElement("div");
        this.element.className = `tooltip ${placementClass}`;

        this.anchor.appendChild(this.element);
    }

    show(text) {
        clearTimeout(this.timer);

        this.element.textContent = text;

        this.element.classList.remove("active");
        void this.element.offsetWidth;
        this.element.classList.add("active");

        this.timer = setTimeout(() => {
            this.element.classList.remove("active"); 
        }, this.duration);
    }

    destroy() {
        clearTimeout(this.timer);
        this.element.remove();
    }
}