// 
// Search meal by name
// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

// List all meals by first letter
// www.themealdb.com/api/json/v1/1/search.php?f=a

// Lookup full meal details by id
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772

// Lookup a single random meal
// www.themealdb.com/api/json/v1/1/random.php



// List all meal categories
// www.themealdb.com/api/json/v1/1/categories.php




// List all Categories, Area, Ingredients
// www.themealdb.com/api/json/v1/1/list.php?c=list
// www.themealdb.com/api/json/v1/1/list.php?a=list
// www.themealdb.com/api/json/v1/1/list.php?i=list

// Filter by main ingredient
// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast


// Filter by Category
// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
// Filter by Area
// www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

// Images
// Meal Thumbnail Images
// Add /preview to the end of the meal image URL
// /images/media/meals/llcbn01574260722.jpg/preview

// Ingredient Thumbnail Images
// www.themealdb.com/images/ingredients/Lime.png
// www.themealdb.com/images/ingredients/Lime-Small.png


// strMeal  for meal name 
//strMealThumb  for image
// strCategory category
// strTags tage
// strYoutube  
//
//
//


$('.open-close-bar').click( function (){
    var x = $('.sticky-sidebar').offset()
    // console.log(x);
    if ( x.left == "0" ){
        $('.inner-sidebar').animate({
            right: "85%",
            left : "0",
            function: $('.fa-bars').css('display',"none"),
            function: $('.fa-xmark').css('display',"block"),
            
            function : $('.sticky-sidebar').animate({
                left : "15%"
            }, 500 , function(){
                $('.list-of-sidebar div a').animate({
                    position : "absoulte",
                    top : "0",
                    left : "0",
                    color: "blue",
                    backgroundColor : "red",
                }, 1000 , console.log("ezayaaak"))
            } )
            
        } , 500 )
    }else{
        $('.inner-sidebar').animate({
            right: "100%",
            left : "-100%",
            function: $('.fa-bars').css('display',"block"),
            function: $('.fa-xmark').hide(500),
           
            function : $('.sticky-sidebar').animate({
                left : "0%"
            }, 500 ,console.log(x))
        } , 500 )
    }
} )


let allFoods = [];

let categoryList = [];

let areaList = [];

let ingredientList = [];

let typeIngredient = [];

let foodOfArea = [];

