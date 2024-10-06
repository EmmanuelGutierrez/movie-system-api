import { isNumber } from 'class-validator';

interface StringObject {
  [key: string]: string;
}

export function queryParser(objeto: StringObject) {
  const resultado: any = {};

  for (const propiedad in objeto) {
    const valor = objeto[propiedad].toString();

    if (valor.includes(',') || (valor.includes('[') && valor.includes(']'))) {
      resultado[propiedad] = valor.split(',').map((elemento) => {
        const fixElement = elemento.replace(/\[|\]/g, '');
        if (!fixElement) {
          return;
        }
        const valueLower = fixElement.toLowerCase();
        if (valueLower === 'true' || valueLower === 'false') {
          return valueLower === 'true';
        } else {
          const numero = Number(fixElement);
          const finalValue = isNaN(numero) ? fixElement : numero;
          return finalValue;
        }
      });
    } else {
      const valueLower = valor.toLowerCase();
      if (valueLower === 'true' || valueLower === 'false') {
        resultado[propiedad] = valueLower === 'true';
      } else {
        if (!valor) {
          resultado[propiedad] = valor;
        }
        const numero = Number(valor);
        resultado[propiedad] = isNaN(numero) ? valor : numero;
      }
    }
  }

  return resultado;
}
