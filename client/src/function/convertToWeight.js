export default function convertToWeight(value) {
    // Eliminar todos los caracteres no numéricos
    let newValue = value.replace(/[^\d]/g, "");

    // Limitar la longitud del valor a 3 caracteres
    newValue = newValue.slice(0, 3);

    // Validar si el valor es un número entero mayor que 0
    const peso = parseInt(newValue, 10);
    if (!/^\d+$/.test(newValue) || peso <= 0) {
        // Si el valor no es un número entero mayor que 0, devolvemos una cadena vacía
        return "";
    } else {
        // Si el valor es válido, lo devolvemos
        return newValue;
    }
}
