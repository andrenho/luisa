'use strict';

function to_hex(n, zeroes) {
    return (Array(zeroes || 0).join('0') + n.toString(16)).substr(-zeroes).toUpperCase();
}

// vim: ts=4:sw=4:sts=4:expandtab