async function foods() {
    for ( let i = 52770 ; i < 52800 ; i ++ ){
        var reqApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`);
        var apiResult = await reqApi.json();
        if ( apiResult.meals != null ){
            allFoods.push(apiResult);
        }
    }
    display();
    
    listFoods();

    listAreas();
   
    listIngredient();
 };

 async function display(){
    var html = "";
    for ( let i = 0 ; i < allFoods.length ; i++ ){
         if(allFoods[i].meals != null){

            var id = allFoods[i].meals[0].idMeal;
            html+= `
            <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="contents rounded-2" id="${id}" onclick="getIngredientDetailsOfFood(${id})">
                    <div class="food-content">
                        <img src="${allFoods[i].meals[0].strMealThumb} " alt="" class="rounded-2">
                        <div class="layer rounded-2 fs-3  fw-bolder" onclick="getIngredientDetailsOfFood(${id})">
                            <p class="">${allFoods[i].meals[0].strMeal}</p>
                        </div>
                    </div>
                </div>
            </div>          
            `
        }
        else{
            html+= " "
        }
    }
    await $('.all-food-content').html(html);
 }


 // get food categorylist
async function listFoods(){
    // https://www.themealdb.com/api/json/v1/1/categories.php
        var listCategoryApi = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        var listCategoryResult = await listCategoryApi.json();
        categoryList.push(listCategoryResult.categories);
        console.log(categoryList[0][0]);
        displayCategoryList();
};


 async function displayCategoryList(){
    var htmlCategory = "";
        for ( let i = 0 ; i < categoryList[0].length ; i++ ){
            // console.log(categoryList[0].meals[i].strCategory);
            htmlCategory += `
                <div class=" col-sm-12 col-md-6 col-lg-3">
                    <div class="contents rounded-2" id="${categoryList[0][i].strCategory}" onclick="getFoodsOfcategory(${categoryList[0][i].strCategory})">
                        <div class="food-content" onclick="getFoodsOfcategory(${categoryList[0][i].strCategory})">
                                <img src="${categoryList[0][i].strCategoryThumb}" alt="" class=" rounded-2 ">
                            <div class="layer rounded-2" onclick="getFoodsOfcategory(${categoryList[0][i].strCategory})">
                                <p class="px-4 fs-2">${categoryList[0][i].strCategory}</p>
                            </div>
                        </div>
                    </div>
                </div>        
                `    
     }
     await $('.catgeory-contents').html(htmlCategory);
   
}


// get area's food
async function listAreas(){
    var listAreaApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    var listAreaResult = await listAreaApi.json();
    areaList.push(listAreaResult);
    // console.log(categoryList);
    displayAreaList();
};


async function displayAreaList(){
    // strArea
    var htmlArea = "";
        for ( let i = 0 ; i < areaList[0].meals.length ; i++ ){
            // console.log(areaList[0].meals[i].strArea);
            var foodArea = areaList[0].meals[i].strArea;
            htmlArea += `
            <div class="col-sm-12 col-md-6 col-lg-3" id="${foodArea}">
                <div class="food-areas text-center d-flex flex-column  align-items-center" onclick="getFoodsOfArea(${foodArea})">
                    <i class="fa-solid fa-city fa-3x" onclick="getFoodsOfArea(${foodArea})"></i>
                    <p class="fs-2 text-white" onclick="getFoodsOfArea(${foodArea})">${foodArea}</p>
                </div>
            </div>      
            `    
     }
     await $('.area-contents').html(htmlArea);
   
}

// get ingredient list
async function listIngredient(){
    var listIngredientApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    var listIngredientResult = await listIngredientApi.json();
    ingredientList.push(listIngredientResult.meals); 
    // console.log(ingredientList[0][0]);
    displayIngredientList();
};


async function displayIngredientList(){
    //  strIngredient  strDescription
    var htmlIngredients = "";
        for ( let i = 0 ; i < ingredientList[0].length ; i++ ){
            if (ingredientList[0][i].strDescription != null  ){
                // console.log(ingredientList[0][i].strIngredient);
                var definedIngredientName = ingredientList[0][i].strIngredient;
                var y = definedIngredientName.replaceAll(" ","_");
                htmlIngredients += `
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="igredients" id="${y}">
                            <div class="ingredient-content text-center ingredientClassName" onclick="getTypeIngredient(${y})">
                                <i class="fa-solid fa-bowl-food fa-3x ingredientClassName"  onclick="getTypeIngredient(${y})"></i>
                                <p class="ingredientTitle fw-bold fs-2 ingredientClassName"  onclick="getTypeIngredient(${y})">${definedIngredientName}</p>
                                <p class="ingredientClassName"  onclick="getTypeIngredient(${ingredientList[0][i].strIngredient})">${ingredientList[0][i].strDescription}</p>
                            </div>     
                        </div>
                    </div>      
                    `    
            }else{
                htmlIngredients += ` `;
            }
        }
        await $('.ingredient-contents').html(htmlIngredients);
}


// get type food from ingredient
async function getTypeIngredient(x){
    var y = x.getAttribute("id");

    var typrIngredientApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${y}`);
    console.log(typrIngredientApi);
    var typeIngredientResult = await typrIngredientApi.json();
        
    if (typeIngredient.length  >= 0){
        typeIngredient.splice(typeIngredient[0],1);
        typeIngredient.push(typeIngredientResult);  
    } 
    displayIngredientType();
};


