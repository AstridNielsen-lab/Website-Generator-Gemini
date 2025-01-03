import type { User, LoginCredentials, RegisterCredentials } from '../types/auth';
import type { Interaction } from '../types/history';

// File system paths
const USERS_PATH = '/data/users';
const INTERACTIONS_PATH = '/data/interactions';

interface StoredUser extends User {
  password: string;
}

// Helper to generate unique IDs
const generateId = () => crypto.randomUUID();

// Helper to get current timestamp
const getTimestamp = () => new Date().toISOString();

// Load data from JSON file
function loadJSON(path: string): any {
  try {
    const data = localStorage.getItem(path);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// Save data to JSON file
function saveJSON(path: string, data: any): void {
  localStorage.setItem(path, JSON.stringify(data));
}

// User management functions
export const userStorage = {
  // Create new user
  async register({ email, password, name }: RegisterCredentials): Promise<User> {
    const users = loadJSON(USERS_PATH) || {};
    
    if (users[email]) {
      throw new Error('User already exists');
    }
    
    const user: StoredUser = {
      id: generateId(),
      email,
      password, // In production, this should be hashed!
      name,
      createdAt: getTimestamp()
    };
    
    users[email] = user;
    saveJSON(USERS_PATH, users);
    
    // Create user's interactions folder
    saveJSON(`${INTERACTIONS_PATH}/${user.id}`, []);
    
    const { password: _, ...publicUser } = user;
    return publicUser;
  },
  
  // Login user
  async login({ email, password }: LoginCredentials): Promise<User> {
    const users = loadJSON(USERS_PATH) || {};
    const user = users[email] as StoredUser;
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    const { password: _, ...publicUser } = user;
    return publicUser;
  },
  
  // Get user by ID
  async getUser(id: string): Promise<User | null> {
    const users = loadJSON(USERS_PATH) || {};
    const user = Object.values(users).find((u: StoredUser) => u.id === id);
    
    if (!user) return null;
    
    const { password: _, ...publicUser } = user as StoredUser;
    return publicUser;
  }
};

// Interaction management functions
export const interactionStorage = {
  // Add new interaction
  async addInteraction(userId: string, interaction: Omit<Interaction, 'id' | 'userId' | 'timestamp'>): Promise<Interaction> {
    const interactions = loadJSON(`${INTERACTIONS_PATH}/${userId}`) || [];
    
    const newInteraction: Interaction = {
      id: generateId(),
      userId,
      ...interaction,
      timestamp: getTimestamp()
    };
    
    interactions.unshift(newInteraction);
    saveJSON(`${INTERACTIONS_PATH}/${userId}`, interactions);
    
    return newInteraction;
  },
  
  // Get user's interactions
  async getInteractions(userId: string): Promise<Interaction[]> {
    return loadJSON(`${INTERACTIONS_PATH}/${userId}`) || [];
  }
};