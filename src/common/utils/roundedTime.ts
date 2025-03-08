export function roundedTime(timestamp:number, duracionMinutos:number) {
  // Convertir timestamp a objeto Date
  let fecha = new Date(timestamp * 1000); // Se multiplica por 1000 porque los timestamps suelen estar en segundos, no en milisegundos

  // Calcular la nueva fecha sumando la duración y 15 minutos adicionales
  fecha.setMinutes(fecha.getMinutes() + duracionMinutos + 15);

  // Redondear los minutos al múltiplo de 10 más cercano
  let minutos = fecha.getMinutes();
  let minutosRedondeados;
  if (minutos % 10 === 0) {
    minutosRedondeados = minutos;
  } else {
    minutosRedondeados = Math.ceil(minutos / 10) * 10;
  }

  fecha.setMinutes(minutosRedondeados);

  // Devolver el nuevo timestamp
  return Math.floor(fecha.getTime() / 1000);
}
