/**********************************************************************************************/
/**********************************************************************************************/
/**********************************************************************************************/
/************The approach I took for this code is as follows:**********************************/
/************1.)We take all input numbers and store it in a string using add()*****************/
/************2.)Then when the user clicks equal  to we call different functions ***************/
/************3.)The first we call convertStringToArray which converts our string to array******/
/************3.)Then we call calculateArrayDM which calculates the array till all *************/
/***************multipliucation and division is done(it recursively calls itself***************/
/***************and multiply and divide based on their occurence as they have equal precedence)/
/************4.)The returned string gets all * and / done and then we call calculateArrayAs****/
/***************which stands for AdditionSubtraction does the same thing as the multiply and***/
/*************** divide function does, except it does addition and subtraction.****************/
/************5.)Finally we return calculated result as a string which is then *****************/
/*************** displayed on the screen.******************************************************/
/**********************************************************************************************/
/**********************************************************************************************/
/**********************************************************************************************/
/**********************************************************************************************/
/**********************************************************************************************/
var s="";
/*****************Function to convert our string to array*********************/
function convertStringToArray(s){
  var arr=[], num = '';                             //arr[] to store our string which is converted to array
  for(var i=0;i<s.length;i++){
    var ch=s.charAt(i);
    if(ch == '*'||ch =='/'||ch =='+'||ch =='-'){
      if((ch=='-')&&(num=='')){                     //This is an important condition as it deals with the occurence when we have,
        num='-';                                    //first number as negative because we do not want our code to think that it, 
      }else{                                        //is a subtract operator but a negative number, therefore we add a negative,
        arr.push(parseFloat(num),ch);               //sign to the number and now our code treats it as negative number.
        num = '';
      }
    }
    else{
      num+=ch;
      console.log(num);
    }
  }
  if(num!=''){
    arr.push(parseFloat(num));
  }
  return(arr);
}
function calculateArrayDM(a){
  var i;
  var s='';
  for(i=0;i<a.length;){                           //value of i is not incremented here as we do the same in the body 
    if(a[i+1]=="/"){                              //depending upon the condition
      var res=(a[i]/a[i+2]);
      s+=res;
      var rem= a.slice(i+3);
      for(var j=0;j<rem.length;j++){
        s+=(rem[j]);
      }
      break;
    }else if(a[i+1]=="*"){                       //checking for operator depending upon their occurence
      var res=(a[i]*a[i+2]);
      s+=res;
      var rem= a.slice(i+3);
      for(var j=0;j<rem.length;j++){
        s+=(rem[j]);
      }
      break;
    }else{
      s+=a[i];
      i++;
    }
  }
  if ((s.indexOf('/') > -1)||(s.indexOf('*') > -1)){      //checking if we got rid of all * and / operators 
    return(calculateArrayDM(convertStringToArray(s)));    //if not then we recursively call it again and again till we
  }                                                       //get rid of all.
  else{
    return(s);                                            //then we return the result string
  }
}
function calculateArrayAS(a){
  var i;
  var s='';                                               //here also we follow the same process as we did in the above function
  for(i=0;i<a.length;){
    if(a[i+1]=="+"){
      var res=(a[i]+a[i+2]);
      s+=res;
      var rem= a.slice(i+3);
      for(var j=0;j<rem.length;j++){
        s+=(rem[j]);
      }
      break;
    }else if(a[i+1]=="-"){
      var res=(a[i]-a[i+2]);
      s+=res;
      var rem= a.slice(i+3);
      for(var j=0;j<rem.length;j++){
        s+=(rem[j]);
      }
      break;
    }else{
      s+=a[i];
      i++;
    }
  }
  if ((s.indexOf('+') > -1)||(s.indexOf('-')> -1)){
    var checkstr=s;
    if((s.charAt(0)=='-')&&((checkstr.split('-').length - 1)<2)&&(s.indexOf('+') < 1)){  //this condition here is very important as it      
      return s;                                                                          //checks if - is present with the number or as
    }                                                                                    //an operator, if as number then return the result
    else{                                                                                //otherwise call the calculate function again till
    return(calculateArrayAS(convertStringToArray(s)));                                   //we reach there.
    }
  }
  else{
    return s;
  }
}
function setCharAt(str,index,chr) {                             //this is a helper function that helps us to add a char in the specified
    if(index > str.length-1) return str;                        //position within our string, which is used in add function
    return (str.substr(0,index) + chr + str.substr(index+1));
}
function add(p){
  if((s.length<2)&&(s.charAt(s.length-1)=="0")){                //condtion to check whether first input is a operator
    if(p=="/"||p=="*"||p=="+"||p=="-"){                         //if so then we add aa 0 to the front 
    s="0"+p;
    }else{
      s=p;                                                      //else we continue with the normal process
    }
  }else{
    s+=p;
    var len=s.length;
    if((s.charAt(0)=="/")||(s.charAt(0)=="*")||(s.charAt(0)=="+")||(s.charAt(0)=="-")){
      s="0"+s;
    } 
    if(len > 1){                                                //this block of code checks if user has pressed two operator
      if(p=="/"||p=="*"||p=="+"||p=="-"){                       //button one after another, and if so we take only the latest
        var c =s.charAt((s.length)-2);                          //operator into consideration and removing the previous one.
        var r= len-2;                                           //ex: if user presses 5+4+*, so this will convert this to 5+4*
        if(c=="/"||c=="*"||c=="+"||c=="-"){
          s=setCharAt(s,r,p);
          s=s.substring(0, s.length - 1);
        }
      }
    }
  }
  if(s.length<11){                                                  //this block of code is for visual representation and what it does
    document.getElementById("answer").innerHTML =s;                 //basically is that it changes the font-size to smaller to accommodate
    document.getElementById("answer").style.fontSize = "4rem";      //more numbers, it does so till we can easily reduce font-size 
  }
  else if(s.length>=11&&s.length<16){
    document.getElementById("answer").style.fontSize = "3rem";
    document.getElementById("answer").innerHTML =s;
  }
  else if(s.length>=16&&s.length<24){
    document.getElementById("answer").style.fontSize = "2rem";
    document.getElementById("answer").innerHTML =s;
  }
  else{                                                             //this condition is when we have a large amount which can not be 
    document.getElementById("answer").innerHTML ="Value Limit maxed out,Please Retry";  //displayed correctly, so we give an error.
    document.getElementById("answer").style.fontSize = "1.5rem";
    s='0';
  }
}
function clearAll(){                          //this function is called when user clicks AC button and it resets opur calculator
  s="0";
  document.getElementById("answer").innerHTML =s;
  document.getElementById("answer").style.fontSize = "4rem";      //this make the font-size back to normal
}
function calc(){
  console.log(s);                                   //this block of  code checks if user's last button was a operator
  var last=s.charAt(s.length-1);                    //followed by the equal sign , if so then our code deletes the
  if(last=="/"||last=="*"||last=="+"||last=="-"){   //last operator and continue with the calculation, as the last operator
    s=s.substring(0, s.length - 1);                 //is ignored.
  } 
  var arrDM=convertStringToArray(s);                //calls for converting string to array
  var strDM=calculateArrayDM(arrDM);                //calls for calculating Divison and Multiplication  
  var arrAS=convertStringToArray(strDM);            //calls for converting string to array
  var strAS=calculateArrayAS(arrAS);                //calls for calculating Addition and Subtraction
  if(strAS.length<11){
    document.getElementById("answer").innerHTML =strAS;
    document.getElementById("answer").style.fontSize = "4rem";
  }                                                                 //same as above but displays result in best possible format
  else if(strAS.length>=11&&strAS.length<16){
    document.getElementById("answer").style.fontSize = "3rem";
    document.getElementById("answer").innerHTML =strAS;
  }
  else if(strAS.length>=16&&strAS.length<24){
    document.getElementById("answer").style.fontSize = "2rem";
    document.getElementById("answer").innerHTML =strAS;
  }
  else{
    document.getElementById("answer").innerHTML = "Value Limit maxed out,Please Retry";
    document.getElementById("answer").style.fontSize = "1.5rem";
    strAS='0';
  }
  s=strAS;                                      //this is an important line as it deals with the case when user presses an operator
}                                               //after result is displayed , so that we can take result as parameter and extend
function back(){                                //our operator on it.
  if(s==""){
    s="0";                                      //gets called when user presses back button as it deletes the last user input
  }
  if(s.length>=1){
    s=s.substring(0, s.length - 1);
    if(s==""){
      s="0";
    }
  }
  document.getElementById("answer").innerHTML =s;
}