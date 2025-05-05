import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserInput, UserFilters as UserFiltersType } from './types/User';
import { useUserStore, SortField, SortDirection } from './store/userStore';
import UserList from './components/UserList';
import UserFilters from './components/UserFilters';
import AddUserModal from './components/AddUserModal';
import { Container, Button } from './styles/StyledComponents';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSaveNotice, setShowSaveNotice] = useState(false);
  
  const {
    isLoading,
    error,
    filters,
    filterColor,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    setFilters,
    setSorting,
    setFilterColor,
    filteredAndSortedUsers 
  } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = (userData: UserInput) => {
    createUser(userData);
    setIsAddModalOpen(false);
  };

  const handleUpdateUser = (id: string, userData: UserInput) => {
    updateUser(id, userData);
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSorting(field, direction);
    showSaveNotification();
  };

  const handleFilterChange = (filters: Partial<UserFiltersType>) => {
    setFilters(filters);
    showSaveNotification();
  };

  const handleColorChange = (color: string) => {
    setFilterColor(color);
    showSaveNotification();
  };

  const showSaveNotification = () => {
    setShowSaveNotice(true);
    setTimeout(() => {
      setShowSaveNotice(false);
    }, 2000);
  };

  const displayedUsers = filteredAndSortedUsers();

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <HeaderContent>
            <h1>User Management System</h1>
            <AddButton onClick={() => setIsAddModalOpen(true)}>Add New User</AddButton>
          </HeaderContent>
        </Header>
        
        <MainContent>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <UserFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onColorChange={handleColorChange}
            currentColor={filterColor}
          />
          
          <UserList 
            users={displayedUsers}
            isLoading={isLoading}
            onDelete={handleDeleteUser}
            onUpdate={handleUpdateUser}
            color={filterColor}
          />
        </MainContent>
        
        <AddUserModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddUser}
        />

        {showSaveNotice && (
          <SaveNotification>
            <span>✅ Settings saved</span>
          </SaveNotification>
        )}
      </AppContainer>
    </>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

const AddButton = styled(Button)``;

const MainContent = styled(Container)`
  flex: 1;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const ErrorMessage = styled.div`
  background-color: #fff3f3;
  color: var(--danger-color);
  border: 1px solid var(--danger-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: 1rem;
`;

const SaveNotification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--secondary-color);
  color: white;
  padding: 10px 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default App;
