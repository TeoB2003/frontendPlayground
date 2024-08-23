function allStatsatOnce() {
  document.getElementsByClassName('decision-module')[0].style.display = 'none';
}

function viewStats(typeOfStats) {
  document.getElementsByClassName('decision-module')[0].style.display = 'none';
  if (typeOfStats == 'allStats')
    buildAllStats();
  document.getElementsByClassName(typeOfStats)[0].style.display = 'block';
}

function closeSection(section) {
  document.getElementsByClassName(section)[0].style.display = 'none';
  document.getElementsByClassName('decision-module')[0].style.display = 'block';
}


const arr = getOlympicData();
//the array above will be used in all exercises

function buildAllStats() {
  arr.forEach(country => {
    const countryRegion = document.createElement('div');

    countryRegion.className = 'country-region';
    const sectionResults = document.querySelector('.allStats');
    const countryName = country.Nation;
    const countryCode = country.Code;

    countryRegion.innerHTML = `
        <h3>${countryName}</h3>
        <button class="more-btn" onclick="displayCountryDetails('${countryCode}', this)">More</button>
        <div class="country-details" id="${countryCode}-details" style="display: none;">
            <table class="country-table">
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
            </table>
        </div>
    `;

    sectionResults.appendChild(countryRegion);

  }
  )
}

function displayCountryDetails(countryCode, button) {
  const detailsDiv = document.getElementById(`${countryCode}-details`);

  if (detailsDiv.style.display === 'none') {
    console.log(button);
    populateCountryData(countryCode);
    detailsDiv.style.display = 'block';
    button.textContent = 'Less';
  } else {
    detailsDiv.style.display = 'none';
    button.textContent = 'More';
  }
}

function extractData(countryCode)
{
  let myMap={
      Nation: 'Country',
      Population: 'Population',
      Exists: 'Still exist',
      Code: 'Code',
      First_App: 'First apparition',
      Apps: 'Total number of apparitions',
      Medal__1: 'Total number of medals',
      Gold: 'Gold Medals',
      Silver: 'Silver Medals',
      Bronze: 'Bronze Medals',
      SO_Apps: 'Summer games apparitions',
      SO_Medal: 'Summer games total medals',
      SO_Gold: 'Gold Medals at summer games',
      SO_Silver: 'Silver Medals at summer games',
      SO_Bronze: 'Bronze Medals at summer games',
      WO_Apps: 'Winter games appearences',
      WO_Medal: 'Winter games total medals',
      WO_Gold: 'Gold Medals at winter games',
      WO_Silver: 'Silver Medals at winter games',
      WO_Bronze: 'Bronze Medals at winter games',
      MostSuccessfulSport: 'Most successfull sport',
      Medals:'Medals at most successfull sport',
      Golds: 'Gold Medals at most successfull sport',
      Silvers: 'Silver Medals at most successfull sport',
      Bronzes: 'Bronze Medals at most successfull sport'
  }
   intermediar= arr.find(item=>item.Code==countryCode);
   rez=Object.entries(intermediar).reduce((acc,[key,value])=>{ 
     if (myMap[key]) {
      acc[myMap[key]] = value;
    }
    return acc
  },{});
  return rez;
   console.log(rez);
}

function populateCountryData(countryCode) {
  const country = extractData(countryCode);
  const table = document.querySelector(`#${countryCode}-details .country-table`);

  if (table.rows.length === 1) {
    for (let key in country) {
      const row = document.createElement('tr');
      const fieldCell = document.createElement('td');
      fieldCell.textContent = key;
      const valueCell = document.createElement('td');
      valueCell.textContent = country[key];

      row.appendChild(fieldCell);
      row.appendChild(valueCell);
      table.appendChild(row);
    }
  }
}



function participatingCountries() {
  return arr.map(item => item.Nation);
}

function top5BiggestPopulations() {
  return arr.sort((a, b) => b.Population - a.Population).slice(0, 5).map(item => [item.Population, item.Nation]);
}

function countriesThatStillExists() {
  return arr.filter(item => item.Exists == 'YES').filter(item => item.Nation[0] == 'A').map(item => item.Nation);
}

function sumOfPopulations() {
  return arr.reduce((total, item) => total = total + item.Population, 0);
}

function Top5EarliestCountries() {
  return arr.sort((a, b) => a.First_App - b.First_App).slice(0, 5).map(item => [item.Nation, item.First_App]);
}

function countriesAndCodes() {
  return arr.map(item => ({ nation: item.Nation, code: item.Code }));
}

function countryWithMostApp() {
  return arr.sort((a, b) => b.Apps - a.Apps).slice(0, 1).map(item => [item.Nation, item.Apps]);
}

function mostSuccessfulAthletics() {
  return arr.filter(item => item.MostSuccessfulSport == 'Athletics').map(country => country.Nation);
}

