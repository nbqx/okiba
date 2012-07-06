var Basis, __slice = [].slice;
Basis = {
  genLoopFn: function(name){
    return function(bpm){
      var seq, fn;
      bpm = bpm || metro.bpm;
      seq = this[name] || [];
      fn = function(list){
        var x, xs, cur, rest, dur, tmr;
        x = list[0], xs = __slice.call(list, 1);
        cur = x;
        rest = xs;
        dur = cur[0] instanceof Array
          ? dur = timbre.utils.bpm2msec(bpm, cur[0][0]) * cur[0][1]
          : dur = timbre.utils.bpm2msec(bpm, cur[0]);
        tmr = T("timeout", dur, function(){
          if (rest.length !== 0) {
            fn(rest);
          }
        });
        tmr.on();
        return cur[1].apply(this, cur[2]);
      };
      if (seq.length !== 0) {
        fn(seq);
      }
    };
  }
};