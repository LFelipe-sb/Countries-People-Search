let globalCountries = [];
let globalPeople = [];
let globalUserCountry = [];

async function start(){
    //Chamada Normal das funções
    // console.time('teste');
    // await fetchPeople();
    // await fetchCountries();
    // console.timeEnd('teste');
    
    // Chamada 
    // await promisePeople();
    // await promiseCountries();
    
    //AllPromise - Dispara todas as promises de uma unica vez.
    const p1 = promisePeople();
    const p2 = promiseCountries();
    await Promise.all([p1, p2]);

    hideSpinner();
    mergeUsersAndCountries();
    render();
}

async function fetchPeople(){
    const response = await fetch('http://localhost:3002/people');
    const json = await response.json();

    //Maneira sem Destructing
    globalPeople = json.map(person => {
        return{
            userId: person.login.uuid,
            userCountry: person.nat,
            userName: person.name.first,
            userPicture: person.picture.large
        } 
    });
}

//Function para isolar e assim criar um settimeOut na execução da function.
function promisePeople(){
    return new Promise(async (resolve, reject) => {
        const people = await fetchPeople();

        setTimeout(() => {
            resolve(people);

        }, 3000);
    });
}

async function fetchCountries(){
    const response = await fetch('http://localhost:3001/countries');
    const json = await response.json();

    //Maneira com Destructing
    globalCountries = json.map(({name, flag, alpha2Code}) => {
        return{
            countryName: name,
            countryFlag: flag,
            countryCode: alpha2Code
        }
    });
}

//Function para isolar e assim criar um settimeOut na execução da function.
function promiseCountries(){
    return new Promise(async(resolve, reject) => {
        const country = await fetchCountries();

        setTimeout(() => {
            resolve(country);
        }, 2000);
    });
}

function hideSpinner(){
    const spinner = document.getElementById('spinner');
    
    //Classe Hide utilizada abaixo faz parte do Materialize.
    spinner.classList.add('hide');
}

function mergeUsersAndCountries(){
    globalUserCountry = [];

    globalPeople.forEach((user) => {
        const country = globalCountries.find((country) => 
            country.countryCode === user.userCountry
        );

        //Realizando Spread para unir os dois arrays.
        globalUserCountry.push({...user, ...country});     
    });
}

function render(){
    const divUsers = document.getElementById('users');

    divUsers.innerHTML = 
    `
        <div class='row'>
            ${globalUserCountry.map(({userName, userPicture, countryName, countryFlag}) => {
                return `
                    <div class='col s12 m4 l3 '>
                        <div class='flex-row bordered'>
                            <img class='avatar' src='${userPicture}' alt='${userName}' />
                            <span> ${userName}</span>
                        </div>
                        <div class='flex-column'>
                            <img class='flag' src='${countryFlag}' alt='${countryName}' />
                        </div>
                    </div>
                `
            }).join('')} 
        </div>
    `
    //O .join é utilizado para transformar os dados em string e assim, remover as virgulas que vinham do arquivo json.
}

start();


//Links da API:
//'https://randomuser.me/api/?results=100&seed=promise';
// 'https://restcountries.eu/rest/v2/all';