function smallestMedalCountry() {
  return arr.filter(item => item.Medal__1 > 0 && item.Population > 0).sort((a, b) => a.Population - b.Population).map(item => [item.Nation, item.Population, item.Medal__1]);
}

function objectWithNationsAndPopulations() {
  return arr.reduce((rez, a) => {
    rez[a.Nation] = a.Population;
    return rez;
  }, {});
}

function countriesByFirstLetter() {
  return arr.reduce((rez, a) => {
    if (rez[a.Nation[0]] == null) {
      rez[a.Nation[0]] = [a.Nation];
    }
    else
      rez[a.Nation[0]].push(a.Nation);
    return rez;
  }, {})
}

function randomCountry() {
  new_arr = arr.map(a => ({ nation: a.Nation, population: a.Population }));
  return new_arr[Math.floor(Math.random() * arr.length)];
}

function countriesMoreThan1M() {
  return arr.filter(item => item.Population >= 1000000).filter(item => item.SO_Medal < item.WO_Medal).map(a => a.Nation);
}

function below5M() {
  totalMedals = arr.reduce((sum, item) => sum += item.SO_Medal + item.WO_Medal, 0);
  totalCountries = arr.length;
  avg = totalMedals / totalCountries;
  return arr.filter(item => item.Population <= 5000000 && item.Medal__1 >= avg / 2).map(item => item.Nation);
}

function recentApp() {
  return arr.sort((a, b) => b.First_App - a.First_App).map(item => [item.First_App, item.Nation]);
}

function oldestCountriesStillExists() {
  let oldest_app = arr.sort((a, b) => a.First_App - b.First_App).filter(a => a.Exists = 'YES').map(a => a.First_App).slice(0, 1);
  return arr.filter(a => a.First_App == oldest_app && a.Exists == 'YES').map(a => a.Nation);
}
//Functions for displaying the results on the website.

function ex1() {
  resultsContainer = document.getElementsByClassName("results")[0];
  if (resultsContainer.style.display == 'block') {
    resultsContainer.style.display = 'none';
    return;
  }
  resultsContainer.style.display = 'block';
  let resultList = document.getElementsByClassName("result-list")[0];
  if (resultList.getElementsByTagName('li').length === 0) {
    let nations = participatingCountries();
    nations.forEach(nation => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${nation}`));
      resultList.appendChild(li);
    });
  }
  console.log(participatingCountries());
}

function ex2() {
  resultsContainer = document.getElementsByClassName("results")[1];
  if (resultsContainer.style.display == 'block') {
    resultsContainer.style.display = 'none';
    return;
  }
  resultsContainer.style.display = 'block';
  let resultList = document.getElementsByClassName("result-list")[1];
  if (resultList.getElementsByTagName('li').length === 0) {
    let nations = top5BiggestPopulations();
    nations.forEach(nation => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${nation[1]} has a population of ${nation[0]}`));
      resultList.appendChild(li);
    });
  }

  console.log(top5BiggestPopulations());
}

function ex3() {
  resultsContainer = document.getElementsByClassName("results")[2];
  if (resultsContainer.style.display == 'block') {
    resultsContainer.style.display = 'none';
    return;
  }
  resultsContainer.style.display = 'block';
  let resultList = document.getElementsByClassName("result-list")[2];
  if (resultList.getElementsByTagName('li').length === 0) {
    let nations = countriesThatStillExists();
    nations.forEach(nation => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${nation}`));
      resultList.appendChild(li);
    });
  }

  console.log(countriesThatStillExists());
}

function ex4() {
  let resultC = document.getElementsByClassName('sResult')[0];
  if (resultC.style.display == 'block') {
    resultC.style.display = 'none';
    return;
  }
  resultC.style.display = 'block';
  if (resultC.getElementsByTagName('p').length === 0) {
    let sum = sumOfPopulations();
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(`${sum}`));
    resultC.append(p);
  }
  console.log(sumOfPopulations());
}

function ex5() {
  resultsContainer = document.getElementsByClassName("results")[3];
  if (resultsContainer.style.display == 'block') {
    resultsContainer.style.display = 'none';
    return;
  }
  resultsContainer.style.display = 'block';
  let resultList = document.getElementsByClassName("result-list")[3];
  if (resultList.getElementsByTagName('li').length === 0) {
    let nations = Top5EarliestCountries();
    nations.forEach(nation => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${nation[0]}'s first appearence at Olympic Games was in ${nation[1]}`));
      resultList.appendChild(li);
    });
  }

  console.log(Top5EarliestCountries());
}

function ex6() {
  let resultC = document.getElementsByClassName('sResult')[1];
  if (resultC.style.display == 'block') {
    resultC.style.display = 'none';
    return;
  }
  resultC.style.display = 'block';

  if (resultC.getElementsByTagName('p').length === 0) {
    let results = countriesAndCodes();
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(`view in console`));
    resultC.append(p);
  }
  console.log(countriesAndCodes());
}

