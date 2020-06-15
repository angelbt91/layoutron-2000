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

function checkFileExtension(url) {
    return (url.match(/.(jpeg|jpg|gif|png)/i) != null);
}

function updateImg1(origin) {
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
        document.getElementById('img1preview').src = img.src;
        document.getElementById('img1tools').classList.remove("d-none");
        $('#img1modal').modal('hide');
    }

    switch (origin) {
        case 'pc':
            let route = document.getElementById('uploadImg1btn').files[0];
            if (!checkFileExtension(route.name)) {
                return alert("Error: that doesn't look like an image. Please import a JPG, GIF or PNG.");
            }

            let reader = new FileReader();
            reader.onload = function (event) {
                img.src = event.target.result;
            }

            reader.readAsDataURL(route);
            break;
        case 'url':
            let url = document.getElementById("img1").value;
            if (!checkFileExtension(url)) {
                return alert("Error: that doesn't look like an image. Please import a JPG, GIF or PNG.");
            }
            img.src = url;
            break;
        default:
            console.log("Can't recognize where the image comes from.")
            break;
    }
}

function resetImg1() {
    // we have to set and render the angle to 0 before the rest of the properties
    // in order to get the correct output
    img1.set('angle', 0);
    img1.setCoords();
    canvas.renderAll();

    img1.set(img1originalCoords);
    img1.scaleToWidth(img1originalCoords.currentWidth, img1originalCoords.currentWidth);
    img1.setCoords();
    canvas.renderAll();
}

function deleteImg1() {
    canvas.remove(img1);
    document.getElementById('img1preview').src = "";
    document.getElementById('img1tools').classList.add("d-none");
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





