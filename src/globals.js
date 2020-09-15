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

const image3data = {
    originalCoords: {
        'top': 470,
        'left': 1090,
        'currentWidth': 130
    },
    clipPath: new fabric.Rect({
        'top': 470,
        'left': 1090,
        'width': 130,
        'height': 281,
        'fill': 'transparent',
        'selectable': false,
        'absolutePositioned': true
    }),
    previewBoxSelector: "img3preview",
    toolBoxSelector: "img3tools",
    uploadButtonSelector: "img3fileUploadBtn"
};

const image4data = {
    originalCoords: {
        'top': 470,
        'left': 1228,
        'currentWidth': 96
    },
    clipPath: new fabric.Rect({
        'top': 470,
        'left': 1228,
        'width': 96,
        'height': 147,
        'fill': 'transparent',
        'selectable': false,
        'absolutePositioned': true
    }),
    previewBoxSelector: "img4preview",
    toolBoxSelector: "img4tools",
    uploadButtonSelector: "img4fileUploadBtn"
};

const image5data = {
    originalCoords: {
        'top': 623,
        'left': 1228,
        'currentWidth': 96
    },
    clipPath: new fabric.Rect({
        'top': 623,
        'left': 1228,
        'width': 96,
        'height': 126,
        'fill': 'transparent',
        'selectable': false,
        'absolutePositioned': true
    }),
    previewBoxSelector: "img5preview",
    toolBoxSelector: "img5tools",
    uploadButtonSelector: "img5fileUploadBtn"
};


const frames = [{
    name: 'None',
    asset: null,
    coords: null
}, {
    name: 'Tech',
    asset: './assets/Frame_Tech.png',
    coords: {
        'top': 480,
        'left': 727,
        'scaleX': 256 / 1152, // frame width / image real width
        'scaleY': 281 / 1156 // frame height / image real height
    }
}];