// Importando o pacote de interface para tratamento de erros do yup
import { ValidationError } from 'yup';

// Informamos que a interface Errors pode receber qualquer coisa, portanto que seja uma string.
interface Errors {
  [key: string]: string;
}

/* Essa função recebe o objeto de erros(err) e percorre todos os erros transformando eles em outros objetos no formato correto para enviar ao input através do useRef/Unform o resultado é um objeto com o name:message que passamos para o yup */
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    // Pegando dentro do array de objeto todos os nomes de input que deram erro e inserindo o name dentro da mensagem de erro, criando um objeto name:message.
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
