var canvasCounter = 0;
var currentCanvas = 0;
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
	currentCanvas = "canvasWrapper" + currentCanvas;
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
			listItem.appendChild(listText);
			toolbarList.appendChild(listItem);
		} else if (typeof(toolbar[element] == 'object')) {
			var listItem = document.createElement('LI');
			listItem.id = element + "Tool";
			listText = document.createTextNode(element);
			var toolbarSublist = document.createElement('UL');
			toolbarSublist.id = element + "ToolbarSublist";
			var elementObject = toolbar[element];
			for (let aspect in elementObject) {
				let sublistItem = document.createElement('LI');
				let sublistText = document.createTextNode(elementObject[aspect].name);
				let sublistImage = document.createElement('IMG');
				sublistImage.src = 'images/' + element + '_bubble.svg';
				sublistImage.className = element + 'Img';
				sublistItem.id = elementObject[aspect].name;
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
	console.log('change_currentCanvas', currentCanvas)
	var activeCanvas = document.getElementsByClassName("activeCanvas");
	while (activeCanvas.length) {
		activeCanvas[0].className = activeCanvas[0].className.replace(/\bactiveCanvas\b/g, "");
	}

	let toolbarContainer = document.getElementById("ToolbarContainer");
	if (toolbarContainer != null) {
		toolbarContainer.remove();
	}
	currentCanvasWrapper = "canvasWrapper" + currentCanvas;
	document.getElementById(currentCanvasWrapper).className += " 	activeCanvas";
	buildToolbarList(toolbar, currentCanvas);
}

function createCanvas(CartoonWrapper) {
	++canvasCounter;
	currentCanvas = canvasCounter;
	console.log('canvasCounter', canvasCounter);
	console.log('currentCanvas', currentCanvas);
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
	changeCurrentCanvas(toolbar, currentCanvas);
}

function removeCanvas() {
	console.log('removeCanvas');
	console.log('currentCanvas to be removed', currentCanvas);
	if (currentCanvas > 0) {
		let selectedCanvas = document.getElementById("canvasWrapper" + currentCanvas);
		selectedCanvas.remove();
		--canvasCounter;
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
	cartoonWrapper.appendChild(buttonWrapper);
	document.getElementById("addButton").addEventListener("click", createCanvas);
	document.getElementById("subButton").addEventListener("click", removeCanvas);
}

function initializePage() {
	cartoonWrapper = document.getElementById("CartoonWrapper");
	createCanvasStructure(cartoonWrapper);
	createCanvas(cartoonWrapper, currentCanvas);
	currentCanvas = canvasCounter;
	changeCurrentCanvas(toolbar, currentCanvas);
};





initializePage();

/**********Event listeners***************/