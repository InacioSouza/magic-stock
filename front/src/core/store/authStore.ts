import { create } from "zustand";
import { PayloadToken } from "../model/dto/payload-token";
import { jwtDecode } from "jwt-decode";

type AuthState = {
    access_token: string | null;
    login: (access_token: string) => void;
    logout: () => void,
    getPayload: () => PayloadToken
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
    },

    getPayload: () => {
        const token = localStorage.getItem(nameFieldToken);
        if (!token) return new PayloadToken();
        return jwtDecode(token);
    }
}));