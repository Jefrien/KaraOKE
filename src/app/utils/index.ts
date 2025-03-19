export const durationFormat = (duration: number) => {
    // if is more than 1 hour
    if (duration > 3600) {
        return `${Math.floor(duration / 3600)} Horas ${Math.floor((duration % 3600) / 60)} Minutos`;
    }
    // if is more than 1 minute
    if (duration > 60) {
        return `${Math.floor(duration / 60)} Minutos`;
    }
    return `${duration} Segundos`;
}

export const numberFormat = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}