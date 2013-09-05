$(function(){
  var video = document.getElementById("live");
  var canv = document.getElementById("canv");
  video.volume = 0;
  navigator.webkitGetUserMedia({video:false,audio:true},function(stream){
    var api = T("WebAudioAPI:recv");
    var ctx = api.context;
    var streamsource = ctx.createMediaStreamSource(stream);
    api.recv(streamsource);
    var snd = T("chorus", {delay:20, rate:8, depth:100, fb:0.5, mix:0.8}, api);
    snd = T("delay", {time:"1000ms", fb:0.9, mix:0.9}, snd);

    var gate = T('gate',snd);
    T('interval',{interval:80},function(c){
      gate.selected = c%2;
    }).start();

    T('reverb',{room:0.9, damp:0.5, mix:0.85},gate.at(0)).play();
    gate.at(1).play();

    var fft = T("spectrum",{size:512,interval:100}).on('data',function(){
      fft.plot({target:canv});
    }).listen(snd);

  });
});
