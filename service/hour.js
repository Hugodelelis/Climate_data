document.querySelector('#city').addEventListener('change', showHour);
document.querySelector('#state').addEventListener('change', getHour);

function getHour() {
    const currentHour = new Date();
    const formatedHour = new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(currentHour);

    document.querySelector('.hour').innerHTML = ''
    return formatedHour
}

export function showHour() {
    const city = document.querySelector('#city').value

    if (city) {
        document.querySelector('.hour').innerHTML = getHour()
    } 
}