async function displayIngredientType(){
    var htmlIngredientType = "";
        for ( let i = 0 ; i < typeIngredient[0].meals.length ; i++ ){
                // console.log(typeIngredient[0].meals[i].strMeal);
                htmlIngredientType += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="contents rounded-2">
                        <div class="food-content">
                            <img src="${typeIngredient[0].meals[i].strMealThumb}" alt="" class=" rounded-2 ">
                            <div class="layer rounded-2">
                                <p class="px-4 fs-2">${typeIngredient[0].meals[i].strMeal}</p>
                            </div>
                        </div>
                    </div>
                </div> 
                `   
        }
        await $('.ingredient-contents').html(htmlIngredientType);
}


// www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

// get area foods
async function getFoodsOfArea(area){
    var areaName = area.getAttribute("id");
    console.log(areaName);

    var foodAreaApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    console.log(foodAreaApi);
    var foodAreaApiResult = await foodAreaApi.json();
    console.log(foodAreaApiResult);
    if (foodOfArea.length  >= 0){
        foodOfArea.splice(foodOfArea[0],1);
        foodOfArea.push(foodAreaApiResult);  
    } 
    displayFoodOFArea();
};


async function displayFoodOFArea(){
    var htmlFoodOFArea = "";
        for ( let i = 0 ; i < foodOfArea[0].meals.length ; i++ ){
                // console.log(typeIngredient[0].meals[i].strMeal);
                htmlFoodOFArea += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="contents rounded-2">
                        <div class="food-content">
                            <img src="${foodOfArea[0].meals[i].strMealThumb}" alt="" class=" rounded-2 ">
                            <div class="layer rounded-2">
                                <p class="px-4 fs-2">${foodOfArea[0].meals[i].strMeal}</p>
                            </div>
                        </div>
                    </div>
                </div> 
                `   
        }
        await $('.area-contents').html(htmlFoodOFArea);
}



// search by name
let seachedNamedArray = []
async function searchByName( term ){

    var searchedNamed = term.replaceAll(" ","_");
    var searchedNamedApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedNamed}`);
    var searchedNamedApiResult = await searchedNamedApi.json();
    console.log(searchedNamedApiResult , "first");

    if (seachedNamedArray.length  >= 0){
        seachedNamedArray.splice(seachedNamedArray[0],1);
        seachedNamedArray.push(searchedNamedApiResult.meals);  
    } 
    console.log(seachedNamedArray, "hhhhshsh");
    await displaySearchedFood();
}


async function displaySearchedFood(){
    var htmlSearchedFood = "";
        for ( let i = 0 ; i < seachedNamedArray[0].length ; i++ ){
                console.log(seachedNamedArray[0][i].strMeal);
                htmlSearchedFood += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="contents rounded-2">
                        <div class="food-content">
                            <img src="${seachedNamedArray[0][i].strMealThumb}" alt="" class=" rounded-2 ">
                            <div class="layer rounded-2">
                                <p class="px-4 fs-2">${seachedNamedArray[0][i].strMeal}</p>
                            </div>
                        </div>
                    </div>
                </div> 
                `   
        }
        await $('.searchedFoodContents').html(htmlSearchedFood);
}




// search by first letter
// www.themealdb.com/api/json/v1/1/search.php?f=a
let seachedFirstLetterArray = []

async function searchByFirstLetter( term ){

    var searchedNamed = term.replaceAll(" ","_");
    var getFirstLetter = searchedNamed.charAt(0);
    
    var searchedNamedApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${getFirstLetter}`);
    var searchedNamedApiResult = await searchedNamedApi.json();
    console.log(searchedNamedApiResult , "first");

    if (seachedNamedArray.length  >= 0){
        seachedNamedArray.splice(seachedNamedArray[0],1);
        seachedNamedArray.push(searchedNamedApiResult.meals);  
    } 
    console.log(seachedNamedArray, "hhhhshsh");
    await displaySearchedFoodByFirstLetter();
}


async function displaySearchedFoodByFirstLetter(){
    var htmlSearchedFood = "";
        for ( let i = 0 ; i < seachedNamedArray[0].length ; i++ ){
                console.log(seachedNamedArray[0][i].strMeal);
                htmlSearchedFood += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="contents rounded-2">
                        <div class="food-content">
                            <img src="${seachedNamedArray[0][i].strMealThumb}" alt="" class=" rounded-2 ">
                            <div class="layer rounded-2">
                                <p class="px-4 fs-2">${seachedNamedArray[0][i].strMeal}</p>
                            </div>
                        </div>
                    </div>
                </div> 
                `   
        }
        await $('.searchedFoodContents').html(htmlSearchedFood);
}





// regex validation 

var newUserName = document.getElementById("yourName");
var newUserEmail = document.getElementById("yourEmail");
var newUserPhone = document.getElementById("YourPhone");
var newUserAge = document.getElementById("YourAge");
var newUserPassword = document.getElementById("YourPassword");
var newConfirmPassword = document.getElementById("ConfrimPassword");



