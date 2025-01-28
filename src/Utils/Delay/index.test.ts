/**
 * @vitest-environment jsdom
 */
import { it, describe, expect } from 'vitest';
import { delay } from '.';

async function mock() {
	await delay(50);
	return true;
}

describe('Utils/delay', () => {
	it(`should wait for delay`, async () => {
		const result = await mock();
		expect(result).toBeTruthy();
	}, 100);
});
