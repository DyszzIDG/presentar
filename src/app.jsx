import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, Link } from 'react-router-dom';
import {
  Code, ChevronRight, Shield, Zap, Layout, Box, FileText, Globe,
  Search, Star, LogOut, Menu, X, Plus, Users, Award, Brain, Palette, GitBranch, Server, Cloud, BookOpen, Rocket, FileCode
} from 'lucide-react';

// Mock Database Functions
const getDatabase = () => {
  const db = localStorage.getItem('educodehub_db');
  if (!db) {
    return initializeDatabase();
  }
  return JSON.parse(db);
};

const saveDatabase = (db) => {
  localStorage.setItem('educodehub_db', JSON.stringify(db));
};

const initializeDatabase = () => {
  const initialDb = {
    users: [
      {
        id: 'admin-1',
        username: 'Admin',
        email: 'admin@educodehub.com',
        password: 'admin123',
        role: 'admin',
        plan: 'premium',
        createdAt: new Date().toISOString()
      }
    ],
    microservicios: [
      {
        id: '1',
        title: 'Auth Service JWT',
        description: 'Sistema completo de autenticación con JWT, Refresh Tokens y manejo de roles.',
        category: 'Backend',
        author: 'admin',
        price: 29.99,
        rating: 4.8,
        iconName: 'Shield',
        tags: ['Node.js', 'Express', 'Security'],
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        codeSnippet: `const jwt = require('jsonwebtoken');\n\nfunction generateToken(user) {\n  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {\n    expiresIn: '1h'\n  });\n}`
      },
      {
        id: '2',
        title: 'Payment Gateway Stripe',
        description: 'Integración lista para usar con Stripe, incluye webhooks y manejo de suscripciones.',
        category: 'Backend',
        author: 'admin',
        price: 49.99,
        rating: 4.9,
        iconName: 'Zap',
        tags: ['Stripe', 'Payments', 'API'],
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
        codeSnippet: `const stripe = require('stripe')(process.env.STRIPE_KEY);\n\napp.post('/create-checkout-session', async (req, res) => {\n  const session = await stripe.checkout.sessions.create({...});\n  res.json({ id: session.id });\n});`
      },
      {
        id: '3',
        title: 'React Dashboard UI',
        description: 'Template de dashboard moderno con modo oscuro, gráficas y tablas responsivas.',
        category: 'Frontend',
        author: 'admin',
        price: 39.99,
        rating: 4.7,
        iconName: 'Layout',
        tags: ['React', 'Tailwind', 'UI/UX'],
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        codeSnippet: `export default function Dashboard() {\n  return (\n    <div className="flex h-screen bg-gray-50">\n      <Sidebar />\n      <MainContent />\n    </div>\n  );\n}`
      }
    ]
  };
  saveDatabase(initialDb);
  return initialDb;
};

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-cyan-500 p-1.5 rounded-lg">
              <Code className="text-white" size={24} />
            </div>
            <span className="ml-2 text-xl font-bold text-slate-900">EduCodeHub</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="text-gray-600 hover:text-slate-900 font-medium">Marketplace</Link>
            <Link to="/roadmap" className="text-gray-600 hover:text-slate-900 font-medium">Roadmap</Link>
            <Link to="/about" className="text-gray-600 hover:text-slate-900 font-medium">Acerca de</Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-slate-900 font-medium">Dashboard</Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-900">{user.username}</span>
                  <button
                    onClick={onLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-slate-900 font-medium">Iniciar Sesión</Link>
                <Link
                  to="/login"
                  className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition"
                >
                  Empezar
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/marketplace"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-slate-900 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/roadmap"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-slate-900 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Roadmap
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-slate-900 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Acerca de
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-slate-900 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-cyan-600 hover:bg-cyan-50"
                onClick={() => setIsOpen(false)}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Tu Mercado de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Microservicios</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Descubre, compra y vende microservicios listos para producción. Acelera tu desarrollo con código de calidad verificado por la comunidad.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/marketplace')}
            className="px-8 py-4 bg-cyan-500 text-white rounded-xl font-bold text-lg hover:bg-cyan-600 transition shadow-xl shadow-cyan-500/30 flex items-center justify-center"
          >
            Explorar Marketplace <ChevronRight className="ml-2" size={20} />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition flex items-center justify-center"
          >
            Vender Código
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    if (db && db.microservicios) {
      setServices(db.microservicios.slice(0, 3)); // Show top 3
    }
  }, []);

  const getIcon = (iconName) => {
    const icons = { Shield, Zap, Layout, Box, FileText, Code, Globe };
    const IconComponent = icons[iconName] || Box;
    return <IconComponent className="text-slate-700" size={24} />;
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Microservicios Destacados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre algunas de las soluciones más populares desarrolladas por nuestra comunidad.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map(service => (
            <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="mb-4 p-3 bg-gray-50 rounded-lg w-fit">
                {service.icon || getIcon(service.iconName)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex gap-2 flex-wrap">
                {service.tags && service.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium bg-cyan-50 text-cyan-700 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/marketplace')}
            className="text-cyan-600 font-bold hover:text-cyan-700 flex items-center justify-center mx-auto"
          >
            Ver todo el Marketplace <ChevronRight size={20} className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Marketplace = ({ user, onLogout }) => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    if (db && db.microservicios) {
      setServices(db.microservicios);
    }
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || service.category === filter;
    return matchesSearch && matchesFilter;
  });

  const getIcon = (iconName) => {
    const icons = { Shield, Zap, Layout, Box, FileText, Code, Globe };
    const IconComponent = icons[iconName] || Box;
    return <IconComponent className="text-slate-700" size={24} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar user={user} onLogout={onLogout} />
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-900">Marketplace</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar microservicios..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">Todas las categorías</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  {service.icon || getIcon(service.iconName)}
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end bg-yellow-50 px-2 py-1 rounded text-yellow-700 text-sm font-medium mb-1">
                    <Star size={14} className="fill-current mr-1" />
                    {service.rating}
                  </div>
                  <span className="text-xs text-gray-400">por {service.author}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <span className="font-bold text-lg text-slate-900">
                  {service.price === 0 ? 'Gratis' : `$${service.price}`}
                </span>
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-cyan-600 font-bold hover:text-cyan-700 text-sm"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedService(null)}>
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative h-64 bg-slate-900 flex items-center justify-center overflow-hidden rounded-t-2xl">
              {selectedService.imageUrl ? (
                <img src={selectedService.imageUrl} alt={selectedService.title} className="w-full h-full object-cover opacity-80" />
              ) : (
                <div className="text-slate-600">
                  <Code size={64} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-bold uppercase tracking-wider border border-cyan-500/30">
                    {selectedService.category}
                  </span>
                  <div className="flex items-center text-yellow-400 text-sm">
                    <Star size={14} className="fill-current mr-1" />
                    {selectedService.rating}
                  </div>
                </div>
                <h2 className="text-3xl font-bold">{selectedService.title}</h2>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition backdrop-blur-sm"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                {selectedService.codeSnippet && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                      <FileCode size={20} className="mr-2 text-cyan-500" /> Preview del Código
                    </h3>
                    <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto border border-slate-800">
                      <pre className="text-sm font-mono text-cyan-300">
                        <code>{selectedService.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500">Precio</span>
                    <span className="text-3xl font-bold text-slate-900">
                      {selectedService.price === 0 ? 'Gratis' : `$${selectedService.price}`}
                    </span>
                  </div>
                  <button className="w-full bg-cyan-500 text-white py-3 rounded-xl font-bold hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/20 mb-3">
                    Comprar Ahora
                  </button>
                  <button
                    onClick={() => {
                      const element = document.createElement("a");
                      const file = new Blob([selectedService.codeSnippet], { type: 'text/javascript' });
                      element.href = URL.createObjectURL(file);
                      element.download = `${selectedService.title.replace(/\s+/g, '_').toLowerCase()}.js`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="w-full bg-white text-slate-900 border-2 border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition mb-3 flex items-center justify-center"
                  >
                    <span className="mr-2">⬇️</span> Descargar Código
                  </button>
                  <p className="text-xs text-center text-gray-400">
                    Compra segura garantizada por EduCodeHub
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-bold text-slate-900 mb-4">Detalles</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex justify-between">
                      <span>Autor</span>
                      <span className="font-medium text-slate-900">{selectedService.author}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Versión</span>
                      <span className="font-medium text-slate-900">1.0.0</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Licencia</span>
                      <span className="font-medium text-slate-900">MIT</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.tags && selectedService.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-slate-950 text-gray-400 py-8 text-center border-t border-slate-800">
        <p>&copy; {new Date().getFullYear()} EduCodeHub. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Acerca de Nosotros</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos un equipo apasionado de desarrolladores senior dedicados a formar la próxima generación de arquitectos de software.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center p-6">
            <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-600">
              <Code size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Excelencia Técnica</h3>
            <p className="text-gray-600">
              Nuestros cursos están diseñados con las mejores prácticas de la industria y tecnologías de vanguardia.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
              <Globe size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Comunidad Global</h3>
            <p className="text-gray-600">
              Únete a miles de estudiantes de todo el mundo compartiendo conocimiento y creciendo juntos.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Calidad Garantizada</h3>
            <p className="text-gray-600">
              Contenido revisado y actualizado constantemente para asegurar la mejor experiencia de aprendizaje.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Plans = ({ showSelect = true, onSelectPlan }) => {
  const navigate = useNavigate();
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['5 microservicios', 'Comunidad', 'Soporte básico'],
      icon: '🚀'
    },
    {
      name: 'Pro',
      price: '$9.99',
      features: ['50 microservicios', 'Comunidad Premium', 'Soporte prioritario', 'Certificados'],
      icon: '⚡',
      highlighted: true
    },
    {
      name: 'Premium',
      price: '$29.99',
      features: ['Acceso ilimitado', 'Mentoría 1-a-1', 'Proyectos privados', 'Certificados avanzados'],
      icon: '👑'
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Planes de Membresía</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-8 ${plan.highlighted
                ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-xl transform scale-105'
                : 'bg-white border border-gray-200 text-gray-900'
                }`}
            >
              <div className="text-4xl mb-4">{plan.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">{plan.price}<span className="text-sm">/mes</span></p>
              <div className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <span className="mr-3">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
              {showSelect && (
                <button
                  onClick={() => onSelectPlan && onSelectPlan(plan.name.toLowerCase())}
                  className={`w-full py-2 rounded-lg font-semibold transition ${plan.highlighted
                    ? 'bg-white text-cyan-600 hover:bg-gray-100'
                    : 'bg-cyan-500 text-white hover:bg-cyan-600'
                    }`}
                >
                  Seleccionar
                </button>
              )}
              {!showSelect && (
                <button
                  onClick={() => navigate('/login')}
                  className={`w-full py-2 rounded-lg font-semibold transition ${plan.highlighted
                    ? 'bg-white text-cyan-600 hover:bg-gray-100'
                    : 'bg-cyan-500 text-white hover:bg-cyan-600'
                    }`}
                >
                  Empezar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LandingPage = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={onLogout} />
      <Hero />
      <FeaturedServices />
      <AboutUs />
      <section id="plans">
        <Plans showSelect={false} />
      </section>
      <footer className="bg-slate-950 text-gray-400 py-12 text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-cyan-500 p-1.5 rounded-lg">
              <Code className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-white">EduCodeHub</span>
          </div>
          <p>&copy; {new Date().getFullYear()} EduCodeHub. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('register'); // Default to register as per image
  const [role, setRole] = useState('student');
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const db = getDatabase();
    const user = db?.users.find(u => u.email === email && u.password === password);

    if (user) {
      onLogin(user);
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const db = getDatabase();
    if (db.users.find(u => u.email === newUser.email)) {
      setError('El email ya está registrado');
      return;
    }

    const user = {
      id: Date.now().toString(),
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      role: role,
      plan: 'free',
      createdAt: new Date().toISOString()
    };

    const updatedDb = { ...db, users: [...db.users, user] };
    saveDatabase(updatedDb);
    onLogin(user);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
      <div className="absolute top-6 left-6 flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="bg-cyan-500 p-1.5 rounded-lg">
          <Code className="text-white" size={20} />
        </div>
        <span className="text-xl font-bold text-slate-900">EduCodeHub</span>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
            </h2>
            <p className="text-gray-600">
              {mode === 'login'
                ? 'Ingresa a tu cuenta para continuar'
                : 'Únete a nuestra comunidad de desarrolladores'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-900/20"
              >
                Iniciar Sesión
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`w-full p-4 rounded-xl border-2 text-center transition ${role === 'student'
                    ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="font-bold mb-1">Estudiante</div>
                  <div className="text-xs opacity-75">Quiero aprender</div>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Usuario</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                  placeholder="Usuario"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                  placeholder="tu@email.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                  placeholder="••••••••"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                  placeholder="••••••••"
                  value={newUser.confirmPassword}
                  onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-500 text-white py-3 rounded-lg font-bold hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/30"
              >
                Crear Cuenta
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                className="ml-2 text-cyan-600 font-bold hover:text-cyan-700"
              >
                {mode === 'login' ? 'Regístrate' : 'Inicia Sesión'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout, onUpdateUser }) => {
  const [db, setDb] = useState(getDatabase());
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [newMicroservicio, setNewMicroservicio] = useState({
    title: '',
    description: '',
    category: 'Frontend',
    imageUrl: '',
    codeSnippet: ''
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleUpdatePlan = (newPlan) => {
    const updatedUser = { ...user, plan: newPlan };

    // Update in DB
    const updatedDb = {
      ...db,
      users: db.users.map(u => u.id === user.id ? updatedUser : u)
    };
    saveDatabase(updatedDb);
    setDb(updatedDb);

    // Update global state
    onUpdateUser(updatedUser);

    alert(`¡Plan actualizado a ${newPlan} exitosamente!`);
    setActiveTab('overview');
  };

  const handleAddMicroservicio = () => {
    if (!newMicroservicio.title || !newMicroservicio.description) {
      alert('Por favor completa todos los campos');
      return;
    }

    const updated = {
      ...db,
      microservicios: [
        ...db.microservicios,
        {
          id: Date.now().toString(),
          title: newMicroservicio.title,
          description: newMicroservicio.description,
          category: newMicroservicio.category,
          imageUrl: newMicroservicio.imageUrl || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
          codeSnippet: newMicroservicio.codeSnippet || '// No code provided',
          author: user.username,
          plan: 'free',
          rating: 0,
          price: 0,
          tags: [newMicroservicio.category],
          iconName: 'Box'
        }
      ]
    };
    saveDatabase(updated);
    setDb(updated);
    setNewMicroservicio({ title: '', description: '', category: 'Frontend', imageUrl: '', codeSnippet: '' });
    setShowAddModal(false);
  };

  const handleDeleteMicroservicio = (id) => {
    const service = db.microservicios.find(m => m.id === id);
    if (user.role !== 'admin' && service?.author !== user.username) {
      alert('No tienes permiso para eliminar este servicio');
      return;
    }
    const updated = {
      ...db,
      microservicios: db.microservicios.filter(m => m.id !== id)
    };
    saveDatabase(updated);
    setDb(updated);
  };

  const userPlanLimit = {
    free: 5,
    pro: 50,
    premium: Infinity
  };

  const availableServices = db.microservicios.slice(0, userPlanLimit[user.plan]);

  // Sidebar Item Component
  const SidebarItem = ({ icon: Icon, label, id, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active
        ? 'bg-cyan-50 text-cyan-700 shadow-sm'
        : 'text-gray-500 hover:bg-gray-50 hover:text-slate-900'
        }`}
    >
      <Icon size={20} className={active ? 'text-cyan-600' : 'text-gray-400 group-hover:text-slate-700'} />
      <span className="font-medium">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100 w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0 flex flex-col`}
      >
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-cyan-500 p-1.5 rounded-lg">
              <Code className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900">EduCodeHub</span>
          </div>
        </div>

        <div className="p-4 space-y-2 flex-grow overflow-y-auto">
          <div className="mb-8">
            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Principal</p>
            <div className="space-y-1">
              <SidebarItem icon={Layout} label="Resumen" id="overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
              <SidebarItem icon={Box} label="Mis Servicios" id="services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
              <SidebarItem icon={Award} label="Mi Plan" id="plan" active={activeTab === 'plan'} onClick={() => setActiveTab('plan')} />
            </div>
          </div>

          <div>
            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Comunidad</p>
            <div className="space-y-1">
              <SidebarItem icon={Users} label="Foro" id="forum" active={activeTab === 'forum'} onClick={() => { }} />
              <SidebarItem icon={FileText} label="Recursos" id="resources" active={activeTab === 'resources'} onClick={() => { }} />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-50">
          <div className="bg-slate-900 rounded-xl p-4 text-white">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-lg">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-sm">{user.username}</p>
                <p className="text-xs text-slate-400 capitalize">{user.plan} Plan</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition"
            >
              <LogOut size={14} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden mr-4 text-gray-500"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-slate-900">
              {activeTab === 'overview' && 'Resumen General'}
              {activeTab === 'services' && 'Mis Servicios'}
              {activeTab === 'plan' && 'Gestionar Plan'}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/20"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Nuevo Proyecto</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Box size={24} />
                      </div>
                      <span className="text-xs font-medium text-gray-400 uppercase">Proyectos</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{availableServices.length}</div>
                    <p className="text-sm text-gray-500 mt-1">Microservicios activos</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                        <Award size={24} />
                      </div>
                      <span className="text-xs font-medium text-gray-400 uppercase">Plan Actual</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 capitalize">{user.plan}</div>
                    <p className="text-sm text-gray-500 mt-1">
                      {userPlanLimit[user.plan] === Infinity
                        ? 'Acceso Ilimitado'
                        : `${userPlanLimit[user.plan]} proyectos máx`}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                        <Users size={24} />
                      </div>
                      <span className="text-xs font-medium text-gray-400 uppercase">Comunidad</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">Activa</div>
                    <p className="text-sm text-gray-500 mt-1">Acceso a foros y recursos</p>
                  </div>
                </div>

                {/* Recent Projects */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Mis Proyectos Recientes</h2>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {availableServices.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {availableServices.map(service => (
                          <div key={service.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                                <Box size={20} />
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-900">{service.title}</h3>
                                <p className="text-sm text-gray-500">{service.category}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm font-medium text-gray-500">{service.plan}</span>
                              <button
                                onClick={() => handleDeleteMicroservicio(service.id)}
                                className="text-red-500 hover:text-red-700 p-2"
                              >
                                <LogOut size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        No tienes proyectos aún. ¡Crea el primero!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'plan' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Gestionar Plan</h2>
                <Plans showSelect={true} onSelectPlan={handleUpdatePlan} />
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Mis Servicios</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {db.microservicios.filter(s => s.author === user.username).map(service => (
                    <div key={service.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-cyan-50 text-cyan-600 rounded-lg">
                          <Box size={24} />
                        </div>
                        <button
                          onClick={() => handleDeleteMicroservicio(service.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {service.category}
                        </span>
                        <span className="font-bold text-slate-900">
                          {service.price === 0 ? 'Gratis' : `$${service.price}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Panel Section */}
            {user.role === 'admin' && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Panel de Administración</h2>
                <div className="bg-slate-900 text-white p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-lg">Gestión de Usuarios</h3>
                      <p className="text-slate-400 text-sm">Control total del sistema</p>
                    </div>
                    <Shield className="text-cyan-500" size={32} />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-800">
                          <th className="pb-3 font-medium text-slate-400">Usuario</th>
                          <th className="pb-3 font-medium text-slate-400">Email</th>
                          <th className="pb-3 font-medium text-slate-400">Rol</th>
                          <th className="pb-3 font-medium text-slate-400">Plan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {db.users.map(u => (
                          <tr key={u.id}>
                            <td className="py-3">{u.username}</td>
                            <td className="py-3 text-slate-400">{u.email}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-300'
                                }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="py-3 capitalize text-cyan-400">{u.plan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Nuevo Microservicio</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500"
                  value={newMicroservicio.title}
                  onChange={(e) => setNewMicroservicio({ ...newMicroservicio, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500"
                  rows="3"
                  value={newMicroservicio.description}
                  onChange={(e) => setNewMicroservicio({ ...newMicroservicio, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500"
                  value={newMicroservicio.category}
                  onChange={(e) => setNewMicroservicio({ ...newMicroservicio, category: e.target.value })}
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen (Opcional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500"
                  placeholder="https://..."
                  value={newMicroservicio.imageUrl}
                  onChange={(e) => setNewMicroservicio({ ...newMicroservicio, imageUrl: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código del Microservicio</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
                  rows="5"
                  placeholder="// Pega tu código aquí..."
                  value={newMicroservicio.codeSnippet}
                  onChange={(e) => setNewMicroservicio({ ...newMicroservicio, codeSnippet: e.target.value })}
                />
              </div>
              <button
                onClick={handleAddMicroservicio}
                className="w-full bg-cyan-500 text-white py-3 rounded-xl font-bold hover:bg-cyan-600 transition"
              >
                Publicar Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Roadmap = ({ user, onLogout }) => {
  const [selectedPhase, setSelectedPhase] = useState(null);

  const phases = [
    {
      id: 1,
      title: "Fase 1 – Fundamentos",
      duration: "1–2 semanas",
      description: "Conceptos básicos de computación y programación.",
      topics: [
        { name: "Qué es programar", definition: "Programar es el acto de dar instrucciones a una computadora para que realice una tarea específica.", example: "Ejemplo: Escribir una receta de cocina paso a paso." },
        { name: "Cómo funciona una computadora", definition: "Entender el hardware (CPU, RAM, Disco) y cómo interactúan con el software.", example: "CPU = Cerebro, RAM = Memoria a corto plazo." },
        { name: "Qué es un algoritmo", definition: "Una secuencia de pasos lógicos y ordenados para resolver un problema.", example: "Algoritmo para lavarse los dientes: 1. Tomar cepillo 2. Poner pasta..." },
        { name: "Lógica Booleana", definition: "Operaciones lógicas fundamentales (AND, OR, NOT) que son la base de la computación.", example: "true AND false = false; true OR false = true" },
        { name: "Sistemas Binarios", definition: "Cómo las computadoras representan datos usando solo 0s y 1s.", example: "1010 en binario = 10 en decimal." },
        { name: "Estructuras de Datos Básicas", definition: "Formas simples de organizar datos: Arrays (listas) y Objetos (diccionarios).", example: "Lista de compras = Array; Contacto telefónico = Objeto." },
        { name: "Cliente vs servidor", definition: "Cliente es quien pide (tu navegador), Servidor es quien responde (la computadora donde está la web).", example: "Cliente: 'Dame la página de Facebook'. Servidor: 'Aquí tienes'." },
        { name: "Cómo funciona un navegador", definition: "El navegador interpreta HTML, CSS y JS para mostrarte una página web visual.", example: "Chrome, Firefox, Safari." }
      ],
      icon: "Brain",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "Fase 2 – Aprender HTML",
      duration: "2–3 semanas",
      description: "Estructura y semántica de la web.",
      topics: [
        { name: "Etiquetas básicas", definition: "Los bloques de construcción de HTML. Definen títulos, párrafos, imágenes, etc.", example: "<h1>Título</h1>, <p>Párrafo</p>" },
        { name: "Formularios", definition: "Elementos para recolectar datos del usuario.", example: "<input type='text' />, <button>Enviar</button>" },
        { name: "Tablas", definition: "Estructura para mostrar datos en filas y columnas.", example: "<table><tr><td>Dato</td></tr></table>" },
        { name: "Estructura semántica", definition: "Usar etiquetas que describen el contenido (header, nav, main, footer) para mejor accesibilidad y SEO.", example: "<header>...</header> vs <div>...</div>" },
        { name: "SEO Básico", definition: "Optimización para motores de búsqueda usando meta tags y estructura correcta.", example: "<meta name='description' content='...' />" },
        { name: "Accesibilidad (A11y)", definition: "Hacer la web utilizable para personas con discapacidades.", example: "role='button', aria-label='Cerrar'" },
        { name: "Multimedia", definition: "Insertar audio y video nativo en la web.", example: "<video src='movie.mp4' controls></video>" }
      ],
      project: "Landing page completa",
      icon: "FileCode",
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: 3,
      title: "Fase 3 – Aprender CSS",
      duration: "3–4 semanas",
      description: "Estilos, diseño responsivo y animaciones.",
      topics: [
        { name: "Selectores", definition: "Reglas para elegir qué elementos HTML estilizar.", example: ".clase { color: red; }, #id { font-size: 20px; }" },
        { name: "Flexbox", definition: "Modelo de diseño unidimensional para distribuir espacio entre ítems.", example: "display: flex; justify-content: center;" },
        { name: "Grid", definition: "Modelo de diseño bidimensional (filas y columnas).", example: "display: grid; grid-template-columns: 1fr 1fr;" },
        { name: "Responsive design", definition: "Hacer que la web se vea bien en móviles, tablets y escritorio.", example: "@media (max-width: 768px) { ... }" },
        { name: "Animaciones", definition: "Dar vida a los elementos con transiciones y keyframes.", example: "transition: all 0.3s ease;" },
        { name: "Variables CSS", definition: "Valores reutilizables para mantener consistencia (colores, tamaños).", example: ":root { --primary-color: #3498db; }" },
        { name: "Pseudoclases", definition: "Estilos basados en el estado del elemento.", example: "button:hover { background: blue; }" },
        { name: "Metodologías (BEM)", definition: "Convención de nombres para mantener CSS escalable.", example: ".card__title--active" }
      ],
      project: "Clonar página famosa (Netflix, MercadoLibre)",
      icon: "Palette",
      color: "bg-pink-100 text-pink-600"
    },
    {
      id: 4,
      title: "Fase 4 – Aprender JavaScript",
      duration: "6–8 semanas",
      description: "Lógica de programación e interactividad.",
      topics: [
        { name: "Variables y Tipos", definition: "Almacenar datos (strings, numbers, booleans).", example: "let edad = 25; const nombre = 'Ana';" },
        { name: "Funciones", definition: "Bloques de código reutilizables.", example: "function sumar(a, b) { return a + b; }" },
        { name: "DOM Manipulation", definition: "Modificar el HTML y CSS desde JS.", example: "document.querySelector('.btn').classList.add('active');" },
        { name: "Eventos", definition: "Responder a interacciones del usuario.", example: "btn.onclick = () => alert('Hola');" },
        { name: "ES6+ Features", definition: "Sintaxis moderna de JS.", example: "Arrow functions: () => {}, Destructuring: const { id } = user;" },
        { name: "Async/Await", definition: "Manejar código asíncrono de forma legible.", example: "const data = await fetchUser();" },
        { name: "JSON", definition: "Formato de intercambio de datos.", example: "JSON.stringify({ id: 1 })" },
        { name: "Debugging", definition: "Encontrar y arreglar errores usando la consola.", example: "console.log(variable); debugger;" }
      ],
      project: "Calculadora, To-Do List, Mini e-commerce, Dashboard",
      icon: "Code",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      id: 5,
      title: "Fase 5 – Git & GitHub",
      duration: "1 semana",
      description: "Control de versiones y colaboración.",
      topics: [
        { name: "Commits", definition: "Guardar un punto en la historia de tu código.", example: "git commit -m 'feat: add login'" },
        { name: "Ramas (Branches)", definition: "Líneas de desarrollo paralelas.", example: "git checkout -b feature/nueva-funcionalidad" },
        { name: "Merge & Conflicts", definition: "Fusionar ramas y resolver diferencias.", example: "git merge feature/login" },
        { name: "Pull Requests", definition: "Proceso de revisión de código antes de fusionar.", example: "Solicitud en GitHub para unir cambios." },
        { name: ".gitignore", definition: "Archivos que no deben subirse al repositorio.", example: "node_modules/, .env" },
        { name: "GitHub Pages", definition: "Hosting gratuito para sitios estáticos.", example: "Publicar tu portafolio." }
      ],
      icon: "GitBranch",
      color: "bg-gray-100 text-gray-600"
    },
    {
      id: 6,
      title: "Fase 6 – Frontend Moderno con React",
      duration: "4–6 semanas",
      description: "Desarrollo de interfaces dinámicas y SPAs.",
      topics: [
        { name: "Componentes", definition: "Bloques de UI reutilizables.", example: "<Button variant='primary'>Click</Button>" },
        { name: "Props & State", definition: "Datos que fluyen y cambian en la app.", example: "useState(0); <Card title='Hola' />" },
        { name: "Hooks", definition: "Funciones para usar estado y ciclo de vida.", example: "useEffect(() => { ... }, [])" },
        { name: "Custom Hooks", definition: "Tu propia lógica reutilizable.", example: "useFetch('/api/data')" },
        { name: "Context API", definition: "Estado global sin prop drilling.", example: "useContext(ThemeContext)" },
        { name: "React Router", definition: "Navegación en SPAs.", example: "<Route path='/about' element={<About />} />" },
        { name: "API Consumption", definition: "Conectar con el backend.", example: "axios.get('/api/users')" }
      ],
      project: "App con login + dashboard",
      icon: "Layout",
      color: "bg-cyan-100 text-cyan-600"
    },
    {
      id: 7,
      title: "Fase 7 – Backend con Node.js + Express",
      duration: "6–8 semanas",
      description: "Creación de APIs y manejo de datos.",
      topics: [
        { name: "Node.js Runtime", definition: "Ejecutar JS fuera del navegador.", example: "node server.js" },
        { name: "Express Server", definition: "Framework para crear servidores web.", example: "app.listen(3000)" },
        { name: "REST API", definition: "Arquitectura estándar de APIs.", example: "GET, POST, PUT, DELETE" },
        { name: "Middleware", definition: "Funciones que se ejecutan antes de la ruta final.", example: "app.use(cors()); app.use(authMiddleware);" },
        { name: "Databases (SQL/NoSQL)", definition: "Persistencia de datos.", example: "MongoDB (Mongoose) o PostgreSQL (Sequelize/Prisma)" },
        { name: "Authentication (JWT)", definition: "Seguridad y sesiones.", example: "Bearer token_string" },
        { name: "MVC Pattern", definition: "Organización del código (Model, View, Controller).", example: "controllers/userController.js" }
      ],
      project: "API completa con autenticación",
      icon: "Server",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 8,
      title: "Fase 8 – Microservicios",
      duration: "8–12 semanas",
      description: "Arquitectura avanzada y despliegue.",
      topics: [
        { name: "Monolito vs Microservicios", definition: "Diferencias arquitectónicas.", example: "Una gran app vs muchas pequeñas apps conectadas." },
        { name: "API Gateway", definition: "Punto de entrada único.", example: "Nginx, Kong, AWS API Gateway." },
        { name: "Docker & Containers", definition: "Empaquetado de aplicaciones.", example: "Dockerfile, docker-compose up" },
        { name: "Orquestación (K8s)", definition: "Manejo de contenedores a escala.", example: "Kubernetes Pods, Services, Deployments." },
        { name: "Message Brokers", definition: "Comunicación asíncrona.", example: "RabbitMQ, Kafka, Redis Pub/Sub." },
        { name: "CI/CD Pipelines", definition: "Automatización de despliegues.", example: "GitHub Actions: Build -> Test -> Deploy" },
        { name: "Observabilidad", definition: "Monitoreo y logs.", example: "Prometheus, Grafana, ELK Stack." }
      ],
      project: "Marketplace de microservicios",
      icon: "Cloud",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const getIcon = (iconName) => {
    const icons = { Brain, FileCode, Palette, Code, GitBranch, Layout, Server, Cloud };
    const IconComponent = icons[iconName] || Box;
    return <IconComponent size={24} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Roadmap de Aprendizaje</h1>
          <p className="text-xl text-gray-600">
            Tu camino desde cero hasta Arquitecto de Software. Haz clic en las fases para ver el contenido completo.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 rounded-full" />

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div key={phase.id} className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Content Card */}
                <div className="flex-1 w-full md:w-1/2">
                  <div
                    onClick={() => setSelectedPhase(phase)}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-cyan-200 transition relative group cursor-pointer"
                  >
                    {/* Arrow for desktop */}
                    <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-gray-100 rotate-45 ${index % 2 === 0 ? '-left-2 border-r-0 border-b border-l' : '-right-2'}`} />

                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${phase.color.replace('text-', 'bg-').replace('100', '50')} ${phase.color}`}>
                        {phase.duration}
                      </span>
                      <span className="text-gray-400 text-sm font-medium">Fase {phase.id}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition">{phase.title.split('–')[1]}</h3>
                    <p className="text-gray-600 mb-4">{phase.description}</p>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center">
                          <BookOpen size={16} className="mr-2 text-cyan-500" /> Temas Clave
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {phase.topics.map((topic, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2 text-gray-400">•</span>
                              <span>{topic.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 text-cyan-600 text-sm font-bold flex items-center">
                        Ver Roadmap Completo <ChevronRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center shadow-sm">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${phase.color}`}>
                    {getIcon(phase.icon)}
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Extras Section */}
        <div className="mt-20 bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-slate-900 to-slate-900" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Extras Importantes</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["Soft Skills", "VS Code", "Postman", "GitHub", "Docker", "Swagger"].map(extra => (
                <span key={extra} className="px-4 py-2 bg-white/10 rounded-full font-medium border border-white/10 hover:bg-white/20 transition cursor-default">
                  {extra}
                </span>
              ))}
            </div>
            <p className="mt-8 text-slate-400 max-w-2xl mx-auto">
              Dominar estas herramientas y habilidades blandas es tan crucial como escribir código. ¡No las subestimes!
            </p>
          </div>
        </div>
      </div>

      {/* Phase Detail Modal (Full Roadmap View) */}
      {selectedPhase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPhase(null)}>
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className={`p-8 ${selectedPhase.color.replace('text-', 'bg-').replace('100', '50')} border-b border-gray-100`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 bg-white rounded-lg ${selectedPhase.color}`}>
                      {getIcon(selectedPhase.icon)}
                    </div>
                    <span className={`font-bold uppercase tracking-wider text-sm ${selectedPhase.color}`}>
                      Fase {selectedPhase.id}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">{selectedPhase.title.split('–')[1]}</h2>
                  <p className="text-slate-700 mt-2 text-lg">{selectedPhase.description}</p>
                </div>
                <button onClick={() => setSelectedPhase(null)} className="text-slate-500 hover:text-slate-700 bg-white/50 p-2 rounded-full">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-12 relative">
                {/* Vertical Line for Modal */}
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200" />

                {selectedPhase.topics.map((topic, index) => (
                  <div key={index} className="relative pl-12">
                    {/* Node */}
                    <div className="absolute left-0 top-1.5 w-8 h-8 bg-white border-2 border-cyan-500 rounded-full flex items-center justify-center z-10">
                      <span className="text-xs font-bold text-cyan-700">{index + 1}</span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-cyan-200 transition">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{topic.name}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{topic.definition}</p>

                      {topic.example && (
                        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                          <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                            <Code size={14} className="mr-1" /> Ejemplo
                          </div>
                          <code className="text-sm font-mono text-cyan-300 whitespace-pre-wrap">
                            {topic.example}
                          </code>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedPhase.project && (
                <div className="mt-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-8 text-white text-center">
                  <Rocket size={48} className="mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">Proyecto Final de Fase</h3>
                  <p className="text-purple-100 text-lg mb-6">
                    Pon a prueba tus conocimientos construyendo:
                  </p>
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-bold text-xl border border-white/30">
                    {selectedPhase.project}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-slate-950 text-gray-400 py-12 text-center border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} EduCodeHub. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AboutPage = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar user={user} onLogout={onLogout} />
      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Acerca de EduCodeHub</h1>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              EduCodeHub es una plataforma educativa diseñada para que estudiantes y nuevos desarrolladores aprendan programación a través de prácticas reales, utilizando un entorno basado en microservicios y componentes reutilizables. Nuestro objetivo es reducir la complejidad del desarrollo inicial, permitiendo que cada usuario trabaje con módulos de código listos para integrar, mientras comprende cómo funcionan arquitecturas modernas y procesos colaborativos propios de la industria del software.
            </p>
            <p>
              El proyecto surge como respuesta a una necesidad actual del ámbito técnico: la falta de espacios donde los alumnos puedan aplicar conocimientos en un entorno estructurado, profesional y cercano a las herramientas que se utilizan en equipos de desarrollo reales. En EduCodeHub reunimos un marketplace de microservicios, documentación clara y un sistema que facilita el trabajo por componentes, permitiendo que cada estudiante mejore su lógica, construya proyectos más complejos y genere un portfolio demostrable.
            </p>
            <p>
              Buscamos formar programadores capaces de resolver problemas reales, fomentar la colaboración entre estudiantes y brindar acceso a recursos avanzados de manera simple y organizada. La plataforma combina buenas prácticas de ingeniería, accesibilidad educativa y una experiencia intuitiva que acompaña el crecimiento técnico de cada usuario.
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-slate-950 text-gray-400 py-8 text-center border-t border-slate-800">
        <p>&copy; {new Date().getFullYear()} EduCodeHub. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default function EduCodeHub() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    initializeDatabase();
    // Check for logged in user in session storage or similar if implemented
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage user={currentUser} onLogout={handleLogout} />} />
        <Route path="/marketplace" element={<Marketplace user={currentUser} onLogout={handleLogout} />} />
        <Route path="/roadmap" element={<Roadmap user={currentUser} onLogout={handleLogout} />} />
        <Route path="/about" element={<AboutPage user={currentUser} onLogout={handleLogout} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={currentUser}>
              <Dashboard user={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
