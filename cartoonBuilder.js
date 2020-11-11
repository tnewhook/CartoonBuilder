var canvasCounter = 0;
var currentCanvas = 0;
var cartoonStrip = []; //array of canvas objects
//toolbar element object
var toolbar = {
    text: {
        name: "text",
        action: "modifyCanvas",
        altText: "add some text"

    },
    image: {
        name: "image",
        action: "modifyCanvas",
        altText: "add a background image"
    },
    thought: {
        altText: "add a thought bubble",
        tl: {
            name: "tlThought",
            action: "modifyCanvas",
            altText: "add an thought bubble with the small bubbles toward the top left"
        },
        tr: {
            name: "trThought",
            action: "modifyCanvas",
            altText: "add an thought bubble with the small bubbles toward the top right"
        },
        bl: {
            name: "blThought",
            action: "modifyCanvas",
            altText: "add an thought bubble with the small bubbles toward the bottom left"

        },
        br: {
            name: "brThought",
            action: "modifyCanvas",
            altText: "add an thought bubble with the small bubbles toward the bottom right"

        }
    },
    speech: {
        altText: "add a speech bubble",
        tl: {
            name: "tlSpeech",
            action: "modifyCanvas",
            altText: "add a speech bubble with the arrow toward the top left"

        },
        tr: {
            name: "trSpeech",
            action: "modifyCanvas",
            altText: "add a speech bubble with the arrow toward the top right"

        },
        bl: {
            name: "blSpeech",
            action: "modifyCanvas",
            altText: "add a speech bubble with the arrow toward the bottom left"

        },
        br: {
            name: "brSpeech",
            action: "modifyCanvas",
            altText: "add a speech bubble with the arrow toward the bottom right"

        }
    },
    add: {
        name: "add",
        action: "modifyCanvas",
        altText: "add a new comic panel"
    },
    sub: {
        name: "sub",
        action: "modifyCanvas",
        altText: "remove selected comic panel"
    }
};


function buildToolbarList(toolbar) {
    /*get items from toolbar object, create wrapper, add images, add to wrapper
    add button actions to all buttons
    creates list,adds items to listText
    creates sublist items, add to sublist, add to list
    */

    var toolbarDiv, toolbarList, element, listItem, listText, listImg;
    toolbarDiv = this.document.createElement('div');
    toolbarDiv.id = "ToolbarContainer";
    toolbarDiv.className = "toolbarNavigation";
    toolbarList = this.document.createElement('UL');
    toolbarList.id = "ToolbarList";

    for (element in toolbar) {
        if (typeof (toolbar[element].name) !== "undefined") {
            listItem = document.createElement('LI');
            listText = document.createTextNode(toolbar[element].name);
            listItem.id = toolbar[element].name + "Tool";
            listImg = document.createElement('IMG');
            listImg.alt = toolbar[element].altText;
            let action = this[toolbar[element].action];
            let name = toolbar[element].name;
            listItem.addEventListener("click", function () {
                action(name);
            });
            listImg.src = 'images/' + toolbar[element].name + '.svg';
            listImg.className += ' listImg';
            listItem.appendChild(listImg);
            toolbarList.appendChild(listItem);
        } else if (typeof (toolbar[element] == 'object')) {
            var listItem = document.createElement('LI');
            listItem.id = element + "Tool";
            listImg = document.createElement('IMG');
            listImg.src = 'images/' + element + '.svg';
            listImg.className += ' listImg';
            listItem.appendChild(listImg);
            listImg.alt = toolbar[element].altText;
            var toolbarSublist = document.createElement('UL');
            toolbarSublist.id = element + "ToolbarSublist";
            toolbarSublist.className = "ToolbarSublist";
            var elementObject = toolbar[element];
            for (let aspect in elementObject) {
                let sublistItem = document.createElement('LI');
                let sublistText = document.createTextNode(elementObject[aspect].name);
                let sublistImg = document.createElement('IMG');
                sublistImg.src = 'images/' + element + '.svg';
                sublistImg.className = element + 'Img';
                sublistItem.id = elementObject[aspect].name;
                sublistImg.alt = elementObject[aspect].altText;
                if (elementObject[aspect].name && elementObject[aspect].altText) {

                    let name = elementObject[aspect].name
                    let action = window[toolbar[element][aspect].action];
                    sublistItem.addEventListener("click", function () {
                        action(name);
                    });
                }
                sublistItem.appendChild(sublistImg);
                if (typeof (elementObject[aspect].altText) == 'string') {
                    toolbarSublist.appendChild(sublistItem);
                }
                listItem.appendChild(toolbarSublist);
                toolbarList.appendChild(listItem);
            }
        }
    }
    toolbarDiv.appendChild(toolbarList);

    return toolbarDiv;
}

