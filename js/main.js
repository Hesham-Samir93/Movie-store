// for trending   https://api.themoviedb.org/3/trending/movie/week?api_key=ab40527ef17824705da5e5b4101fd10a
// for other cats https://api.themoviedb.org/3/movie/now_playing?api_key=ab40527ef17824705da5e5b4101fd10a&language=en-US&page=1
// image concate https://image.tmdb.org/t/p/w500/                 
//now_playing-popular-top_rated-upcoming
let myOtherCats=[];
let myDataTrendingMovie=[];
let links= $('a')
let category="now_playing"
let selectedCat=""
let validName=/^[a-zA-Z]+$/ ;
let validPhone=/^(002)?(\+02)?01[0125][0-9]{8}$/ ;
let validAge=/^([1-9][0-9]?|100)$/ ;
let validEmail=/^[A-Za-z0-9]+([._][A-Za-z0-9]+)?[@][a-z]+[.][a-z]{2,3}$/ ;
let validPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/;
let validrePass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/;
let repassVal='';
let passVal='';
let contact_Position= $("#contact").offset().top
let counter=0;
 getCats("now_playing")
// getTrending()

//traveling using nav
links.click(function(){
  
 let clicked =$(this).attr('href')
 selectedCat= clicked.substr(1, clicked.length)
if(selectedCat=="trending")
{
  getTrending()
}
else if(selectedCat=="contact")
{

  $("html, body").animate({screenTop:contact_Position},500)
}
else
{
  $("html, body").animate({screenTop:"0"},500)
  getCats(selectedCat)
}

})

