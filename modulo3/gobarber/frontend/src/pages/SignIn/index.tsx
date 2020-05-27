import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';

import { Container, Left, Right, AnimationContainer } from './styles';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErros from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/auth';

import * as yup from 'yup';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          email: yup
            .string()
            .required('E-mail Obrigatório')
            .email('Digite um e-mail valido'),
          password: yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Erro ao realizar o login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Left>
        <AnimationContainer>
          <img src={logo} alt={'logo gobarber'} />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              icon={FiLock}
            />
            <Button type="submit">Entrar</Button>
            <a href="teste">Esqueci minha senha</a>
          </Form>
          <Link to="/signup">
            <FiLogIn /> Criar uma conta
          </Link>
        </AnimationContainer>
      </Left>
      <Right />
    </Container>
  );
};

export default SignIn;
