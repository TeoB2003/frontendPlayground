function allStatsatOnce()
{
  document.getElementsByClassName('decision-module')[0].style.display='none';
}

function viewStats(typeOfStats)
{
  document.getElementsByClassName('decision-module')[0].style.display='none';
  document.getElementsByClassName(typeOfStats)[0].style.display='block';
}

function closeSection(section) {
  document.getElementsByClassName(section)[0].style.display = 'none';
  document.getElementsByClassName('decision-module')[0].style.display = 'block';
}


const arr = getOlympicData();
//the array above will be used in all exercises
function participatingCountries() {
  return arr.map(item => item.Nation);
}

function top5BiggestPopulations()
{
  return arr.sort((a,b)=> b.Population-a.Population).slice(0,5).map(item=>[item.Population, item.Nation]);
}

function countriesThatStillExists()
{
  return arr.filter(item => item.Exists=='YES').filter(item=> item.Nation[0]=='A').map(item=> item.Nation);
}

function sumOfPopulations()
{
  return arr.reduce((total,item)=> total=total+item.Population, 0);
}

function Top5EarliestCountries()
{
  return arr.sort((a,b)=> a.First_App-b.First_App).slice(0,5).map(item=>[item.Nation, item.First_App]);
}

function countriesAndCodes()
{
  return arr.map(item=>({nation: item.Nation, code: item.Code}));
}

function countryWithMostApp()
{
  return arr.sort((a,b)=>b.Apps-a.Apps).slice(0,1).map(item=>[item.Nation, item.Apps]);
}

function mostSuccessfulAthletics()
{
  return arr.filter(item=>item.MostSuccessfulSport=='Athletics').map(country=>country.Nation);
}

function smallestMedalCountry()
{
  return arr.filter(item=>item.Medal__1>0 && item.Population>0).sort((a,b)=>a.Population-b.Population).map(item=>[item.Nation, item.Population, item.Medal__1]);
}

function objectWithNationsAndPopulations()
{
  return arr.reduce((rez, a) => {
    rez[a.Nation] = a.Population;
    return rez;
    }, {});
}

function countriesByFirstLetter()
{
  return arr.reduce((rez,a) => {
    if(rez[a.Nation[0]]==null)
       {
        rez[a.Nation[0]]=[a.Nation];
       }
    else 
        rez[a.Nation[0]].push(a.Nation);
      return rez;
  },{})
}

function randomCountry()
{
  new_arr=arr.map(a=> ({nation: a.Nation, population: a.Population}));
  return new_arr[Math.floor(Math.random() * arr.length)];
}

function countriesMoreThan1M()
{
  return arr.filter(item=> item.Population>=1000000).filter(item=> item.SO_Medal<item.WO_Medal).map(a=>a.Nation);
}

function below5M()  
{
  totalMedals=arr.reduce((sum, item)=>sum+=item.SO_Medal+item.WO_Medal,0);
  totalCountries=arr.length;
  avg=totalMedals/totalCountries;
  return arr.filter(item=> item.Population<=5000000 && item.Medal__1>=avg/2).map(item=> item.Nation);
}

function recentApp()
{
  return arr.sort((a,b)=> b.First_App-a.First_App).map(item=>[item.First_App, item.Nation]);
}

function oldestCountriesStillExists()
{
  let oldest_app=arr.sort((a,b)=>a.First_App-b.First_App).filter(a=>a.Exists='YES').map(a=>a.First_App).slice(0,1);
  return arr.filter(a=> a.First_App==oldest_app && a.Exists=='YES').map(a=>a.Nation);
}
//Functions for displaying the results on the website.

function ex1() {
  let nations=participatingCountries();
  resultsContainer=document.getElementsByClassName("results")[0];
  resultsContainer.style.display='block';
  let resultList=document.getElementsByClassName("result-list")[0];

  nations.forEach(nation => {
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${nation}`));
    resultList.appendChild(li);
  });
  console.log(participatingCountries());
}

function ex2()
{
  let nations=top5BiggestPopulations();
  resultsContainer=document.getElementsByClassName("results")[1];
  resultsContainer.style.display='block';
  let resultList=document.getElementsByClassName("result-list")[1];

  nations.forEach(nation => {
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${nation[1]} has a population of ${nation[0]}`));
    resultList.appendChild(li);
  });
  
  console.log(top5BiggestPopulations());
}

