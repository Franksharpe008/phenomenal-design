// src/app/page.tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot, Stars, Float } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Zap, ShieldCheck, BarChart, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';

export default function HomePage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);

  return (
    <div className="bg-gray-950 text-white antialiased">
      {/* HERO SECTION */}
      <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
        <Canvas className="absolute inset-0 z-0">
          <Stars radius={300} depth={60} count={600} factor={7} saturation={0} fade speed={1.5} />
          <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <TorusKnot args={[1, 0.4, 128, 16]} scale={1.5}>
              <meshStandardMaterial color="#ff006e" />
            </TorusKnot>
          </Float>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
        </Canvas>

        <motion.div
          style={{ y: heroY, scale }}
          className="relative z-10 flex flex-col items-center text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">
            Phenomenal Design
          </h1>
          <p className="mt-4 max-w-xl text-lg md:text-xl text-gray-300">
            Stunning, affordable websites for individuals, startups & enterprises.
          </p>
          <Link
            href="#pricing"
            className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-white shadow-lg hover:shadow-pink-500/40 transition-all"
          >
            See Plans
          </Link>
        </motion.div>

        <motion.div
          className="absolute bottom-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { icon: <Zap size={40} />, title: 'Lightning Speed', desc: 'Optimized for 100/100 Lighthouse scores.' },
            { icon: <ShieldCheck size={40} />, title: 'Secure & Accessible', desc: 'WCAG 2.1, SSL & daily backups.' },
            { icon: <BarChart size={40} />, title: 'SEO Ready', desc: 'Schema, meta, and sitemap built-in.' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition"
            >
              <div className="text-pink-500 mb-4 flex justify-center">{s.icon}</div>
              <h3 className="font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-gray-900 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Work</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={`https://picsum.photos/600/400?random=${i}`}
                alt={`project-${i}`}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Client {i}</h3>
                <p className="text-gray-400 text-sm">E-commerce / SaaS / Blog</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { tier: 'Starter', price: '$499', for: 'Individuals', feats: ['1-page site', '3-day delivery', 'SEO basics'] },
            { tier: 'Growth', price: '$999', for: 'Small biz', feats: ['5 pages', 'CMS', 'Analytics', 'Revisions'] },
            { tier: 'Enterprise', price: 'Custom', for: 'Large orgs', feats: ['Unlimited pages', 'Custom features', 'SLA', 'Dedicated PM'] },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-900 rounded-2xl p-8 flex flex-col items-center text-center border border-gray-800 hover:border-pink-500 transition"
            >
              <h3 className="text-2xl font-bold">{p.tier}</h3>
              <p className="text-4xl font-black text-pink-500 my-4">{p.price}</p>
              <p className="text-gray-400 mb-6">{p.for}</p>
              <ul className="space-y-2 mb-8 text-sm">
                {p.feats.map((f) => (
                  <li key={f}>✅ {f}</li>
                ))}
              </ul>
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-semibold">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-gray-900 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Launch?</h2>
          <p className="text-gray-400 mb-8">Drop us a line and we’ll be in touch within 24 hrs.</p>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you! We’ll reach out shortly.');
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="rounded-md px-4 py-2 bg-gray-800 border border-gray-700 focus:outline-none focus:border-pink-500"
            />
            <textarea
              placeholder="Tell us about your project"
              rows={4}
              className="rounded-md px-4 py-2 bg-gray-800 border border-gray-700 focus:outline-none focus:border-pink-500"
            />
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-bold">
              <Mail size={18} /> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Phenomenal Design. All rights reserved.
      </footer>
    </div>
  );
}