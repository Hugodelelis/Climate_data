function getDate() {
    const currentDate = new Date();
    const formatedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
    }).format(currentDate)

    return formatedDate
}

export function showDate() {
    return document.querySelector('.date').innerHTML = getDate()
}
