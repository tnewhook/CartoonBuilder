let canvasCounter = 0;
let currentCanvas = 0;
var toolbar = {
	text: {
		name: "text"
	},
	image: {
		name: "image"
	},
	thought: {
		tl: {
			name: "tlThought"
		},
		tr: {
			name: "trThought"
		},
		bl: {
			name: "blThought"
		},
		br: {
			name: "brThought"
		}
	},
	speech: {
		tl: {
			name: "tlSpeech"
		},
		tr: {
			name: "trSpeech"
		},
		bl: {
			name: "blSpeech"
		},
		br: {
			name: "brSpeech"
		}
	}
};


function buildToolbarList(toolbar, currentCanvas) {
	console.log('canvasWrapper buildToolbarList1', currentCanvas);
	currentCanvas = "canvasWrapper" + currentCanvas;
	console.log('canvasWrapper buildToolbarList2', currentCanvas);
	let toolbarDiv, toolbarList;
	toolbarDiv = this.document.createElement('div');
	toolbarDiv.id = "ToolbarContainer";
	toolbarDiv.className = "toolbarNavigation";
	toolbarList = document.createElement('UL');
	toolbarList.id = "ToolbarList";
	for (let element in toolbar) {
		if (typeof(toolbar[element].name) != "undefined") {
			var listItem = document.createElement('LI');
			listText = document.createTextNode(toolbar[element].name);
			listItem.id = toolbar[element].name + "Tool";
			//        listItem.className="toolbarSubItemClass";
			listItem.appendChild(listText);
			toolbarList.appendChild(listItem);
		} else if (typeof(toolbar[element] == 'object')) {
			var listItem = document.createElement('LI');
			//        console.log('element',element);
			listItem.id = element + "Tool";
			//        listItem.className="has-sub";
			listText = document.createTextNode(element);
			var toolbarSublist = document.createElement('UL');
			toolbarSublist.id = element + "ToolbarSublist";
			//      toolbarSublist.className="ToolbarSublist";
			var elementObject = toolbar[element];
			//        console.log('elementObject',elementObject);
			for (let aspect in elementObject) {
				//console.log("aspect", elementObject[aspect].name);
				let sublistItem = document.createElement('LI');
				let sublistText = document.createTextNode(elementObject[aspect].name);
				let sublistImage = document.createElement('IMG');
				sublistImage.src = 'images/' + element + '_bubble.svg';
				sublistImage.className = element + 'Img';
				sublistItem.id = elementObject[aspect].name;
				//sublistItem.appendChild(sublistText);
				sublistItem.appendChild(sublistImage);

				toolbarSublist.appendChild(sublistItem);
				listItem.appendChild(listText);
				listItem.appendChild(toolbarSublist);
				toolbarList.appendChild(listItem);
			}

		}
	}
	toolbarDiv.appendChild(toolbarList);
	document.getElementById(currentCanvas).appendChild(toolbarDiv);
}

function changeCurrentCanvas(toolbar, currentCanvas) {
	var activeCanvas = document.getElementsByClassName("activeCanvas");
	while (activeCanvas.length) {
		activeCanvas[0].className = activeCanvas[0].className.replace(/\bactiveCanvas\b/g, "");
	}

	console.log('currentCanvas ccc1', currentCanvas);
	let toolbarContainer = document.getElementById("ToolbarContainer");
	console.log('toolbarContainer', toolbarContainer, 'typeof toolbarContainer', typeof(toolbarContainer));
	console.log('currentCanvas ccc2', currentCanvas);
	if (toolbarContainer != null) {
		toolbarContainer.remove();
	}
	currentCanvasWrapper = "canvasWrapper" + currentCanvas;
	document.getElementById(currentCanvasWrapper).className += " 	activeCanvas";
	console.log('currentCanvas', currentCanvas)
	buildToolbarList(toolbar, currentCanvas);
}

function createCanvas(CartoonWrapper, currentCanvas) {
	canvasCounter++;
	currentCanvas = canvasCounter;
	let canvasWrapper = document.createElement('div');
	canvasWrapper.id = "canvasWrapper" + currentCanvas;
	canvasWrapper.className = "canvasWrapperClass";
	let canvasElement = document.createElement('canvas');
	canvasElement.id = "canvasElement" + currentCanvas;
	canvasElement.className = "canvasClass";
	canvasWrapper.appendChild(canvasElement);
	document.getElementById("CartoonWrapper").appendChild(canvasWrapper);
	canvasElement.addEventListener("click", function(e) {
		currentCanvasID = e.target.id;
		currentCanvas = currentCanvasID.replace('canvasElement', '');
		changeCurrentCanvas(toolbar, currentCanvas);
	});
}

function removeCanvas() {
	console.log('removeCanvas');
	if (currentCanvas > 0) {
		let selectedCanvas = document.getElementById("canvasWrapper" + currentCanvas);
		selectedCanvas.remove();
	}

}

function createCanvasStructure(cartoonWrapper) {
	let buttonWrapper = this.document.createElement('div');
	buttonWrapper.id = "buttonWrapper";
	let addButton = this.document.createElement('button');
	let subButton = this.document.createElement('button');
	addButton.id = "addButton";
	addButton.textContent = "add";
	subButton.id = "subButton";
	subButton.textContent = "remove";
	buttonWrapper.appendChild(addButton);
	buttonWrapper.appendChild(subButton);
	subButton.addEventListener("click", removeCanvas(currentCanvas));
	cartoonWrapper.appendChild(buttonWrapper);
	document.getElementById("addButton").addEventListener("click", createCanvas);
	document.getElementById("subButton").addEventListener("click", removeCanvas);
}

function initializePage() {
	cartoonWrapper = document.getElementById("CartoonWrapper");
	createCanvasStructure(cartoonWrapper);
	createCanvas(cartoonWrapper, currentCanvas);
	console.log('currentCanvas2', currentCanvas);
	console.log('currentCanvas initializePage', currentCanvas);
	currentCanvas = canvasCounter;
	changeCurrentCanvas(toolbar, currentCanvas);
};





initializePage();

/**********Event listeners***************/