import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Container, Left, Right, AnimationContainer } from './styles';
import { Form } from '@unform/web';
import { FiMail, FiLock, FiUser, FiChevronLeft } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignUpData) => {
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

        api.post('/users', data);
        history.push('/');
        addToast({
          type: 'succes',
          title: 'Cadastro realizxado com sucesso',
          description: 'Voce já pode fazer o seu logon no GoBarber',
        });
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Erro ao realizar o cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Left />
      <Right>
        <AnimationContainer>
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
          <Link to="/">
            <FiChevronLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Right>
    </Container>
  );
};

export default SignUp;
