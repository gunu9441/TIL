var o = {
    v1:'I',
    v2:'loveU',
    f1:function(){
            console.log(this.v1);
        },
    f2:function(){
            console.log(this.v2);
        }
    }
    
    o.f1();
    o.f2();