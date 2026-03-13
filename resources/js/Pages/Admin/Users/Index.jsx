import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ users }) {
    const toggleStatus = (id) => {
        if (confirm('Вы уверены, что хотите изменить статус активности этого пользователя?')) {
            router.post(route('admin.users.toggle-status', id));
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Никогда';
        return new Date(dateString).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout>
            <Head title="Управление пользователями | Админ-панель" />

            <div className="admin-container">
                <h2 className="admin-title">Список пользователей и аудит безопасности</h2>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Пользователь</th>
                            <th>Роль</th>
                            <th>Статус</th>
                            <th>Аудит (24ч)</th>
                            <th>Последний вход</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    <div style={{ fontWeight: '600' }}>{user.name}</div>
                                    <div style={{ color: '#8C7A7A', fontSize: '0.75rem' }}>{user.email}</div>
                                </td>
                                <td>
                                    {user.is_admin ? (
                                        <span className="badge badge-info">Администратор</span>
                                    ) : (
                                        <span className="badge" style={{ backgroundColor: '#F3F4F6', color: '#374151' }}>Клиент</span>
                                    )}
                                </td>
                                <td>
                                    {user.is_active ? (
                                        <span className="badge badge-success">Активен</span>
                                    ) : (
                                        <span className="badge badge-danger">Заблокирован</span>
                                    )}
                                </td>
                                <td>
                                    {user.failed_attempts > 0 ? (
                                        <span className={user.failed_attempts >= 3 ? 'badge badge-danger' : 'badge'} style={{ backgroundColor: user.failed_attempts < 3 ? '#FEF3C7' : '', color: user.failed_attempts < 3 ? '#92400E' : '' }}>
                                            {user.failed_attempts} провала(-ов)
                                        </span>
                                    ) : (
                                        <span style={{ color: '#9CA3AF' }}>Чисто</span>
                                    )}
                                </td>
                                <td>{formatDate(user.last_login_at)}</td>
                                <td>
                                    <button
                                        onClick={() => toggleStatus(user.id)}
                                        className={`btn-toggle ${user.is_active ? 'btn-toggle-danger' : 'btn-toggle-success'}`}
                                    >
                                        {user.is_active ? 'Заблокировать' : 'Разблокировать'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
