const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint) //zaciagamy dane z linka
    .then(blob => blob.json()) //mówimy, że jest to plik json
    .then(data => cities.push(...data)) //wpychamy do tablicy cities jako osobne elementy dlatego są ...
    .then(all => displayMatches());
function findMatches(input) {
    return cities.filter(place => {
        const regex = new RegExp(input, 'gi') //tworzymy wyrażenie regularne którym jest nasz input, czyli to co wpisze szukający  drugi to:  g - global czyli globalny, i - insensitive (czyli nie zwraca uwagi na wielkość liter)
        return place.city.match(regex) || place.state.match(regex); //zwracamy tablicę pasująych do naszego wyrażenia miast lub stanów
    });
}
function numberWithCommas(a) {
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
function displayMatches() {
    const input = searchInput.value;
    const matchArray = findMatches(input);
    const htmlMatchArray = matchArray.map(place => {
        const regex = new RegExp(input, 'gi');
        const cityName = place.city.replace(regex, `<span class="highlight">${input}</span>`);
        const stateName = place.state.replace(regex, `<span class="highlight">${input}</span>`);
        return `<li>
                    <p class="city-state"><span class="city">${cityName},</span> ${stateName} <span class="population">population: ${numberWithCommas(place.population)} </span> </p>
                </li>`;
    }).join('');
    const headerText = input ? `${matchArray.length} matches for <span class="input">${input}<span>` : `List of 1000 cities in the USA`;
    searchResults.innerHTML = htmlMatchArray;
    header.innerHTML = headerText;
}

const searchInput = document.querySelector('#search');
const searchResults = document.querySelector('#search-results');
const header = document.querySelector('h6');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
