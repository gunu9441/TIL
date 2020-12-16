var Links={
    setcolor: function(color,a_array){
        var count = 0;
        while(count<a_array.length){
            a_array[count].style.color = 'powderblue'
            count += 1;
        }
    }
}
var Body ={
    setcolor: function(color){
        document.querySelector('body').style.color= color;
    },
    setbackgroundcolor: function(color){
        document.querySelector('body').style.backgroundColor= color;
    }
}
function nightDayHandler(self){
    var a_array= document.querySelectorAll('a');
    if (self.value=='night'){
        Body.setcolor('white');
        Body.setbackgroundcolor('black');
        Links.setcolor('powderblue',a_array);
        self.value = 'day';
    
        } else{
        Body.setcolor('black');
        Body.setbackgroundcolor('white');
        Links.setcolor('blue',a_array)
        self.value = 'night';
        }
}