/* Todo
	Maybe
		Changing BorderTop(Left/Right)Radius = 0 when navbar is sticked e.g. after ~60px scroll.
*/


/*========== Random Shit ==========*/
// Slider
let slider = document.getElementById("section-filter-priceslider");
let output = document.getElementById("section-filter-price-selected");

// Products
let allProducts = [];
let filteredAllProducts = [];
class Product {
	constructor(productName, carbonFootprint, productTaggs = [], imageFile, price, isNärodlad, isEkological) {
		this.productName = productName;
		this.carbonFootprint = carbonFootprint;
		this.productTaggs = productTaggs;
		this.imageFile = imageFile;
		this.price = price;
		this.isNärodlad = isNärodlad;
		this.isEkological = isEkological;
	}
}

/* Slider value change */
slider.oninput = () => {
	output.innerHTML = `${this.value} kr`;
}

/*========== Adding submit event listener to nav-form ==========*/
document.getElementById("navForm").addEventListener("submit", (event) => {
	event.preventDefault(); // Prevents website to reload on submit
	query = document.getElementById("search").value.trim(); // Fetch search query
	SearchForProducts();
})

/*========== On index.html load ==========*/
function onHTMLLoadStart() {
	createAllProducts();// Måste vara över writeProductsToHTML
	writeProductsToHTML();
}

/*========== To Top Arrow ==========*/
toTopArrow = document.getElementById("to-top-arrow"); // Fetch "button"
window.onscroll = () => { scrollFunction() }; // Call scrollFunction on scroll event

function scrollFunction() {
	if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) { // If user has scrolled past 30px
		toTopArrow.style.visibility = "visible"; // Make button visible
		toTopArrow.style.opacity = 1; // Visible transition
		toTopArrow.style.transition = "visibility 0s, opacity 0.5s ease-in-out"; // Actual transition
	} else {
		toTopArrow.style.visibility = "hidden"; // Make button hidden
		toTopArrow.style.opacity = 0; // Hidden transition
		toTopArrow.style.transition = "visibility 0.5s, opacity 0.5s ease-in-out"; // Actual transition
	}
}

/*========== Login system ==========*/
/* Error */
function showError(error) {
	console.error(error);
	alert(error);
}

/* On Login Success */
function success(decodeIDToken) {
	document.getElementById("section-first-title").textContent = `Hej, ${decodeIDToken.name}`;
	const sectionFirstText = document.getElementById("section-first-text");
	sectionFirstText.innerHTML = "<h3>Prestation för denna månad</h3><p>Ditt mål: <strong>55 kg CO<sub>2</sub></strong></p><p>Ditt utsläpp: <strong>21.4 kg CO<sub>2</sub></strong></p><p>Din plats på topplistan: <strong>247</strong></p>";
	const sectionOtherText = document.getElementsByClassName("section-other-text");
	for (let i = 0; i < sectionOtherText.length; i++) { // Iterate through all "section-other-text"
		sectionOtherText[i].setAttribute("class", `${sectionOtherText[i].className} hidden`); // Hide said text
	}
	document.getElementById("searchbar-login-button").setAttribute("class", "hidden"); // Hide login button
}
/* Asynchronously log in */
(async () => {
	const appID = new AppID();
	await appID.init({
		clientId: "d646f530-1146-48ec-950b-d2498bc93842",
		discoveryEndpoint: "https://eu-de.appid.cloud.ibm.com/oauth/v4/fe3425ce-fa7a-40df-857d-d8f5acc06348/.well-known/openid-configuration"
	})
	document.getElementById("searchbar-login-button").addEventListener("click", async () => {
		try {
			const tokens = await appID.signin();
			success(tokens.idTokenPayload);
		} catch (error) {
			showError(error);
		}
	})
})()

/* Login debugging button, top left of page */
function loginDebugging() {
	document.getElementById("section-first-title").textContent = `Tjenare, Dan The Man`;
	const sectionFirstText = document.getElementById("section-first-text");
	sectionFirstText.innerHTML = "<h3>Prestation för denna månad</h3><p>Ditt mål: <strong>55 kg CO<sub>2</sub></strong></p><p>Ditt utsläpp: <strong>21.4 kg CO<sub>2</sub></strong></p><p>Din plats på topplistan: <strong>247</strong></p>";
	const sectionOtherText = document.getElementsByClassName("section-other-text");
	for (let i = 0; i < sectionOtherText.length; i++) {
		sectionOtherText[i].setAttribute("class", `${sectionOtherText[i].className} hidden`);
	}
	document.getElementById("searchbar-login-button").setAttribute("class", "hidden");
}

