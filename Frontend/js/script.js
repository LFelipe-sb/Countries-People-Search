let globalCountries = [];
let globalPeople = [];
let globalUserCountry = [];

async function start(){
    await fetchPeople();
    await fetchCountries();
}

async function fetchPeople(){
    const response = await fetch('http://localhost:3002/people');
    const json = await response.json();

    //Maneira sem Destructing
    globalPeople = json.map(person => {
        return{
            userId: person.login.UUID,
            userCountry: person.nat,
            userName: person.name.first,
            userPicture: person.picture.large
        }
    })
}

async function fetchCountries(){
    const response = await fetch('http://localhost:3001/countries');
    const json = await response.json();

    //Maneira com Destructing
    globalCountries = json.map(({name, flag, alpha2code}) => {
        return{
            countryName: name,
            countryFlag: flag,
            countryCode: alpha2code
        }
    });
    
}
function hideSpinner(){}
function mergeUsersAndCountries(){}
function render(){}

start();























//Links da API:
//'https://randomuser.me/api/?results=100&seed=promise';
// 'https://restcountries.eu/rest/v2/all';