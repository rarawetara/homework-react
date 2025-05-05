import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { UserFilters as FiltersType } from '../types/User';
import { SortField, SortDirection } from '../store/userStore';
import { Input, Select, Button, Card } from '../styles/StyledComponents';

interface UserFiltersProps {
  filters: FiltersType;
  onFilterChange: (filters: Partial<FiltersType>) => void;
  onSortChange: (field: SortField, direction: SortDirection) => void;
  onColorChange: (color: string) => void;
  currentColor: string;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  onFilterChange,
  onSortChange,
  onColorChange,
  currentColor 
}) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Загружаем сохраненные значения сортировки из хранилища
  useEffect(() => {
    const savedSorting = localStorage.getItem('userSorting');
    if (savedSorting) {
      try {
        const { field, direction } = JSON.parse(savedSorting);
        setSortField(field);
        setSortDirection(direction);
      } catch (e) {
        console.error('Error parsing saved sorting', e);
      }
    }
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortField = e.target.value as SortField;
    setSortField(newSortField);
    onSortChange(newSortField, sortDirection);
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    onSortChange(sortField, newDirection);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handleMarriedFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let married: boolean | null = null;
    
    if (value === 'Married') {
      married = true;
    } else if (value === 'Single') {
      married = false;
    }
    
    onFilterChange({ married });
  };

  const handleColorChange = () => {
    if (colorInputRef.current) {
      onColorChange(colorInputRef.current.value);
    }
  };

  return (
    <FilterContainer>
      <FilterSection>
        <FilterLabel>Search:</FilterLabel>
        <StyledInput
          type="text"
          placeholder="Search by name, username or email"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </FilterSection>

      <FilterSection>
        <FilterLabel>Marital Status:</FilterLabel>
        <StyledSelect
          value={filters.married === null ? 'all' : filters.married ? 'Married' : 'Single'}
          onChange={handleMarriedFilterChange}
        >
          <option value="all">All</option>
          <option value="Married">Married</option>
          <option value="Single">Single</option>
        </StyledSelect>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Sort By:</FilterLabel>
        <SortFlexContainer>
          <StyledSelect value={sortField} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </StyledSelect>
          <SortButton onClick={toggleSortDirection}>
            {sortDirection === 'asc' ? '↑' : '↓'}
          </SortButton>
        </SortFlexContainer>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Card Color:</FilterLabel>
        <ColorPickerContainer>
          <ColorInput 
            type="color" 
            ref={colorInputRef} 
            defaultValue={currentColor}
            onChange={handleColorChange}
          />
          <ColorPreview style={{ backgroundColor: currentColor }} />
        </ColorPickerContainer>
      </FilterSection>
    </FilterContainer>
  );
};

const FilterContainer = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
`;

const FilterSection = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const StyledInput = styled(Input)`
  margin-bottom: 0;
`;

const StyledSelect = styled(Select)`
  margin-bottom: 0;
`;

const SortFlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SortButton = styled(Button)`
  padding: 0.5rem;
  min-width: 40px;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColorInput = styled.input`
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const ColorPreview = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
`;

export default UserFilters; 