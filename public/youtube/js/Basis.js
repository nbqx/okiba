Basis = this.Basis || {};

// generate timeout-based recusive looping function
Basis.genLoopFn = function(name){
  var seq_name = name;
  return function(bpm){
    var self = this;
    var bpm = bpm || metro.bpm;
    var seq = self[seq_name];

    var fn = function(s){
      var me = arguments.callee;
      var cur = s[0];
      var rest = s.slice(1);
      var dur;
    
      if(cur[0] instanceof Array){
        dur = timbre.utils.bpm2msec(bpm,cur[0][0]) * cur[0][1];
      }else{
        dur = timbre.utils.bpm2msec(bpm,cur[0]);
      }

      var tmr = T("timeout",dur,function(){
        if(rest.length!==0) me(rest)
      }).on();
      cur[1].apply(this,cur[2]);
    };
    
    fn(seq);
  }
};