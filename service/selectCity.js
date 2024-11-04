const citySelect = document.querySelector('.citySelect')

document.querySelector('#state').addEventListener('change', showCity);
document.querySelector('#state').addEventListener('change', updateCityDisplay);
document.querySelector('#city').addEventListener('change', updateCityDisplay);

export async function showCity() {
    const state = document.querySelector('#state').value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
    const resp = await fetch(url)
    const data = await resp.json()
    const select = document.querySelector('#city')
    select.innerHTML = '<option selected>Selecione</option>'

    data.map(obj => {
        select.innerHTML += `<option value="${obj.nome}">${obj.nome}</option>`
    })

    citySelect.innerHTML = "Selecione uma cidade";
}

export function updateCityDisplay() {
    const state = document.querySelector('#state').value;
    const city = document.querySelector('#city').value;

    if (city && city !== "Selecione" && state !== "Selecione") {
        citySelect.innerHTML = `${city} - ${state}`;
    }
}