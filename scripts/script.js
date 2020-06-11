let canvas;

document.addEventListener('DOMContentLoaded', (event) => {
    canvas = new fabric.Canvas('c', {
        backgroundColor: 'rgb(100,100,200)'
    });

    canvas.setZoom(canvas.getZoom() * 0.5);

    fabric.Image.fromURL('assets/layout-base-1.png', function (oImg) {
        canvas.add(oImg);
    });
});

function updateImg1() {
    let img = document.getElementById("img1").value;
    fabric.Image.fromURL(img, function (oImg) {
        oImg.scaleToHeight(250);
        oImg.scaleToWidth(250);
        oImg.top = 480;
        oImg.left = 220;
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





