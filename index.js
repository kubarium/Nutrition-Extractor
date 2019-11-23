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
  flax: 339494,
  buckwheat: 170286,
  fenugreek: 171324,
  chia: 170554,
  lentils: 172420,
  sunflower: 339485,
  rutabaga: 342636,
  sage: 170935,
  oregano: 171328
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
console.log(daily_intake.length);
