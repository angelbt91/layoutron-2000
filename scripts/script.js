let canvas;
let img1;

document.addEventListener('DOMContentLoaded', () => {
    canvas = new fabric.Canvas('c');
    canvas.setZoom(canvas.getZoom() * 0.5);
    canvas.setBackgroundImage('assets/layout-base-1.png', canvas.renderAll.bind(canvas));
});

function updateImg1() {
    let img1status;
    if (img1 !== undefined) {
        img1status = {
            'top': img1.top,
            'left': img1.left,
            'height': img1.height,
            'width': img1.width,
            'angle': img1.angle
        }
        console.log(img1status);
        canvas.remove(img1);
    }

    let img = new Image();
    img.crossOrigin = "anonymous"; // needed to avoid CORS security block on export
    img.onload = function () {
        if (img1status !== undefined) {
            img1 = new fabric.Image(img, img1status);
        } else {
            img1 = new fabric.Image(img, {
                left: 219,
                top: 480
            });
            img1.scaleToWidth(251);
        }

        img1.clipPath = new fabric.Rect({
            left: 219,
            top: 480,
            width: 251,
            height: 280,
            fill: 'transparent',
            selectable: false,
            absolutePositioned: true
        });

        canvas.add(img1);
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





