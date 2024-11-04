document.querySelector('#city').addEventListener('change', showStatus);
document.querySelector('#state').addEventListener('change', getClimateDataStatus);

const apiKey = '743131c4a8f642e3af5223409240311';

export async function getClimateDataStatus() {
    const status = document.querySelector('.status')

    status.classList.remove('bg-warning', 'bg-danger', 'bg-success', 'bg-orange');
    status.classList.add('bg-secondary');
    status.innerHTML = 'Selecione (Estado e cidade)'
}

export async function showStatus() {
    const city = document.querySelector('#city').value
    const status = document.querySelector('.status')

    if(city) {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes&alerts=yes&&lang=pt`;
        const resp = await fetch(url)
    
        try {
            const data = await resp.json()
            const airQuality = data.current.air_quality;
            const defra = airQuality['gb-defra-index']
    
            if (defra >= 1 && defra <= 3) {
                status.classList.remove('bg-warning', 'bg-danger', 'bg-secondary', 'bg-orange');
                status.classList.add('bg-success');
                status.innerHTML = 'Bom';
            } else if (defra >= 4 && defra <= 6) {
                status.classList.remove('bg-success', 'bg-danger', 'bg-secondary', 'bg-orange');
                status.classList.add('bg-warning');
                status.innerHTML = 'Moderado';
            } else if (defra >= 7 && defra <= 9) {
                status.classList.remove('bg-success', 'bg-warning', 'bg-secondary', 'bg-danger');
                status.classList.add('bg-orange');
                status.innerHTML = 'Ruim';
            } else {
                status.classList.remove('bg-success', 'bg-warning', 'bg-secondary', 'bg-orange');
                status.classList.add('bg-danger');
                status.innerHTML = 'Muito ruim';
            }
        } catch(e) {
            console.log(e)
            Swal.fire({
                title: 'Erro!',
                text: 'Não possui dados dessa Cidade',
                icon: 'error',
                confirmButtonText: 'Voltar'
            }).then(() => {
                const status = document.querySelector('.status')
                const table = document.querySelector('.table')
                const info = document.querySelectorAll('.info-ar')
    
                status.classList.remove('bg-warning', 'bg-danger', 'bg-success', 'bg-orange');
                status.classList.add('bg-secondary');
                status.innerHTML = 'Selecione Outra'

                table.innerHTML = `
                <thead>
                    <tr>
                        <th scope="col">Horário</th>
                        <th scope="col">Condição</th>
                        <th scope="col">Chuva (%)</th>
                        <th scope="col">Temperatura (c°)</th>
                        <th scope="col">Sensação (c°)</th>
                        <th scope="col">Umidade (%)</th>
                        <th scope="col">Vento (Kph)</th>
                    </tr>
                </thead>
                <tbody class="table-content">
        
                </tbody>
            `

            info[0].innerHTML = 'co'
            info[1].innerHTML = 'no2'
            info[2].innerHTML = 'o3'
            info[3].innerHTML = 'pm2_5'
            info[4].innerHTML = 'pm10'
            info[5].innerHTML = 'so2'
            });
        }
    } 
}

document.querySelector('#city').addEventListener('change', showInfoAr);
document.querySelector('#state').addEventListener('change', getClimateDatas);

export async function getClimateDatas() {
    const info = document.querySelectorAll('.info-ar')

    info[0].innerHTML = 'co'
    info[1].innerHTML = 'no2'
    info[2].innerHTML = 'o3'
    info[3].innerHTML = 'pm2_5'
    info[4].innerHTML = 'pm10'
    info[5].innerHTML = 'so2'
}

export async function showInfoAr() {
    const city = document.querySelector('#city').value
    const info = document.querySelectorAll('.info-ar')
    
    if(city) {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes&alerts=yes&&lang=pt`;
        const resp = await fetch(url)
        const data = await resp.json()
        const airQuality = data.current.air_quality;

        const co = airQuality['co']
        const no2 = airQuality['no2']
        const o3 = airQuality['o3']
        const pm2_5 = airQuality['pm2_5']
        const pm10 = airQuality['pm10']
        const so2 = airQuality['so2']

        info[0].innerHTML = `co = ${co}`
        info[1].innerHTML = `no2 = ${no2}`
        info[2].innerHTML = `o3 = ${o3}`
        info[3].innerHTML = `pm2_5 = ${pm2_5}`
        info[4].innerHTML = `pm10 = ${pm10}`
        info[5].innerHTML = `so2 = ${so2}`
    }
}

document.querySelector('#city').addEventListener('change', getClimateDataTable);
document.querySelector('#state').addEventListener('change', cleanTable);

export async function getClimateDataTable() {
    const city = document.querySelector('#city').value
    const table = document.querySelector('.table-content')

    if(city) {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes&alerts=yes&&lang=pt`;
        const resp = await fetch(url)
        const data = await resp.json()
        const forecast = data.forecast

        if (forecast && forecast.forecastday[0].hour) {
            const hourlyData = forecast.forecastday[0].hour;

            hourlyData.forEach((hour) => {
                const timeOnly = hour.time.split(' ')[1];
                table.innerHTML += `
                    <tr>
                        <th scope="row">${timeOnly}</th>
                        <td>${hour.condition.text}</td>
                        <td>${hour.chance_of_rain}%</td>
                        <td>${hour.temp_c}c°</td>
                        <td>${hour.feelslike_c}c°</td>
                        <td>${hour.humidity}%</td>
                        <td>${hour.wind_kph}Kph</td>
                    </tr>
                `
            });
        }
    }
}

export function cleanTable() {
    const table = document.querySelector('.table')

    table.innerHTML = `
        <thead>
            <tr>
                <th scope="col">Horário</th>
                <th scope="col">Condição</th>
                <th scope="col">Chuva (%)</th>
                <th scope="col">Temperatura (c°)</th>
                <th scope="col">Sensação (c°)</th>
                <th scope="col">Umidade (%)</th>
                <th scope="col">Vento (Kph)</th>
            </tr>
        </thead>
        <tbody class="table-content">

        </tbody>
    `
}