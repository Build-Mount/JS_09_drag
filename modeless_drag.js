/** modeless用の設定 */
document.getElementById("showTop").addEventListener("click", () => {
    showWindow("topDiv");
});

document.getElementById("closeTop").addEventListener("click", () => {
    closeWindow("topDiv");
});

function showWindow(divId) {
    document.getElementById(divId).style.visibility = "visible";
}

function closeWindow(divId) {
    document.getElementById(divId).style.visibility = "hidden";
}

/** ドラッグ＆ドロップで移動する設定*/
var elemId;             //ドラッグした要素のId
var elemOffsetX;        //ドラッグした要素のoffsetX
var elemOffsetY;        //ドラッグした要素のoffsetY

//"topDiv"にマウスダウン、マウスアップ時のEventLisnterを追加。
document.getElementById("topDiv").addEventListener("mousedown", funcMouseDown);
document.getElementById("topDiv").addEventListener("mouseup", funcMouseUp);

/**
 * マウスで要素をマウスダウンした時に、
 * - その座標の保存。
 * - ドラッグによる移動時のEventListnerを追加。
 * - ドラッグしながらマウスポインタが画面外移動時のEventListenerを追加。
 * 
 * @param {object} event コールバック関数は発生したイベントを説明するEventに基づくオブジェクト。
 */
function funcMouseDown(event) {
    getElemOffset(event);
    document.getElementById(elemId).addEventListener("mousemove", dragWindow);
    document.body.addEventListener("mouseleave", cancelDragWindow);
}

/**
 * マウスで要素をマウスアップした時に、
 * - ドラッグによる移動時のEventListenerを削除。
 * 
 * @param {object} event コールバック関数は発生したイベントを説明するEventに基づくオブジェクト。
 */
function funcMouseUp(event) {
    document.getElementById(elemId).removeEventListener("mousemove", dragWindow);
    document.body.removeEventListener("mouseleave", cancelDragWindow);
}

/**
 * 要素のオフセット(offsetX、offsetY)、およびその要素のIdを保存。
 * 
 * @param {object} event コールバック関数は発生したイベントを説明するEventに基づくオブジェクト。
 */
function getElemOffset(event) {
    elemOffsetX = event.offsetX;
    elemOffsetY = event.offsetY;
    elemId = event.target.id;
}

/**
 * マウスで要素をドラッグ時に、ドラッグした要素を移動。
 * 
 * @param {object} event コールバック関数は発生したイベントを説明するEventに基づくオブジェクト。
 */
function dragWindow(event) {
    document.getElementById(elemId).style.left = event.pageX - elemOffsetX + "px";
    document.getElementById(elemId).style.top = event.pageY - elemOffsetY + "px";
}

/**
 * bodyからマウス移動時のdragWindowのEventListenerを削除。
 * 
 * @param {object} event コールバック関数は発生したイベントを説明するEventに基づくオブジェクト。
 */
function cancelDragWindow(event) {
    document.getElementById(elemId).removeEventListener("mousemove", dragWindow);
    document.body.removeEventListener("mouseleave", cancelDragWindow);
}