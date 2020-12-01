function isLongPressedName(name, input) {
    var j = 0;
    for(i = 0; i < input.length; i++){
       if(j < name.length && name[j] == input[i]) {
          j++;
       }
    }
    return j == name.length;
 }
 
console.log("Name long pressed ?", isLongPressedName("alex", "aaleex"));