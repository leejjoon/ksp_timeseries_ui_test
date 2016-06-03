var FITS = astro.FITS;
var dataunit;
var myframe;
var arg1;

var images = [];
var images_started = [];

var current_frame = 0;

var set_frame = function(frame) {
    current_frame = frame;

    if (typeof images_started[frame] != 'undefined') {
      update_pixel(images[frame]);
      stage.update();
    } else {
      getFrames(dataunit, current_frame, 1, cb_frame1);
    }
}

var cb_frame1 = function(obj) {
    if (obj.frame == current_frame) {
      update_pixel(obj.arr);
      stage.update();
    }
}

getFrames = function(dataunit, frame, number, callback, opts) {
    <!-- console.log(frame, number); -->
    if (!number) {
      return;
    }

    var cb;
    cb = function(arr, opts) {
      images[frame] = arr;
      obj = {"arr":arr, "frame":frame};
      dataunit.invoke(callback, opts, obj);
      <!-- number -= 1; -->
      <!-- frame += 1; -->
      return getFrames(dataunit, frame+1, number-1, callback, opts);
    };

    if (typeof images_started[frame] == 'undefined') {
      images_started[frame] = true;
      return dataunit.getFrame(frame, cb, opts);
    } else {
      return getFrames(dataunit, frame+1, number-1, callback, opts);
    }
};


var cb_frames = function(pixels) {
  images.push(pixels);
  if (images.length === 1) {
    update_pixel(pixels);
    stage.update();
  }
  <!-- console.log(images.length); -->
  // if (images.length === 100) {
  //   console.log("done");
  // }
}

var callback = function() {
  var hdu = this.getHDU();
  dataunit = hdu.data;

  getFrames(dataunit, 0, 1, cb_frame1);

  <!-- dataunit.getFrame(50, cb_frame1); -->

}
