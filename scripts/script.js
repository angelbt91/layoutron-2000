let canvas;
let img1;
let img1originalCoords = {
    'top': 480,
    'left': 219,
    'currentWidth': 251
};
let img1clip = new fabric.Rect({
    left: 219,
    top: 480,
    width: 251,
    height: 280,
    fill: 'transparent',
    selectable: false,
    absolutePositioned: true
});

document.addEventListener('DOMContentLoaded', () => {
    canvas = new fabric.Canvas('c');
    canvas.setZoom(canvas.getZoom() * 0.5);
    canvas.setBackgroundImage('assets/layout-base-1.png', canvas.renderAll.bind(canvas));
});

function updateImg1() {
    let img = new Image();
    img.crossOrigin = "anonymous"; // needed to avoid CORS security block on export

    img.onload = function () {
        let imgCoords = (img1 !== undefined) ? {
            'top': img1.top,
            'left': img1.left,
            'currentWidth': img1.width * img1.scaleX,
            'angle': img1.angle
        } : img1originalCoords;

        if (img1 !== undefined) {
            canvas.remove(img1);
        }

        img1 = new fabric.Image(img, imgCoords);
        img1.scaleToWidth(imgCoords.currentWidth);
        img1.clipPath = img1clip;
        canvas.add(img1);
        $('#img1modal').modal('hide');
    }

    img.src = document.getElementById("img1").value;
}

function updateImg2() {
    console.log("Update image 2");
}

function updateImg3() {
    console.log("Update image 3");
}

function exportImg() {
    let transform = canvas.viewportTransform.slice();

    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];

    let dataURL = canvas.toDataURL({
        width: canvas.width * 2,
        height: canvas.height * 2,
        left: 0,
        top: 0,
        format: 'png',
    });

    canvas.viewportTransform = transform;

    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}





