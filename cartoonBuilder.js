var canvasCounter = 0;
var currentCanvas = 0;
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
		action: "createCanvas",
		altText: "add a new comic panel"

	},
	sub: {
		name: "sub",
		action: "removeCanvas",
		altText: "remove selected comic panel"
	}
};


function buildToolbarList(toolbar) {
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
		} else if (typeof(toolbar[element] == 'object')) {
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
				toolbarSublist.appendChild(sublistItem);

				//				listItem.appendChild(listText);
				listItem.appendChild(toolbarSublist);
				toolbarList.appendChild(listItem);
			}
		}
	}
	toolbarDiv.appendChild(toolbarList);

	return toolbarDiv;
}

function changeCurrentCanvas(toolbar, currentCanvas) {
	console.log('change_currentCanvas', currentCanvas)
	var activeCanvas = document.getElementsByClassName("activeCanvas");
	while (activeCanvas.length) {
		activeCanvas[0].className = activeCanvas[0].className.replace(/\bactiveCanvas\b/g, "");
	}
	currentCanvasWrapper = "canvasWrapper" + currentCanvas;
	document.getElementById(currentCanvasWrapper).className += " 	activeCanvas";

	/*	show block to enable per-canvas toolbar; hide block to enable top row toolbar
	let toolbarContainer = document.getElementById("ToolbarContainer");
	if (toolbarContainer != null) {
		toolbarContainer.remove();
	}
	toolbarDiv = buildToolbarList(toolbar);
	document.getElementById(currentCanvas).appendChild(toolbarDiv);
	//*/
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

	/* comment out block to enable top row toolbar; show block to enable per-canvas toolbar
	let addButton = this.document.createElement('button');
	let subButton = this.document.createElement('button');
	addButton.id = "addButton";
	addButton.textContent = "add";
	subButton.id = "subButton";
	subButton.textContent = "remove";
	let buttonWrapper = this.document.createElement('div');
	buttonWrapper.id = "buttonWrapper";
	buttonWrapper.appendChild(addButton);
	buttonWrapper.appendChild(subButton);
	cartoonWrapper.appendChild(buttonWrapper);
	toolbarDiv.appendChild(addButton);
	toolbarDiv.appendChild(subButton);
	document.getElementById("addButton").addEventListener("click", createCanvas);
	document.getElementById("subButton").addEventListener("click", removeCanvas);
	//*/


	//* show block to enable top row toolbar; hide to enable per-canvas toolbar
	let toolbarDiv = buildToolbarList(toolbar);

	console.log('toolbarDiv', toolbarDiv);
	//*/
	cartoonWrapper.appendChild(toolbarDiv);

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