document.querySelector('#city').addEventListener('change', showStatus);
document.querySelector('#state').addEventListener('change', getClimateDataStatus);

const apiKey = '743131c4a8f642e3af5223409240311';

export async function getClimateDataStatus() {
    const status = document.querySelector('.status')

    status.classList.remove('bg-warning', 'bg-danger', 'bg-success', 'bg-orange');
    status.classList.add('bg-secondary');
    status.innerHTML = 'Selecione'
    
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
    
                status.classList.remove('bg-warning', 'bg-danger', 'bg-success', 'bg-orange');
                status.classList.add('bg-secondary');
                status.innerHTML = 'Selecione Outra'
            });
        }
    } 
}
