import { Store } from '../store';

export const selectedAccount = (store: Store) => store.accounts.selected;
export const selectAccounts = (store: Store) => store.accounts.all;
export const selectAccountReducer = (store: Store) => store.accounts;

export const selectTransferLoading = (store: Store) =>
	store.accounts.loading.transfer;

// config selectors
export const selectConfig = (store: Store) => store.config.data;
export const selectConfigSaveLoading = (store: Store) =>
	store.config.loading.save;
