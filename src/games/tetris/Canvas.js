import Utils from "./Utils";

/**
 * 俄罗斯方块所在画布类
 *
 * @author leeyee
 * @blog blog.csdn.net/oxcow
 * @email seadlead@gmail.com
 * @data 2010-4
 * @param iRow
 *            画布行数
 * @param iColumn
 *            画布列数
 * @param sOffset
 *            画布显示位置
 */
class Canvas {
  constructor(iRow, iColumn, sOffset) {
    this.row = iRow;// 行
    this.column = iColumn;// 列
    this.offset = sOffset;// 显示位置
  }

  draw() {
    let oDiv_canvas = document.getElementById(this.offset);
    if (oDiv_canvas == null) {
      oDiv_canvas = Utils.CreateElement('div', this.offset, null);
      document.body.appendChild(oDiv_canvas);
    }
    const oFragment = document.createDocumentFragment();// 创建文档碎片
    for (let i = 1; i <= this.row * this.column; i++) {
      const oSpan = Utils.CreateElement('span', i, null);
      oFragment.appendChild(oSpan);
    }
    oDiv_canvas.appendChild(oFragment);
  }

  erase () {
    let oDiv_canvas = document.getElementById(this.offset);
    if(oDiv_canvas){
      while (oDiv_canvas.firstChild) {
        oDiv_canvas.removeChild(oDiv_canvas.firstChild);
      }
    }
  }
}

/**
 * 预览画布类
 *
 * @param iRow
 *            行数
 * @param iColumn
 *            列数
 * @param sOffset
 *            显示位置
 * @return
 */
class PreCanvas {
  constructor(iRow, iColumn, sOffset) {
    this.row = iRow;
    this.column = iColumn;
    this.offset = sOffset;
  }

  draw() {
    let oDiv_preCanvas = document.getElementById(this.offset);
    if (oDiv_preCanvas == null) {
      oDiv_preCanvas = Utils.CreateElement('div', this.offset, null);
      document.body.appendChild(oDiv_preCanvas);
    }
    const oFragment = document.createDocumentFragment();// 创建文档碎片
    for (let i = -(this.row * this.column) + 11; i < 11; i++) {
      let oSpan = Utils.CreateElement('span', `pre_${i}`, null);
      oFragment.appendChild(oSpan);
    }
    oDiv_preCanvas.appendChild(oFragment);
  }

  show(oArray) {
    for (let i = -(this.row * this.column) + 11; i < 11; i++) {
      const oE = document.getElementById(`pre_${i}`);
      if (oE) {
        oE.style.background = document.getElementById(this.offset).style.background;
      }
    }
    for (let i of oArray) {
      const oE = document.getElementById(`pre_${i}`);
      if (oE) {
        oE.style.background = 'gray';
      }
    }
  }

  erase () {
    let oDiv_preCanvas = document.getElementById(this.offset)
    if (oDiv_preCanvas) {
      while (oDiv_preCanvas.firstChild) {
        oDiv_preCanvas.removeChild(oDiv_preCanvas.firstChild);
      }
    }
  }
}

export { Canvas, PreCanvas }