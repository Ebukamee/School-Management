
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head,Link }from '@inertiajs/react'


const breadcrumbs : BreadcrumbItem[]= [
    {
        title:'Results',
        href: '/results'
    }
]
export default function Results() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Lol' />
            <p>Lol</p>
        </AppLayout>
    );
}