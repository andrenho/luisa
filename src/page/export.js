import LuisaVM from '../emu/luisavm';
import Debugger from '../utils/debugger';

if (typeof window !== 'undefined') {
  window.LuisaVM = LuisaVM;
  window.Debugger = Debugger;
}

// vim: ts=2:sw=2:sts=2:expandtab
