var Basis, __slice = [].slice;
Basis = {
  genLoopFn: function(name){
    return function(bpm){
      var seq, fn;
      bpm = bpm || metro.bpm;
      seq = this[name] || [];
      fn = function(list){
        var x, xs, dur, tmr;
        x = list[0], xs = __slice.call(list, 1);
        dur = x[0] instanceof Array
          ? dur = timbre.utils.bpm2msec(bpm, x[0][0]) * x[0][1]
          : dur = timbre.utils.bpm2msec(bpm, x[0]);
        tmr = T("timeout", dur, function(){
          if (xs.length !== 0) {
            fn(xs);
          }
        });
        tmr.on();
        return x[1].apply(this, x[2]);
      };
      if (seq.length !== 0) {
        fn(seq);
      }
    };
  }
};