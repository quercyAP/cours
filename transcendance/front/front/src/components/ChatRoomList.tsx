// components/ChatRoomList.js
import styled from 'styled-components';

interface ChatRoom {
  id: number; // ou string si votre ID est une chaîne
  name: string;
  description: string;
}

interface ChatRoomListProps {
  chatRooms: ChatRoom[];
}

const ChatRoombox = styled.div`
  color: #ffeab5;
  font-size: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 2vh;
  border-radius: 20px;
  height: 30vh;
  width: 27vw;
  background:  linear-gradient(180deg,
    rgba(240, 7, 129,1) 10%,
    rgba(131,58,180,1) 15%,
    rgba(0, 19, 43 ,1) 15%,
    rgba(0, 19, 43 ,0.3) 80%,
    rgba(0, 19, 43 ,1) 100%);
  border-radius: 20px;
  border-top: 1px solid rgba(241, 210, 249, 0.8);
  border-radius: 20px;
  box-shadow: -5px 6px 5px rgba(0, 0, 0, 1);

  @media (max-width: 425px) {
    width: 50vw;
  }
`;

const Title = styled.h3`
  position: absolute;
  top: 10px;
  color: #ffeab5;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 1),
  2px 0px 1px rgba(0, 0, 0, 1),
  0px 2px 1px rgba(0, 0, 0, 1),
  0px 0px 5px rgba(0, 0, 0, 1);
  font-size: 1vw;
`;


const ChatRoomContainer = styled.div`
  width: 25vw;
  height: 12rem;
  margin-top: 1rem;
  padding-top: 0.5rem;
  background: transparent;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-height: 12rem;
  z-index: 0;
  overflow-y: auto;

  /* Styles de barre de défilement pour Webkit (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #2d2d3d;
    border-radius: 6px; /* Bords arrondis pour le track */
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(105, 250, 255, 0.7), rgba(105, 250, 255, 0.7)); /* Dégradé néon */
    border-radius: 6px; /* Bords arrondis pour le thumb */
    border: 2px solid #1f1f22; /* Bordure pour simuler un effet de lumière */
  }

`;

const ChatRoomCard = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffeab5;
  border-radius: 10px;
  box-shadow: inset 0 0 10px #000000;

  &:hover {
    position: relative;
    background: rgba(0, 19, 43, 0.8);
    z-index: -1;
  }
`;

const ChatRoomTitle = styled.h3`
  margin: 2px;
  padding-left: 10px;
  font-size: 0.8em;
  color: #ffeab5;
`;

const ChatRoomDescription = styled.p`
  font-size: 0.6em;
  color: #ffeab5;
`;

const JoinButton = styled.button`
  cursor: pointer;
  color: #ffeab5;
  font-size: 0.6em;
  border: var(--clr-neon) 2px solid;
  padding: 5px;
  margin-right: 5px;
  margin-bottom: 2px;
  margin-top: 2px;
  border-radius: 10px;
  box-shadow: inset 0 0 10px 0 var(--clr-neon), 0 0 10px 0 var(--clr-neon);
  position: relative;

  &:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 5px;
      box-shadow: 0 0 2em 0.5em var(--clr-neon);
      opacity: 0;
      background-color: var(--clr-neon);
      z-index: -1;
      transition: opacity 100ms linear;
  }
  &:hover, &:focus {
      color: var(--clr-bg);
      text-shadow: none;
  }
  &:hover:after, &:focus:after {
      opacity: 1;
  }
`;

export default function ChatRoomList({ chatRooms }: ChatRoomListProps) {
  return (
    <ChatRoombox>
      <Title>IRC Lobby</Title>
      <ChatRoomContainer>
        {chatRooms.map((room) => (
          <ChatRoomCard key={room.id}>
            <ChatRoomTitle>{room.name}</ChatRoomTitle>
            <ChatRoomDescription>{room.description}</ChatRoomDescription>
            <JoinButton onClick={() => joinRoom(room.id)}>Join</JoinButton>
          </ChatRoomCard>
        ))}
      </ChatRoomContainer>
    </ChatRoombox>
  );
}

function joinRoom(roomId: number) {
  // Logique pour rejoindre une salle de chat
}
