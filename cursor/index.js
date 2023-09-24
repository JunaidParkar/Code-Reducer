class customCursor {

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
        let crsr = document.createElement("div");
        let crsrStyle = crsr.style
        crsrStyle.zIndex = 99999
        crsrStyle.height = '20px'
        crsrStyle.width = '20px'
        crsrStyle.borderRadius = '50%'
        crsrStyle.mixBlendMode = 'difference'
        crsrStyle.position = 'fixed'
        crsrStyle.pointerEvents = 'none'
        crsrStyle.transition = 'transform .1s ease'
        crsr.id = "myCursor10011";
        crsrStyle.background = crsrColor;
        document.body.appendChild(crsr);
        document.addEventListener("mousemove", (e) => {
            crsrStyle.left = `${e.clientX}px`;
            crsrStyle.top = `${e.clientY}px`;
            if (setMagnet) {
                let isId = true
                if (elementId.length <= 0) {
                    console.error("Element ID not provided")
                } else if ((treble < 0) || (treble > 1)) {
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
                this.cursorMagnet(
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

    cursorMagnet(elementID, crsr, cursorX, cursorY, treble, magneticSize,) {
        let activeID = false;
        for (let i = 0; i < elementID.length; i++) {
            document.getElementById(elementID[i]).style.transform = "";
        }
        for (let i = 0; i < elementID.length; i++) {
            if (document.getElementById(elementID[i])) {
                let rect = document.getElementById(elementID[i]).getBoundingClientRect();
                let toMagnetize = cursorX >= rect.left && cursorX <= rect.right && cursorY >= rect.top && cursorY <= rect.bottom;
                if (toMagnetize) {
                    activeID = elementID[i];
                    break;
                } else {
                    toMagnetize = false;
                }
            }
        }
        for (let i = 0; i < elementID.length; i++) {
            if (elementID[i] == activeID) {
                let gbcl = document.getElementById(activeID).getBoundingClientRect();
                let xAxis = cursorX - gbcl.left;
                let yAxis = cursorY - gbcl.top;
                document.getElementById(activeID).style.transform = `translateX(${xAxis * treble}px) translateY(${yAxis * treble}px)`;
                break;
            }
        }
        if (document.getElementById(activeID)) {
            crsrStyle.transform = `scale(${magneticSize})`;
        } else {
            crsrStyle.transform = "scale(1)";
        }
    }
}

module.exports = customCursor