function ex7() {
  let resultC = document.getElementsByClassName('sResult')[2];
  if (resultC.style.display == 'block') {
    resultC.style.display = 'none';
    return;
  }
  resultC.style.display = 'block';
  if (resultC.getElementsByTagName('p').length === 0) {
    let results = countryWithMostApp();
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(`${results[0][0]} has ${results[0][1]} appearences`));
    resultC.append(p);
  }
  console.log(countryWithMostApp());
}

function ex8() {
  resultsContainer = document.getElementsByClassName("results")[4];
  if (resultsContainer.style.display == 'block') {
    resultsContainer.style.display = 'none';
    return;
  }

  resultsContainer.style.display = 'block';
  let resultList = document.getElementsByClassName("result-list")[4];
  if (resultList.getElementsByTagName('li').length === 0) {
    let nations = mostSuccessfulAthletics();
    nations.forEach(nation => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${nation}`));
      resultList.appendChild(li);
    });
    console.log(mostSuccessfulAthletics());
  }

}

function ex8b() {

  let resultC = document.getElementsByClassName('sResult')[3];
  if (resultC.style.display == 'block') {
    resultC.style.display = 'none';
    return;
  }
  resultC.style.display = 'block';
  if (resultC.getElementsByTagName('p').length === 0) {
    let results = smallestMedalCountry();
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(`${results[0][0]} has ${results[0][2]} medal(s) and population of ${results[0][1]}`));
    resultC.append(p);
  }
  console.log(smallestMedalCountry());
}

function ex9() {
  let resultC = document.getElementsByClassName('sResult')[4];
  if (resultC.style.display == 'block') {
    resultC.style.display = 'none';
    return;
  }

  resultC.style.display = 'block';

  if (resultC.getElementsByTagName('p').length === 0) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(`view in console`));
    resultC.append(p);
  }
  console.log(objectWithNationsAndPopulations());
}

function ex10() {
  let resultC = document.getElementsByClassName('sResult')[5];
  if (resultC.style.display == 'block') {
    resultC.style.display = 'none';
    return;
  }
  resultC.style.display = 'block';
  if (resultC.getElementsByTagName('p').length === 0) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(`view in console`));
    resultC.append(p);
  }
  console.log(countriesByFirstLetter());
}

function ex11() {
  let resultC = document.getElementsByClassName('sResult')[6];
  if (resultC.style.display == 'block') {
    resultC.style.display = 'none';
    return;
  }

  resultC.style.display = 'block';
  if (resultC.getElementsByTagName('p').length === 0) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(`view in console`));
    resultC.append(p);
  }
  console.log(randomCountry());
}

function ex12() {

  resultsContainer = document.getElementsByClassName("results")[5];
  if (resultsContainer.style.display == 'block') {
    resultsContainer.style.display = 'none';
    return;
  }
  resultsContainer.style.display = 'block';
  let resultList = document.getElementsByClassName("result-list")[5];
  if (resultList.getElementsByTagName('li').length === 0) {
    let nations = countriesMoreThan1M();
    nations.forEach(nation => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${nation}`));
      resultList.appendChild(li);
    });
  }

  console.log(countriesMoreThan1M());
}

function ex13() {
  resultsContainer = document.getElementsByClassName("results")[6];
  if (resultsContainer.style.display == 'block') {
    resultsContainer.style.display = 'none';
    return;
  }
  resultsContainer.style.display = 'block';
  let resultList = document.getElementsByClassName("result-list")[6];
  if (resultList.getElementsByTagName('li').length === 0) {
    let nations = below5M();
    nations.forEach(nation => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${nation}`));
      resultList.appendChild(li);
    });
  }

  console.log(below5M());
}

function ex14() {
  let resultC = document.getElementsByClassName('sResult')[7];
  if (resultC.style.display == 'block') {
    resultC.style.display = 'none';
    return;
  }
  resultC.style.display = 'block';
  if (resultC.getElementsByTagName('p').length === 0) {
    let country = recentApp();
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(`${country[0][1]}'s first appearence was in ${country[0][0]}`));
    resultC.append(p);
  }
  console.log(recentApp());
}

function ex15() {

  resultsContainer = document.getElementsByClassName("results")[7];
  if (resultsContainer.style.display == 'block') {
    resultsContainer.style.display = 'none';
    return;
  }
  resultsContainer.style.display = 'block';
  let resultList = document.getElementsByClassName("result-list")[7];
  if (resultList.getElementsByTagName('li').length === 0) {
    let nations = oldestCountriesStillExists();
    nations.forEach(nation => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${nation}`));
      resultList.appendChild(li);
    });
  }
  console.log(oldestCountriesStillExists());
}