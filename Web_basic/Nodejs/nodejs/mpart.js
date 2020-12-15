var M ={
    v:'v',
    f:function(){
        console.log(this.v);
    }
};

var O={
    p:'p',
    k:function(){
        console.log(this.p)
    }
}

var J = {
    J:'J',
    u:function(){
        console.log(this.J)
    }
}

// module.exports.M = M;
// module.exports.O = O;
console.log(module.exports)
module.exports = {M,O}
console.log(module.exports)
// module.exports = {J}
// console.log(module.exports)