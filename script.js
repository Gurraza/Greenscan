/* Todo
	Maybe
		Something after entering search query.
		Changing BorderTop(Left/Right)Radius = 0 when navbar is sticked e.g. after ~60px scroll.
		Filtering recipes.
*/

/*===== Adding submit event listener to nav-form =====*/
document.getElementById("navForm").addEventListener("submit", function (event) {
	event.preventDefault(); // Prevents website to reload on submit
	query = document.getElementById("search").value.trim(); // Fetch search query
	if (query !== "") { // If query isn't only whitespace
		alert(`Du har sökt efter: ${document.getElementById("search").value}`); // Prompting the search query
	}
})

/*Start From Index.html*/
function OnHTMLLoadStart() {
	WriteProductsToHTML();
}

/*===== To Top Arrow =====*/
toTopArrow = document.getElementById("to-top-arrow"); // Fetch "button"
window.onscroll = function () { scrollFunction() }; // Call scrollFunction on scroll event

function scrollFunction () {
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

/*===== Login system =====*/
function showError (error) {
    console.error(error);
    alert(error);
}

function success (decodeIDToken) {
    document.getElementById("section-first-title").textContent = `Hej, ${decodeIDToken.name}`;
    const sectionFirstText = document.getElementById("section-first-text");
    sectionFirstText.innerHTML = "<h3>Prestation för denna månad</h3><p>Ditt mål: <strong>55 kg CO<sub>2</sub></strong></p><p>Ditt utsläpp: <strong>21.4 kg CO<sub>2</sub></strong></p><p>Din plats på topplistan: <strong>247</strong></p>";
	const sectionOtherText = document.getElementsByClassName("section-other-text");
	for(let i = 0; i < sectionOtherText.length; i++) {
		sectionOtherText[i].setAttribute("class", `${sectionOtherText[i].className} hidden`);
	}
	document.getElementById("searchbar-login-button").setAttribute("class", "hidden");
}
(async function () {
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

function loginDebugging() {
	document.getElementById("section-first-title").textContent = `Tjenare, Dan The Man`;
	const sectionFirstText = document.getElementById("section-first-text");
	sectionFirstText.innerHTML = "<h3>Prestation för denna månad</h3><p>Ditt mål: <strong>55 kg CO<sub>2</sub></strong></p><p>Ditt utsläpp: <strong>21.4 kg CO<sub>2</sub></strong></p><p>Din plats på topplistan: <strong>247</strong></p>";
	const sectionOtherText = document.getElementsByClassName("section-other-text");
	for(let i = 0; i < sectionOtherText.length; i++) {
		sectionOtherText[i].setAttribute("class", `${sectionOtherText[i].className} hidden`);
	}
	document.getElementById("searchbar-login-button").setAttribute("class", "hidden");
}

/*G*/

//Mall för varje produkt / artikel
class Product {
	constructor (productName, carbonFootprint) {
		this.productName = productName;
		this.carbonFootprint = carbonFootprint;
	}
}
//Skriv in en ny rad för varje produkt
function createAllProducts(){
	allProducts.push(new Product("Potatis", 5));
}
//Listor för alla produkter
let allProducts = [];
let filteredAllProducts = [];

//Skriver in produkter på html sidan utifrån. Ska fixa filter och sortering
function writeProductsToHTML () {
	const container = document.getElementById("section-item-container");
	for(let i = 0; i < allProducts.length; i++) {
		container.appendChild(WriteProduct(i));
	}
	console.log("1");
}

//Skapar varje enskild produkt i html kod
function writeProduct (productIndex) {
	console.log("2");
	const div = document.createElement("div");
	div.setAttribute("class", "section-item");
	div.innerHTML =
	'<a href="#">'
	+	'<div class="section-item-top">'
	+		'<img src="assets/recipes/' + allProducts[productIndex].imageName + '" alt="' + allProducts[productIndex].productName + '" title="' + allProducts[productIndex].productName+'jpg' + '"/>'
	+	'</div>'
	+	'<div class="section-item-bottom">'
	+		'<p>Potatis</p>'
	+	'</div>'
	+'</a>'
	return div;
}
