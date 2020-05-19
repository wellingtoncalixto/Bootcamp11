import React, { useCallback, useRef } from 'react';
import logo from '../../assets/logo.svg';
import { Container, Left, Right } from './styles';
import { Form } from '@unform/web';
import { FiMail, FiLock, FiUser, FiChevronLeft } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = yup.object().shape({
        name: yup.string().required('Nome Obrigatório'),
        email: yup
          .string()
          .required('E-mail Obrigatório')
          .email('Digite um e-mail valido'),
        password: yup.string().min(6, 'No minimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErros(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Left />
      <Right>
        <img src={logo} alt={'logo gobarber'} />
        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça seu Cadastro</h1>
          <Input name="name" placeholder="Name" icon={FiUser} />
          <Input name="email" placeholder="E-mail" icon={FiMail} />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            icon={FiLock}
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="">
          <FiChevronLeft />
          Voltar para login
        </a>
      </Right>
    </Container>
  );
};

export default SignUp;
