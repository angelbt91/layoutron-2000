let canvas;
let imgToUpdate;
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

function checkIfFileIsImage(url) {
    return (url.match(/.(jpeg|jpg|gif|png)/i) != null);
}

function setImageToUpdate(num) {
    // upon opening an URL/upload modal, we set the image number here
    // so further functions know which image we were updating
    return imgToUpdate = num;
}

function assignNewImageToGlobalVariableImage(imgX) {
    switch(imgToUpdate) {
        case 1:
            img1 = imgX;
            break;
    }
}

function setXvalues(number) {
    switch (number) {
        case 1:
            return {
                'imgX': img1,
                'imgXoriginalCoords': img1originalCoords,
                'imgXclip': img1clip,
                'imgXpreviewSelector': 'img1preview',
                'imgXtoolsSelector': 'img1tools',
                'imgXuploadBtnSelector': 'img1fileUploadBtn'
            }
    }
}

function updateImg(origin) {
    let {imgX, imgXoriginalCoords, imgXclip, imgXpreviewSelector, imgXtoolsSelector, imgXuploadBtnSelector} = setXvalues(imgToUpdate);

    let img = new Image();
    img.crossOrigin = "anonymous"; // needed to avoid CORS security block on export

    img.onload = function () {
        let newImgCoords;

        // if there is an image already, we keep its coords before deleting it
        if (imgX !== undefined) {
            newImgCoords = {
                'top': imgX.top,
                'left': imgX.left,
                'currentWidth': imgX.width * imgX.scaleX,
                'angle': imgX.angle
            };
            canvas.remove(imgX);
        } else {
            newImgCoords = imgXoriginalCoords;
        }

        imgX = new fabric.Image(img, newImgCoords);
        imgX.scaleToWidth(newImgCoords.currentWidth);
        imgX.clipPath = imgXclip;
        canvas.add(imgX);
        assignNewImageToGlobalVariableImage(imgX); // save imgX into the corresponding global variable

        document.getElementById(imgXpreviewSelector).src = img.src;
        document.getElementById(imgXtoolsSelector).classList.remove("d-none");
        $('#img-modal').modal('hide');
    }

    switch (origin) {
        case 'pc':
            let route = document.getElementById(imgXuploadBtnSelector).files[0];
            if (!checkIfFileIsImage(route.name)) {
                return alert("Error: that doesn't look like an image. Please import a JPG, GIF or PNG.");
            }

            let reader = new FileReader();
            reader.onload = function (event) {
                img.src = event.target.result;
            }
            reader.readAsDataURL(route);
            break;

        case 'url':
            let url = document.getElementById("imgUrlInput").value;
            if (!checkIfFileIsImage(url)) {
                return alert("Error: that doesn't look like an image. Please import a JPG, GIF or PNG.");
            }
            img.src = url;
            break;

        default:
            console.log("Can't recognize where the image comes from.")
            break;
    }
}

function resetImg(num) {
    let img, imgOriginalCoords;
    switch (num) {
        case(1):
            img = img1;
            imgOriginalCoords = img1originalCoords;
            break;
    }

    // we have to set and render the angle to 0 before the rest of the properties
    // in order to get the correct output
    img.set('angle', 0);
    img.setCoords();
    canvas.renderAll();

    img.set(imgOriginalCoords);
    img.scaleToWidth(imgOriginalCoords.currentWidth, imgOriginalCoords.currentWidth);
    img.setCoords();
    canvas.renderAll();
}

function deleteImg(num) {
    // we need to remove the image, the preview image and the tools
    // we use the switch case to dynamically determine which ones to remove
    let img, imgPreview, imgTools;
    switch (num) {
        case(1):
            img = img1;
            imgPreview = 'img1preview';
            imgTools = 'img1tools';
            break;
    }
    canvas.remove(img);
    document.getElementById(imgPreview).src = "";
    document.getElementById(imgTools).classList.add("d-none");
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





