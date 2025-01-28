/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/shared/InjectorProviders';
import { Demo } from '.';

describe('Components/Demo', () => {
  it(`must render`, async () => {
    const { getAllByText } = render(
      <InjectorProviders noLayout>
        <Demo />
      </InjectorProviders>,
    );
    const text = await getAllByText('My Component Test - Strong')[0];
    expect(text).toBeInTheDocument();
  });
});
