
export default function formatoPrecio(precio) {
    // Eliminar todos los caracteres no numéricos
    let newValue = precio.replace(/[^\d]/g, "");

    // Limitar la longitud del valor a 4 caracteres
    newValue = newValue.slice(0, 4);

    // Separar los dos últimos dígitos como decimales
    const decimales = newValue.slice(-2);
    const parteEntera = newValue.slice(0, -2);

    // Formatear el valor con puntos y comas
    const valorFormateado =
        parteEntera.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "." + decimales;

    return valorFormateado;
}
