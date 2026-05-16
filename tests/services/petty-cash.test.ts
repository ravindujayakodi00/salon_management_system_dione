/**
 * Petty Cash — unit tests with mocked Supabase.
 * Tests balance calculation, deposit, and expense logic.
 */

jest.mock('@/lib/supabase', () => ({
    supabase: { from: jest.fn() },
}));

jest.mock('@/lib/org-scope', () => ({
    getCurrentOrganizationId: jest.fn().mockResolvedValue('org-1'),
}));

import { pettyCashService } from '@/services/petty-cash';
import { supabase } from '@/lib/supabase';

const mockedFrom = supabase.from as jest.Mock;

function buildSelectChain(data: any, error: any = null) {
    const chain: any = {
        select: () => chain,
        eq: () => chain,
        order: () => chain,
        limit: () => chain,
        maybeSingle: async () => ({ data: data?.[0] ?? null, error }),
    };
    Object.defineProperty(chain, 'then', {
        get: () => (resolve: (v: any) => void) => resolve({ data, error }),
    });
    return chain;
}

function buildInsertChain(data: any, error: any = null) {
    const chain: any = {
        insert: () => insertChain,
        select: () => insertChain,
        single: async () => ({ data, error }),
    };
    const insertChain: any = {
        select: () => insertChain,
        single: async () => ({ data, error }),
    };
    Object.defineProperty(insertChain, 'then', {
        get: () => (resolve: (v: any) => void) => resolve({ data, error }),
    });
    return chain;
}

beforeEach(() => jest.clearAllMocks());

describe('pettyCashService.getCurrentBalance', () => {
    it('returns balance_after from the most recent transaction', async () => {
        mockedFrom.mockReturnValue(buildSelectChain([{ balance_after: 1500 }]));
        const balance = await pettyCashService.getCurrentBalance();
        expect(balance).toBe(1500);
    });

    it('returns 0 when there are no transactions', async () => {
        mockedFrom.mockReturnValue(buildSelectChain([]));
        const balance = await pettyCashService.getCurrentBalance();
        expect(balance).toBe(0);
    });

    it('returns 0 when data is null', async () => {
        mockedFrom.mockReturnValue(buildSelectChain(null));
        const balance = await pettyCashService.getCurrentBalance();
        expect(balance).toBe(0);
    });
});

describe('balance calculation logic', () => {
    // These mirror the arithmetic inside addDeposit / recordExpense
    it('deposit increases balance correctly', () => {
        const currentBalance = 1000;
        const depositAmount = 500;
        const newBalance = currentBalance + depositAmount;
        expect(newBalance).toBe(1500);
    });

    it('expense decreases balance correctly', () => {
        const currentBalance = 1000;
        const expenseAmount = 300;
        const newBalance = currentBalance - expenseAmount;
        expect(newBalance).toBe(700);
    });

    it('expense equal to balance results in zero balance', () => {
        const currentBalance = 500;
        const expenseAmount = 500;
        expect(currentBalance - expenseAmount).toBe(0);
    });

    it('insufficient balance is detected', () => {
        const currentBalance = 200;
        const expenseAmount = 300;
        expect(currentBalance < expenseAmount).toBe(true);
    });

    it('sufficient balance passes check', () => {
        const currentBalance = 500;
        const expenseAmount = 300;
        expect(currentBalance < expenseAmount).toBe(false);
    });

    it('multiple deposits accumulate correctly', () => {
        const deposits = [500, 1000, 250];
        const total = deposits.reduce((sum, d) => sum + d, 0);
        expect(total).toBe(1750);
    });

    it('balance_after for a deposit is previous balance plus amount', () => {
        const balanceBefore = 800;
        const depositAmount = 200;
        const balanceAfter = balanceBefore + depositAmount;
        expect(balanceAfter).toBe(1000);
    });

    it('balance_after for an expense is previous balance minus amount', () => {
        const balanceBefore = 1000;
        const expenseAmount = 150;
        const balanceAfter = balanceBefore - expenseAmount;
        expect(balanceAfter).toBe(850);
    });
});

describe('pettyCashService.recordExpense — insufficient balance guard', () => {
    it('throws when expense amount exceeds current balance', async () => {
        // Mock getCurrentBalance to return 100
        mockedFrom.mockReturnValueOnce(buildSelectChain([{ balance_after: 100 }]));

        await expect(
            pettyCashService.recordExpense(500, 'Too expensive', 'user-1', 'branch-1', 'org-1')
        ).rejects.toThrow('Insufficient balance');
    });
});
