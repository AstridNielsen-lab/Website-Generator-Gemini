import { useState, useEffect } from 'react';
import type { InteractionHistory, Interaction } from '../types/history';
import { interactionStorage } from '../utils/storage';
import { useAuth } from './useAuth';

export function useHistory() {
  const { user } = useAuth();
  const [state, setState] = useState<InteractionHistory>({
    interactions: [],
    isLoading: false,
    error: null
  });

  // Load history when user changes
  useEffect(() => {
    if (user) {
      loadHistory();
    } else {
      setState(prev => ({ ...prev, interactions: [] }));
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const interactions = await interactionStorage.getInteractions(user.id);
      setState(prev => ({ ...prev, interactions }));
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const addInteraction = async (interaction: Omit<Interaction, 'id' | 'userId' | 'timestamp'>) => {
    if (!user) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const newInteraction = await interactionStorage.addInteraction(user.id, interaction);
      setState(prev => ({
        ...prev,
        interactions: [newInteraction, ...prev.interactions]
      }));
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return {
    ...state,
    addInteraction,
    loadHistory
  };
}