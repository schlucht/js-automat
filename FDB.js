'use strict'

const SVG = 'http://www.w3.org/2000/svg';

class FDB {
    constructor(){}
    GetClass(scriptName) {
        try {
            return eval(scriptName).toString();
        } catch {
            return '';
        }
    }
}
module.exports = FDB;

class Rect {
    constructor(parameter) {
        this.layer = parameter.layer;
        this.svgArray = parameter.svgArray;
        this.group = false;
        this.deltaX = 0;
        this.deltaY = 0
        this.zoom = false;
        this.datas = {
            'x': (parameter.x === undefined) ? 0 : parameter.x,
            'y': (parameter.x === undefined) ? 0 : parameter.y,
            'dx': (parameter.x === undefined) ? 0 : parameter.dx,
            'dy': (parameter.x === undefined) ? 0 : parameter.dy,
            'stroke': (parameter.color === undefined) ? 'black' : parameter.color,
            'strokeWidth': 1,
            'strokeOpacity': 1.0,
            'fill': (parameter.bgColor === undefined) ? 'black' : parameter.bgColor,
            'fillOpacity': 1.0,
            'visible': true,
            'type': 'Rect',
            'layer': 1,
            'rx': 0,
            'ry': 0
        };
        this.doc = document.createElementNS(SVG, 'rect');
        this.Set_Attribute();
        this.layer.appendChild(this.doc);
    }
    DeleteObject() {
        if(this.datas.visible) {
            this.layer.removeChild(this.doc);
            this.datas.visible = false;
        }
    }
    InsertObject() {
        if(!this.datas.visible) {
            this.layer.appendChild(this.doc);
            this.datas.visible = true;
        }
    }
    Set_Attribute() {
        this.doc.setAttributeNS(null, 'y', this.datas.y);
        this.doc.setAttributeNS(null, 'x', this.datas.x);
        this.doc.setAttributeNS(null, 'width', (this.datas.dx < 0) ? 1 : this.datas.dx);
        this.doc.setAttributeNS(null, 'width', (this.datas.dy < 0) ? 1 : this.datas.dy);
        this.doc.setAttributeNS(null, 'stroke', this.datas.stroke);
        this.doc.setAttributeNS(null, 'stroke-width', this.datas.strokeWidth);
        this.doc.setAttributeNS(null, 'stroke-opacity', this.datas.strokeOpacity);
        this.doc.setAttributeNS(null, 'stroke-linecap', 'square');
        this.doc.setAttributeNS(null, 'fill', this.datas.fill);
        this.doc.setAttributeNS(null, 'rx', this.datas.rx);
        this.doc.setAttributeNS(null, 'ry', this.datas.ry);
    }

    Set_Delta(mx, my) {
        this.deltaX = this.datas.x - mx;
        this.deltaY = this.datas.y - my;
    }

    SelectObject(mx, my) {
        if(
            this.datas.visible
            &&
            (mx >= this.datas.x)
            &&
            (mx <= this.datas.x + this.datas.dx)
            &&
            (my >= this.datas.y)
            &&
            (my <= this.datas.y + this.datas.dy)
        ) {
            this.Set_Delta(mx, my);
            return true;
        }
        return false;
    }

    MoveTo(mx, my) {
        this.datas.x = mx + this.deltaX;
        this.datas.y = mx + this.deltaY;
        this.Set_Attribute();
        return this;
    }
}