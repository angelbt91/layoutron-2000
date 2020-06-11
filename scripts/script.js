let canvas;

document.addEventListener('DOMContentLoaded', () => {
    canvas = new fabric.Canvas('c', {
        backgroundColor: 'rgb(100,100,200)'
    });

    canvas.setZoom(canvas.getZoom() * 0.5);

    fabric.Image.fromURL('assets/layout-base-1.png', function (oImg) {
        oImg.set('selectable', false)
        canvas.add(oImg);
        canvas.sendToBack(oImg);
    });


});

function updateImg1() {
    let imgSrc = document.getElementById("img1").value;

    fabric.Image.fromURL(imgSrc, function (oImg) {
        oImg.set({
            left: 220,
            top: 480
        });
        oImg.scaleToHeight(250);

        oImg.clipPath = new fabric.Rect({
            left: 220,
            top: 480,
            width: 250,
            height: 280,
            fill: 'transparent',
            selectable: false,
            absolutePositioned: true
        });

        canvas.add(oImg);
    });
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





