import React, { useState, useEffect } from 'react';
import { 
  Ship, 
  Anchor, 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight,
  Container,
  ShieldCheck,
  Clock,
  Map as MapIcon,
  Wrench,
  Users,
  Settings,
  Truck,
  FileText,
  ClipboardCheck,
  LayoutGrid,
  Droplets,
  Download,
  Search,
  Plus,
  Lock,
  Unlock,
  Trash2,
  UploadCloud,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
// @ts-ignore
import companyLogo from './assets/images/JB LOGO.png';
// @ts-ignore
import kGreenFuelLogo from './assets/images/KGREEN.jpg';
// @ts-ignore
import sunrichLogo from './assets/images/sunrich_logo_1780292627734.png';
// @ts-ignore
import atlanticGlobalShippingLogo from './assets/images/atlantic_global_shipping_logo_1780295139015.png';
// @ts-ignore
import namaatMtechLogo from './assets/images/namaat.jpg';
// @ts-ignore
import newShinYoungLogo from './assets/images/NSY.jpg';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Map Components
const KoreaMap = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [loading, setLoading] = useState(true);

  const ports = [
    { name: 'Busan', coords: [129.0756, 35.1796] },
    { name: 'Incheon', coords: [126.7052, 37.4563] },
    { name: 'Ulsan', coords: [129.3114, 35.5384] },
    { name: 'Gwangyang', coords: [127.6958, 34.9407] },
    { name: 'Yeosu', coords: [127.73, 34.76] },
    { name: 'Pyeongtaek', coords: [126.83, 37.00] },
    { name: 'Daesan', coords: [126.3980, 37.0125] },
    { name: 'Gunsan', coords: [126.7110, 35.9750] },
    { name: 'Pohang', coords: [129.3650, 36.0190] },
    { name: 'Mokpo', coords: [126.3922, 34.8118] },
    { name: 'Jeju', coords: [126.5312, 33.4996] },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 700;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    svg.selectAll('*').remove();

    // Projection for Korea
    const projection = d3.geoMercator()
      .center([128, 36])
      .scale(5000)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Fetch Korea GeoJSON
    fetch('https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_provinces_topo.json')
      .then(res => res.json())
      .then(data => {
        const geojson = topojson.feature(data, data.objects.skorea_provinces_geo) as any;
        
        svg.append('g')
          .selectAll('path')
          .data(geojson.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', '#f1f5f9')
          .attr('stroke', '#cbd5e1')
          .attr('stroke-width', 1);

        // Add ports
        const portGroups = svg.append('g')
          .selectAll('g')
          .data(ports)
          .enter()
          .append('g')
          .attr('transform', d => {
            const p = projection(d.coords as [number, number]);
            return p ? `translate(${p[0]}, ${p[1]})` : '';
          });

        portGroups.append('circle')
          .attr('r', 6)
          .attr('fill', '#2563eb')
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
          .attr('class', 'animate-pulse');

        portGroups.append('text')
          .attr('dy', -10)
          .attr('text-anchor', 'middle')
          .attr('font-size', '12px')
          .attr('font-weight', 'bold')
          .attr('fill', '#1e293b')
          .text(d => d.name);

        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Korea map:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
      <svg ref={svgRef}></svg>
    </div>
  );
};

const WorldMap = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [loading, setLoading] = useState(true);

  const hubs = [
    { name: 'Singapore', coords: [103.8198, 1.3521] },
    { name: 'Shanghai', coords: [121.4737, 31.2304] },
    { name: 'Rotterdam', coords: [4.4777, 51.9225] },
    { name: 'Dubai', coords: [55.2708, 25.2048] },
    { name: 'Panama', coords: [-79.5197, 8.9824] },
    { name: 'Busan', coords: [129.0756, 35.1796] },
    { name: 'Los Angeles', coords: [-118.2437, 34.0522] },
    { name: 'Santos', coords: [-46.3333, -23.95] },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 450;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    svg.selectAll('*').remove();

    const projection = d3.geoNaturalEarth1()
      .scale(150)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(res => res.json())
      .then(data => {
        const geojson = topojson.feature(data, data.objects.countries) as any;
        
        svg.append('g')
          .selectAll('path')
          .data(geojson.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', '#f1f5f9')
          .attr('stroke', '#cbd5e1')
          .attr('stroke-width', 0.5);

        // Add hubs
        const hubGroups = svg.append('g')
          .selectAll('g')
          .data(hubs)
          .enter()
          .append('g')
          .attr('transform', d => {
            const p = projection(d.coords as [number, number]);
            return p ? `translate(${p[0]}, ${p[1]})` : '';
          });

        hubGroups.append('circle')
          .attr('r', 4)
          .attr('fill', '#10b981')
          .attr('stroke', 'white')
          .attr('stroke-width', 1.5)
          .attr('class', 'animate-pulse');

        hubGroups.append('text')
          .attr('dy', -8)
          .attr('text-anchor', 'middle')
          .attr('font-size', '10px')
          .attr('font-weight', 'bold')
          .attr('fill', '#065f46')
          .text(d => d.name);

        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading World map:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      )}
      <svg ref={svgRef}></svg>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<'agency' | 'ports' | null>(null);

  // Dynamic Document Board and Admin States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);

  // States for uploading new documents
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Port Info');
  const [newFileData, setNewFileData] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState('');
  const [newFileSize, setNewFileSize] = useState('');

  const [documents, setDocuments] = useState<{
    id: string | number;
    title: string;
    category: string;
    date: string;
    size: string;
    type: string;
    fileData?: string;
    fileName?: string;
    isDefault?: boolean;
  }[]>(() => {
    const saved = localStorage.getItem('jb_marine_documents');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error reading saved documents:", e);
      }
    }
    return [
      {
        id: 1,
        title: 'Busan Port Terminal Information 2024',
        category: 'Port Info',
        date: '2024-05-15',
        size: '2.4 MB',
        type: 'PDF',
        isDefault: true
      },
      {
        id: 2,
        title: 'Korean Maritime Safety Regulations (Revised)',
        category: 'Regulation',
        date: '2024-04-20',
        size: '1.8 MB',
        type: 'PDF',
        isDefault: true
      },
      {
        id: 3,
        title: 'Port Entry/Exit Procedure Handbook',
        category: 'Guidelines',
        date: '2024-03-12',
        size: '3.1 MB',
        type: 'PDF',
        isDefault: true
      },
      {
        id: 4,
        title: 'Incheon Port Development Strategy 2030',
        category: 'Report',
        date: '2024-02-05',
        size: '5.2 MB',
        type: 'PDF',
        isDefault: true
      }
    ];
  });

  // Persist documents inside localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jb_marine_documents', JSON.stringify(documents));
    } catch (e) {
      console.warn("localStorage quota exceeded, resolving by storing metadata", e);
      // Fallback: save metadata only for custom items that are too large
      const safeDocs = documents.map(doc => ({
        ...doc,
        fileData: doc.isDefault ? undefined : (doc.fileData && doc.fileData.length > 500000 ? undefined : doc.fileData)
      }));
      try {
        localStorage.setItem('jb_marine_documents', JSON.stringify(safeDocs));
      } catch (err) {
        // Safe fail
      }
    }
  }, [documents]);

  const heroImages = [
    "https://plus.unsplash.com/premium_photo-1661881827720-d4bb685b93e8?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1703977883249-d959f2b0c1ae?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1518527989017-5baca7a58d3c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Partners', href: '#partners' },
    { name: 'Information', href: '#information' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "glass-nav py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src={companyLogo} 
              alt="JB MARINE Logo" 
              className="h-10 w-10 object-contain rounded-full border-2 border-blue-500/20 shadow-sm"
              onError={(e) => {
                // Fallback to icon if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="bg-blue-600 p-1.5 rounded-lg hidden">
              <Ship className="w-6 h-6 text-white" />
            </div>
            <span className={cn(
              "text-xl font-bold tracking-tight",
              scrolled ? "text-slate-900" : "text-white"
            )}>
              JB MARINE <span className="text-blue-500">CO., LTD.</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-500",
                  scrolled ? "text-slate-600" : "text-white/90"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className={scrolled ? "text-slate-900" : "text-white"} /> : <Menu className={scrolled ? "text-slate-900" : "text-white"} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-semibold text-slate-900 border-b border-slate-100 pb-4"
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-blue-600 text-white py-4 rounded-xl text-lg font-bold">
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              src={heroImages[currentImageIndex]} 
              alt="Cargo Ship" 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Leading Maritime Partner in Korea
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Navigating Your <br />
              <span className="text-blue-400">Maritime Future</span>
            </h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              Professional Shipping Agency Services You Can Trust<br />
              Dedicated to efficient vessel operations and strong maritime partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all animate-pulse-subtle"
              >
                Our Services <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-600/30"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-4 left-0 right-0 z-10 hidden lg:block">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-4 gap-8 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
              {[
                { label: 'Years Experience', value: '15+' },
                { label: 'Vessels Handled', value: '1,200+' },
                { label: 'Cargo Volume', value: '5M+ Tons' },
                { label: 'Global Partners', value: '100+' },
              ].map((stat, i) => (
                <div key={i} className="text-center border-r border-white/10 last:border-0">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Office" 
                  className="w-full h-[600px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-600 rounded-3xl -z-0 hidden md:block" />
              <div className="absolute -top-8 -left-8 w-32 h-32 border-8 border-slate-100 rounded-full -z-0 hidden md:block" />
            </div>

            <div>
              <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">About JB MARINE</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Your Trusted Partner in <br />
                <span className="text-blue-600 italic font-serif">Korean Waters</span>
              </h3>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Founded on the principles of reliability and professional excellence, JB MARINE CO., LTD. has grown into a premier shipping agency in South Korea. We understand that in shipping, time is money and precision is paramount.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { title: 'Reliability', desc: 'Consistent performance you can count on 24/7.', icon: ShieldCheck },
                  { title: 'Efficiency', desc: 'Optimized port operations to minimize turnaround time.', icon: Clock },
                  { title: 'Expertise', desc: 'Deep knowledge of local regulations and global markets.', icon: Anchor },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">{item.title}</h5>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Comprehensive Maritime Solutions</h3>
            <p className="text-slate-600 text-lg">
              We offer a full spectrum of maritime services tailored to meet the dynamic needs of the global shipping industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Agency Service',
                description: 'Full port agency services including husbanding, crew change, and technical support in all major Korean ports.',
                icon: Anchor,
                color: 'bg-blue-50 text-blue-600',
                action: () => setActiveModal('agency')
              },
              {
                title: 'Korean Ports',
                description: 'Our extensive network covers all major maritime ports in South Korea, ensuring seamless operations anywhere.',
                icon: Container,
                color: 'bg-emerald-50 text-emerald-600',
                action: () => setActiveModal('ports')
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-xl group"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", service.color)}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {service.description}
                </p>
                <button 
                  onClick={service.action}
                  className="inline-flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all cursor-pointer"
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map Modals */}
        <Modal 
          isOpen={activeModal === 'agency'} 
          onClose={() => setActiveModal(null)}
          title="Shipping Agency Services"
        >
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-slate-600 text-lg leading-relaxed">
                JB MARINE provides a full spectrum of port agency services, serving as your dedicated local representative in all South Korean waters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {/* Center Decorative Element (Hidden on small screens) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none hidden lg:flex">
                <Ship className="w-96 h-96" />
              </div>

              {[
                { title: 'Bunkering Arrangement', desc: 'Fuel and lubrication supply coordination including Methanol and Bio-Diesel.', icon: Droplets },
                { title: 'Repair & Dry-docking', desc: 'Technical support and shipyard liaison.', icon: Wrench },
                { title: 'Ship Delivery (S&P)', desc: 'Professional support for vessel handovers.', icon: ClipboardCheck },
                { title: 'Protective Agency', desc: 'Safeguarding owners & charterers interests.', icon: ShieldCheck },
                { title: 'Full Port Agency', desc: 'Comprehensive vessel attending and coordination.', icon: Ship },
                { title: 'Crew Change', desc: 'Logistics, visas, and transport for seafarers.', icon: Users },
                { title: 'Husbandry Attendance', desc: 'Vessel requirements and local management.', icon: Anchor },
                { title: 'Spares & Provisions', desc: 'Timely supply of parts and stores.', icon: Truck },
                { title: '24/7 Customer Service', desc: 'Round-the-clock operational availability.', icon: Clock }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-center items-center"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h5 className="font-bold text-slate-900 mb-2">{item.title}</h5>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Modal>

        <Modal 
          isOpen={activeModal === 'ports'} 
          onClose={() => setActiveModal(null)}
          title="Korean Port Network"
        >
          <div className="space-y-4">
            <p className="text-slate-600">
              JB MARINE provides comprehensive agency services in all major South Korean ports. 
              Our local expertise ensures smooth operations and quick turnaround for your vessels.
            </p>
            <KoreaMap />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {['Busan', 'Incheon', 'Ulsan', 'Gwangyang', 'Yeosu', 'Pyeongtaek', 'Daesan', 'Gunsan', 'Pohang', 'Mokpo', 'Jeju'].map(port => (
                <div key={port} className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Anchor className="w-4 h-4 text-blue-500" />
                  {port}
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Our Partners</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Global Network & Strategic Alliances</h3>
            <p className="text-slate-600 text-lg">
              We collaborate with industry leaders to provide seamless maritime solutions across the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mx-auto">
            {[
              {
                name: 'K-GREEN FUEL',
                url: 'http://kgreenfuel.com',
                logo: kGreenFuelLogo,
                description: 'Eco-friendly marine fuel supply and renewable energy partner'
              },
              {
                name: 'Sunrich Group',
                url: 'https://www.sunrichgroup.com',
                logo: sunrichLogo,
                description: 'Global integrated maritime shipping and port logistics services'
              },
              {
                name: 'Atlantic Global Shipping',
                url: 'https://www.atlanticglobalshipping.com',
                logo: atlanticGlobalShippingLogo,
                description: 'Global shipping agency - India'
              },
              {
                name: 'NAMAAT M-TECH',
                url: 'http://namaat.co.kr',
                logo: namaatMtechLogo,
                description: 'Marine maintenance service and spare parts supply'
              },
              {
                name: 'NEW SHIN YOUNG CO., LTD.',
                url: 'http://www.nser.co.kr',
                logo: newShinYoungLogo,
                description: 'Supplying marine stores and special marine cleaning chemicals'
              }
            ].map((partner, i) => (
              <motion.a
                key={i}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="group relative flex items-center justify-center p-8 bg-white rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all h-52 overflow-hidden"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain transition-all duration-500 group-hover:scale-95 group-hover:opacity-20"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-xl font-bold text-slate-400 group-hover:text-blue-600 text-center px-4">
                  {partner.name}
                </div>
                
                {/* Elegant Hover Description Overlay */}
                <div className="absolute inset-0 bg-slate-900/90 flex flex-col justify-center items-center text-center p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out backdrop-blur-[2px]">
                  <h4 className="font-bold text-sm tracking-wide text-blue-400 mb-2">{partner.name}</h4>
                  <p className="text-xs text-slate-250 leading-relaxed font-medium">
                    {partner.description}
                  </p>
                  <span className="mt-4 text-[10px] uppercase tracking-wider text-slate-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm font-semibold transition-colors hover:bg-blue-600 hover:text-white">
                    Visit Website ↗
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Information Board Section */}
      <section id="information" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Information Board</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif italic">Documentation Center</h3>
              <p className="text-slate-600 text-lg">
                Access critical maritime documents, port regulations, and technical guidelines for South Korean operations.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Admin Mode Switch */}
              <button 
                onClick={() => {
                  if (isAdminMode) {
                    setIsAdminMode(false);
                    setDeleteConfirmId(null);
                  } else {
                    setIsPasswordModalOpen(true);
                  }
                }}
                className={cn(
                  "flex items-center justify-center gap-2 px-5 py-4 rounded-full font-bold text-sm transition-all shadow-md duration-300",
                  isAdminMode 
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/10" 
                    : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
                )}
              >
                {isAdminMode ? <Unlock className="w-4 h-4 text-emerald-100" /> : <Lock className="w-4 h-4 text-slate-400" />}
                {isAdminMode ? "Admin Authorized" : "Admin Login"}
              </button>

              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search materials..." 
                  className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full md:w-64 shadow-sm"
                />
              </div>

              <button 
                onClick={() => {
                  if (!isAdminMode) {
                    setIsPasswordModalOpen(true);
                    setPasswordError("Please login as Administrator to upload documents.");
                  } else {
                    setIsUploadModalOpen(true);
                  }
                }}
                className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center"
                title="Upload document"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Category Filtering Pills (with ETC) */}
          <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'Port Info', 'Regulation', 'Guidelines', 'Report', 'ETC'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all border duration-200",
                  selectedCategory === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/15"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Confirm State Local Logic */}
          {(() => {
            const filteredDocuments = documents.filter((doc) => {
              const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    doc.category.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
              return matchesSearch && matchesCategory;
            });

            // Use state-based delete verify handler inside render or scope


            const handleDownload = (doc: any) => {
              if (doc.fileData) {
                const link = document.createElement('a');
                link.href = doc.fileData;
                link.download = doc.fileName || `${doc.title}.${doc.type.toLowerCase()}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              } else {
                const textContent = `========================================\nJB MARINE CO., LTD. - PORT AGENCY SERVICES\n========================================\n\nDocument Title: ${doc.title}\nCategory: ${doc.category}\nDate Posted: ${doc.date}\nFile Size: ${doc.size}\nFile Format: ${doc.type}\n\nThis is an authentic official copy retrieved from JB Marine Document Center.\n\n----------------------------------------\nWEB: http://jbmarine.co.kr\nTEL: +82-2-393-1700\nEMAIL: mail@jbmarine.co.kr\nAddress:\n#1205, LAWYER'S BUILDING, 13, SAEMUNAN-RO\n5-GIL, JONGNO-GU, SEOUL, REPUBLIC OF KOREA\n========================================`;
                const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${doc.title}.txt`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }
            };

            return (
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="px-8 py-6 text-sm font-bold text-slate-900">Title</th>
                        <th className="px-8 py-6 text-sm font-bold text-slate-900">Category</th>
                        <th className="px-8 py-6 text-sm font-bold text-slate-900 text-center">Format</th>
                        <th className="px-8 py-6 text-sm font-bold text-slate-900">Date Posted</th>
                        <th className="px-8 py-6 text-sm font-bold text-slate-900">Size</th>
                        <th className="px-8 py-6 text-sm font-bold text-slate-900 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredDocuments.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-blue-100/50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <FileText className="w-5 h-5" />
                              </div>
                              <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                                {item.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <span className="font-mono text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                              {item.type}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-slate-500 text-sm">
                            {item.date}
                          </td>
                          <td className="px-8 py-6 text-slate-500 text-sm">
                            {item.size}
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Read Only Download action */}
                              <button 
                                onClick={() => handleDownload(item)}
                                title="Download actual file"
                                className="inline-flex items-center justify-center w-10 h-10 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all shadow-md"
                              >
                                <Download className="w-4 h-4" />
                              </button>

                              {/* Admin Mode Remove action (safe for iframes) */}
                              {isAdminMode && (
                                <div className="relative inline-flex items-center ml-1">
                                  {deleteConfirmId === item.id ? (
                                    <div className="flex items-center gap-1 animate-fadeIn bg-red-50 border border-red-200 rounded-full p-1 pl-3 shadow-md">
                                      <span className="text-[11px] text-red-700 font-bold mr-1">Delete?</span>
                                      <button
                                        onClick={() => {
                                          setDocuments(prev => prev.filter(d => d.id !== item.id));
                                          setDeleteConfirmId(null);
                                        }}
                                        className="px-2.5 py-0.5 bg-red-600 text-white rounded-full text-[10px] font-bold hover:bg-red-700 transition-colors"
                                      >
                                        Yes
                                      </button>
                                      <button
                                        onClick={() => setDeleteConfirmId(null)}
                                        className="px-2.5 py-0.5 bg-slate-200 text-slate-700 rounded-full text-[10px] font-bold hover:bg-slate-300 transition-colors"
                                      >
                                        No
                                      </button>
                                    </div>
                                  ) : (
                                    <button 
                                      onClick={() => setDeleteConfirmId(item.id)}
                                      title="Delete document as Administrator"
                                      className="inline-flex items-center justify-center w-10 h-10 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-md border border-red-100"
                                    >
                                      <Trash2 className="w-4.5 h-4.5" />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredDocuments.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <FileText className="w-10 h-10" />
                    </div>
                    <p className="text-slate-500 font-medium">No documents match the search criteria.</p>
                  </div>
                )}

                {/* Info Footer */}
                <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <span className="text-slate-500 text-sm font-medium">
                    Showing {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} in total
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5",
                      isAdminMode 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" 
                        : "bg-slate-100 text-slate-600"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", isAdminMode ? "bg-emerald-500 animate-pulse" : "bg-slate-400")} />
                      {isAdminMode ? '🔓 Administrator Console' : '🔒 Standard View (Reader)'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Admin Password Modal - styled to match company design perfectly */}
        <Modal
          isOpen={isPasswordModalOpen}
          onClose={() => {
            setIsPasswordModalOpen(false);
            setAdminPasswordInput('');
            setPasswordError('');
          }}
          title="Administrator System Log"
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (adminPasswordInput === 'JBjb119!') {
                setIsAdminMode(true);
                setIsPasswordModalOpen(false);
                setAdminPasswordInput('');
                setPasswordError('');
              } else {
                setPasswordError("Access denied. Please check your password and try again.");
              }
            }}
            className="space-y-6 max-w-md mx-auto py-4"
          >
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Authorized credentials are required to modify the Document Board. Please authenticate as an administrator.
              </p>
            </div>

            {passwordError && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-sm leading-relaxed">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{passwordError}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Security Passcode</label>
              <input 
                type="password" 
                autoFocus
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 font-mono transition-all text-center tracking-widest text-lg"
              />
              <p className="text-center text-xs text-slate-400 mt-2">
                🔒 Enterprise security system protection
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg"
            >
              Sign In
            </button>
          </form>
        </Modal>

        {/* Real Document Upload Modal */}
        <Modal
          isOpen={isUploadModalOpen}
          onClose={() => {
            setIsUploadModalOpen(false);
            setNewTitle('');
            setNewCategory('Port Info');
            setNewFileData('');
            setNewFileName('');
            setNewFileType('');
            setNewFileSize('');
          }}
          title="Upload Official Document"
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!newTitle) return;

              const uploadedDoc = {
                id: Date.now(),
                title: newTitle,
                category: newCategory,
                date: new Date().toISOString().split('T')[0],
                size: newFileSize || 'Unknown Size',
                type: newFileType || 'FILE',
                fileData: newFileData,
                fileName: newFileName
              };

              setDocuments(prev => [uploadedDoc, ...prev]);
              setIsUploadModalOpen(false);

              // Reset form fields
              setNewTitle('');
              setNewCategory('Port Info');
              setNewFileData('');
              setNewFileName('');
              setNewFileType('');
              setNewFileSize('');
            }}
            className="space-y-6 max-w-xl mx-auto py-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Document Title</label>
                <input 
                  type="text" 
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Incheon Terminal Guide 2026"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 font-medium transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Category Tag</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 font-medium transition-all appearance-none cursor-pointer"
                >
                  <option value="Port Info">Port Info</option>
                  <option value="Regulation">Regulation</option>
                  <option value="Guidelines">Guidelines</option>
                  <option value="Report">Report</option>
                  <option value="ETC">ETC</option>
                </select>
              </div>
            </div>

            {/* Custom file input conforming to "file-upload" layout guideline */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Attach Document File</label>
              
              <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 focus-within:border-blue-500 rounded-2xl p-8 text-center transition-colors cursor-pointer relative group">
                <input 
                  type="file" 
                  required
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setNewFileName(file.name);
                    if (!newTitle) {
                      const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                      setNewTitle(nameWithoutExt);
                    }
                    const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
                    setNewFileType(ext);

                    // Human readable size calculation
                    const sizeBytes = file.size;
                    let sizeStr = '';
                    if (sizeBytes < 1024) sizeStr = `${sizeBytes} B`;
                    else if (sizeBytes < 1024 * 1024) sizeStr = `${(sizeBytes / 1024).toFixed(1)} KB`;
                    else sizeStr = `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
                    setNewFileSize(sizeStr);

                    // Real File data reading
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setNewFileData(event.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform duration-300">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  {newFileName ? (
                    <div className="space-y-1">
                      <p className="text-slate-800 font-bold text-sm">{newFileName}</p>
                      <p className="text-xs text-blue-600 font-mono font-semibold bg-blue-50 px-2 py-0.5 rounded inline-block">
                        {newFileType} ({newFileSize})
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-slate-700 font-bold text-sm">Drag & drop your file here, or click to browse</p>
                      <p className="text-slate-400 text-xs">Supports Excel, PDF, CSV, Word, PNG formats</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setNewTitle('');
                  setNewCategory('Port Info');
                  setNewFileData('');
                  setNewFileName('');
                  setNewFileType('');
                  setNewFileSize('');
                }}
                className="flex-1 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-200 transition-all text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newFileName}
                className={cn(
                  "flex-1 py-4 text-white font-bold rounded-2xl shadow-lg transition-all text-center",
                  newFileName ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20" : "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                )}
              >
                Publish Document
              </button>
            </div>
          </form>
        </Modal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">Contact Us</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 whitespace-nowrap">Let's Discuss Your Next Shipment</h3>
            <p className="text-slate-400 text-lg">
              Our team is ready to assist you with any maritime requirements.<br />Reach out to us for a customized solution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=13+Saemunan-ro+5-gil+Jongno-gu+Seoul+Korea"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <MapPin className="w-8 h-8" />
              </div>
              <h5 className="font-bold text-xl mb-3 group-hover:text-blue-400 transition-colors">Headquarters</h5>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                #1205, LAYWER'S BUILDING, 13, SAEMUNAN-RO 5-GIL, JONGNO-GU, SEOUL, REPUBLIC OF KOREA (POSTAL CODE : 03182)
              </p>
            </a>

            <div className="flex flex-col items-center text-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-blue-500/50 transition-all group">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Phone className="w-8 h-8" />
              </div>
              <h5 className="font-bold text-xl mb-3 group-hover:text-blue-400 transition-colors">Phone</h5>
              <div className="space-y-2">
                <a 
                  href="tel:+8223931700" 
                  className="block text-slate-400 text-lg hover:text-white hover:underline transition-colors font-semibold"
                >
                  82-2-393-1700
                </a>
                <a 
                  href="tel:+8223931701" 
                  className="block text-slate-400 text-lg hover:text-white hover:underline transition-colors font-semibold"
                >
                  82-2-393-1701
                </a>
              </div>
            </div>

            <a 
              href="mailto:MAIL@JBMARINE.CO.KR"
              className="flex flex-col items-center text-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Mail className="w-8 h-8" />
              </div>
              <h5 className="font-bold text-xl mb-3 group-hover:text-blue-400 transition-colors">Email</h5>
              <p className="text-slate-400 text-lg group-hover:text-slate-200 transition-colors">MAIL@JBMARINE.CO.KR</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img 
                src={companyLogo} 
                alt="JB MARINE Logo" 
                className="h-8 w-8 object-contain rounded-full opacity-80"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Ship className="w-5 h-5 text-blue-500 hidden" />
              <span className="text-lg font-bold text-white">
                JB MARINE <span className="text-blue-500">CO., LTD.</span>
              </span>
            </div>
            
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>

            <p className="text-sm">
              &copy; {new Date().getFullYear()} JB MARINE CO., LTD. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
