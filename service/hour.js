function getHour() {
    const currentHour = new Date();
    const formatedHour = new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(currentHour);

    return formatedHour
}

export function showHour() {
    document.querySelector('.hour').innerHTML = getHour()
}