var yt;

VIDEO = this.VIDEO = {};
VIDEO.loop = Basis.genLoopFn("seq");
VIDEO.play = function(sec,dur){
  yt.seekTo(sec,false);
};
VIDEO.seqs = [
  [
    [4,VIDEO.play,[16,12]],
    [4,VIDEO.play,[16,12]],
    [4,VIDEO.play,[16,12]],
    [4,VIDEO.play,[16,12]]
  ],
  [
    [4,VIDEO.play,[84.5,12]],
    [4,VIDEO.play,[84.5,12]],
    [4,VIDEO.play,[84.5,12]],
    [4,VIDEO.play,[84.5,12]]
  ],
  [
    [4,VIDEO.play,[100,12]],
    [4,VIDEO.play,[110,12]],
    [4,VIDEO.play,[100,12]],
    [4,VIDEO.play,[100,12]]
  ],
  [
    [4,VIDEO.play,[121,12]],
    [4,VIDEO.play,[121,12]],
    [4,VIDEO.play,[121,12]],
    [4,VIDEO.play,[121,12]]
  ],
  [
    [4,VIDEO.play,[156,12]],
    [4,VIDEO.play,[84.5,12]],
    [4,VIDEO.play,[156,12]],
    [4,VIDEO.play,[156,12]]
  ],
  [
    [4,VIDEO.play,[84.5,12]],
    [4,VIDEO.play,[0,12]],
    [4,VIDEO.play,[84.5,12]],
    [4,VIDEO.play,[0,12]]
  ]
];
VIDEO.seq = VIDEO.seqs[1];
VIDEO.seq_change = function(){
  var self = this;
  var r = Math.floor(Math.random()*VIDEO.seqs.length);
  var ret = VIDEO.seqs[r];
  self.seq = ret;
}

function onYouTubePlayerAPIReady(){
  yt = new YT.Player('video', {
    width: '480', height: '295', videoId: 'v7aT45Oty_4',
    events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}
  });
};

metro.add('yt',function(i){
  var c4 = i.count%4;

  if(c4===0){
    if(i.count>12){
      if(Math.random()>0.3){
        Snare.loop();
        Boom.loop();
        VIDEO.loop();
      }
    }
    if(i.count>80){
      VIDEO.seq_change();
    }
  }
});

function onPlayerReady(ev){
  yt.playVideo();
  metro.run();
};

function onPlayerStateChange(ev){
  if(yt.getPlayerState()===0 || yt.getPlayerState()===2){
    metro.stop();
  }
};

$(function(){
  $.getScript("http://www.youtube.com/player_api");
});