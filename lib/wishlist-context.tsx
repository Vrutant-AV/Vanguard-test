"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface WishlistItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    dateAdded: string;
}

interface WishlistState {
    items: WishlistItem[];
}

type WishlistAction = 
    | { type: 'ADD_ITEM'; payload: Omit<WishlistItem, 'dateAdded'> }
    | { type: 'REMOVE_ITEM'; payload: { id: number } }
    | { type: 'CLEAR_WISHLIST' };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                item => item.id === action.payload.id
            );

            if (existingItemIndex > -1) {
                //Item already exists
                return state;
            }

            const newItem: WishlistItem = {
                ...action.payload,
                dateAdded: new Date().toISOString().split('T')[0]
            };

            return {
                ...state,
                items: [...state.items, newItem],
            };
        }

        case 'REMOVE_ITEM': {
            const filteredItems = state.items.filter(
                item => item.id !== action.payload.id
            );
            return { ...state, items: filteredItems };
        }

        case 'CLEAR_WISHLIST':
            return { ...state, items: [] };

        default: 
            return state;
    }
};

interface WishlistContextType {
    state: WishlistState;
    addItem: (item: Omit<WishlistItem, 'dateAdded'>) => void;
    removeItem: (id: number) => void;
    clearWishlist: () => void;
    isInWishlist: (id: number) => boolean;
    getTotalItems: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, {
        items: [],
    });

    //load wishlist from localstorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('vanguard-wishlist');
        if (savedWishlist) {
            try {
                const parsedWishlist = JSON.parse(savedWishlist);
                parsedWishlist.forEach((item: WishlistItem) => {
                    dispatch({ type: 'ADD_ITEM', payload: item });
                });
            } catch (error) {
                console.error('Error loading wishlist from localStorage:', error);
            }
        }
    }, []);

    // save wishlist to localstorage whenever it changes
    useEffect(() => {
        localStorage.setItem('vanguard-wishlist', JSON.stringify(state.items));
    }, [state.items]);

    const addItem = (item: Omit<WishlistItem, 'dateAdded'>) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (id: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };

    const clearWishlist = () => {
        dispatch({ type: 'CLEAR_WISHLIST' });
    };

    const isInWishlist = (id: number) => {
        return state.items.some(item => item.id === id);
    };

    const getTotalItems = () => {
        return state.items.length;
    };

    const value: WishlistContextType = {
        state,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
        getTotalItems,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};