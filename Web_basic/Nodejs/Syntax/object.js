var member = ['egoing', 'gunu', 'yejin'];
var i =0;
while(i < member.length){
    console.log(member[i]);
    i+=1;
}
var roles = {
    'programmer' : 'egoing',
    'desinger' : 'gunu',
    'manager' : 'yejin'
}

console.log(roles['manager'])
console.log(roles.manager)
for(var name in roles) {
    console.log(name, roles[name]);
}