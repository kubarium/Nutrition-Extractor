const axios = require("axios").default;
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const api = "https://www.damseeds.ca/productcart/pc/viewCategories.asp?idCategory=";

let counter = 0;
//oz/lb based
const seeds = [
  "3310",
  "3324",
  "3303",
  "3318",
  "4062",
  "3305",
  "3322",
  "3317",
  "3311",
  "3309",
  "3321",
  "3316",
  "3314",
  "3315",
  "4048",
  "3313",
  "4049",
  "3306",
  "3249",
  "3302",
  "3312",
  "3301",
  "3323",
  "3308",
  "4061",
  "3307"
];

function unitConverter(unit) {
  return unit === "lb" ? 16 : unit === "oz" ? 1 : 1234567;
}
async function gatherPriceInformation() {
  let data = [];

  for (const seed of seeds) {
    const response = await axios.get(`${api}${seed}`);

    const $ = new JSDOM(response.data);
    const document = $.window.document;

    const prices = Array.from(
      document.querySelectorAll(".c-attribute-table__val.c-attribute-table__val--m-bold")
    ).map(a => parseFloat(a.textContent.replace(/[$,]/g, "")));

    const [quantity, unit] = RegExp(/([\d,])+\s?seeds\/(lb|oz)/)
      .exec(document.querySelector(".js-ct-content").textContent)[0]
      .replace(/,/g, "")
      .split(" ");
    const average_seeds = Math.round(parseInt(quantity) / unitConverter(unit.split("/")[1]));

    const name = document.querySelector(".pcMainContent h1").textContent;
    const organic = document.querySelector(".c-product-header__subheading").textContent.search("Organic") > -1;

    const maturity = document.querySelectorAll(".c-facts__definition")[1].textContent.trim();

    data.push({
      name,
      prices,
      average_seeds,
      organic,
      maturity,
      description: ""
    });
    counter++;
    console.log(`${counter} \t ${name}`);
  }
  fs.writeFileSync(`damseeds.json`, JSON.stringify(data));
}
gatherPriceInformation();
