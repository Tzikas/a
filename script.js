 $(document).ready(function(){

  $('form').on('submit', function(e){
    e.preventDefault(); 
    console.log("The zip code is: " + $('#zipcode-input').val())
    makeApiCall($('#zipcode-input').val())
  })


});




 var shelters = []; 
 
 var petDictionary = {};
//http://api.petfinder.com/pet.find?location=97062&key=a4d4d400939b10647da19b7593286b34&output=full&format=json
//http://api.petfinder.com/pet.getRandom?format=json&key=a4d4d400939b10647da19b7593286b34&animal=dog&output=basic

function makeApiCall(searchObj){
//http://api.petfinder.com/shelter.get?id=SD08&format=json&key=a4d4d400939b10647da19b7593286b34&animal=smallfurry&output=basic


var str = jQuery.param( searchObj );
console.log(str);

 var url = `https://api.petfinder.com/pet.find?${str}&key=a4d4d400939b10647da19b7593286b34&output=full&format=json`;


 console.log(url)
 



 //var url = `http://api.petfinder.com/pet.find?location=${zipcode}&key=a4d4d400939b10647da19b7593286b34&output=full&format=json`;
return $.ajax({
  type : 'GET',
  data : {},
  url : url+'&callback=?' ,
  dataType: 'json',
  success : function(data) {              
    if(!data.petfinder.pets){
      return "no pets"
    }

    shelters = [];


    let html = ""

    let pets = data.petfinder.pets.pet;
    pets.forEach(function(pet,e) { 


      petDictionary[pet.id.$t] = pet;




      if(shelters.indexOf(pet.shelterId.$t) < 0) {
       shelters.push(pet.shelterId.$t)
     }




     if (e % 3 === 0){
            //make a new row
            html += `</div><div class="row">`

          }



          html +=   
          `<div class="col-4">
          <div class="card">
          <div class="card-content">`
          
          html += findImage(pet)
          
          html += `<h3><a onclick="showPetProfile(${pet.id.$t})">${pet.name.$t}</a></h3>
          <p>Gender: ${pet.sex.$t}</p>
          <p>I am a ${pet.breeds.breed.$t}.</p>
          <p>${pet.age.$t}</p>
          <span>I live in ${pet.contact.city.$t},<span><span>${pet.contact.state.$t}</span>

          </div>
          </div>
          </div>`



          //console.log(pet)


        })





    html = "<div>" + html + "</div>"

    $('#results').html(html)
      //$('#js-description').html(html)

    },
    error : function(request,error)
    {
      alert("Request: "+JSON.stringify(request));
    }

  });

}


function findImage(pet){
  if(!pet.media.photos){
    return "no pet photos"
  }
 for(var c = 0; c< pet.media.photos.photo.length; c++){
  if(pet.media.photos.photo[c]['@size'] == "x") {
    return `<img class="card-image" src = "${pet.media.photos.photo[c].$t}"/>`
  }
}
}

function showPetProfile(id) {





//function showPetProfile(id)
//{


  var dogProfileHtml = 
  `<div id="name">${petDictionary[id].name.$t}</div>
  <div id ="js-description">${petDictionary[id].description.$t}<div>
  <div>I am a ${petDictionary[id].breeds.breed.$t}</div>
  <div>And I live in ${petDictionary[id].contact.city.$t},</div> 
  <div>${petDictionary[id].contact.state.$t}</div>
  <div>Zip Code: ${petDictionary[id].contact.zip.$t}</div>
  <div>Please call: ${petDictionary[id].contact.phone.$t}</div>
  <div>Or email: ${petDictionary[id].contact.email.$t}</div>`;

  let breed = petDictionary[id].breeds.breed.$t;
  if (petDictionary[id].mix.$t == "yes") {
   dogProfileHtml += `<div class="mix">I am an amazing mixed breed.</div>`
 }
 let gender = petDictionary[id].sex.$t;
 if (petDictionary[id].sex.$t === "M") {
   dogProfileHtml += `<div class="male">I am a Male.</div>`
 }
 if(petDictionary[id].sex.$t === "F"){
  dogProfileHtml += `<div class="female">I am a Female.</div>`
}

for(var k = 0; k<petDictionary[id].media.photos.photo.length; k++){
  if(petDictionary[id].media.photos.photo[k]['@size'] == "x") {
    dogProfileHtml +=`<img class="profile-image" src = "${petDictionary[id].media.photos.photo[k].$t}"/>`
  }
}


$("#results").html(dogProfileHtml);
}

jQuery(document).ready(function (e) {
  function t(t) {
    e(t).bind("click", function (t) {
      t.preventDefault();
      e(this).parent().fadeOut()
    })
  }
  e(".dropdown-toggle").click(function () {
    var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
    e(".button-dropdown .dropdown-menu").hide();
    e(".button-dropdown .dropdown-toggle").removeClass("active");
    if (t) {
      e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
    }
  });
  e(document).bind("click", function (t) {
    var n = e(t.target);
    if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
  });
  e(document).bind("click", function (t) {
    var n = e(t.target);
    if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
  })
});

//    makeApiCall($('#zipcode-input').val())
$('input[type=radio]').change(
  function(){ 
    
    $('input[type=radio]:checked' ).each(function () {

      searchObj[this.name] = this.value
    })
    
      
    makeApiCall(searchObj)
    console.log(searchObj)
    
  }
  )



