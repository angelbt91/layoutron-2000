const image1data = {
    originalCoords: {
        'top': 480,
        'left': 219,
        'currentWidth': 251
    },
    clipPath: new fabric.Rect({
        top: 480,
        left: 219,
        width: 251,
        height: 280,
        fill: 'transparent',
        selectable: false,
        absolutePositioned: true
    }),
    previewBoxSelector: "img1preview",
    toolBoxSelector: "img1tools",
    uploadButtonSelector: "img1fileUploadBtn"
};

const image2data = {
    originalCoords: {
        'top': 481,
        'left': 728,
        'currentWidth': 256
    },
    clipPath: new fabric.Rect({
        'top': 480,
        'left': 727,
        'width': 256,
        'height': 281,
        'fill': 'transparent',
        'selectable': false,
        'absolutePositioned': true
    }),
    previewBoxSelector: "img2preview",
    toolBoxSelector: "img2tools",
    uploadButtonSelector: "img2fileUploadBtn",
    background: new fabric.Rect({
        'top': 480,
        'left': 727,
        'width': 256,
        'height': 281,
        'fill': document.getElementById('bgcolor').value,
        'selectable': false
    }),
    frame: undefined
};