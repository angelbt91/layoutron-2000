let canvas;

document.addEventListener('DOMContentLoaded', () => {
    canvas = new fabric.Canvas('c', {
        backgroundColor: 'rgb(100,100,200)'
    });

    canvas.setZoom(canvas.getZoom() * 0.5);

    fabric.Image.fromURL('assets/layout-base-1.png', function (img) {
        img.set('selectable', false)
        canvas.add(img);
        canvas.sendToBack(img);
    });
});

function updateImg1() {
    var img = new Image();
    img.crossOrigin = "anonymous"; // needed to avoid CORS security block on export
    img.src = document.getElementById("img1").value;

    var imgInstance = new fabric.Image(img, {
        left: 219,
        top: 480
    });
    imgInstance.scaleToWidth(251);

    imgInstance.clipPath = new fabric.Rect({
        left: 219,
        top: 480,
        width: 251,
        height: 280,
        fill: 'transparent',
        selectable: false,
        absolutePositioned: true
    });

    canvas.add(imgInstance);
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





