(function (root) {
  "use strict";

  const roles = {
    top: ["Aatrox","Ambessa","Camille","Cho'Gath","Darius","Dr. Mundo","Fiora","Gangplank","Garen","Gnar","Gwen","Illaoi","Irelia","Jax","Jayce","Kayle","Kennen","Kled","K'Santé","Malphite","Mordekaiser","Nasus","Olaf","Ornn","Pantheon","Quinn","Renekton","Riven","Rumble","Sett","Shen","Singed","Sion","Tahm Kench","Teemo","Trundle","Tryndamere","Udyr","Urgot","Vladimir","Volibear","Yorick","Zaahen"],
    jungle: ["Amumu","Bel'Veth","Briar","Diana","Elise","Evelynn","Fiddlesticks","Graves","Hecarim","Ivern","Jarvan IV","Karthus","Kayn","Kha'Zix","Kindred","Lee Sin","Lillia","Maître Yi","Naafiri","Nidalee","Nocturne","Nunu et Willump","Poppy","Rammus","Rek'Sai","Rengar","Sejuani","Shaco","Shyvana","Skarner","Vi","Viego","Warwick","Wukong","Xin Zhao","Zac"],
    mid: ["Ahri","Akali","Akshan","Anivia","Annie","Aurelion Sol","Aurora","Azir","Cassiopeia","Corki","Ekko","Fizz","Galio","Heimerdinger","Hwei","Kassadin","Katarina","LeBlanc","Lissandra","Locke","Lux","Malzahar","Mel","Neeko","Orianna","Qiyana","Ryze","Swain","Sylas","Syndra","Taliyah","Talon","Twisted Fate","Veigar","Vel'Koz","Vex","Viktor","Xerath","Yasuo","Yone","Zed","Ziggs","Zoé"],
    adc: ["Aphelios","Ashe","Caitlyn","Draven","Ezreal","Jhin","Jinx","Kai'Sa","Kalista","Kog'Maw","Lucian","Miss Fortune","Nilah","Samira","Sivir","Smolder","Tristana","Twitch","Varus","Vayne","Xayah","Yunara","Zeri"],
    support: ["Alistar","Bard","Blitzcrank","Brand","Braum","Gragas","Janna","Karma","Leona","Lulu","Maokai","Milio","Morgana","Nami","Nautilus","Pyke","Rakan","Rell","Renata Glasc","Senna","Séraphine","Sona","Soraka","Taric","Thresh","Yuumi","Zilean","Zyra"]
  };

  const hybridDamage = ["Corki","Ezreal","Gangplank","Jax","Kai'Sa","Katarina","Kayle","Kennen","Kog'Maw","Miss Fortune","Shaco","Shyvana","Twitch","Udyr","Varus","Volibear"];
  const apOnly = ["Ahri","Akali","Alistar","Amumu","Anivia","Annie","Aurelion Sol","Aurora","Azir","Bard","Blitzcrank","Brand","Cassiopeia","Diana","Ekko","Elise","Evelynn","Fiddlesticks","Fizz","Galio","Gragas","Gwen","Heimerdinger","Hwei","Ivern","Janna","Karthus","Kassadin","Kennen","LeBlanc","Lillia","Lissandra","Locke","Lulu","Lux","Malphite","Malzahar","Maokai","Mel","Milio","Mordekaiser","Morgana","Nami","Nautilus","Neeko","Nidalee","Nunu et Willump","Orianna","Rakan","Rammus","Renata Glasc","Rumble","Ryze","Séraphine","Singed","Skarner","Sona","Soraka","Swain","Sylas","Syndra","Taliyah","Tahm Kench","Taric","Teemo","Thresh","Twisted Fate","Veigar","Vel'Koz","Vex","Viktor","Vladimir","Xerath","Yuumi","Zac","Ziggs","Zilean","Zoé","Zyra"];

  const regions = {
    "Bandle": ["Corki","Heimerdinger","Lulu","Rumble","Teemo","Tristana","Veigar","Yuumi","Ziggs"],
    "Bilgewater": ["Fizz","Gangplank","Graves","Illaoi","Miss Fortune","Nautilus","Nilah","Pyke","Tahm Kench","Twisted Fate"],
    "Demacia": ["Fiora","Galio","Garen","Jarvan IV","Kayle","Locke","Lucian","Lux","Morgana","Poppy","Quinn","Shyvana","Sona","Sylas","Vayne","Xin Zhao"],
    "Freljord": ["Anivia","Ashe","Aurora","Braum","Gnar","Gragas","Lissandra","Nunu et Willump","Olaf","Ornn","Sejuani","Trundle","Tryndamere","Udyr","Volibear"],
    "Îles obscures": ["Gwen","Hecarim","Kalista","Karthus","Maokai","Thresh","Vex","Viego","Yorick"],
    "Ionia": ["Ahri","Akali","Hwei","Irelia","Ivern","Jhin","Karma","Kayn","Kennen","Lee Sin","Lillia","Maître Yi","Rakan","Sett","Shen","Syndra","Varus","Wukong","Xayah","Yasuo","Yone","Yunara","Zed"],
    "Ixtal": ["Malphite","Milio","Neeko","Nidalee","Qiyana","Rengar","Zyra"],
    "Néant": ["Bel'Veth","Cho'Gath","Kai'Sa","Kassadin","Kha'Zix","Kog'Maw","Malzahar","Rek'Sai","Vel'Koz"],
    "Noxus": ["Ambessa","Annie","Briar","Cassiopeia","Darius","Draven","Elise","Katarina","Kled","LeBlanc","Mel","Mordekaiser","Rell","Riven","Samira","Sion","Swain","Talon","Vladimir"],
    "Piltover": ["Caitlyn","Camille","Ezreal","Heimerdinger","Jayce","Orianna","Séraphine","Vi"],
    "Shurima": ["Akshan","Amumu","Azir","Jax","K'Santé","Naafiri","Nasus","Rammus","Renekton","Sivir","Skarner","Taliyah","Xerath","Zilean"],
    "Targon": ["Aphelios","Aurelion Sol","Diana","Leona","Nami","Pantheon","Soraka","Taric","Zoé"],
    "Zaun": ["Blitzcrank","Dr. Mundo","Ekko","Janna","Jinx","Renata Glasc","Singed","Twitch","Urgot","Viktor","Warwick","Zac","Zeri","Ziggs"],
    "Runeterra": ["Aatrox","Alistar","Bard","Brand","Evelynn","Fiddlesticks","Kindred","Nocturne","Ryze","Senna","Shaco","Smolder","Zaahen"]
  };

  const seasons = {
    "Beta": ["Alistar","Amumu","Anivia","Annie","Ashe","Blitzcrank","Cho'Gath","Corki","Dr. Mundo","Evelynn","Fiddlesticks","Gangplank","Heimerdinger","Janna","Jax","Karthus","Kassadin","Katarina","Kayle","Malphite","Maître Yi","Morgana","Nasus","Nunu et Willump","Rammus","Ryze","Shaco","Singed","Sion","Sivir","Soraka","Taric","Teemo","Tristana","Tryndamere","Twisted Fate","Twitch","Veigar","Warwick","Zilean"],
    "Saison 1": ["Akali","Brand","Caitlyn","Cassiopeia","Galio","Garen","Gragas","Irelia","Jarvan IV","Karma","Kennen","Kog'Maw","LeBlanc","Lee Sin","Leona","Lux","Malzahar","Maokai","Miss Fortune","Mordekaiser","Nidalee","Nocturne","Olaf","Orianna","Pantheon","Poppy","Renekton","Rumble","Shen","Skarner","Sona","Swain","Talon","Trundle","Udyr","Urgot","Vayne","Vladimir","Wukong","Xin Zhao","Yorick"],
    "Saison 2": ["Ahri","Darius","Diana","Draven","Elise","Ezreal","Fiora","Fizz","Graves","Hecarim","Jayce","Kha'Zix","Lulu","Nautilus","Rengar","Riven","Sejuani","Shyvana","Syndra","Varus","Viktor","Volibear","Xerath","Zed","Ziggs","Zyra"],
    "Saison 3": ["Aatrox","Jinx","Lissandra","Lucian","Nami","Quinn","Thresh","Vi","Yasuo","Zac"],
    "Saison 4": ["Azir","Braum","Gnar","Kalista","Rek'Sai","Vel'Koz"],
    "Saison 5": ["Bard","Ekko","Illaoi","Kindred","Tahm Kench"],
    "Saison 6": ["Aurelion Sol","Camille","Ivern","Jhin","Kled","Taliyah"],
    "Saison 7": ["Kayn","Ornn","Rakan","Xayah","Zoé"],
    "Saison 8": ["Kai'Sa","Neeko","Pyke"],
    "Saison 9": ["Aphelios","Qiyana","Senna","Sylas","Yuumi"],
    "Saison 10": ["Lillia","Rell","Samira","Séraphine","Sett","Yone"],
    "Saison 11": ["Akshan","Gwen","Vex","Viego"],
    "Saison 12": ["Bel'Veth","K'Santé","Nilah","Renata Glasc","Zeri"],
    "Saison 13": ["Briar","Hwei","Milio","Naafiri"],
    "Saison 14": ["Ambessa","Aurora","Smolder"],
    "Saison 15": ["Mel","Yunara","Zaahen"],
    "Saison 16": ["Locke"]
  };

  const classic = new Set(["Ahri","Akali","Alistar","Amumu","Anivia","Annie","Ashe","Blitzcrank","Brand","Cho'Gath","Corki","Dr. Mundo","Evelynn","Ezreal","Fiddlesticks","Gangplank","Garen","Gragas","Heimerdinger","Janna","Jarvan IV","Jax","Karthus","Kassadin","Katarina","Kayle","Kennen","Kog'Maw","Lee Sin","Leona","Lulu","Lux","Malphite","Malzahar","Maître Yi","Miss Fortune","Morgana","Nasus","Nidalee","Nunu et Willump","Olaf","Pantheon","Rammus","Ryze","Shaco","Shen","Singed","Sion","Sivir","Skarner","Sona","Soraka","Taric","Teemo","Tristana","Tryndamere","Twisted Fate","Twitch","Vayne","Veigar","Warwick","Wukong","Zilean"]);

  const records = {};
  function add(name, field, value) {
    records[name] ||= { name, role: null, damageTypes: [], regions: [], releaseSeason: null, classic: false };
    if (Array.isArray(records[name][field])) records[name][field].push(value); else records[name][field] = value;
  }
  Object.entries(roles).forEach(([role,names]) => names.forEach(name => add(name,"role",role)));
  Object.entries(regions).forEach(([region,names]) => names.forEach(name => add(name,"regions",region)));
  Object.entries(seasons).forEach(([season,names]) => names.forEach(name => add(name,"releaseSeason",season)));
  Object.values(roles).flat().forEach(name => {
    const damageTypes = hybridDamage.includes(name) ? ["AD","AP"] : apOnly.includes(name) ? ["AP"] : ["AD"];
    records[name].damageTypes = damageTypes;
    records[name].classic = classic.has(name);
  });

  const duplicateRoles = Object.values(roles).flat().filter((name,index,all) => all.indexOf(name) !== index);
  const invalid = Object.values(records).filter(c => !c.role || !c.releaseSeason || !c.damageTypes.length || !c.regions.length);
  if (duplicateRoles.length || invalid.length || Object.keys(records).length !== 173) {
    throw new Error("Champion data invalide: " + JSON.stringify({ count:Object.keys(records).length, duplicateRoles, invalid }));
  }

  const api = Object.freeze({
    champions: Object.freeze(records),
    roles: Object.freeze(Object.keys(roles)),
    regions: Object.freeze(Object.keys(regions)),
    seasons: Object.freeze(Object.keys(seasons)),
    filter(filters={}) {
      const selectedRegions = filters.regions || [];
      const selectedSeasons = filters.seasons || [];
      return Object.values(records).filter(c =>
        (!filters.role || c.role === filters.role) &&
        (!filters.damage || c.damageTypes.includes(filters.damage)) &&
        (!filters.classic || c.classic) &&
        (!selectedRegions.length || selectedRegions.some(r => c.regions.includes(r))) &&
        (!selectedSeasons.length || selectedSeasons.includes(c.releaseSeason))
      );
    }
  });

  root.CHAMPION_DATA = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