/* Everything with products on the website */
// Template for each product / item
// Lists for all products
// Write a new row for each product
function createAllProducts() {
	const pathPrefix = "./assets/recipes/";

	/* Butter */
	addProduct("Valio Smör", 2, ["smör"], `${pathPrefix}ValioSmör.jpg`, 20, true, true);
	addProduct("Bregott", 522, ["smör"], `${pathPrefix}BregottSmör.jpg`, 25, true, true);
	addProduct("Steksmör", 53, ["smör"], `${pathPrefix}Steksmör.jpg`, 10, false, false);
	addProduct("Laktosfritt Bregott", 15, ["smör"], `${pathPrefix}LaktosfrittSmör.jpg`, 30, true, false);
	addProduct("Becel", 995, ["smör"], `${pathPrefix}BecelSmör.jpg`, 26, false, true);

	/* Pasta */
	addProduct("Pasta Penne", 1, ["pasta"], `${pathPrefix}PastaPenne.jpg`, 10, false, true);
	addProduct("Pasta Spagetthi", 52, ["pasta"], `${pathPrefix}PastaSpagetthi.jpg`, 13, false, false);
	addProduct("Pasta Gnocchi", 445, ["pasta"], `${pathPrefix}PastaGnocchi.jpg`, 19, true, true);
	addProduct("Pasta Farfalle", 521, ["pasta"], `${pathPrefix}PastaFarfalle.jpg`, 18, true, true);

	/* Juice */
	addProduct("Bravo Tropisk", 25, ["juice", "frukost"], `${pathPrefix}BravoTropiskJuice.jpg`, 30, true, true);
	addProduct("Bravo Äppeljuice", 985, ["juice", "frukost"], `${pathPrefix}BravoÄppelJuice.jpg`, 30, true, false);
	addProduct("Godmorgon Apelsinjuice", 2225, ["juice", "frukost"], `${pathPrefix}GodMorgonApelsinJuice.jpg`, 25, true, true);
	addProduct("Godmorgon Äppeljuice", 3, ["juice", "frukost"], `${pathPrefix}GodMorgonÄpple.jpg`, 25, true, true);
	addProduct("Brämhults Apelsinjuice", 235, ["juice", "frukost"], `${pathPrefix}BrämhultsApelsinJuice.jpg`, 35, false, true);
}

/* Abbreviated function */
function addProduct(namn, utsläpp, productType, imageFile, price, isCloseMade, isEkol) {
	allProducts.push(new Product(namn, utsläpp, productType, imageFile, price, isCloseMade, isEkol));
}

/* Creates every single product in HTML code */
function writeProduct(productIndex) {
	const div = document.createElement("div");
	div.setAttribute("class", "section-item");
	div.innerHTML =
	'<a href="#">'
	+	'<div class="section-item-top">'
	+		'<img src="' + allProducts[productIndex].imageFile + '" alt="' + allProducts[productIndex].productName + '" title="' + allProducts[productIndex].productName + '"/>'
	+	'</div>'
	+	'<div class="section-item-bottom">'
	+		'<p>' + allProducts[productIndex].productName+'</p>'
	+	'</div>'
	+'</a>'
	return div;
}

/* Writes products on the HTML page from outside */
let container;
function writeProductsToHTML() {
	container = "";
	container = document.getElementById("section-item-container");
	for (let i = 0; i < allProducts.length; i++) {
		container.appendChild(writeProduct(i));
	}
}

function SearchForProducts() {
	let input = "";
	let isEko = document.getElementById("section-filter-ecological").checked;
	// console.log(isEko);
	input = search.value.toLowerCase();
	container.innerHTML = "";
	isEko
	for (let i = 0; i < allProducts.length; i++) {
		for (let j = 0; j < allProducts[i].productTaggs.length; j++) {
			if (input == allProducts[i].productTaggs[j] || input == "" || input == allProducts[i].productName) {
				if (isEko == true) {
					// console.log(allProducts[i].isEkological);

					if (allProducts[i].isEkological == true) {
						// console.log("6");
						container.appendChild(writeProduct(i));
						break;
					}
				} else if (!isEko) {
					// console.log("7");
					container.appendChild(writeProduct(i));
					break;
				}
			}
		}
	}
}

/*
function SorteringsSelect() {
	SortWithFilter("productName");
}

const selectElement = document.getElementById('SorteringsSelect');
selectElement.addEventListener('change', (event) => {
	SorteringsSelect();
});

function SortWithFilter(array) {
	var isEko = document.getElementById("section-filter-closeMade");
	console.log(isEko);
	var isCloseMade = document.ggetElementById("section-filter-ecelogical");
	bblSort(array);
}
// Bubble sort Implementation using Javascript

// Creating the bblSort function
function bblSort(arg) {
	let argument = "";
	arg = "productName";
	if (arg == "carbon") {
		argument = "carbon";
	}
	else if (arg == "price") {
		argument = "price";
	}
	else if (arg == "calories") {
		argument = "calories";
	}
	arr = allProducts;
	for (var i = 0; i < arr.length; i++) {

		// Last i elements are already in place
		for (var j = 0; j < (arr.length - i - 1); j++) {

			// Checking if the item at present iteration
			// is greater than the next iteration
			if (arr[j].argument > arr[j + 1].argument) {
				console.log(arr[j].argument);

				// If the condition is true then swap them
				var temp = arr[j]
				arr[j] = arr[j + 1]
				arr[j + 1] = temp
			}
		}
	}
}
*/
