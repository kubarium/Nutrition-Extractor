const axios = require("axios").default;
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const api = "https://www.johnnyseeds.com/vegetables/microgreens/";

let counter = 0;
//oz/lb based
const seeds = [
  "chard-and-beet-rainbow-sprinkles-mix-microgreen-seed-4106M.html?cgid=micro-greens",
  "mild-micro-mix-organic-microgreen-seed-2566G.html?cgid=micro-greens",
  "broccoli-microgreen-seed-2290M.html?cgid=micro-greens",
  "radish-confetti-mix-organic-microgreen-seed-4119MG.html?cgid=micro-greens",
  "radish-confetti-mix-microgreen-seed-4119M.html?cgid=micro-greens",
  "radish-purple-stem-organic-microgreen-seed-4107MG.html?cgid=micro-greens",
  "dill-organic-microgreen-seed-4111MG.html?cgid=micro-greens",
  "radish-red-stem-organic-microgreen-seed-4105MG.html?cgid=micro-greens",
  "radish-red-stem-microgreen-seed-4105M.html?cgid=micro-greens",
  "spicy-micro-mix-organic-microgreen-seed-2567G.html?cgid=micro-greens",
  "scallion-organic-microgreen-seed-4127MG.html?cgid=micro-greens",
  "mustard-golden-frills-organic-microgreen-seed-2738MG.html?cgid=micro-greens",
  "carrot-organic-microgreen-seed-2468MG.html?cgid=micro-greens",
  "chard-pink-stem-organic-microgreen-seed-4108MG.html?cgid=micro-greens",
  "kale-bright-green-curly-microgreen-seed-4085M.html?cgid=micro-greens",
  "mild-micro-mix-microgreen-seed-2566.html?cgid=micro-greens",
  "spicy-micro-mix-microgreen-seed-2567.html?cgid=micro-greens",
  "cilantro-monogerm-organic-microgreen-seed-3446MG.html?cgid=micro-greens",
  "broccoli-organic-microgreen-seed-2290MG.html?cgid=micro-greens",
  "amaranth-garnet-red-organic-microgreen-seed-2247MG.html?cgid=micro-greens",
  "radish-daikon-organic-microgreen-seed-2155MG.html?cgid=micro-greens",
  "radish-red-rambo-organic-microgreen-seed-2539MG.html?cgid=micro-greens",
  "arugula-microgreen-seed-385M.html?cgid=micro-greens",
  "chervil-microgreen-seed-2441M.html?cgid=micro-greens",
  "collard-vates-microgreen-seed-366MX.html?cgid=micro-greens",
  "kale-red-russian-microgreen-seed-363M.html?cgid=micro-greens",
  "scallion-evergreen-hardy-white-microgreen-seed-502M.html?cgid=micro-greens",
  "cabbage-red-microgreen-seed-2230M.html?cgid=micro-greens",
  "mustard-wasabina-microgreen-seed-4396M.html?cgid=micro-greens",
  "basil-genovese-microgreen-seed-3303M.html?cgid=micro-greens",
  "beet-early-wonder-tall-top-microgreen-seed-123M.html?cgid=micro-greens",
  "beet-bulls-blood-microgreen-seed-2912M.html?cgid=micro-greens",
  "basil-genovese-organic-microgreen-seed-3303MG.html?cgid=micro-greens",
  "fennel-green-microgreen-seed-3152M.html?cgid=micro-greens",
  "basil-lemon-microgreen-seed-774M.html?cgid=micro-greens",
  "mustard-garnet-giant-microgreen-seed-2797M.html?cgid=micro-greens",
  "cutting-celery-microgreen-seed-922M.html?cgid=micro-greens",
  "alfalfa-organic-microgreen-seed-2150MG.html?cgid=micro-greens",
  "arugula-organic-microgreen-seed-2891MG.html?cgid=micro-greens",
  "mustard-barbarossa-microgreen-seed-3868M.html?cgid=micro-greens",
  "chard-rainbow-microgreen-seed-3447M.html?cgid=micro-greens",
  "shiso-britton-microgreen-seed-2943M.html?cgid=micro-greens",
  "cabbage-red-organic-microgreen-seed-2230MG.html?cgid=micro-greens",
  "cress-cressida-organic-microgreen-seed-382MG.html?cgid=micro-greens",
  "mizuna-organic-microgreen-seed-2883MG.html?cgid=micro-greens",
  "parsley-microgreen-seed-3770M.html?cgid=micro-greens",
  "beet-bulls-blood-organic-microgreen-seed-2912MG.html?cgid=micro-greens",
  "kale-red-russian-organic-microgreen-seed-363MG.html?cgid=micro-greens",
  "dill-microgreen-seed-920M.html?cgid=micro-greens",
  "radish-red-rambo-microgreen-seed-2539M.html?cgid=micro-greens",
  "kohlrabi-purple-microgreen-seed-2237M.html?cgid=micro-greens",
  "purslane-red-gruner-microgreen-seed-2257M.html?cgid=micro-greens",
  "radish-hong-vit-microgreen-seed-2461M.html?cgid=micro-greens",
  "radish-red-arrow-microgreen-seed-3111M.html?cgid=micro-greens",
  "carrot-microgreen-seed-2468M.html?cgid=micro-greens",
  "mustard-golden-frills-microgreen-seed-2738M.html?cgid=micro-greens",
  "sorrel-red-veined-microgreen-seed-2827M.html?cgid=micro-greens",
  "basil-cinnamon-microgreen-seed-906M.html?cgid=micro-greens",
  "cress-cressida-microgreen-seed-382M.html?cgid=micro-greens",
  "mizuna-miz-america-f1-microgreen-seed-3749M.html?cgid=micro-greens",
  "mustard-scarlet-frills-microgreen-seed-2530M.html?cgid=micro-greens",
  "basil-italian-large-leaf-microgreen-seed-944M.html?cgid=micro-greens",
  "chinese-cabbage-tokyo-bekana-f1-microgreen-seed-2251M.html?cgid=micro-greens",
  "cilantro-organic-microgreen-seed-919MG.html?cgid=micro-greens",
  "komatsuna-microgreen-seed-337M.html?cgid=micro-greens",
  "borage-organic-microgreen-seed-912MG.html?cgid=micro-greens",
  "kohlrabi-purple-organic-microgreen-seed-2237MG.html?cgid=micro-greens",
  "chard-rainbow-organic-microgreen-seed-3447MG.html?cgid=micro-greens",
  "shungiku-broadleaf-microgreen-seed-4035.html?cgid=micro-greens",
  "mizuna-red-kingdom-f1-microgreen-seed-3748M.html?cgid=micro-greens",
  "lemon-balm-microgreen-seed-766M.html?cgid=micro-greens",
  "basil-dark-opal-microgreen-seed-902M.html?cgid=micro-greens",
  "pac-choi-red-pac-f1-microgreen-seed-3168M.html?cgid=micro-greens",
  "pac-choi-rosie-f1-microgreen-seed-3159M.html?cgid=micro-greens",
  "salad-burnet-microgreen-seed-839M.html?cgid=micro-greens",
  "basil-bicolor-organic-microgreen-seed-3374MG.html?cgid=micro-greens",
  "beet-yellow-microgreen-seed-2965M.html?cgid=micro-greens",
  "mustard-red-giant-organic-microgreen-seed-2884MG.html?cgid=micro-greens",
  "mizuna-central-red-f1-microgreen-seed-3407M.html?cgid=micro-greens",
  "mustard-red-giant-microgreen-seed-378M.html?cgid=micro-greens",
  "basil-red-rubin-microgreen-seed-924M.html?cgid=micro-greens",
  "basil-italian-large-leaf-organic-microgreen-seed-944MG.html?cgid=micro-greens",
  "celosia-microgreen-seed-3369M.html?cgid=micro-greens",
  "tatsoi-organic-microgreen-seed-2897MG.html?cgid=micro-greens",
  "dandelion-red-microgreen-seed-3357M.html?cgid=micro-greens",
  "fennel-bronze-organic-microgreen-seed-784MG.html?cgid=micro-greens",
  "cilantro-microgreen-seed-919M.html?cgid=micro-greens",
  "arugula-wasabi-microgreen-seed-3865M.html?cgid=micro-greens",
  "basil-red-rubin-organic-microgreen-seed-924MG.html?cgid=micro-greens",
  "shungiku-microgreen-seed-514M.html?cgid=micro-greens",
  "kale-toscano-organic-microgreen-seed-2123MG.html?cgid=micro-greens",
  "saltwort-microgreen-seed-2677M.html?cgid=micro-greens",
  "chicory-bianca-riccia-microgreen-seed-2183M.html?cgid=micro-greens",
  "mustard-ruby-streaks-organic-microgreen-seed-2740MG.html?cgid=micro-greens",
  "chard-ruby-red-organic-microgreen-seed-702MG.html?cgid=micro-greens",
  "chard-bright-lights-microgreen-seed-703DM.html?cgid=micro-greens",
  "anise-microgreen-seed-904M.html?cgid=micro-greens",
  "pac-choi-red-choi-f1-microgreen-seed-2736M.html?cgid=micro-greens",
  "marigold-gem-microgreen-seed-6023M.html?cgid=micro-greens",
  "mustard-ruby-streaks-microgreen-seed-2740M.html?cgid=micro-greens",
  "orach-ruby-red-organic-microgreen-seed-3999MG.html?cgid=micro-greens",
  "sorrel-microgreen-seed-383M.html?cgid=micro-greens",
  "cress-persian-organic-microgreen-seed-2779MG.html?cgid=micro-greens",
  "chard-ruby-red-microgreen-seed-702M.html?cgid=micro-greens",
  "mustard-green-wave-organic-microgreen-seed-377MG.html?cgid=micro-greens",
  "anise-hyssop-microgreen-seed-3123M.html?cgid=micro-greens",
  "kale-toscano-microgreen-seed-2123M.html?cgid=micro-greens",
  "chinese-cabbage-kogane-microgreen-seed-2942M.html?cgid=micro-greens",
  "magenta-spreen-organic-microgreen-seed-2778MG.html?cgid=micro-greens",
  "fennel-green-organic-microgreen-seed-3152MG.html?cgid=micro-greens",
  "orach-scarlet-microgreen-seed-3999MX.html?cgid=micro-greens",
  "collard-champion-microgreen-seed-366M.html?cgid=micro-greens",
  "mustard-suehlihung-no.-2-microgreen-seed-2458M.html?cgid=micro-greens",
  "mustard-green-wave-microgreen-seed-377M.html?cgid=micro-greens"
];

function unitConverter(unit) {
  return unit === "lb" ? 16 : unit === "oz" ? 1 : 1234567;
}
async function gatherPriceInformation() {
  let data = [];

  for (const seed of seeds) {
    const response = await axios.get(`${api}/${seed}`);

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

    const name = document.querySelector(".c-product-header__heading").childNodes[0].data.trim();
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
  fs.writeFileSync(`johnnyseeds.json`, JSON.stringify(data));
}
gatherPriceInformation();
