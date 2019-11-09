const axios = require("axios").default;
const fs = require("fs");

const api = "https://api.nal.usda.gov/fdc/v1";
const api_key = "ML72MnX9EWAuqbsENR3mBAXgOIJOfEyKUVJKoNd4";

const Unit = {
  g: 1000000,
  mg: 1000,
  μg: 1
};

const seeds = {
  celery: 342606,
  kohlrabi: 342616,
  kale: 323505,
  cilantro: 342610,
  parsley: 342626,
  arugula: 342621,
  broccoli: 342297,
  basil: 342608,
  "broccoli-raab": 342039,
  "broccoli-chinese": 342328,
  radish: 342635,
  turnip: 342641,
  fennel: 342607,
  cauliflower: 342605,
  "cabbage-red": 342603,
  "cabbage-green": 342601,
  "cabbage-chinese": 342602,
  watercress: 342287,
  "lettuce-romaine": 342104,
  "lettuce-boston": 342619,
  lettuce: 342618,
  radicchio: 342204,
  carrot: 342354,
  garlic: 342614,
  onion: 342625,
  scallion: 342624,
  leek: 342617,
  amaranth: 168385,
  chard: 342046,
  "beet greens": 342032,
  spinach: 342205,
  "brussels-sprouts": 342600,
  peas: 342627,
  chives: 342609,
  "mustard-greens": 342173,
  "beans-lima": 342597,
  "soybean-sprouts": 342595,
  "green-beans": 342596,
  rosemary: 173473,
  thyme: 173470,
  spearmint: 173475,
  okra: 169260,
  "alfalfa sprouts": 342592,
  barley: 170284,
  chickpeas: 173756,
  adzuki: 173727,
  rhubard: 341623,
  "sweet pepper": 342631,
  "green pepper": 342632,
  "red pepper": 342633,
  "hot chili pepper": 342628,
  "mixed-salad-greens": 342622,
  "green-tomatoes": 342503,
  "banana-pepper": 342634,
  "poblano-pepper": 342629,
  "serrano-pepper": 342630,
  shallots: 170499
};

const daily_intake = JSON.parse(fs.readFileSync("daily_intake.json"));

function gatherSeedInformation() {
  Object.keys(seeds).forEach(async seed => {
    const response = await axios.get(`${api}/${seeds[seed]}?api_key=${api_key}`);

    const data = response.data.foodNutrients;
    let nutrition = data.map(item => {
      return {
        name: item.nutrient.name,
        unit: item.nutrient.unitName,
        amount: item.amount
      };
    });
    fs.writeFileSync(`seeds/${seed}.json`, JSON.stringify(nutrition));

    console.log(seed, seeds[seed]);
  });
}

function dailyIntakeItemFinder(name) {
  return daily_intake.filter(item => item.name === name)[0];
}

function dailyIntakeCalculator() {
  Object.keys(seeds).forEach(async (seed, index) => {
    const file = fs.readFileSync(`seeds/${seed}.json`, "utf-8");
    const entries = JSON.parse(file);

    const entriesWithDV = entries.map(entry => {
      //if item has daily intake situation
      const dv = dailyIntakeItemFinder(entry.name);
      if (dv) {
        switch (entry.unit) {
          case "g":
            entry.dv = (entry.amount * Unit.g) / dv.amount;
            break;
          case "mg":
            entry.dv = (entry.amount * Unit.mg) / dv.amount;
            break;
          default:
            entry.dv = entry.amount / dv.amount;
            break;
        }
      }
      return entry;
    });

    await fs.writeFileSync(`seeds/${seed}.json`, JSON.stringify(entriesWithDV));
  });
}

//gatherSeedInformation();
dailyIntakeCalculator();