//get category
async function getCats(category) {
   let x= await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=ab40527ef17824705da5e5b4101fd10a`)
     myOtherCats = (await (x.json())).results;
    console.log(myOtherCats)
 displayAll()   
}
//get trending
async function getTrending() {
    let x= await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=ab40527ef17824705da5e5b4101fd10a")
    myDataTrendingMovie = (await (x.json())).results;
    console.log(myDataTrendingMovie);
    displayTrendings()
 }

 // display for Cats
 function displayAll() {
     let result =""
     for (let i=0;i<myOtherCats.length;i++) {
         result +=` <div class="col-md-4 mb-4 ">
         <div class="item rounded-3 position-relative text-center">
           <img src="https://image.tmdb.org/t/p/w500/${myOtherCats[i].poster_path}" class=" img-fluid" alt="">
 
           <div class="item-cover  d-flex justify-content-center align-items-center">
             <div class="p-1 ">
               <h3 class="mb-4">${myOtherCats[i].original_title}</h3>
               <p>${myOtherCats[i].overview}</p>
               <p>rate:${myOtherCats[i].vote_average} </p>
               <p>${myOtherCats[i].release_date}</p>
             </div>
           </div>
         </div>
       </div>`
     }
     $("#for-display").html(result);
 }
// display for trending
 function displayTrendings() {
    let result =""
    for (let i=0;i<myDataTrendingMovie.length;i++) {
        result +=` <div class="col-md-4 mb-4 ">
        <div class="item rounded-3 position-relative text-center">
          <img src="https://image.tmdb.org/t/p/w500/${myDataTrendingMovie[i].poster_path}" class=" img-fluid" alt="">

          <div class="item-cover  d-flex justify-content-center align-items-center">
            <div class="p-1 ">
              <h3 class="mb-4">${myDataTrendingMovie[i].original_title}</h3>
              <p>${myDataTrendingMovie[i].overview}</p>
              <p>rate:${myDataTrendingMovie[i].vote_average} </p>
              <p>${myDataTrendingMovie[i].release_date}</p>
            </div>
          </div>
        </div>
      </div>`
    }
    $("#for-display").html(result);
}

//search movie
function search(saerchWord)
{
    let result =""
   for(let i=0; i<myOtherCats.length;i++)
   {
       if((myOtherCats[i].original_title).toLowerCase().includes(saerchWord.toLowerCase()) )
       {

        result +=` <div class="col-md-4 mb-4 ">
        <div class="item rounded-3 position-relative text-center">
          <img src="https://image.tmdb.org/t/p/w500/${myOtherCats[i].poster_path}" class=" img-fluid" alt="">

          <div class="item-cover  d-flex justify-content-center align-items-center">
            <div class="p-1 ">
              <h3 class="mb-4">${myOtherCats[i].original_title}</h3>
              <p>${myOtherCats[i].overview}</p>
              <p>rate:${myOtherCats[i].vote_average} </p>
              <p>${myOtherCats[i].release_date}</p>
            </div>
          </div>
        </div>
      </div>`

       }
 
    
   } 
   document.getElementById("for-display").innerHTML=result;
}

// control the side bar
let sideWidth= ($(".side-bar").width())
$(".side_all").css('left',-sideWidth);
$("#close").click(function() {
  let left=$(".side_all").css("left")    
     
     if(left!="0px")
     {
         $(".side_all").animate({'left': "0px"},500);
        $("#close").removeClass("fa-times")
        $("#close").removeClass(" fa-align-justify")
        $("#close").addClass("fas")
        $("#close").addClass("fa-bars")
        $("h6").animate({"top":"0px"},1000)
    }
    else
    {
        $(".side_all").animate({'left':-sideWidth},500);
        $("#close").removeClass("fas")
        $("#close").removeClass("fa-bars")
        $("#close").addClass("fa-times")
        $("#close").addClass("fa-align-justify")
        $("h6").animate({"top":"110%"},300)
    }
    
   
})

///for validation 

$(".name").keyup(function(){
  let nameVal=$(".name").val()
if(validName.test(nameVal)==true)
{

  $(".name").addClass("is-valid");
  $(".name").next().hide();
  $(".name").removeClass("is-invalid"); 
  counter++;     
}
else if(nameVal=="")
{
  $(".name").next().hide();
  $(".name").removeClass("is-invalid");
  $(".name").removeClass("is-valid");
}
else
{

  $(".name").next().show();
  $(".name").addClass("is-invalid");
  $(".name").removeClass("is-valid");
}

})


$(".phone").keyup(function(){
  let phoneVal=$(".phone").val()
if(validPhone.test(phoneVal)==true)
{

  $(".phone").addClass("is-valid");
  $(".phone").next().hide();
  $(".phone").removeClass("is-invalid");    
  counter++;  
}
else if(phoneVal=="")
{
  $(".phone").next().hide();
  $(".phone").removeClass("is-invalid");
  $(".phone").removeClass("is-valid");
}
else
{

  $(".phone").next().show();
  $(".phone").addClass("is-invalid");
  $(".phone").removeClass("is-valid");
}

})

$(".mail").keyup(function(){
  let mailVal=$(".mail").val()
if(validEmail.test(mailVal)==true)
{

  $(".mail").addClass("is-valid");
  $(".mail").next().hide();
  $(".mail").removeClass("is-invalid");   
  counter++;   
}
else if(mailVal=="")
{
  $(".mail").next().hide();
  $(".mail").removeClass("is-invalid");
  $(".mail").removeClass("is-valid");
}
else
{

  $(".mail").next().show();
  $(".mail").addClass("is-invalid");
  $(".mail").removeClass("is-valid");
}

})

$(".age").keyup(function(){
  let ageVal=$(".age").val()
if(validAge.test(ageVal)==true)
{

  $(".age").addClass("is-valid");
  $(".age").next().hide();
  $(".age").removeClass("is-invalid");   
  counter++;   
}
else if(ageVal=="")
{
  $(".age").next().hide();
  $(".age").removeClass("is-invalid");
  $(".age").removeClass("is-valid");
}
else
{

  $(".age").next().show();
  $(".age").addClass("is-invalid");
  $(".age").removeClass("is-valid");
}

})

$(".password").keyup(function(){
   passVal=$(".password").val()
if(validPass.test(passVal)==true )
{

  $(".password").addClass("is-valid");
  $(".password").next().hide();
  $(".password").removeClass("is-invalid"); 
  counter++;     
}
else if(passVal=="")
{
  $(".password").next().hide();
  $(".password").removeClass("is-invalid");
  $(".password").removeClass("is-valid");
}
else
{

  $(".password").next().show();
  $(".password").addClass("is-invalid");
  $(".password").removeClass("is-valid");
}

})

 
$(".repassword").keyup(function(){
  let repassVal=$(".repassword").val()
if(validrePass.test(repassVal)==true&&passVal==repassVal )
{

  $(".repassword").addClass("is-valid");
  $(".repassword").next().hide();
  $(".repassword").removeClass("is-invalid"); 
  counter++;     

}
else if(repassVal=="")
{
  $(".repassword").next().hide();
  $(".repassword").removeClass("is-invalid");
  $(".repassword").removeClass("is-valid");
}
else
{

  $(".repassword").next().show();
  $(".repassword").addClass("is-invalid");
  $(".repassword").removeClass("is-valid");
}


})

//Loading screen
$(document).ready(function() {
  $(".onload").fadeOut(1000)
  $("body").css("overflow","auto");
})

