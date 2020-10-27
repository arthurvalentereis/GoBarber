import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather'

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  UserAvatar,
  ProfileButton,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle,
 } from './styles';

 import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect (() =>{
    api.get('providers').then(response =>{
      setProviders(response.data);
    })
  },[])

  const navigateToProfile = useCallback( () => {
    navigate('Profile');
  },[navigate]);


  const navigateToCreateAppointment = useCallback((providerId: string) =>{
    navigate('CreateAppointment', {providerId} );
  },[navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}

          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url}} />
        </ProfileButton>

        <Button title="Sair" onPress={signOut} />
      </Header>

      <ProvidersList
      data={providers}
      ListHeaderComponent={
        <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
      }
      keyExtractor={(provider) => provider.id}
      renderItem={ ({item : provider}) =>(
        <ProviderContainer
          onPress={() => navigateToCreateAppointment(provider.id) }>
          <ProviderAvatar source={{ uri: provider.avatar_url }} />

          <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                 <Icon name="calendar" size={14} color="#ff9000" />
                 <ProviderMetaText>Segunda à Sexta </ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                 <Icon name="clock" size={14} color="#ff9000" />
                 <ProviderMetaText>8h à 18h </ProviderMetaText>
              </ProviderMeta>
          </ProviderInfo>

        </ProviderContainer>
      )}
      />
    </Container>
  )
};

export default Dashboard;
