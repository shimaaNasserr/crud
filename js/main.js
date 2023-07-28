// var el = ""
// for( var i=0;i<100; i++){
//     el+= '<div class="col-4 text-center"><h2 class="text-info">hello</h2></div>'
// }
// document.getElementById("myrow").innerHTML = el;

// function calcsum(x,y){
//   console.log(x+y);
// }
// calcsum(20)
// var userInput = document.getElementById("userName");
// var demoElement = document.getElementById("myh1")
// function welcome(){
//     var res = document.getElementById("userName").value
//     demoElement.innerHTML = "Hello " + res;
//     demoElement.style.color="red"
// }
//                  //   0           1        2       3           4        5
// var productsName = ['iphone11' , 'nokia' , 'lg' , 'iphone13' , 'lg' , 'sumsung']
// var nums = [80,10,60,100,20,87]
// console.log(nums.sort((a,b)=>a-b))
// var ff = productsName.splice(4,1)
// console.log(productsName)

// var vv = productsName.concat("aya")
// console.log(productsName)
// console.log(vv)

// //  productsName.unshift("aya")
// // console.log(productsName)
// // var newArray = productsName.splice(0,2)
// // console.log(productsName);
// // console.log(newArray);

// var product = {
//     name:"iphone",
//     price:{not:20000 , inc:15000},
//     color:["mintgreen" , "black" , "red" ,"purple"],
//     sale:true,
// }
// console.log(product.name)
// console.log(product.price.inc)
// console.log(product.color[1])
// console.log(product.sale)

// var products = [
//     {name:'nokia' , price:{inc:2000 , not:4000} , color:"gray"},
//     {name:'iphone' , price:20000 , color:"red"},
//     {name:'oppo' , price:7000 , color:["black" ,"red"]}
// ]
// products[1].price =40000;
// console.log(products)
// console.log(products.splice(0,1))
// console.log(products)
// var temp = ""
// for(var i=1995; i<2024; i++){
// temp += ' <option>'+i+'</option>'
// }
// document.getElementById("selectProduct").innerHTML = temp

var productName = document.getElementById("productname")
var productPrice = document.getElementById("productprice")
var productCategory = document.getElementById("producttype")
var producdescription = document.getElementById("productdesc")
var alertName1 = document.getElementById("alertName1")
var alertName2 = document.getElementById("alertName2")
var tr = document.getElementById("demo")
var alertPrice = document.getElementById("alertPrice")
var goodsList;
var currentIndex = 0

if(localStorage.getItem("data of goods")==null){
    goodsList =[];
} else{
    goodsList = JSON.parse(localStorage.getItem("data of goods"))
    display()
}
function addproduct(){
 if(validName()==true && validPrice()==true){
  var goods = {
    name:productName.value,
    price:productPrice.value,
    category:productCategory.value,
    description:producdescription.value
  }

  goodsList.push(goods)
  localStorage.setItem("data of goods" , JSON.stringify(goodsList))
  var res =  JSON.parse(localStorage.getItem("data of goods")).find((el)=>{
    return el.name == productName.value
  })
  if(res == undefined) {
    display();
    alertName1.classList.replace("d-block" , "d-none")
  }
  else {
    alertName1.classList.replace("d-none" , "d-block")  
    display();
 }
 }
 
}

function display(){
    var temp="";
    for (var i = 0; i < goodsList.length; i++) {
       temp+=` <tr>
       <td>`+i+`</td>
       <td>`+goodsList[i].name+`</td>
       <td>`+goodsList[i].price+`</td>
       <td>`+goodsList[i].category+`</td>
       <td>`+goodsList[i].description+`</td>
       <td><button type="button" class="btn btn-info" onclick="updateProduct(`+i+`)" >Update</button></td>
       <td><button type="button" class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button></td>
   </tr>`        
    }
    document.getElementById("demo").innerHTML = temp
}

function deleteProduct(index){
        goodsList.splice(index,1)
        display();
 localStorage.setItem("data of goods" , JSON.stringify(goodsList))
}

