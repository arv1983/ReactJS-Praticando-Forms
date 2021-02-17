import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import "./App.css";
import { render } from "@testing-library/react";

const Form = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório!"),
    texto: yup.string().max(18, "deve ter no maximo 18 caracteres"),
    //"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    senha: yup
      .string()
      .min(8, "Mínimo de 8 dígitos")
      .matches(
        /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial!"
      )
      .required("Campo obrigatório"),
    senhaconf: yup.string().oneOf([yup.ref("senha")], "senha diferentes"),
    cep: yup
      .string()
      .matches(/[0-9]{5}-[0-9]{3}/, "CEP INVALIDO, use 00000-000"),
  });

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const handleData = (data) => {
    console.log(data);
    console.log(data.senha);
    setIsSuccess(true);

    reset();
    render(
      <>
        <div>Nome: {data.email}</div>
        <div>texto: {data.texto}</div>
        <div>senha: {data.senha}</div>
        <div>cep: {data.cep}</div>
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleData)}>
        <div>
          Email
          <input name="email" value="teste@teste.com" ref={register} />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        </div>

        <div>
          texto
          <input name="texto" value="texto18<caracteres" ref={register} />
          <p style={{ color: "red" }}>{errors.texto?.message}</p>
        </div>

        <div>
          CEP
          <input name="cep" ref={register} />
          <p style={{ color: "red" }}>{errors.cep?.message}</p>
        </div>

        <div>
          Senha
          <input name="senha" value="Senha-321" ref={register} />
          <p style={{ color: "red" }}>{errors.senha?.message}</p>
        </div>
        <div>
          Confirm Senha
          <input name="senhaconf" ref={register} />
          <p style={{ color: "red" }}>{errors.senhaconf?.message}</p>
        </div>

        <button type="submit">Enviar</button>
      </form>
      {isSuccess ? <div>SUCESSO</div> : null}
    </>
  );
};

export default Form;
