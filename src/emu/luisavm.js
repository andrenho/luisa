'use strict';

class LuisaVM {

  constructor(ramSizeKb, storageUnits, biosCode, screenWidth, screenHeight) {
    this.mb = new Motherboard();
    this.mmu = new MMU(new RAM(ramSizeKb));
    this.cpu = new CPU(this.mb);
    this.storage = new Storage(storageUnits);
    this.keyboard = new Keyboard();
    this.timer = new Timer();
    this.bios = new BIOS(biosCode);
    this.video = new Video(screenWidth, screenHeight);

    this.mb.addDevice(this.mmu);
    this.mb.addDevice(this.cpu);
    this.mb.addDevice(this.storage);
    this.mb.addDevice(this.keyboard);
    this.mb.addDevice(this.timer);
    this.mb.addDevice(this.bios);
    this.mb.addDevice(this.video);
  }


  step() {
    this.mb.step();
  }


}


// vim: ts=2:sw=2:sts=2:expandtab
