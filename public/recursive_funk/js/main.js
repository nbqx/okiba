var fn = function(c,i){
  var cnt = c&3;

  if(c<16){
    Bass.jmp = false;
  }else{
    Bass.jmp = true;
  }
  
  Bass.cutoff = 100;
  Bass.bass_loop(cnt);

  if(c===0 || c===4 || c>7){
    if(Math.random()>0.1){
      Drumkit.bd_loop(cnt);
      Drumkit.sd_loop(cnt);
      Drumkit.hh_loop(cnt);
    }else{
      if(cnt===3){
        OSX.funk();
      }
    }
  }

  if(cnt===3){
    Bass.current_seq = Bass.rnd_seq_change(Bass.bass_seqs);
    
    if(c>15){
      Drumkit.current_hh_seq = Drumkit.rnd_seq_change(Drumkit.hh_seqs);
      Drumkit.current_sd_seq = Drumkit.rnd_seq_change(Drumkit.sd_seqs);
      Drumkit.current_bd_seq = Drumkit.rnd_seq_change(Drumkit.bd_seqs);
    }
  }
};

// main loop
var main = T("interval", _(4), function(){
  fn(main.count, main.interval);
});

$(function(){
  $("#start").click(function(){
    $("title").text("sound: on");
    timbre.on();
    main.on();
  });
  $("#stop").click(function(){
    $("title").text("sound: off");
    main.off();
    timbre.off();
  });
});
