import { Store } from '../store';

export const selectedAccount = (store: Store) => store.accounts.selected;
export const selectAccounts = (store: Store) => store.accounts.all;
export const selectAccountReducer = (store: Store) => store.accounts;

export const selectTransferLoading = (store: Store) =>
	store.accounts.loading.transfer;

export const selectGetAccountLoading = (store: Store) =>
	store.accounts.loading.get;
export const selectListAccountLoading = (store: Store) =>
	store.accounts.loading.list;

export const selectCreateAccountLoading = (store: Store) =>
	store.accounts.loading.create;

export const selectAccountError = (store: Store) => store.accounts.error;

// config selectors
export const selectDatadir = (store: Store) => store.config.directory;
export const selectConfig = (store: Store) => store.config.data;
export const selectConfigError = (store: Store) => store.config.error;

export const selectConfigSaveLoading = (store: Store) =>
	store.config.loading.save;
