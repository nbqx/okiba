OSX = this.OSX = {};

OSX.funk_wav = T("wav", "./audio/funk.wav", false).load();
OSX.funk = function(){
  T("timeout", _(16), function(){
    var s = OSX.funk_wav.clone();
    s.onended = function(){
      s.off();
    };
    s.play();
  }).on();
};