function validateRegexEmail() {
    var regexUserName = /^[a-z0-9_-]{3,16}$/igm;
    if( newUserName.value.match(regexUserName) ){
        return true;
    }else{
        return false;
    }
}

function validateRegexEmail() {
    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if( newUserEmail.value.match(regexEmail) ){
        return true;
    }else{
        return false;
    }
}

function CheckRegexPassword() { 
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(newUserPassword.value.match(passw)){
        return true;
    }else{ 
        
        return false;
    }
}

function CheckPhoneNumber(){
    var regexphone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(newUserPhone.value.match(regexphone)){
        return true;
    }else{ 
        
        return false;
    }
}

function checkConfirmPassword(){
    if ( CheckRegexPassword() ){
        if ( newUserPassword.value  ===  newConfirmPassword.value ){
            return true;
        }
        else{
            return false;
        }
    }
}

function confirmation(){
    if ( validateRegexEmail() && validateRegexEmail() && CheckRegexPassword()&&  CheckPhoneNumber()&& checkConfirmPassword()){
        $('.disabled-active-btn').css('disabled' , 'active');
    }
}


// window.addEventListener("load", function () {
//     $('.loodingScreen').fadeOut('3000' , function (){
//         $(document.body).css('overflowY' , 'scroll');
//     });
// });

$(document).ready( function (){
    foods();
    $('.loadingScreen').fadeOut(5000 , function (){
        $(document.body).css('overflowY' , 'scroll');
        
    });
    
    
    
} )


// show fooods ingredients and detials from index file
// show-food-ingredients

