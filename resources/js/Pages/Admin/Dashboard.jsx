import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({ stats, charts }) {
    
    const ordersChartData = {
        labels: charts.labels,
        datasets: [
            {
                label: 'Заказы',
                data: charts.orders,
                borderColor: '#8B5A2B',
                backgroundColor: 'rgba(139, 90, 43, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#8B5A2B',
            },
        ],
    };

    const revenueChartData = {
        labels: charts.labels,
        datasets: [
            {
                label: 'Выручка (₽)',
                data: charts.revenue,
                backgroundColor: '#D4AF37',
                borderRadius: 4,
            },
        ],
    };

    const ordersOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#3D2B1F',
                padding: 12,
                titleFont: { size: 14, family: 'serif' },
                bodyFont: { size: 13 },
                displayColors: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0,
                    color: '#3D2B1F/40',
                },
                grid: {
                    color: '#3D2B1F/5',
                }
            },
            x: {
                grid: {
                    display: false,
                }
            }
        }
    };

    const revenueOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#3D2B1F',
                padding: 12,
                callbacks: {
                    label: (context) => `${context.parsed.y.toLocaleString('ru-RU')} ₽`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value.toLocaleString('ru-RU')} ₽`,
                },
                grid: {
                    color: '#3D2B1F/5',
                }
            },
            x: {
                grid: {
                    display: false,
                }
            }
        }
    };

    return (
        <AdminLayout>
            <Head title="Панель управления" />
            
            <h1 className="font-serif text-4xl italic text-[#3D2B1F] mb-12">Обзор</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5 group hover:border-[#D4AF37]/50 transition-colors">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-[#3D2B1F]/60 mb-4">Всего заказов</div>
                    <div className="font-serif text-4xl text-[#3D2B1F]">{stats.totalOrders}</div>
                </div>
                <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5 group hover:border-[#D4AF37]/50 transition-colors">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-[#3D2B1F]/60 mb-4">Выручка</div>
                    <div className="font-serif text-4xl text-[#3D2B1F]">{Number(stats.totalRevenue).toLocaleString('ru-RU')} ₽</div>
                </div>
                 <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5 group hover:border-[#D4AF37]/50 transition-colors">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-[#3D2B1F]/60 mb-4">Клиенты</div>
                    <div className="font-serif text-4xl text-[#3D2B1F]">{stats.totalUsers}</div>
                </div>
                <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5 group hover:border-[#D4AF37]/50 transition-colors">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-[#3D2B1F]/60 mb-4">Записи на МК</div>
                    <div className="font-serif text-4xl text-[#3D2B1F]">{stats.totalBookings}</div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5">
                    <h3 className="font-serif italic text-2xl text-[#3D2B1F] mb-8">Динамика заказов</h3>
                    <Line options={ordersOptions} data={ordersChartData} />
                </div>
                <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5">
                    <h3 className="font-serif italic text-2xl text-[#3D2B1F] mb-8">Динамика выручки</h3>
                    <Bar options={revenueOptions} data={revenueChartData} />
                </div>
            </div>

        </AdminLayout>
    );
}
    
    

    