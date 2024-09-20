import { isNumber } from 'class-validator';

interface StringObject {
  [key: string]: string;
}

export function queryParser(objeto: StringObject) {
  const resultado: any = {};

  console.log('objeto', objeto);
  for (const propiedad in objeto) {
    const valor = objeto[propiedad].toString();

    if (valor.includes(',')) {
      resultado[propiedad] = valor.split(',').map((elemento) => {
        const fixElement = elemento.replace(/\[|\]/g, '');
        console.log(fixElement);
        const valueLower = fixElement.toLowerCase();
        if (valueLower === 'true' || valueLower === 'false') {
          return valueLower === 'true';
        } else {
          const numero = Number(fixElement);
           return isNaN(numero) ? fixElement : numero;
        }
      });
    } else {
      const valueLower = valor.toLowerCase();
      if (valueLower === 'true' || valueLower === 'false') {
        resultado[propiedad] = valueLower === 'true';
      } else {
        const numero = Number(valor);
        resultado[propiedad] = isNaN(numero) ? valor : numero;
      }
    }
  }
  /* export function queryParser(objeto: StringObject) {
  const resultado: any = {};

  console.log('objeto', objeto);
  for (const propiedad in objeto) {
    const valor = objeto[propiedad];

    // Intentamos parsear como JSON para ver si es un array
    try {
      console.log('valor', valor, Array.isArray(valor));
      const parsed = Array.isArray(valor) ? valor : JSON.parse(valor);
      console.log('parsed', parsed);
      if (Array.isArray(parsed)) {
        // Si es un array, iteramos y convertimos elementos a números
        resultado[propiedad] = parsed.map((elemento) => {
          // if(elemento.)
          const parseValue = Number(elemento)
          // return isNaN(parseValue) ? elemento : parseValue;

          return isNaN(parseValue) ? elemento : parseValue;
        });
      } else {
        // Si no es un array válido, lo dejamos como string
        const numberValue = Number(valor) 
        resultado[propiedad] = isNaN(numberValue) ? valor : numberValue;
      }
    } catch (error) {
      console.log(error);
      if (valor.includes(',')) {
        resultado[propiedad] = valor.split(',').map((elemento) => {
          const fixElement=elemento.replace(/\[|\]/g,"")
          console.log(fixElement)
          const numero = Number(fixElement) 
          return isNaN(numero) ? fixElement : numero;
        });
      } else {
        resultado[propiedad] = valor;
      }
    }
  } */

  /* 
function parseBool(value: string) {
  if (['true', 'false'].includes((value as string).toLocaleLowerCase())) {
    return value === 'true';
  }
}

export function queryParser(objeto: StringObject) {
  const resultado: any = {};

  console.log('objeto', objeto);
  for (const propiedad in objeto) {
    const valor = objeto[propiedad];

    // Intentamos parsear como JSON para ver si es un array
    try {
      const parsed = Array.isArray(valor) ? valor : JSON.parse(valor);
      console.log('a');
      if (Array.isArray(parsed)) {
        // Si es un array, iteramos y convertimos elementos a números
        console.log('0');
        resultado[propiedad] = parsed.map((elemento) => {
          const asSTring = (elemento as string).toLocaleLowerCase();
          console.log('elemento',elemento)
          if (asSTring === 'true' || asSTring === 'false') {
            console.log('1');
            return elemento === 'true';
          }
          const parseValue = Number(elemento);
          // return isNaN(parseValue) ? elemento : parseValue;
          console.log('2');
          return parseValue;
        });
      } else {
        console.log('a3', valor);
        const asSTring = (resultado[propiedad] as string).toLocaleLowerCase();
        if (asSTring === 'true' || asSTring === 'false') {
          resultado[propiedad] = valor === 'true';
        }
        // Si no es un array válido, lo dejamos como string
        else {
          const numberValue = Number(valor);
          console.log('3');
          resultado[propiedad] = numberValue;
        }
      }
    } catch (error) {
      console.log(error);
      if (valor.includes(',')) {
        resultado[propiedad] = valor.split(',').map((elemento) => {
          const asSTring = (elemento as string).toLocaleLowerCase();
          if (asSTring === 'true' || asSTring === 'false') {
            return elemento === 'true';
          }
          const numero = Number(elemento);
          return isNaN(numero) ? elemento : numero;
        });
      } else {
        resultado[propiedad] = valor;
      }
    }
  } */

  //     try {

  //       if (Array.isArray(parsed)) {
  //         console.log("TRUE")
  //         // Si es un array, iteramos y convertimos elementos a números
  //         resultado[propiedad] = parsed.map((elemento) => {
  //           const numero = Number(elemento);
  //           return isNaN(numero) ? elemento : numero;
  //         });
  //       } else {
  //         // Si no es un array válido, lo dejamos como string
  //         resultado[propiedad] = Number(valor);
  //       }
  //     } catch (error) {
  //         console.log(error)
  //       // Si no se puede parsear como JSON, intentamos convertir a número
  //       const numero = Number(valor);
  //       resultado[propiedad] = isNaN(numero) ? valor : numero;
  //     }
  //   }

  return resultado;
}
