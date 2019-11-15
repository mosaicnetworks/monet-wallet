import { Currency } from 'evm-lite-utils';

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const parseBalance = (balance: Currency) => {
	const b = balance.format('T');
	const l = b.split('.');

	if (l.length !== 2) {
		return l.join('.');
	}

	if (l[1]) {
		l[1] = l[1].slice(0, 4);
	}

	return l.join('.') + 'T';
};

export const isLetter = (str: string) => {
	return str.length === 1 && str.match(/[a-z]/i);
};

export const commaSeperate = (x: number | string) => {
	x = x.toString();

	const split = x.split('.');

	if (split.length > 1) {
		return `${split[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${
			split[1]
		}`;
	}

	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
