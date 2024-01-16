
import { create } from "zustand";

type State = {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    searchTerm: string,
    saerchValue: string;
    orderBy: string;
    filterBy: string;
}

type Actions = {
    setParams: (params: Partial<State>) => void;
    reset: () => void;
    setSearchValue: (value: string) => void;
}

const initialState: State = {
    pageCount: 1,
    pageNumber: 1,
    pageSize: 12,
    searchTerm: '',
    saerchValue: '',
    orderBy: 'make',
    filterBy: 'live'
}

export const useParamsStore = create<State & Actions>()((set) => ({
    ...initialState,

    setParams(newParams: Partial<State>) {
        set((state) => {
            if (newParams.pageNumber) {
                return { ...state, pageNumber: newParams.pageNumber }
            } else {
                return { ...state, ...newParams, pageNumber: 1 }
            }
        })
    },

    setSearchValue(value) {
        set({ saerchValue: value })
    },

    reset() {
        return set(initialState)
    },
}))