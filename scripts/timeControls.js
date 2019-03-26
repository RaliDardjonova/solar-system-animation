var TimeControl = (function ($, config) {
  function timeControl(slider) {
    this.slider = slider;
    this.slider
      .attr('data-slider-max', config.framesCount)
      .attr('max', config.framesCount);
  }

  timeControl.prototype.update = function (value) {
    var sliderHorizontal = this.slider.siblings('.slider').first();
    var maxSteps = this.slider.attr('data-slider-max'),
      path = value / maxSteps * 100;

    console.log('MaxSteps: ' + maxSteps);
    console.log('Current value: ' + value);

    this.sliderHandles = sliderHorizontal.children('.slider-handle');

    var cssPath = path.toString() + '%';


    console.log('PATH: ' + path);

    this.sliderHandles
      .css('left', cssPath);

    var sliderTrack = sliderHorizontal.children('.slider-track');

    sliderTrack
      .children('.slider-selection')
      .first()
      .css('width', cssPath);

    sliderTrack
      .children('.slider-track-high')
      .first()
      .css('width', (100 - path).toString() + '%');
  }

  return timeControl;
})(jQuery, CONFIG);
