import React, { useState } from 'react';
import styled from 'styled-components';
import { User, UserInput } from '../types/User';
import { Button, FormGroup, Input, Label } from '../styles/StyledComponents';

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: UserInput) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const defaultFormData: UserInput = {
  name: '',
  username: '',
  email: '',
  married: false,
  phone: '',
  website: '',
  address: {
    street: '',
    city: '',
    zipcode: '', 
  },
  company: {
    name: '',
  }
};

const UserForm: React.FC<UserFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<UserInput>(() => {
    if (initialData) {
      return {
        name: initialData.name,
        username: initialData.username,
        email: initialData.email,
        married: initialData.married,
        phone: initialData.phone,
        website: initialData.website,
        address: {
          street: initialData.address.street,
          city: initialData.address.city,
          zipcode: initialData.address.zipcode,
        },
        company: {
          name: initialData.company.name,
        }
      };
    }
    return defaultFormData;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (parent === 'address') {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [child]: value
          }
        }));
      } else if (parent === 'company') {
        setFormData(prev => ({
          ...prev,
          company: {
            ...prev.company,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormColumns>
        <FormGroup>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="text"
            value={formData.website}
            onChange={handleChange}
            required
          />
        </FormGroup>
      </FormColumns>

      <FormColumns>
        <FormGroup>
          <Label htmlFor="address.city">City</Label>
          <Input
            id="address.city"
            name="address.city"
            type="text"
            value={formData.address.city}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="address.street">Street</Label>
          <Input
            id="address.street"
            name="address.street"
            type="text"
            value={formData.address.street}
            onChange={handleChange}
            required
          />
        </FormGroup>
      </FormColumns>

      <FormColumns>
        <FormGroup>
          <Label htmlFor="address.zipcode">Zip Code</Label>
          <Input
            id="address.zipcode"
            name="address.zipcode"
            type="text"
            value={formData.address.zipcode}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="company.name">Company</Label>
          <Input
            id="company.name"
            name="company.name"
            type="text"
            value={formData.company.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
      </FormColumns>

      <FormGroup>
        <CheckboxContainer>
          <CheckboxInput
            id="married"
            name="married"
            type="checkbox"
            checked={formData.married}
            onChange={handleChange}
          />
          <StyledLabel htmlFor="married">
            Married
          </StyledLabel>
        </CheckboxContainer>
      </FormGroup>

      <ButtonContainer>
        {onCancel && (
          <WarningButton type="button" onClick={onCancel}>
            Cancel
          </WarningButton>
        )}
        <SubmitButton type="submit">
          {isEditing ? 'Update User' : 'Add User'}
        </SubmitButton>
      </ButtonContainer>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  width: 100%;
`;

const FormColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CheckboxInput = styled.input`
  margin-right: 0.5rem;
  width: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const SubmitButton = styled(Button)``;

const WarningButton = styled(Button)`
  background-color: var(--warning-color);
`;

const StyledLabel = styled(Label)`
  display: inline;
  margin-bottom: 0;
`;

export default UserForm; 