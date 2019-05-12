/*
API Key
46a965a0430182134febba4583a36039
API Secret
a9d69dbcd7f48d6e3567a7547b9fff22
*/

/*
https://api.petfinder.com/pet.find?key=46a965a0430182134febba4583a36039&animal=dog&location=10976&format=json
*/


function searchBreed(){
	var breed = document.getElementById("field1").value;
	console.log(breed);
	localStorage.setItem('breed', breed);


	var url = "https://api.petfinder.com/pet.find?key=46a965a0430182134febba4583a36039&animal=dog&breed=" + breed + "&location=10976&format=json";
	var dogInfo;

	/*
	var dogInfo;
	$.getJSON(url, function(data) {
	*/

	$.ajax({
		crossOrigin: true,
		url : url,
		type : "GET",
		success:function(data){
		console.log(data);


		var petfinder = data.petfinder;
		var pets = petfinder.pets;
		var pet = pets.pet;

		var petList;


		for (i = 0; i < 25; i++) {
			// City
    		var city = pet[i]["contact"]["city"]["$t"];

    		// Age
    		var ag = pet[i]["age"]["$t"];
    		var age;
    		if (ag == "Young"){
    			age = "young";
    		} else if (ag == "Adult"){
    			age = "adult";
    		} else {
    			age = "senior";
    		}

    		// Photo
    		var pht;
    		var photo;
    		var mediaArray = pet[i]["media"];
    		console.log("keys: " + Object.keys(mediaArray));

    		if (Object.keys(mediaArray) == "photos"){
    			pht = pet[i]["media"]["photos"]["photo"][0]["$t"];
    		} else {
    			pht = "";
    		}
    		photo = "<img src=\"" + pht + "alt=\"No Picture Available\" width=\"120\" height=\"120\">";

    		// Size
    		var sz = pet[i]["size"]["$t"];
    		var size;
    		if (sz == "S"){
    			size = "small";
    		} else if (sz == "M"){
    			size = "medium";
    		} else {
    			size = "large";
    		}
    		
    		// Sex
    		var sx = pet[i]["sex"]["$t"];
    		var sex;
    		if (sx == "F"){
    			sex = "female";
    		} else if (sx == "M"){
    			sex = "male";
    		} else {
    			sex = "Undefined";
    		}

    		// Name
    		var nm = pet[i]["name"]["$t"];
    		var name;
    		if (nm == undefined){
    			name = "Undefined";
    		} else {
    			name = nm;
    		}

    		// Description
    		var dscrp = pet[i]["description"]["$t"];
    		var description;
    		if (dscrp == undefined){
    			name = "Undefined";
    		} else {
    			description = dscrp;
    		}

    		// Contact/Phone
    		var phone = pet[i]["contact"]["phone"]["$t"];

    		// Contact/Email
    		var email = pet[i]["contact"]["email"]["$t"];

    		




    		dogInfo = "<strong>There is a " + age + ", " + sex + " " + breed + " named " + name + " in " + city + ". <br></strong>" + description + "<br><br>" + photo + "<br><br><strong> Contact: </strong><br>" + "Phone: " + phone + "<br> Email: " + email + "<br> ______________________ <br>";

    		if (i == 0){
    			petList = "&#8226;" + " " + dogInfo + "<br><br>";
    		} else {
    			petList = petList + "<br>" + "&#8226;" + " " + dogInfo + "<br><br>";
    		}

		}
		document.getElementById("fullDogList").innerHTML = petList;
	}

	});
}

