window.addEventListener('load', () => {




  // Inspired by William Malone (www.williammalone.com)

/*jslint browser: true */
/*global G_vmlCanvasManager */

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
      return ('0' + parseInt(x).toString(16)).slice(-2);
  }
  return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

var drawingApp = (function () {
var canvas,
  context,
  canvasWidth = $('#drawing-pad').width(),
  canvasHeight = 9 * canvasWidth / 13.5,
  outlineImage = new Image(),
  clickX = [],
  clickY = [],
  clickColor = [],
  clickTool = [],
  clickSize = [],
  clickDrag = [],
  paint = false,
  curColor,
  //curTool = 'crayon',
  curTool = 'eraser',
  curSize = 'normal',
  drawingAreaX = 0,
  drawingAreaY = 0,
  drawingAreaWidth = canvasWidth,
  drawingAreaHeight = canvasHeight,
  totalLoadResources = 1,
  curLoadResNum = 0,

  // Clears the canvas.
  clearCanvas = function () {

    context.clearRect(0, 0, canvasWidth, canvasHeight);
  },

  // Redraws the canvas.
  redraw = function () {

    var locX,
      locY,
      radius,
      i;
    
    // Make sure required resources are loaded before redrawing
    if (curLoadResNum < totalLoadResources) {
      return;
    }

    clearCanvas();

    // For each point drawn
    for (i = 0; i < clickX.length; i += 1) {

      // Set the drawing radius
      switch (clickSize[i]) {
      case 'small':
        radius = 2;
        break;
      case 'normal':
        radius = 7;
        break;
      case 'large':
        radius = 15;
        break;
      case 'huge':
        radius = 25;
        break;
      default:
        break;
      }

      // Set the drawing path
      context.beginPath();
      // If dragging then draw a line between the two points
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        // The x position is moved over one pixel so a circle even if not dragging
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);

      // Set the drawing color
      if (clickTool[i] === 'eraser') {
        context.strokeStyle = 'white';
      } else {
        context.strokeStyle = clickColor[i];
      }
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = radius;
      context.stroke();
    }
    context.closePath();
    context.restore();
    context.globalAlpha = 1; // No IE support

    // Draw the outline image
    context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
  },

  // Adds a point to the drawing array.
  // @param x
  // @param y
  // @param dragging
  addClick = function (x, y, dragging) {

    clickX.push(x);
    clickY.push(y);
    /* clickTool.push(curTool);
    clickColor.push(curColor);
    clickSize.push(curSize); */
    clickDrag.push(dragging);
  },

  // Add mouse and touch event listeners to the canvas
  createUserEvents = function () {

    var press = function (e) {
      // Mouse down location
      var sizeHotspotStartX;
      var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
      var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

    
      paint = true;
      addClick(mouseX, mouseY, false);
      redraw();
    },

    drag = function (e) {

      var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
        mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

      if (paint) {
        addClick(mouseX, mouseY, true);
        redraw();
      }
      // Prevent the whole page from dragging if on mobile
      e.preventDefault();
    },

    release = function () {
      paint = false;
      redraw();
    },

    cancel = function () {
      paint = false;
    };

    // Add mouse event listeners to canvas element
    canvas.addEventListener('mousedown', press, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', release);
    canvas.addEventListener('mouseout', cancel, false);

    // Add touch event listeners to canvas element
    canvas.addEventListener('touchstart', press, false);
    canvas.addEventListener('touchmove', drag, false);
    canvas.addEventListener('touchend', release, false);
    canvas.addEventListener('touchcancel', cancel, false);
  },

  // Calls the redraw function after all neccessary resources are loaded.
  resourceLoaded = function () {

    curLoadResNum += 1;
    if (curLoadResNum === totalLoadResources) {
      redraw();
      createUserEvents();
    }
  },

  // Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
  init = function () {

    // Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    document.getElementById('drawing-pad').appendChild(canvas);
    if (typeof G_vmlCanvasManager !== 'undefined') {
      canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext('2d'); // Grab the 2d canvas context
    // Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
    //     context = document.getElementById('canvas').getContext('2d');

    // Load images
    outlineImage.onload = resourceLoaded;
    outlineImage.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/655010/tyson-outline2.png';
    outlineImage.crossOrigin = "Anonymous";


    curColor = rgb2hex($($('.color')[0]).css('backgroundColor'));

   /*  $('.size[data-size="' + curSize + '"]').css('border-color', curColor);

    $('.color').on('click', function() {
      var bgColor = $(this).css('backgroundColor');
      bgColor = rgb2hex(bgColor);
      curTool = 'marker';
      curColor = bgColor;
      $('.size').removeClass('eraser-selected');
      $('.size[data-size="' + curSize + '"]').css('border-color', curColor);
    }); */

    $('.eraser').on('click', function() {
      curTool = 'eraser';
      $('.size').removeClass('eraser-selected');
      $('.size[data-size="' + curSize + '"]').addClass('eraser-selected').css('border-color', 'gray');
    });

    /* $('.size').on('click', function() {
      if (curTool !== 'eraser') {
        $('.size').css('border-color', 'black');
        $(this).css('border-color', curColor);
      } else {
        $('.size').css('border-color', 'black');
        $('.size').removeClass('eraser-selected');
        $(this).addClass('eraser-selected').css('border-color', 'gray');
      }
      curSize = $(this).data('size');
    }); */


    /* $('.download').on('click', function (e) {
      e.preventDefault();
        var dataURL = canvas.toDataURL('image/png');
        window.open(dataURL); 
    }); */
  };

return {
  init: init
};
}());

(function() {
drawingApp.init();
})()




  
})