/*
Canvas class is prototype for canvas object. Contains functionality pointed to by toolbar items
(add, remove canvas, add speech, thought shapes, text)
*/
class Canvas {
    constructor(currentCanvas) {
        let cartoonWrapper = document.getElementById("cartoonWrapper");
        this.createCanvas(cartoonWrapper);
        let canvasInstance = this;
    }

    preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    changeCurrentCanvas(toolbar, currentCanvas) {
        var activeCanvas = document.getElementsByClassName("activeCanvas");
        while (activeCanvas.length) {
            activeCanvas[0].className = activeCanvas[0].className.replace(/\bactiveCanvas\b/g, "");
        }
        let currentCanvasWrapper = "canvasWrapper" + currentCanvas;
        document.getElementById(currentCanvasWrapper).className += " 	activeCanvas";
    }

    createCanvas(CartoonWrapper) {
        let fabricCanvas, canvasWrapper, canvasElement, currentCanvasInstance, currentCanvasID, canvasContext;
        ++canvasCounter;
        currentCanvas = canvasCounter;
        canvasWrapper = document.createElement('div');
        canvasWrapper.id = "canvasWrapper" + currentCanvas;
        canvasWrapper.className = "canvasWrapperClass";
        canvasElement = document.createElement('canvas');
        canvasElement.id = "canvasElement" + currentCanvas;
        canvasElement.className = "canvasClass";
        canvasWrapper.appendChild(canvasElement);
        fabricCanvas = new fabric.Canvas(canvasElement);
        document.getElementById("CartoonWrapper").appendChild(canvasWrapper);
        currentCanvasInstance = this;
        canvasElement.addEventListener("click", function (e) {
            currentCanvasID = e.target.id;
            currentCanvas = currentCanvasID.replace('canvasElement', '');
            currentCanvasInstance.changeCurrentCanvas(toolbar, currentCanvas);
        });
        canvasContext = this;
        canvasWrapper.addEventListener('dragenter', canvasContext.preventDefault, false);
        canvasWrapper.addEventListener('dragleave', canvasContext.preventDefault, false);
        canvasWrapper.addEventListener('dragover', canvasContext.preventDefault, false);
        canvasWrapper.addEventListener('drop', canvasContext.preventDefault, false);
        canvasWrapper.addEventListener('drop', function () {
            canvasContext.handleDrop(this.event), false;

        });

        this.changeCurrentCanvas(toolbar, currentCanvas);
    }

    removeCanvas() {
        if (currentCanvas > 0) {
            let selectedCanvas = document.getElementById("canvasWrapper" + currentCanvas);
            selectedCanvas.remove();
            --canvasCounter;
        }
    }

    addBubble(bubbleType) {
        console.log(bubbleType);
    };
    addText(textString) {
        console.log(textString);
    };
    /*///////////////////////////Functions for handling changing background images
    clicking the 'add image' button pulls up a file selector, which
    	*/

    handleFiles(files) {
        for (var i = 0, len = files.length; i < len; i++) {
            if (this.validateImage(files[i]))
                console.log('fileInfo', files[i]);
            this.previewAnduploadImage(files[i]);
        }
    };

    addBackImg(textString) {
        let file, fakeInput, addBackImg;
        addBackImg = this;
        console.log(textString);
        fakeInput = document.createElement("input");
        fakeInput.type = "file";
        fakeInput.accept = "image/*";
        fakeInput.multiple = true;
        fakeInput.click();
        fakeInput.addEventListener("change", function () {
            file = fakeInput.files;
            addBackImg.handleFiles(file);
        });
    };

