// components/UserCard.tsx
import React from 'react';
import styled from 'styled-components';

interface UserCardProps {
  username: string;
  avatar: string;
  title: string;
  stats: {
    exp: number;
    grade: number;
    achiv: number;
  };
}

const CardWrapper = styled.div`
    background:  linear-gradient(180deg,
        rgba(240, 7, 129,1) 10%,
        rgba(131,58,180,1) 20%,
        rgba(20, 15, 103,1) 20%,
        rgba(16, 13, 87,0) 80%,
        rgb(19, 110, 223) 100%);
    border-radius: 20px;
    border-top: 1px solid rgba(241, 210, 249, 0.8);
    border-radius: 20px;
    height: 200px;
    width: 350px;
    padding: 20px;
    box-shadow: 5px 6px 5px rgba(0, 0, 0, 1);
    color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    position: relative;
`;

const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid #ffeab5;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 1),
        2px 0px 1px rgba(0, 0, 0, 1),
        0px 2px 1px rgba(0, 0, 0, 1),
        0px 0px 5px rgba(0, 0, 0, 1);
    background-size: 100%100%;
`;

const UserName = styled.h3`
    margin: 0;
    position: absolute;
    top: 20px;
    color: #ffeab5;
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 1),
    2px 0px 1px rgba(0, 0, 0, 1),
    0px 2px 1px rgba(0, 0, 0, 1),
    0px 0px 5px rgba(0, 0, 0, 1);
    font-size: 1.5rem;
`;

const UserStats = styled.p`
    background: rgba(255, 0, 143, 0.8);
    border-top: 1px solid rgba(241, 210, 249, 0.5);
    border-bottom: 1px solid rgba(241, 210, 249, 0.5);
    width: 13rem;
    height: 1.7rem;
    font-size: 0.7rem;
    text-align: center;
    padding: 5px 10px;
    border-radius: 20px;
    color: #ffeab5;
    font-size: 0.6rem;
    text-shadow: 0px 0px 2px rgba(77, 255, 77, 0.8);
`;

const Title = styled.h3`
    margin: 0;
    position: absolute;
    top: 10px;
    right: 20px;
    color: #ffeab5;
    font-size: 1rem;
`;

const StatList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const UserCard: React.FC<UserCardProps> = ({ username, avatar, stats, title }) => {
  return (
    <CardWrapper>
        <Avatar src={avatar} alt={`${username}'s avatar`} />
        <UserName>{username}</UserName>
        <Title>{title}</Title>
        <StatList>
            <UserStats>grade: {stats.grade}</UserStats>
            <UserStats>achivement: {stats.achiv}</UserStats>
            <UserStats>xp: {stats.exp}</UserStats>
        </StatList>
    </CardWrapper>
  );
};

export default UserCard;