ingredientDetialsArr = [];
async function getIngredientDetailsOfFood(idIngredient){
    // var idIngredient = id.getAttribute("id");
    // console.log(idIngredient);

    // www.themealdb.com/api/json/v1/1/lookup.php?i=52772
    
    var ingredientDetailsApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idIngredient}`);
    // console.log(ingredientDetailsApi);

    var ingredientDetailsApiResult = await ingredientDetailsApi.json();
    // console.log(ingredientDetailsApiResult);

    if (ingredientDetialsArr.length  >= 0){
        ingredientDetialsArr.splice(ingredientDetialsArr[0],1);
        ingredientDetialsArr.push(ingredientDetailsApiResult);  
    } 
    // console.log(typeof(ingredientDetialsArr));
    // console.log(ingredientDetialsArr[0].meals[0].strCategory);
    
    displayIngredientsDetailsOfFood();
};


async function displayIngredientsDetailsOfFood(){
    var htmlIngredientDetails = "";

    var arr  = ingredientDetialsArr[0].meals[0].strTags;
    var newArr = arr.split(',')
    var htmlTagRecipe = ""
    for (let i = 0 ; i < newArr.length ; i++){
        // tag-recipe-lists
        htmlTagRecipe+= `
        <span >${newArr[i]}</span>
        `
        console.log(newArr[i]);
    }
    
    // var recipelist = await $('.tag-recipe-lists').html(htmlTagRecipe);
    // console.log(typeof(recipelist) , recipelist.getAttribute());

         // console.log(typeIngredient[0].meals[i].strMeal);
         htmlIngredientDetails += `

         <div class="row py-5">      
             <div class="col-sm-12 col-md-4 ">
                 <div class="contents rounded-2">
                     <div class="food-content">
                         <img src="${ingredientDetialsArr[0].meals[0].strMealThumb}" alt="" class=" rounded-2 ">
                         <div class="rounded-2">
                             <p class="fs-2 text-white">${ingredientDetialsArr[0].meals[0].strMeal}</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             
             <div class="col-sm-12 col-md-8 ">
                 <div class=" rounded-2">
                     <div class="food-recipes text-white">
                         <p class="fs-3 fw-bold">Instruction</p>
                         <p class="details">${ingredientDetialsArr[0].meals[0].strInstructions}</p>
                         <div>
                             <ul class="list-unstyled"> 
                                 <li>Area : <span>${ingredientDetialsArr[0].meals[0].strArea}</span></li>
                                 <li>Categroy : <span>${ingredientDetialsArr[0].meals[0].strCategory}</span></li>
                                 <li >Recipe :
                                     <ul class="recipelists row gy-2">
                                         <li class="recipe"> 
                                             <span>${ingredientDetialsArr[0].meals[0].strIngredient1}  ${ingredientDetialsArr[0].meals[0].strMeasure1}</span>
                                         </li>
                                         <li class="recipe">
                                            <span>${ingredientDetialsArr[0].meals[0].strIngredient2}  ${ingredientDetialsArr[0].meals[0].strMeasure2}</span>
                                         </li>
                                        <li class="recipe">
                                            <span>${ingredientDetialsArr[0].meals[0].strIngredient3}   ${ingredientDetialsArr[0].meals[0].strMeasure3}</span>
                                        </li>
                                        <li class="recipe">
                                            <span>${ingredientDetialsArr[0].meals[0].strIngredient4}   ${ingredientDetialsArr[0].meals[0].strMeasure4}</span>
                                        </li>        
                                        <li class="recipe">
                                            <span>${ingredientDetialsArr[0].meals[0].strIngredient4}   ${ingredientDetialsArr[0].meals[0].strMeasure5}</span>
                                        </li>  
                                        <li class="recipe">
                                            <span>${ingredientDetialsArr[0].meals[0].strIngredient6}   ${ingredientDetialsArr[0].meals[0].strMeasure6}</span>
                                        </li>  
                                        <li class="recipe">
                                            <span>${ingredientDetialsArr[0].meals[0].strIngredient7}   ${ingredientDetialsArr[0].meals[0].strMeasure7}</span>
                                        </li>
                                        <li class="recipe">
                                            <span>${ingredientDetialsArr[0].meals[0].strIngredient8}    ${ingredientDetialsArr[0].meals[0].strMeasure8}</span>
                                        </li>
                                        <li class="recipe">
                                        <span>${ingredientDetialsArr[0].meals[0].strIngredient9}   ${ingredientDetialsArr[0].meals[0].strMeasure9}</span>
                                        </li>
                                     </ul>
                                 </li>
                                 <li>
                                     Tags :
                                     <li class="tag-recipe tag-recipe-lists">
                                                ${htmlTagRecipe}
                                     </li>
                                     
                                 </li>                                       
                             </ul>
                         </div>

                         <div class="">
                             <a href="${ingredientDetialsArr[0].meals[0].strSource}">
                             <button class="btn btn-success" >Source</button>
                             </a>
                             <a href="${ingredientDetialsArr[0].meals[0].strYoutube}">
                                <button class="btn btn-danger">You Tube</button>
                             </a>
                         </div>
                        
                     </div>
                 </div>
             </div>
         </div>

         `   
 
    await $('.show-food-ingredient').html(htmlIngredientDetails);
              
}



// git foood catgeory from catgeoy list
catgeoryFoodArr = [];
async function getFoodsOfcategory(catgeoryName){
    // console.log(.v);

    // var selectedCategory = catgeoryName.replaceAll(" ","_");
    var category = catgeoryName.getAttribute("id");
    // www.themealdb.com/api/json/v1/1/list.php?c=list
    //https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken
    var categoryFoodApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    // console.log(categoryFoodApi);
    var categoryFoodApiResult = await categoryFoodApi.json();
//     console.log(categoryFoodApiResult);
    
    if (catgeoryFoodArr.length  >= 0){
        catgeoryFoodArr.splice(catgeoryFoodArr[0],1);
        catgeoryFoodArr.push(categoryFoodApiResult.meals);
    } else{
        catgeoryFoodArr.push(categoryFoodApiResult.meals);
    }
          
    
    console.log(catgeoryFoodArr[0][1].strMeal);
    displayFoodCategory();
};


async function displayFoodCategory(){
    var htmlFoodOFCatgeory = "";
        for ( let i = 0 ; i < catgeoryFoodArr[0].length ; i++ ){
                // console.log(typeIngredient[0].meals[i].strMeal);
                htmlFoodOFCatgeory += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="contents rounded-2">
                        <div class="food-content">
                            <img src="${catgeoryFoodArr[0][i].strMealThumb}" alt="" class=" rounded-2 ">
                            <div class="layer rounded-2">
                                <p class="px-4 fs-2">${catgeoryFoodArr[0][i].strMeal}</p>
                            </div>
                        </div>
                    </div>
                </div> 
                `   
        }
        await $('.catgeory-food-lists').html(htmlFoodOFCatgeory);
}
