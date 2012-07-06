var Metro;
Metro = (function(){
  Metro.displayName = 'Metro';
  var prototype = Metro.prototype, constructor = Metro;
  function Metro(bpm){
    var interval;
    this.bpm = bpm || 120;
    this.msec = timbre.utils.bpm2msec(this.bpm, 4);
    this._m = false;
    this._funcs = {
      '_click_': function(i){
        var cnt, vol;
        cnt = i.count % 4;
        vol = 0.5;
        if (this._m) {
          if (cnt === 0) {
            this.click(880, vol);
          } else {
            this.click(440, vol);
          }
        }
      }
    };
    this.loopFunc = function(){
      var k, v, __ref;
      for (k in __ref = this._funcs) {
        v = __ref[k];
        if (typeof v === "function") {
          v.apply(this, [interval]);
        }
      }
    };
    interval = this.interval = T("interval", this.msec, this.loopFunc.bind(this));
  }
  prototype.add = function(k, fn){
    this._funcs[k] = fn;
  };
  prototype.remove = function(k){
    var _f;
    _f = this.fnames();
    if (_f.indexOf(k > -1)) {
      delete this._funcs[k];
    }
    return this.fnames();
  };
  prototype.run = function(){
    this.interval.on();
  };
  prototype.stop = function(){
    this.interval.off();
  };
  prototype.click = function(freq, vol){
    var osc, env, s;
    osc = T("pulse", freq);
    env = T("perc", 80).set("mul", vol);
    s = T("*", osc, env.bang()).play();
    s.onendec = function(){
      s.pause();
    };
  };
  prototype.clickOn = function(){
    this._m = true;
  };
  prototype.clickOff = function(){
    this._m = false;
  };
  return Metro;
}());