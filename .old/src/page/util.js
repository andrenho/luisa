'use strict';

function toHex(n, zeroes) {
    return (Array(zeroes || 0).join('0') + n.toString(16)).substr(-zeroes).toUpperCase();
}


function toU32(n) {
    return [ n & 0xff,
             (n >> 8) & 0xff,
             (n >> 16) & 0xff,
             (n >> 24) & 0xff ];
}


// vim: ts=4:sw=4:sts=4:expandtab
