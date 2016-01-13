import Motherboard from './motherboard';
import RAM from './ram';
import MMU from './mmu';
import CPU from './cpu';
import Storage from './storage';
import Keyboard from './keyboard';
import Timer from './timer';
import BIOS from './bios';
import Video from './video';


export default class LuisaVM {

  constructor(ramSizeKb, storageUnits, canvas) {
    this.mb = new Motherboard();
    this.mmu = new MMU(new RAM(ramSizeKb));
    this.cpu = new CPU(this.mb);
    this.storage = new Storage(storageUnits);
    this.keyboard = new Keyboard();
    this.timer = new Timer();
    this.bios = new BIOS();
    this.video = new Video(canvas);

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
