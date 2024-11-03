document.querySelector('#city').addEventListener('change', getClimateData);
const apiKey = 'c7b3fbe92ce44e028b8220138240311';

export async function getClimateData() {
    const city = document.querySelector('#city').value

    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const resp = await fetch(url)
        const data = await resp.json()

        return console.log(data)
    }
}
