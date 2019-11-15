import { Store } from '../store';

export const selectAccounts = (store: Store) => store.accounts.all;
export const selectAccountReducer = (store: Store) => store.accounts;

export const selectTransferLoading = (store: Store) =>
	store.accounts.loading.transfer;

export const selectListAccountLoading = (store: Store) =>
	store.accounts.loading.list;

export const selectCreateAccountLoading = (store: Store) =>
	store.accounts.loading.create;

export const selectAccountUpdateLoading = (store: Store) =>
	store.accounts.loading.update;

export const selectAccountError = (store: Store) => store.accounts.error;

// config selectors
export const selectDatadir = (store: Store) => store.settings.datadir;
export const selectConfig = (store: Store) => store.settings.config;
export const selectSettingsError = (store: Store) => store.settings.error;

export const selectConfigSaveLoading = (store: Store) =>
	store.settings.loading.save;