function clearForm(){
    productName.value=""
    productPrice.value=""
    productCategory.value="tv"
    producdescription.value=""

}
function searchProduct(){
    var temp="";
    var search = document.getElementById("searchh").value.toLowerCase()  
     for(var i =0; i<goodsList.length; i++){

    if(goodsList[i].name.toLowerCase().includes(search) ||goodsList[i].category.toLowerCase().includes(search)  ==true)
 {
//  console.log(goodsList[i].name)
temp+=` <tr>
<td>`+i+`</td>
<td>`+goodsList[i].name.toLowerCase().replace(search,"<span  class='text-danger fw-bold'>"+search+"</span>")+`</td>
<td>`+goodsList[i].price+`</td>
<td>`+goodsList[i].category.replace(search,"<span  class='text-danger fw-bold'>"+search+"</span>")+`</td>
<td>`+goodsList[i].description+`</td>
<td><button type="button" class="btn btn-info" >Update</button></td>
<td><button type="button" class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button></td>
</tr>` 
   }
  
     }
     document.getElementById("demo").innerHTML = temp
  


    // console.log(search)
    // console.log(goodsList)
}

 function updateProduct (pressedindex){
    currentIndex = pressedindex;
console.log(pressedindex);
productName.value=goodsList[pressedindex].name
productPrice.value=goodsList[pressedindex].price
productCategory.value=goodsList[pressedindex].category
producdescription.value=goodsList[pressedindex].description

document.getElementById("addProduct").style.display="none"
document.getElementById("addEdit").style.display=" inline-block"

}
function editProduct(){
goodsList[currentIndex].name = productName.value;
goodsList[currentIndex].price = productPrice.value
goodsList[currentIndex].category = productCategory.value
goodsList[currentIndex].description = producdescription.value
    display()
    localStorage.setItem("data of goods" , JSON.stringify(goodsList))
    document.getElementById("addProduct").style.display="inline-block"
document.getElementById("addEdit").style.display="none"
clearForm()

}
productName.addEventListener("change" ,validName )


function validName(){
  let reg = /^[A-Z][a-z]{3,15}[0-9]?$/
if( reg.test(productName.value) == true){
 alertName2.classList.replace("d-block","d-none")
 productName.classList.add("is-valid")
 productName.classList.remove("is-invalid")
 return true;
}
else {
 alertName2.classList.replace("d-none","d-block")
 productName.classList.add("is-invalid")
 productName.classList.remove("is-valid")
return false;

}
}

productPrice.addEventListener("blur", validPrice)

function validPrice(){
  let regPrice = /^[1-9][0-9]{1,4}$/
  if(regPrice.test(productPrice.value)==true){
    alertPrice.classList.replace("d-block" , "d-none")
    productName.classList.add("is-valid")
    productName.classList.remove("is-invalid")
    return true
  }
  else {
    alertPrice.classList.replace("d-none" , "d-block")
    productName.classList.add("is-valid")
    productName.classList.remove("is-invalid")
    return false
  }
}

// var strring = "I love Js"
// console.log(strring.repeat(2,"h"))
// console.log(strring.replace("love", "hate"))






// localStorage.setItem("shimaa","girl")
// localStorage.setItem("doha","boy")
// localStorage.setItem("hala","front")
// localStorage.setItem("sara","data")
// localStorage.setItem("salma","waw")
// console.log(localStorage.getItem("shimaa"))
// console.log(localStorage.length)
// console.log(localStorage.removeItem("hala"))
// console.log(localStorage.clear())


// var list = [
//     {name:"shimaa" , title:"ismailia"},
//     {name:"shimaa" , title:"ismailia"},
//     {name:"shimaa" , title:"ismailia"},
//     {name:"shimaa" , title:"ismailia"}
// ]
// localStorage.setItem("data of list" , JSON.stringify(list))
// console.log(localStorage.getItem("data of list"))


