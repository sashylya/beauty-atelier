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
    
            labels: charts.orders.labels,
    
            datasets: [
    
                {
    
                    label: 'Заказы (7 дней)',
    
                    data: charts.orders.data,
    
                    borderColor: 'rgb(255, 99, 132)',
    
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    
                },
    
            ],
    
        };
    
    
    
        const revenueChartData = {
    
            labels: charts.revenue.labels,
    
            datasets: [
    
                {
    
                    label: 'Выручка (7 дней)',
    
                    data: charts.revenue.data,
    
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    
                },
    
            ],
    
        };
    
    
    
        const options = {
    
            responsive: true,
    
            plugins: {
    
                legend: {
    
                    position: 'top',
    
                },
    
                title: {
    
                    display: false,
    
                },
    
            },
    
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
    
                        <Line options={options} data={ordersChartData} />
    
                    </div>
    
                    <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5">
    
                        <h3 className="font-serif italic text-2xl text-[#3D2B1F] mb-8">Динамика выручки</h3>
    
                        <Bar options={options} data={revenueChartData} />
    
                    </div>
    
                </div>
    
    
    
            </AdminLayout>
    
        );
    
    }
    
    

    