function ex3()
{
  let nations=countriesThatStillExists();
  resultsContainer=document.getElementsByClassName("results")[2];
  resultsContainer.style.display='block';
  let resultList=document.getElementsByClassName("result-list")[2];

  nations.forEach(nation => {
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${nation}`));
    resultList.appendChild(li);
  });
  
  console.log(countriesThatStillExists());
}

function ex4()
{
  let sum=sumOfPopulations();
  let resultC=document.getElementsByClassName('sResult')[0];
  resultC.style.display='block';
  const p=document.createElement('p');
  p.appendChild(document.createTextNode(`${sum}`));
  resultC.append(p);
  console.log(sumOfPopulations());
}

function ex5()
{
  let nations=Top5EarliestCountries();
  resultsContainer=document.getElementsByClassName("results")[3];
  resultsContainer.style.display='block';
  let resultList=document.getElementsByClassName("result-list")[3];

  nations.forEach(nation => {
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${nation[0]}'s first appearence at Olympic Games was in ${nation[1]}`));
    resultList.appendChild(li);
  });
  
  console.log(Top5EarliestCountries());
}

function ex6()
{
  let results=countriesAndCodes();
  let resultC=document.getElementsByClassName('sResult')[1];
  resultC.style.display='block';
  const p=document.createElement('p');
  p.appendChild(document.createTextNode(`view in console`));
  resultC.append(p);
  console.log(countriesAndCodes());
}

function ex7()
{
  let results=countryWithMostApp();
  let resultC=document.getElementsByClassName('sResult')[2];
  resultC.style.display='block';
  const p=document.createElement('p');
  p.appendChild(document.createTextNode(`${results[0][0]} has ${results[0][1]} appearences`));
  resultC.append(p);
  console.log(countryWithMostApp());
}

function ex8(){
  let nations=mostSuccessfulAthletics();
  resultsContainer=document.getElementsByClassName("results")[4];
  resultsContainer.style.display='block';
  let resultList=document.getElementsByClassName("result-list")[4];

  nations.forEach(nation => {
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${nation}`));
    resultList.appendChild(li);
  });
  console.log(mostSuccessfulAthletics());

}

function ex8b()
{
  let results=smallestMedalCountry();
  let resultC=document.getElementsByClassName('sResult')[3];
  resultC.style.display='block';
  const p=document.createElement('p');
  p.appendChild(document.createTextNode(`${results[0][0]} has ${results[0][2]} medal(s) and population of ${results[0][1]}`));
  resultC.append(p);
  console.log(smallestMedalCountry());
}

function ex9()
{
  let resultC=document.getElementsByClassName('sResult')[4];
  resultC.style.display='block';
  const p=document.createElement('p');
  p.appendChild(document.createTextNode(`view in console`));
  resultC.append(p);
  console.log(objectWithNationsAndPopulations());
}

function ex10()
{
  let resultC=document.getElementsByClassName('sResult')[5];
  resultC.style.display='block';
  const p=document.createElement('p');
  p.appendChild(document.createTextNode(`view in console`));
  resultC.append(p);
  console.log(countriesByFirstLetter());
}

function ex11()
{
  let resultC=document.getElementsByClassName('sResult')[6];
  resultC.style.display='block';
  const p=document.createElement('p');
  p.appendChild(document.createTextNode(`view in console`));
  resultC.append(p);
  console.log(randomCountry());
}

function ex12()
{
  let nations=countriesMoreThan1M();
  resultsContainer=document.getElementsByClassName("results")[5];
  resultsContainer.style.display='block';
  let resultList=document.getElementsByClassName("result-list")[5];

  nations.forEach(nation => {
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${nation}`));
    resultList.appendChild(li);
  });
  
  console.log(countriesMoreThan1M());
}

function ex13()
{
  let nations=below5M();
  resultsContainer=document.getElementsByClassName("results")[6];
  resultsContainer.style.display='block';
  let resultList=document.getElementsByClassName("result-list")[6];

  nations.forEach(nation => {
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${nation}`));
    resultList.appendChild(li);
  });
  
  console.log(below5M());
}

function ex14()
{
  let country=recentApp();
  let resultC=document.getElementsByClassName('sResult')[8];
  resultC.style.display='block';
  const p=document.createElement('p');
  p.appendChild(document.createTextNode(`${country[0][1]}'s first appearence was in ${country[0][0]}`));
  resultC.append(p);
  console.log(recentApp());
}

function ex15()
{
  let nations=oldestCountriesStillExists();
  resultsContainer=document.getElementsByClassName("results")[7];
  resultsContainer.style.display='block';
  let resultList=document.getElementsByClassName("result-list")[7];

  nations.forEach(nation => {
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${nation}`));
    resultList.appendChild(li);
  });
  
  console.log(oldestCountriesStillExists());
}