    handleDrop(e) {
        let dt;
        console.log('we have a drop');
        dt = e.dataTransfer,
            console.log('dt', dt);
        files = dt.files;
        if (files.length) {
            this.handleFiles(files);
        } else {
            // check for img
            var html = dt.getData('text/html'),
                match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
                url = match && match[1];
            if (url) {
                this.uploadImageFromURL(url);
                return;
            }
        }
    }

    uploadImageFromURL(url) {
        var img = new Image;
        //var c = cartoonStrip[currentCanvas-1].fabricCanvas;
        var c = cartoonStrip[currentCanvas - 1].canvasElement;
        var ctx = c.getContext("2d");

        img.onload = function () {
            c.width = this.naturalWidth; // update canvas size to match image
            c.height = this.naturalHeight;
            ctx.drawImage(this, 0, 0); // draw in image
            c.toBlob(function (blob) { // get content as PNG blob

                // call our main function
                handleFiles([blob]);

            }, "image/png");
        };
        img.onerror = function () {
            alert("Error in uploading");
        }
        img.crossOrigin = ""; // if from different origin
        img.src = url;
    }

    validateImage(image) {
        // check the type
        var validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (validTypes.indexOf(image.type) === -1) {
            alert("Invalid File Type");
            return false;
        }

        // check the size
        var maxSizeInBytes = 10e6; // 10MB
        if (image.size > maxSizeInBytes) {
            alert("File too large");
            return false;
        }
        return true;
    }

    previewAnduploadImage(image) {
        //TODO: FINISH ADDING UPLOADED/DRAGGED IMAGE TO DIV
        // container
        var imgView = document.createElement("div");
        imgView.className = "image-view";
        cartoonStrip[currentCanvas].appendChild(imgView);

        // previewing image
        var img = document.createElement("img");
        imgView.appendChild(img);

        // progress overlay
        var overlay = document.createElement("div");
        overlay.className = "overlay";
        imgView.appendChild(overlay);

        // read the image...
        var reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        }
        reader.readAsDataURL(image);

        // create FormData
        var formData = new FormData();
        formData.append('image', image);

        // upload the image
        var uploadLocation = 'UPLOAD_LOCATION';

        var ajax = new XMLHttpRequest();
        ajax.open("POST", uploadLocation, true);

        ajax.onreadystatechange = function (e) {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    // done!
                } else {
                    // error!
                }
            }
        }

        ajax.upload.onprogress = function (e) {
            // change progress
            // (reduce the width of overlay)

            var perc = (e.loaded / e.total * 100) || 100,
                width = 100 - perc;

            overlay.style.width = width;
        }
        ajax.send(formData);
    }
}


function createCanvasStructure(cartoonWrapper) {
    let toolbarDiv = buildToolbarList(toolbar);
    cartoonWrapper.appendChild(toolbarDiv);
}

function initializePage() {
    cartoonWrapper = document.getElementById("CartoonWrapper");
    createCanvasStructure(cartoonWrapper);
    cartoonStrip.push(new Canvas);
};

initializePage();

/**********Event listeners***************/
//necessary to link generic toolbar buttons to canvas instance currently active

function modifyCanvas(changeType) {
    switch (changeType) {
    case 'add':
        cartoonStrip.push(new Canvas);
        break;
    case 'sub':
        cartoonStrip[currentCanvas - 1].removeCanvas();
        break;
    case 'text':
        cartoonStrip[currentCanvas - 1].addText('SomeText');
        break;
    case 'image':
        cartoonStrip[currentCanvas - 1].addBackImg('someBackImage');
        break;
    case 'tlThought':
    case 'trThought':
    case 'blThought':
    case 'brThought':
    case 'tlSpeech':
    case 'trSpeech':
    case 'blSpeech':
    case 'brSpeech':
        cartoonStrip[currentCanvas - 1].addBubble(changeType);
        break;
    default:
    }
}