/**
 * Auth logic unit tests — tests hasRole behaviour and systemRole/role distinction.
 * No React context required: we test the pure logic directly.
 */

import type { SystemRole } from '@/lib/types';

// Replicate the hasRole function from auth.tsx in isolation
function hasRole(user: { systemRole: SystemRole } | null, roles: SystemRole[]): boolean {
    if (!user) return false;
    return roles.includes(user.systemRole);
}

describe('hasRole', () => {
    it('returns false when user is null', () => {
        expect(hasRole(null, ['Owner'])).toBe(false);
        expect(hasRole(null, ['Owner', 'Manager'])).toBe(false);
    });

    it('returns true when user systemRole is in the allowed list', () => {
        expect(hasRole({ systemRole: 'Owner' }, ['Owner'])).toBe(true);
        expect(hasRole({ systemRole: 'Manager' }, ['Owner', 'Manager'])).toBe(true);
        expect(hasRole({ systemRole: 'Stylist' }, ['Stylist'])).toBe(true);
    });

    it('returns false when user systemRole is NOT in the allowed list', () => {
        expect(hasRole({ systemRole: 'Stylist' }, ['Owner'])).toBe(false);
        expect(hasRole({ systemRole: 'Receptionist' }, ['Owner', 'Manager'])).toBe(false);
    });

    it('Owner is not granted access by Stylist/Receptionist/Manager-only checks', () => {
        expect(hasRole({ systemRole: 'Owner' }, ['Stylist'])).toBe(false);
        expect(hasRole({ systemRole: 'Owner' }, ['Receptionist'])).toBe(false);
    });

    it('works correctly for every SystemRole value', () => {
        const allRoles: SystemRole[] = ['Owner', 'Manager', 'Receptionist', 'Stylist'];
        for (const role of allRoles) {
            expect(hasRole({ systemRole: role }, [role])).toBe(true);
            const others = allRoles.filter(r => r !== role);
            expect(hasRole({ systemRole: role }, others)).toBe(false);
        }
    });
});

describe('systemRole vs display role distinction', () => {
    // The user object has BOTH role (display name) and systemRole (logic/permission)
    // hasRole must ONLY use systemRole, never role
    it('uses systemRole for logic, not the display role field', () => {
        const user = {
            systemRole: 'Stylist' as SystemRole,
            role: 'Beautician', // custom display name
        };

        // Permission check uses systemRole
        expect(hasRole(user, ['Stylist'])).toBe(true);
        expect(hasRole(user, ['Owner'])).toBe(false);
    });

    it('Owner with a custom display name still passes Owner check', () => {
        const user = {
            systemRole: 'Owner' as SystemRole,
            role: 'Salon Director', // hypothetical custom display name
        };

        expect(hasRole(user, ['Owner'])).toBe(true);
        expect(hasRole(user, ['Manager'])).toBe(false);
    });
});

describe('role-based page access rules', () => {
    // These mirror the allowedRoles in admin-nav.ts
    const canAccessPOS = (systemRole: SystemRole) =>
        hasRole({ systemRole }, ['Owner', 'Manager', 'Receptionist']);

    const canAccessStaff = (systemRole: SystemRole) =>
        hasRole({ systemRole }, ['Owner']);

    const canAccessReports = (systemRole: SystemRole) =>
        hasRole({ systemRole }, ['Owner', 'Manager']);

    const canAccessSettings = (systemRole: SystemRole) =>
        hasRole({ systemRole }, ['Owner', 'Stylist']);

    it('POS accessible to Owner, Manager, Receptionist — not Stylist', () => {
        expect(canAccessPOS('Owner')).toBe(true);
        expect(canAccessPOS('Manager')).toBe(true);
        expect(canAccessPOS('Receptionist')).toBe(true);
        expect(canAccessPOS('Stylist')).toBe(false);
    });

    it('Staff management is Owner-only', () => {
        expect(canAccessStaff('Owner')).toBe(true);
        expect(canAccessStaff('Manager')).toBe(false);
        expect(canAccessStaff('Receptionist')).toBe(false);
        expect(canAccessStaff('Stylist')).toBe(false);
    });

    it('Reports accessible to Owner and Manager only', () => {
        expect(canAccessReports('Owner')).toBe(true);
        expect(canAccessReports('Manager')).toBe(true);
        expect(canAccessReports('Receptionist')).toBe(false);
        expect(canAccessReports('Stylist')).toBe(false);
    });

    it('Settings accessible to Owner and Stylist', () => {
        expect(canAccessSettings('Owner')).toBe(true);
        expect(canAccessSettings('Stylist')).toBe(true);
        expect(canAccessSettings('Manager')).toBe(false);
        expect(canAccessSettings('Receptionist')).toBe(false);
    });
});
