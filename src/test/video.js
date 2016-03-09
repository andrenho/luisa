function makeVideo(queue) {
  const mb = new Motherboard();
  mb.addDevice(new MMU(new RAM(256)));
  const cpu = new CPU(mb);
  mb.addDevice(cpu);
  const video = new Video(500, 400, d => queue.push(d));
  mb.addDevice(video);
  return [mb, cpu, video];
}


test('Video: sanity', t => {
  t.doesNotThrow(() => makeVideo(), null, "video created and added to motherboard");
  t.end();
});


test('Draw one single pixel', t => {
  let d = [];
  const [mb, cpu, video] = makeVideo(d);
  
  // draw pixel in 5,5
  mb.set32(video.VID_P0, 5);
  mb.set32(video.VID_P1, 5);
  mb.set32(video.VID_P2, 0xFF0000);
  mb.set(video.VID_OP, video.VID_OP_DRAW_PX);
  t.equal(d[0].cmd, 'draw_px', 'pixel drawn');
  t.equal(d[0].pars[2], 0xFF0000, 'pixel is red');
  
  // read pixel in 5, 5
  //mb.set(video.VID_OP, video.VID_OP_GET_PX);
  //t.equals(mb.get32(video.VID_R0), 0xFF0000, 'read pixel from memory');

  // clear screen
  mb.set32(video.VID_P0, 0);
  mb.set(video.VID_OP, video.VID_OP_CLRSCR);
  console.log(d[1]);
  t.equal(d[1].cmd, 'clrscr', 'screen cleared');
  
  t.end();
});



// vim: ts=2:sw=2:sts=2:expandtab
