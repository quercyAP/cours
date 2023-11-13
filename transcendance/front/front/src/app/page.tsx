'use client'
import css from '../styles/Home.module.css';
import UserCard from '../components/UserCard';
import { agbalumo } from '../components/font';
import Background from '../components/background'
import LoginForm from '../components/LoginForm';
import ChatRoomList from '../components/ChatRoomList';

export default function Home() {
  const userData = {
    username: 'PlayerOne',
    avatar: '/assets/avatar.png',
    title: 'Paddle Pro',
    stats: {
      grade: 1,
      achiv: 2,
      exp: 50
    }
  };

  const userData2 = {
    username: 'PlayerTwo',
    avatar: '/assets/avatar2.jpg',
    title: 'Pong Prodigy',
    stats: {
      grade: 2,
      achiv: 3,
      exp: 100
    }
  };

  const chatRooms = [
    {
      id: 1,
      name: 'ChatRoom1',
      description: 'ChatRoom1'
    },
    {
      id: 2,
      name: 'ChatRoom2',
      description: 'ChatRoom2'
    },
    {
      id: 3,
      name: 'ChatRoom3',
      description: 'ChatRoom3'
    }
  ];

  const handleLoginSuccess = () => {
    console.log('Connexion réussie');
    // Redirection ou gestion de l'état de connexion ici
  };

  const handleLoginFailure = (error: string) => {
    console.error(error);
    // Gestion des erreurs de connexion ici
  };

  return (
    <Background>
      <h1 className={`${css.title} ${agbalumo.className}`}>Transcendance</h1>

      <div className={`${css.layer}`}>
        <LoginForm onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />
      </div>

    </Background>
  )
}
