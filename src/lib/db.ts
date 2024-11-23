// using indexedDB and Dexie as wrapper on it 
import Dexie, { type EntityTable } from 'dexie';

type User = {
    id: number;
    name: string;
    email: string;
    role: string
}

type Role = {
    id: number;
    name: string;
    permissions: string[];
}

type Permission = {
    id: number,
    name: string
}

const db = new Dexie('UsersDatabase') as Dexie & {
    users: EntityTable<User, 'id'>;
    roles: EntityTable<Role, 'id'>;
    permissions: EntityTable<Permission, 'id'>;
};


db.version(1).stores({
    users: '++id, name, email, role',
    roles: '++id, name, permissions',
    permissions: '++id, name'
});

export type { User, Role, Permission };
export { db };