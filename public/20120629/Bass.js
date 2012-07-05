Bass = this.Bass || {};

Bass.play = function(note,vol){
  var freq = timbre.utils.atof(note);
  var dur = 100;
  var tw = T("ease", "quintic.out", 200, 8000, 100).kr();
  var osc = T("+", T("fami", freq/2, 0.4), T("saw", freq, 0.6));
  osc = T("rhpf",tw.bang(),0.9,osc);
  var env = T("adsr", 0, dur, 0.5, 200).set("mul",vol);
  env.s = 380;
  var s = T("*", osc, env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  };
};
Bass.loop = Basis.genLoopFn("seq");

var seq1 = [
  [8,Bass.play, ["C1",0.7]],
  [16,Bass.play, ["C2",0.7]],
  [16,Bass.play, ["C3",0.7]],
  [16,Bass.play, ["A#2",0.7]],
  [8,Bass.play, ["G3",0.7]],
  [16,Bass.play, ["C2",0.7]],
  [4,Bass.play, ["D#3",0.7]]
];
var seq2 = [
  [8,Bass.play, ["C1",0.7]],
  [16,Bass.play, ["C3",0.7]],
  [16,Bass.play, ["C2",0.7]],
  [8,Bass.play, ["F1",0.7]],
  [8,Bass.play, ["F2",0.7]],
  [16,Bass.play, ["F3",0.7]],
  [4,Bass.play, ["C1",0.7]]
];
var seq3 = [
  [8,Bass.play, ["F1",0.7]],
  [16,Bass.play, ["F3",0.7]],
  [16,Bass.play, ["F2",0.7]],
  [8,Bass.play, ["C1",0.7]],
  [8,Bass.play, ["C2",0.7]],
  [16,Bass.play, ["C3",0.7]],
  [4,Bass.play, ["F1",0.7]]
];
Bass.seqs = [];
[seq1,seq2,seq3].forEach(function(o){Bass.seqs.push(o)});
Bass.seq = Bass.seqs[1];

Bass.seqChange = function(i){
  var seq = Bass.seqs[i] || [];
  Bass.seq = seq;
};

metro.add('bass', function(i){
  if(i.count%3===0){
    Bass.loop();

    if(Math.random()>0.6){
      Bass.seqChange(1);
    }else{
      Bass.seqChange(2);
    }

    if(Math.random()>0.98){
      Bass.seqChange(0);
    }

    if(Math.random()>0.98){
      Bass.seqChange();
    }
  }
});