/**
 * Commission Calculation Tests
 * Pure math tests for commission rate logic — no DB required.
 */

describe('Commission Calculations', () => {
    test('Walk-in service commission calculated correctly at 40% default rate', () => {
        const serviceRevenue = 1000;
        const commissionRate = 40;
        const calculatedCommission = (serviceRevenue * commissionRate) / 100;

        expect(calculatedCommission).toBe(400);
        expect(calculatedCommission / serviceRevenue).toBe(0.4);
    });

    test('Custom commission rate (45%) applied correctly', () => {
        const serviceRevenue = 2000;
        const customRate = 45;
        const calculatedCommission = (serviceRevenue * customRate) / 100;

        expect(calculatedCommission).toBe(900);
    });

    test('Multiple services for same stylist aggregated before commission', () => {
        const commissionRate = 45;
        const items = [
            { price: 1000 },
            { price: 1500 },
        ];

        const totalRevenue = items.reduce((sum, item) => sum + item.price, 0);
        const calculatedCommission = (totalRevenue * commissionRate) / 100;

        expect(totalRevenue).toBe(2500);
        expect(calculatedCommission).toBe(1125);
    });

    test('Different stylists receive separate independently calculated commissions', () => {
        const stylist1 = { revenue: 1000, commissionRate: 45 };
        const stylist2 = { revenue: 1500, commissionRate: 40 };

        const commission1 = (stylist1.revenue * stylist1.commissionRate) / 100;
        const commission2 = (stylist2.revenue * stylist2.commissionRate) / 100;

        expect(commission1).toBe(450);
        expect(commission2).toBe(600);
    });

    test('Zero revenue results in zero commission', () => {
        expect((0 * 40) / 100).toBe(0);
    });

    test('100% commission rate returns full service revenue', () => {
        const revenue = 1500;
        expect((revenue * 100) / 100).toBe(revenue);
    });
});
