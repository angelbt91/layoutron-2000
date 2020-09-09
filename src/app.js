let canvas, layoutToUpdate, image1, image2;
document.addEventListener('DOMContentLoaded', initializeApp());

function initializeApp() {
    image1 = new Layout(image1data);
    image2 = new Layout(image2data);

    canvas = new fabric.Canvas('c');
    canvas.setZoom(canvas.getZoom() * 0.5);
    canvas.setBackgroundImage('assets/layout-base-1.png', canvas.renderAll.bind(canvas));
    canvas.add(image2.background);
    fabric.Image.fromURL('assets/Frame_Tech.png', function (frame) {
        image2.frame = frame;
        image2.frame.set({
            'top': 480,
            'left': 727,
            'selectable': false
        })
        image2.frame.scaleToWidth(image2.originalCoords.currentWidth);
        canvas.add(frame);
    });
}

function setImageToUpdate(layoutNumber) {
    // upon opening an URL upload modal, we set the layout to update number here
    // so updateLayoutImage() can know which layout we want to update
    // can't be a parameter on updateLayoutImage because
    // in the HTML we use the same URL upload modal for all images
    return layoutToUpdate = layoutNumber;
}

function updateLayoutImage(imageSource) {
    let elementToUpdate;

    switch (layoutToUpdate) {
        case 1:
            elementToUpdate = image1;
            break;
        case 2:
            elementToUpdate = image2;
            break;
        default:
            return;
    }

    elementToUpdate.updateLayoutImage(imageSource);
}

function resetLayout(layoutNumber) {
    let elementToReset;

    switch (layoutNumber) {
        case 1:
            elementToReset = image1;
            break;
        case 2:
            elementToReset = image2;
            break;
        default:
            return;
    }

    elementToReset.resetLayout();
}

function deleteLayout(layoutNumber) {
    let elementToDelete;

    switch (layoutNumber) {
        case 1:
            elementToDelete = image1;
            break;
        case 2:
            elementToDelete = image2;
            break;
        default:
            return;
    }

    elementToDelete.deleteLayout();
}

function updateBgColor(color) {
    image2.updateBgColor(color); // TODO create new rules when there are more bgs
}

function updateFrame(frame) {
    image2.updateFrame(frame); // TODO create new rules when there are more bgs
}

function exportImage() {
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