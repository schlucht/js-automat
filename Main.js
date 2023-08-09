

class FadenKreuz {
    constructor() {
        this.fkX = document.createElementNS(SVG, 'line');
        this.fkY = document.createElementNS(SVG, 'line');
        this.fkX.setAttributeNS(null, 'stroke', CURSOR_STROKE);
        this.fkX.setAttributeNS(null, 'stroke-width', CURSOR_WIDTH);
        this.fkY.setAttributeNS(null, 'stroke', CURSOR_STROKE);
        this.fkY.setAttributeNS(null, 'stroke-width', CURSOR_WIDTH);
        this.fkX.setAttributeNS(null, 'y1', main.layerObj.pageHeight);
        this.fkX.setAttributeNS(null, 'y2', 0);
        this.fkY.setAttributeNS(null, 'x1', main.layerObj.pageWidth);
        this.fkY.setAttributeNS(null, 'x2', 0);
        this.visible = false;
        this.InsertObject(0, 0);
    }

    InsertObject(mx, my) {
        if (!this.visible) {
            main.layerObj.GetLayer().appendChild(this.fkX);
            main.layerObj.GetLayer().appendChild(this.fkY);
            this.visible = true;
            this.MoveTo(0,0);
        }
    }

    MoveTo(mx, my) {
        this.fkX.setAttributeNS(null, 'x1', mx)
        this.fkX.setAttributeNS(null, 'x2', mx)
        this.fkY.setAttributeNS(null, 'y1', my)
        this.fkY.setAttributeNS(null, 'y2', my)
    }

    Get_FK_X() {
        return parseInt(this.fkX.getAttributeNS(null, 'x1'));
    }

    Get_FK_Y() {
        return parseInt(this.fkY.getAttributeNS(null, 'y1'));
    }

    DeleteObject(instance) {
        if(this.visible) {
            instance.layerObj.GetLayer().removeChild(this.fkX);
            instance.layerObj.GetLayer().removeChild(this.fkY);
            this.visible = false;
        }
        return instance;
    }
}

class FrameCatch {
    constructor() {
        this.frameCatch = document.createElementNS(SVG, 'rect');
        this.visible = false;
        this.catchActive = false;
        this.posX = 0;
        this.posY = 0;
    }

    InsertObject(instance, mx, my) {
        if (!this.visible) {
            instance.layerObj.GetLayer().appendChild(this.frameCatch);
            this.frameCatch.setAttributeNS(null, 'width', MIN_RECT);
            this.frameCatch.setAttributeNS(null, 'height', MIN_RECT);
            this.frameCatch.setAttributeNS(null, 'stroke', 'gray');
            this.frameCatch.setAttributeNS(null, 'stroke-width', CURSOR_WIDTH);
            this.frameCatch.setAttributeNS(null, 'stroke-dasharray', '5,4');
            this.frameCatch.setAttributeNS(null, 'stroke-opacity', 0.8);
            this.frameCatch.setAttributeNS(null, 'fill', 'transparent');
            this.posX = mx;
            this.posY = my;
            this.dx = MIN_RECT;
            this.dy = this.dx;
            this.visible = true;
            this.MoveTo(mx, my);
        }
        return instance;
    }

    MoveTo(mx, my) {
        this.frameCatch.setAttributeNS(null, 'x', mx);
        this.frameCatch.setAttributeNS(null, 'y', my);
    }

    ZoomTo(mx, my) {
        if (this.visible) {
            this.dx = mx - this.posX;
            this.dy = my - this.posY;
            if(this.dx < MIN_RECT) this.dx = MIN_RECT;
            if(this.dy < MIN_RECT) this.dy = MIN_RECT;
            this.frameCatch.setAttributeNS(null, 'width', this.dx);
            this.frameCatch.setAttributeNS(null, 'height', this.dy);
        }
    }

    DeleteObject(instance) {
        if (this.visible) {
            instance.layerObj.GetLayer().removeChild(this.frameCatch);
            this.visible = false;
        }
        return instance;
    }
}

class Main extends JS {
    constructor(projectPath) {
        super(projectPath);
        this.svgElement = [];        
        this.svgElementCopy = [];
        this.inputStrGlobal ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_@.;,{} +-*/<>!?%&|^°=:[]()'";
        this.keyCode = 0;
        this.lastClickToElement = NO_ELEMENT_SELECTED;
        this.flagMove = false;
        this.zoomSize = false;
        this.rotateObject = false;
        this.runTest = false;
        this.keyCodeNull = false;
    }

    MouseEvent(eventType, mX, mY, dblClick, main) {
        switch (eventType) {
            case 'mousedown':                
                main.frameCatch.InsertObject(main, mX, mY).cursor.DeleteObject(main);
                break;
            case 'mouseup':
                main.frameCatch.DeleteObject(main).cursor.InsertObject(main, mX, mY);
                break;
            case 'mousemove':
                main.cursor.MoveTo(mX, mY);
                main.frameCatch.ZoomTo(mX, mY);
                break;
        }
    }

    KeyEvent(eventType, event, main) {

    }
}

var main = new Main('./Project');
main.InitEvents(main, main.MouseEvent, main.KeyEvent);
main.cursor = new FadenKreuz(main);
main.SetCursor('none');
main.frameCatch = new FrameCatch(main);