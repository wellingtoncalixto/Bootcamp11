import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { Container, Title, Form, Repositories, ErrorText } from './styles';
import api from '../../services/api';
import { Link } from 'react-router-dom';


interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}


const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem('@githubExplorer:repositories');

    if(storageRepositories){
      return JSON.parse(storageRepositories);
    } else {
      return []
    }
  });

  useEffect(() => {
    localStorage.setItem('@githubExplorer:repositories', JSON.stringify(repositories))
  },[repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if(!newRepo) {
      return setInputError('Digite autor/repositorio')
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`)

    const repository = response.data;

    setRepositories([...repositories, repository])
    setNewRepo('')
    }catch(Err) {
      setInputError('Erro ao encontrar o repositorio')
    }

  }

  return (
    <Container>
      <img src={logo} alt="logo" />
      <Title>Explore repositorios no Github</Title>

      <Form onSubmit={handleAddRepository} hasError={!!inputError}>
        <input
          type="text"
          placeholder="DIgite o nome do repositorio"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />

        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && (
        <ErrorText>{inputError}</ErrorText>
      )}
      <Repositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
          />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
        ))}
      </Repositories>
    </Container>
  );
};

export default Dashboard;
