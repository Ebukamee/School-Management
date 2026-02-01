import BlogSection from '@/components/ui/blog';
import Facilities from '@/components/ui/facilities';
import FAQ from '@/components/ui/faq';
import Footer from '@/components/ui/footer';
import Hero from '@/components/ui/Hero';
import Navbar from '@/components/ui/NavHome';
import PrincipalMessage from '@/components/ui/principal';
import WhyOurSchool from '@/components/ui/whyus';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';


interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    author: string;
    date: string;
    image: string;
    readTime: string;
}
interface HomeProps {
    posts: BlogPost[];
}
export default function Welcome({ 
    canRegister = true, 
    posts = [] 
}: { 
    canRegister?: boolean; 
    posts?: BlogPost[]; 
}){
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <main>
                <Hero />
                <WhyOurSchool />
                <Facilities />
                <PrincipalMessage />
                <BlogSection blogPosts={posts} />
                <FAQ />
                <Footer />
            </main>
        </>
    );
}
