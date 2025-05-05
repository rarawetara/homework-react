import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from '../types/User';
import { Card, Button } from '../styles/StyledComponents';
import UserForm from '../components/UserForm';

interface UserCardProps {
  user: User;
  onDelete: (id: string) => void;
  onUpdate: (id: string, userData: any) => void;
  color?: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete, onUpdate, color = '#ffffff' }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdate = (userData: any) => {
    onUpdate(user.id, userData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      onDelete(user.id);
    }
  };

  if (isEditing) {
    return (
      <StyledCard style={{ borderLeft: `5px solid ${color}` }}>
        <UserForm 
          initialData={user} 
          onSubmit={handleUpdate} 
          onCancel={handleCancelEdit}
          isEditing={true}
        />
      </StyledCard>
    );
  }

  return (
    <StyledCard style={{ borderLeft: `5px solid ${color}` }}>
      <UserHeader>
        <h3>{user.name}</h3>
        <StatusBadge $married={user.married}>
          {user.married ? 'Married' : 'Single'}
        </StatusBadge>
      </UserHeader>
      
      <UserInfo>
        <InfoItem>
          <strong>Username:</strong> {user.username}
        </InfoItem>
        <InfoItem>
          <strong>Email:</strong> {user.email}
        </InfoItem>
        <InfoItem>
          <strong>Phone:</strong> {user.phone}
        </InfoItem>
        <InfoItem>
          <strong>Website:</strong> {user.website}
        </InfoItem>
        <InfoItem>
          <strong>Company:</strong> {user.company.name}
        </InfoItem>
        <InfoItem>
          <strong>City:</strong> {user.address.city}
        </InfoItem>
      </UserInfo>
      
      <StyledFlex>
        <StyledButton onClick={handleEdit}>Edit</StyledButton>
        <StyledDangerButton onClick={handleDelete}>Delete</StyledDangerButton>
      </StyledFlex>
    </StyledCard>
  ); 
};

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const StatusBadge = styled.span<{ $married: boolean }>`
  background-color: ${props => props.$married ? 'var(--secondary-color)' : 'var(--warning-color)'};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const UserInfo = styled.div`
  flex-grow: 1;
  margin-bottom: 1rem;
`;

const InfoItem = styled.p`
  margin-bottom: 0.5rem;
  
  strong {
    font-weight: 600;
  }
`;

const StyledFlex = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const StyledButton = styled(Button)``;

const StyledDangerButton = styled(Button)`
  background-color: var(--danger-color);
`;

export default UserCard; 