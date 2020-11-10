var canvasCounter = 0;
var currentCanvas = 0;
var cartoonStrip = []; //array of canvas objects
//toolbar element object
var toolbar = {
    text: {
        name: "text",
        action: "",
        altText: "add some text"

    },
    image: {
        name: "image",
        action: "",
        altText: "add an image"
    },
    thought: {
        altText: "add a thought bubble",
        tl: {
            name: "tlThought",
            action: "",
            altText: "add an thought bubble with the small bubbles toward the top left"
        },
        tr: {
            name: "trThought",
            action: "",
            altText: "add an thought bubble with the small bubbles toward the top right"

        },
        bl: {
            name: "blThought",
            action: "",
            altText: "add an thought bubble with the small bubbles toward the bottom left"

        },
        br: {
            name: "brThought",
            action: "",
            altText: "add an thought bubble with the small bubbles toward the bottom right"

        }
    },
    speech: {
        altText: "add a speech bubble",
        tl: {
            name: "tlSpeech",
            action: "",
            altText: "add a speech bubble with the arrow toward the top left"

        },
        tr: {
            name: "trSpeech",
            action: "",
            altText: "add a speech bubble with the arrow toward the top right"

        },
        bl: {
            name: "blSpeech",
            action: "",
            altText: "add a speech bubble with the arrow toward the bottom left"

        },
        br: {
            name: "brSpeech",
            action: "",
            altText: "add a speech bubble with the arrow toward the bottom right"

        }
    },
    add: {
        name: "add",
        action: "addNewCanvas",
        altText: "add a new comic panel"

    },
    sub: {
        name: "sub",
        action: "subCanvas",
        altText: "remove selected comic panel"
    }
};


function buildToolbarList(toolbar) {
    //get items from toolbar object, create wrapper, add images, add to wrapper
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
            console.log('action', toolbar[element].action);
            listItem.addEventListener("click", window[toolbar[element].action]);
            listImg.src = 'images/' + toolbar[element].name + '.svg';
            //listImg.className = element + 'Img';
            listImg.className += ' listImg';
            listItem.appendChild(listImg);

            //			listItem.appendChild(listText);
            toolbarList.appendChild(listItem);
        } else if (typeof (toolbar[element] == 'object')) {
            var listItem = document.createElement('LI');
            listItem.id = element + "Tool";
            listImg = document.createElement('IMG');
            listImg.src = 'images/' + element + '.svg';
            listImg.className += ' listImg';
            listItem.addEventListener("click", element.action);
            listItem.appendChild(listImg);
            console.log('alt', toolbar[element].altText);
            listImg.alt = toolbar[element].altText;
            //listImg.setAttribute("alt", element.altText);

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
                sublistItem.addEventListener("click", element.action);
                sublistItem.appendChild(sublistImg);
                if (typeof (elementObject[aspect].altText) == 'string') {
                    toolbarSublist.appendChild(sublistItem);
                }
                //				console.log('elementObject[aspect].altText' + typeof(elementObject[aspect].altText));

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

    changeCurrentCanvas(toolbar, currentCanvas) {
        console.log('change_currentCanvas', currentCanvas)
        var activeCanvas = document.getElementsByClassName("activeCanvas");
        while (activeCanvas.length) {
            activeCanvas[0].className = activeCanvas[0].className.replace(/\bactiveCanvas\b/g, "");
        }
        let currentCanvasWrapper = "canvasWrapper" + currentCanvas;
        document.getElementById(currentCanvasWrapper).className += " 	activeCanvas";
    }

    createCanvas = function (CartoonWrapper) {
        ++canvasCounter;
        currentCanvas = canvasCounter;
        console.log('canvasCounter', canvasCounter);
        console.log('currentCanvas', currentCanvas);
        let canvasWrapper = document.createElement('div');
        canvasWrapper.id = "canvasWrapper" + currentCanvas;
        canvasWrapper.className = "canvasWrapperClass";
        let canvasElement = document.createElement('canvas');
        canvasElement.id = "canvasElement" + currentCanvas;
        console.log('canvasElement.id', canvasElement.id);

        canvasElement.className = "canvasClass";
        canvasWrapper.appendChild(canvasElement);
        document.getElementById("CartoonWrapper").appendChild(canvasWrapper);
        let currentCanvasInstance = this;
        canvasElement.addEventListener("click", function (e) {
            let currentCanvasID = e.target.id;
            console.log('currentCanvasID', currentCanvasID);
            currentCanvas = currentCanvasID.replace('canvasElement', '');
            currentCanvasInstance.changeCurrentCanvas(toolbar, currentCanvas);
        });
        this.changeCurrentCanvas(toolbar, currentCanvas);
    }

    removeCanvas() {
        console.log('removeCanvas');
        console.log('currentCanvas to be removed', currentCanvas);
        if (currentCanvas > 0) {
            let selectedCanvas = document.getElementById("canvasWrapper" + currentCanvas);
            selectedCanvas.remove();
            --canvasCounter;
        }
    }
}

function createCanvasStructure(cartoonWrapper) {
    let toolbarDiv = buildToolbarList(toolbar);
    console.log('toolbarDiv', toolbarDiv);
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
function addNewCanvas() {
    cartoonStrip.push(new Canvas);
}

function subCanvas() {
    cartoonStrip[currentCanvas - 1].removeCanvas();
}