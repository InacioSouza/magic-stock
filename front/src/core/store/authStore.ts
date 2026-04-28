import { create } from "zustand";

type AuthState = {
    access_token: string | null;
    login: (access_token: string) => void;
    logout: () => void 
}

const nameFieldToken: string = 'access_token';

export const useAuthStore = create<AuthState>((set) => ({
    access_token: localStorage.getItem(nameFieldToken) || 'null',

    login: (access_token) => {

        localStorage.setItem(nameFieldToken, access_token);
        set({access_token});
    },

    logout: () => {
        localStorage.removeItem(nameFieldToken);
        set({ access_token: null });
    }
}));