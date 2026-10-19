import { MOCK_LATENCY_MS } from '@/config/constants';
import type { ContactFormValues } from '@/types';
import { delay } from '@/utils';

export const contactService = {
  /** Mocked submission; resolves after simulated latency. */
  async sendMessage(_values: ContactFormValues): Promise<void> {
    await delay(MOCK_LATENCY_MS);
  },
};
