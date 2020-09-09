class Layout {
    constructor(layoutProperties) {
        const {originalCoords, clipPath, previewBoxSelector, toolBoxSelector, uploadButtonSelector, background, frame} = layoutProperties;

        this.layout = undefined;
        this.originalCoords = originalCoords;
        this.clipPath = clipPath;
        this.previewBoxSelector = previewBoxSelector;
        this.toolBoxSelector = toolBoxSelector;
        this.uploadButtonSelector = uploadButtonSelector;
        this.background = background ? background : undefined;
        this.frame = frame ? frame : undefined;
    }

    updateLayoutImage(imageSource) {
        let newImage = new Image();
        newImage.crossOrigin = "anonymous"; // needed to avoid CORS security block on export

        newImage.onload = () => {
            let newLayoutCoords;

            if (this.layout !== undefined) {
                newLayoutCoords = this.getCurrentLayoutCoords();
                canvas.remove(this.layout);
            } else {
                newLayoutCoords = this.originalCoords;
            }

            let newLayout = new fabric.Image(newImage, newLayoutCoords);
            newLayout.scaleToWidth(newLayoutCoords.currentWidth);
            newLayout.clipPath = this.clipPath;
            canvas.add(newLayout);

            this.layout = newLayout;

            document.getElementById(this.previewBoxSelector).src = newImage.src;
            document.getElementById(this.toolBoxSelector).classList.remove("d-none");
            $('#img-modal').modal('hide');
        }

        switch (imageSource) {
            case "pc":
                let file = document.getElementById(this.uploadButtonSelector).files[0];
                if (!this.fileIsValidImage(file.name)) {
                    alert("Error: that doesn't look like an image. Please import a JPG, GIF or PNG.");
                    return;
                }

                let reader = new FileReader();
                reader.onload = function (event) {
                    newImage.src = event.target.result;
                }
                reader.readAsDataURL(file);
                break;
            case "url":
                let url = document.getElementById("imgUrlInput").value;
                if (!this.fileIsValidImage(url)) {
                    alert("Error: that doesn't look like an image. Please import a JPG, GIF or PNG.");
                    return;
                }

                newImage.src = url;
                break;
            default:
                console.log("Can't recognize where the image comes from.");
                break;
        }
    }

    getCurrentLayoutCoords() {
        return {
            'top': this.layout.top,
            'left': this.layout.left,
            'currentWidth': this.layout.width * this.layout.scaleX,
            'angle': this.layout.angle
        };
    }

    resetLayout() {
        // in order to get the correct output,
        // we have to set and render the angle to 0 before the rest of the properties
        this.layout.set('angle', 0);
        this.layout.setCoords();
        canvas.renderAll();

        this.layout.set(this.originalCoords);
        this.layout.scaleToWidth(this.originalCoords.currentWidth, this.originalCoords.currentWidth);
        this.layout.setCoords();
        canvas.renderAll();
    }

    deleteLayout() {
        // we need to remove the image, the preview image and the tools
        canvas.remove(this.layout);
        document.getElementById(this.previewBoxSelector).src = "";
        document.getElementById(this.toolBoxSelector).classList.add("d-none");
    }

    fileIsValidImage(url) {
        return (url.match(/.(jpeg|jpg|gif|png)/i) !== null);
    }

    updateBgColor(color) {
        this.background.set({fill: color});
        document.getElementById('bgcolor').value = color;
        canvas.renderAll();
    }

    updateFrame(frame) {
        console.log("Frame escogido:", frame);
        console.log("Frame actual:", this.frame);
    }
}