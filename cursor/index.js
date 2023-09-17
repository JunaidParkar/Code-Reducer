const scripts = require("../data/script");

class customCursor {
    constructor() {
        this.scr = new scripts(); 
    }

    getCursor(
        crsrColor = "black",
        {
            setMagnet = false,
            elementId = [],
            treble = 0.5,
            magneticHoverSize = 10
        } = {}
    ) {
        document.body.style.cursor = "none"
        const crsr = document.createElement("div");
        crsr.id = "myCursor10011";
        crsr.style.background = crsrColor;
        document.body.appendChild(crsr);
        document.addEventListener("mousemove", (e) => {
            crsr.style.left = `${e.clientX}px`;
            crsr.style.top = `${e.clientY}px`;
            if (setMagnet) {
                let isId = true
                if(elementId.length <= 0) {
                    console.error("Element ID not provided")
                } else if((treble < 0) || (treble > 1)) {
                    console.error("Treble should be between 0 to 1")
                } else {
                    for (let i = 0; i < elementId.length; i++) {
                        if (!document.getElementById(elementId[i])) {
                            console.error(`No element with id ${elementId[i]} found`)
                            isId = false
                            break
                        }
                    }
                }
                if (!isId) {
                    return
                }
                this.scr.cursorMagnet(
                    elementId,
                    crsr, 
                    e.clientX,
                    e.clientY,
                    treble,
                    magneticHoverSize
                );
            }
        });
    }
}

module.exports = customCursor