import React from 'react';
import styled from 'styled-components';
import { User } from '../types/User';
import UserCard from './UserCard';
import { Grid, Spinner } from '../styles/StyledComponents';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, userData: any) => void;
  color: string;
}

const UserList: React.FC<UserListProps> = ({ 
  users, 
  isLoading, 
  onDelete, 
  onUpdate,
  color
}) => {
  if (isLoading) {
    return <Spinner />; 
  }

  if (users.length === 0) {
    return <EmptyMessage>No users found. Try different filters or add a new user.</EmptyMessage>;
  }

  return (
    <StyledGrid>
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onDelete={onDelete} 
          onUpdate={onUpdate}
          color={color}
        />
      ))}
    </StyledGrid>
  );
};

const StyledGrid = styled(Grid)`
  margin-top: 2rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

export default UserList; 