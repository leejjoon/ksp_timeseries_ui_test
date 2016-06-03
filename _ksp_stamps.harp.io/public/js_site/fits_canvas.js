var c = document.getElementById("imCanvas");
var ctx = c.getContext("2d");
var nx = 64;
var ny = 64;
var imgData = ctx.createImageData(nx, ny);

function get_scaler(cmin, cmax) {
  return function(cc) {return 255 * (cc - cmin) / (cmax - cmin);};
}

var cmin = -100;
var cmax = 100;

function update_minmax(mymin, mymax) {
    cmin = mymin;
    cmax = mymax;
}

var colorMap = "grayscale";
var numberOfColors = "256";
var colormap_maps = [ 'rainbow', 'cooltowarm', 'blackbody', 'grayscale' ];

function change_colormap () {
    colorMap = colormap_maps.shift();
    colormap_maps.push(colorMap);
}

function get_lut() {
    // var lutColors = [];
    lut = new THREE.Lut( colorMap, numberOfColors );
    lut.setMax( 256 );
    lut.setMin( 0 );

    return lut;
}

function update_pixel(pixels) {
  var i;
  var ii;

  if (pixels.length == undefined) {
     console.log("pixels of undefined length is given:", pixels);
     return
  }

  var scaler = get_scaler(cmin, cmax);

  var lut = get_lut();

  for (i = 0; i < pixels.length; i += 1) {
      ii = i * 4;
      var cc = pixels[i];
      <!-- cc = Math.floor(255 * (cc - cmin) / (cmax - cmin)); -->
      <!-- cc = 255 * (cc - cmin) / (cmax - cmin); -->

      cc = scaler(cc);
      color = lut.getColor(cc);

      if (color != undefined) {
        imgData.data[ii+0] = 255*color.r;
        imgData.data[ii+1] = 255*color.g;
        imgData.data[ii+2] = 255*color.b;
  
        imgData.data[ii+3] = 255;
      } else {

        imgData.data[ii+0] = 0;
        imgData.data[ii+1] = 0;
        imgData.data[ii+2] = 0;
  
        imgData.data[ii+3] = 255;

      }

  };
  ctx.putImageData(imgData, 0, 0);
}

var stage;

function canvas_init() {
  stage = new createjs.Stage("myCanvas");

  var im= document.getElementById("imCanvas");

  var bitmap = new createjs.Bitmap(im);
  stage.addChild(bitmap);
  bitmap.setTransform(0, 0, 2, 2);

}
