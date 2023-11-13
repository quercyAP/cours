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

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10rem;
  background: #0f0f23;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const ChatRoomCard = styled.div`
  background: #1c1c3b;
  padding: 20px;
  margin: 10px;
  color: white;
  border-radius: 10px;
  box-shadow: inset 0 0 10px #000000;
`;

const ChatRoomTitle = styled.h3`
  font-size: 1.5em;
  color: #ff00ff; // Couleur de police néon pour le titre
`;

const ChatRoomDescription = styled.p`
  font-size: 1em;
  color: #ffffff;
`;

const JoinButton = styled.button`
  padding: 10px 20px;
  background-color: #ff00ff; // Couleur de bouton néon
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ee00ee; // Légère variation au survol
  }
`;

export default function ChatRoomList({ chatRooms }: ChatRoomListProps) {
  return (
    <ChatRoomContainer>
      {chatRooms.map((room) => (
        <ChatRoomCard key={room.id}>
          <ChatRoomTitle>{room.name}</ChatRoomTitle>
          <ChatRoomDescription>{room.description}</ChatRoomDescription>
          <JoinButton onClick={() => joinRoom(room.id)}>Join</JoinButton>
        </ChatRoomCard>
      ))}
    </ChatRoomContainer>
  );
}

function joinRoom(roomId: number) {
  // Logique pour rejoindre une salle de chat
}
