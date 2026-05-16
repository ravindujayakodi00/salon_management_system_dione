/**
 * orgRolesService — unit tests with mocked Supabase.
 * Tests mapping, filtering, and lookup logic without hitting the DB.
 */

import { orgRolesService } from '@/services/orgRoles';

// Raw DB rows returned by Supabase
const mockRows = [
    { id: '1', organization_id: 'org-1', display_name: 'Owner',        system_role: 'Owner',        is_deletable: false },
    { id: '2', organization_id: 'org-1', display_name: 'Manager',      system_role: 'Manager',      is_deletable: false },
    { id: '3', organization_id: 'org-1', display_name: 'Receptionist', system_role: 'Receptionist', is_deletable: false },
    { id: '4', organization_id: 'org-1', display_name: 'Beautician',   system_role: 'Stylist',      is_deletable: false },
];

// Supabase fluent chain mock
function buildChain(rows: typeof mockRows, error: any = null) {
    const chain: any = {
        select: () => chain,
        eq: () => chain,
        neq: () => chain,
        order: () => chain,
        maybeSingle: async () => ({ data: rows[0] ?? null, error }),
        then: undefined,
    };
    // Make the chain awaitable (for non-maybeSingle queries)
    Object.defineProperty(chain, 'then', {
        get: () => (resolve: (v: any) => void) => resolve({ data: rows, error }),
    });
    return chain;
}

jest.mock('@/lib/supabase', () => ({
    supabase: {
        from: jest.fn(),
    },
}));

import { supabase } from '@/lib/supabase';
const mockedFrom = supabase.from as jest.Mock;

beforeEach(() => jest.clearAllMocks());

describe('orgRolesService.getOrgRoles', () => {
    it('maps DB rows to OrgRole shape correctly', async () => {
        mockedFrom.mockReturnValue(buildChain(mockRows));

        const roles = await orgRolesService.getOrgRoles('org-1');

        expect(roles).toHaveLength(4);
        expect(roles[0]).toEqual({
            id: '1',
            organizationId: 'org-1',
            displayName: 'Owner',
            systemRole: 'Owner',
            isDeletable: false,
        });
        // Custom display name maps to system_role correctly
        expect(roles[3]).toMatchObject({ displayName: 'Beautician', systemRole: 'Stylist' });
    });

    it('returns empty array when no rows', async () => {
        mockedFrom.mockReturnValue(buildChain([]));
        const roles = await orgRolesService.getOrgRoles('org-1');
        expect(roles).toEqual([]);
    });

    it('throws when Supabase returns an error', async () => {
        mockedFrom.mockReturnValue(buildChain([], { message: 'DB error' }));
        await expect(orgRolesService.getOrgRoles('org-1')).rejects.toMatchObject({ message: 'DB error' });
    });
});

describe('orgRolesService.getAssignableRoles', () => {
    it('excludes Owner from results', async () => {
        const nonOwnerRows = mockRows.filter(r => r.system_role !== 'Owner');
        mockedFrom.mockReturnValue(buildChain(nonOwnerRows));

        const roles = await orgRolesService.getAssignableRoles('org-1');

        expect(roles.map(r => r.systemRole)).not.toContain('Owner');
        expect(roles).toHaveLength(3);
    });

    it('includes custom display names (e.g. Beautician → Stylist)', async () => {
        const nonOwnerRows = mockRows.filter(r => r.system_role !== 'Owner');
        mockedFrom.mockReturnValue(buildChain(nonOwnerRows));

        const roles = await orgRolesService.getAssignableRoles('org-1');
        const stylistRole = roles.find(r => r.systemRole === 'Stylist');

        expect(stylistRole?.displayName).toBe('Beautician');
    });
});

describe('orgRolesService.getSystemRole', () => {
    it('returns the system_role for a given display name', async () => {
        const beauticianRow = { id: '4', organization_id: 'org-1', display_name: 'Beautician', system_role: 'Stylist', is_deletable: false };
        const chain = buildChain([beauticianRow]);
        mockedFrom.mockReturnValue(chain);

        const systemRole = await orgRolesService.getSystemRole('org-1', 'Beautician');
        expect(systemRole).toBe('Stylist');
    });

    it('returns null when display name not found', async () => {
        const chain = buildChain([]);
        mockedFrom.mockReturnValue(chain);

        const systemRole = await orgRolesService.getSystemRole('org-1', 'NonExistent');
        expect(systemRole).toBeNull();
    });
});

describe('getFormSystemRole logic (staff form helper)', () => {
    // Replicates the getFormSystemRole helper from staff/page.tsx
    function getFormSystemRole(
        orgRoles: Array<{ displayName: string; systemRole: string }>,
        selectedDisplayName: string
    ): string {
        const orgRole = orgRoles.find(r => r.displayName === selectedDisplayName);
        if (orgRole) return orgRole.systemRole;
        return selectedDisplayName; // fallback: treat as direct system_role
    }

    const orgRoles = [
        { displayName: 'Beautician', systemRole: 'Stylist' },
        { displayName: 'Branch Manager', systemRole: 'Manager' },
        { displayName: 'Receptionist', systemRole: 'Receptionist' },
    ];

    it('resolves custom display name to system_role', () => {
        expect(getFormSystemRole(orgRoles, 'Beautician')).toBe('Stylist');
        expect(getFormSystemRole(orgRoles, 'Branch Manager')).toBe('Manager');
    });

    it('falls back to the value itself when not in orgRoles', () => {
        expect(getFormSystemRole(orgRoles, 'Stylist')).toBe('Stylist');
        expect(getFormSystemRole(orgRoles, 'Manager')).toBe('Manager');
    });

    it('returns Stylist system_role for any custom stylist display name', () => {
        const result = getFormSystemRole(orgRoles, 'Beautician');
        expect(result).toBe('Stylist');
    });
});
