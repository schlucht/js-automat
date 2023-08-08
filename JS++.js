const SCROLL_BAR_HEIGHT = 26;
const SCROLL_BAR_WIDTH = 26;
const SVG = 'http://www.w3.org/2000/svg';
const LAYER_FRAME = "red";
const LAYER_BACK_GROUND = 'lightblue';
const LAYER_STROKE = 'black';
const CURSOR_FORM = 'pointer';
const CURSOR_STROKE = 'black';
const CURSOR_WIDTH = 'black';
const DOUBLE_CLICK_TIME = 5;
const DOUBLE_CLICK = 2;
const MIN_RECT = 2;
const NO_ELEMENT_SELECTED = 0;



class RunTime {
    constructor(){}
}


class IoRequest extends RunTime {
    constructor(projectPath){
        super();
    }
    InitEvents(main, cbM, cbK) {
        this.events = new Event(main, cbM, cbK);
    }
}

class JS extends IoRequest {
    constructor(projectPath) {
        super(projectPath);
        this.layerObj = new InitLayer();
    }
    GetLayer() { return this.layerObj.GetLayer();}
    SetCursor(cType) {this.layerObj.SetCursor(cType);}
}

class InitLayer {
    constructor() {
        this.pageHeight = parseInt(window.innerHeight) - SCROLL_BAR_HEIGHT;
        this.pageWidth = parseInt(window.innerWidth) - SCROLL_BAR_WIDTH;
        this.svg = document.createElementNS(SVG, 'svg');
        this.svg.setAttributeNS(null, 'width', this.pageWidth);
        this.svg.setAttributeNS(null, 'height', this.pageHeight);
        document.body.appendChild(this.svg);
        this.fBox = document.createElementNS(SVG, 'rect');
        this.fBox.setAttributeNS(null, 'stroke', LAYER_FRAME);
        this.fBox.setAttributeNS(null, 'stroke-width', 2);
        this.fBox.setAttributeNS(null, 'fill', LAYER_BACK_GROUND);
        this.SetFrameBox();
        this.svg.appendChild(this.fBox);
        this.SetCursor(CURSOR_FORM);
    }
    GetLayer() { return this.svg; }
    SetCursor(Type) {
        if (Type !== undefined) {
            document.body.style.cursor = Type;
        }
    }
    SetFrameBox() {
        this.fBox.setAttributeNS(null, 'x', 0);
        this.fBox.setAttributeNS(null, 'y', 0);
        this.fBox.setAttributeNS(null, 'width', this.pageWidth);
        this.fBox.setAttributeNS(null, 'height', this.pageHeight);
    }
}

class Event {
    constructor(main, cbM, cbK) {
        this.click = 0;
        let time = DOUBLE_CLICK_TIME;
        window.addEventListener('mousedown', (event) => {
            if (main.wait) {
                event.preventDefault();
                return;
            }
            cbM(event.type, event.offsetX, event.offsetY, (++this.click > DOUBLE_CLICK) ? true : false, main);
            event.preventDefault();
            setTimeout(() => {
                this.click = 0;
            }, DOUBLE_CLICK_TIME);
        });
        window.addEventListener('mouseup', (event) => {
            cbM(event.type, event.offsetX, event.offsetY, false, main);
            event.preventDefault();
        });
        window.addEventListener('mousemove', (event) => {
            if( main.wait ) {
                event.preventDefault();
                return;
            }
            cbM(event.type, event.offsetX, event.offsetY, false, main);
            event.preventDefault();
        });
        window.addEventListener('keypress', (event) => {
            if (cbK('keypress', event, main)) {
                event.preventDefault();
            }
        });
        window.addEventListener('keyup', (event) => {
            if (cbK('keyup', event, main)) {
                event.preventDefault();
            }
        });

    }
}

