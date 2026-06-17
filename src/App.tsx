import { useState, useEffect } from 'react'
import { supabase, categories } from './lib/supabase'
import type { Companion } from './lib/supabase'
import { MapPin, Star, Clock, Languages, X, Phone, Mail, Calendar, User, MessageSquare, ChevronDown, Zap } from 'lucide-react'

function App() {
  const [companions, setCompanions] = useState<Companion[]>([])
  const [filteredCompanions, setFilteredCompanions] = useState<Companion[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    client_email: '',
    activity_type: '',
    preferred_date: '',
    preferred_time: '',
    duration_hours: 2,
    notes: '',
  })

  useEffect(() => {
    fetchCompanions()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      setFilteredCompanions(companions.filter(c => c.categories.includes(selectedCategory)))
    } else {
      setFilteredCompanions(companions)
    }
  }, [selectedCategory, companions])

  async function fetchCompanions() {
    const { data } = await supabase.from('companions').select('*').eq('is_available', true)
    if (data) {
      setCompanions(data)
      setFilteredCompanions(data)
    }
    setLoading(false)
  }

  async function handleSubmitBooking(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedCompanion) return

    const { error } = await supabase.from('bookings').insert({
      companion_id: selectedCompanion.id,
      ...formData,
    })

    if (!error) {
      setBookingSuccess(true)
      setTimeout(() => {
        setShowBookingModal(false)
        setBookingSuccess(false)
        setSelectedCompanion(null)
        setFormData({
          client_name: '',
          client_phone: '',
          client_email: '',
          activity_type: '',
          preferred_date: '',
          preferred_time: '',
          duration_hours: 2,
          notes: '',
        })
      }, 2500)
    }
  }

  const categoryIcons: Record<string, string> = {
    'Мероприятия': '🎭',
    'Прогулки': '🚶',
    'Кино': '🎬',
    'Театр': '🎪',
    'Рестораны': '🍽️',
    'Бассейн': '🏊',
    'Шопинг': '🛍️',
    'Поездки': '🚗',
    'Музеи': '🏛️',
    'Спорт': '⚽',
  }

  const inputClass = "w-full bg-[#0a0a1a] border border-[rgba(0,245,255,0.2)] text-white placeholder-[rgba(255,255,255,0.3)] rounded-xl py-2.5 focus:outline-none focus:border-[#00f5ff] focus:shadow-[0_0_10px_rgba(0,245,255,0.3)] transition-all"
  const labelClass = "block text-xs font-medium text-[rgba(0,245,255,0.7)] uppercase tracking-wider mb-1.5"

  return (
    <div className="min-h-screen bg-[#050510] text-white grid-bg">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[rgba(5,5,16,0.85)] backdrop-blur-xl border-b border-[rgba(0,245,255,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(255,0,170,0.2))', border: '1px solid rgba(0,245,255,0.4)', boxShadow: '0 0 15px rgba(0,245,255,0.3)'}}>
                <Zap className="w-5 h-5 text-[#00f5ff]" />
              </div>
              <span className="text-xl font-bold tracking-wider">
                <span className="neon-text-cyan">COMPANION</span>
                <span className="neon-text-magenta">GO</span>
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {['Каталог', 'О нас', 'Контакты'].map((item, i) => (
                <a
                  key={item}
                  href={['#catalog', '#about', '#contact'][i]}
                  className="text-sm font-medium text-[rgba(255,255,255,0.6)] hover:text-[#00f5ff] transition-all hover:drop-shadow-[0_0_8px_#00f5ff] tracking-wider uppercase"
                >
                  {item}
                </a>
              ))}
            </nav>
            <a
              href="#catalog"
              className="neon-btn px-5 py-2 rounded-lg text-sm font-medium tracking-widest uppercase"
            >
              Забронировать
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="scan-line"></div>

        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: 'radial-gradient(circle, #00f5ff, transparent)'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{background: 'radial-gradient(circle, #ff00aa, transparent)'}}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,245,255,0.3)] bg-[rgba(0,245,255,0.05)] text-[#00f5ff] text-xs uppercase tracking-[0.2em] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse inline-block"></span>
              Платоническое сопровождение
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.05] tracking-tight">
              Найди своего{' '}
              <span className="shimmer-text">идеального</span>
              <br />
              компаньона
            </h1>

            <p className="text-lg md:text-xl text-[rgba(255,255,255,0.5)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Светские мероприятия, прогулки, кино, поездки и многое другое.
              Профессиональные компаньоны для любого случая.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#catalog"
                className="relative px-8 py-3.5 rounded-xl font-semibold tracking-wider uppercase text-sm overflow-hidden group"
                style={{background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(255,0,170,0.15))', border: '1px solid rgba(0,245,255,0.4)', boxShadow: '0 0 20px rgba(0,245,255,0.2)'}}
              >
                <span className="relative z-10 bg-gradient-to-r from-[#00f5ff] to-[#ff00aa] bg-clip-text text-transparent">Выбрать компаньона</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00f5ff] to-[#ff00aa] opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </a>
              <a
                href="#about"
                className="px-8 py-3.5 rounded-xl font-medium text-sm uppercase tracking-wider text-[rgba(255,255,255,0.5)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] hover:text-white transition-all"
              >
                Узнать больше
              </a>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 pt-12 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '500+', label: 'Клиентов' },
                { value: '50+', label: 'Компаньонов' },
                { value: '4.9', label: 'Рейтинг' },
                { value: '24/7', label: 'Поддержка' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold neon-text-cyan">{stat.value}</div>
                  <div className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 border-y border-[rgba(0,245,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-[rgba(0,245,255,0.5)] uppercase tracking-[0.3em] mb-6">Тип досуга</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium tracking-wider transition-all ${
                !selectedCategory
                  ? 'bg-[rgba(0,245,255,0.15)] text-[#00f5ff] border border-[rgba(0,245,255,0.5)] shadow-[0_0_12px_rgba(0,245,255,0.25)]'
                  : 'bg-transparent text-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,245,255,0.3)] hover:text-[rgba(0,245,255,0.7)]'
              }`}
            >
              Все
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat
                    ? 'bg-[rgba(255,0,170,0.15)] text-[#ff00aa] border border-[rgba(255,0,170,0.5)] shadow-[0_0_12px_rgba(255,0,170,0.25)]'
                    : 'bg-transparent text-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,0,170,0.3)] hover:text-[rgba(255,0,170,0.7)]'
                }`}
              >
                <span>{categoryIcons[cat]}</span>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full" style={{background: 'linear-gradient(#00f5ff, #ff00aa)'}}></div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {selectedCategory
                ? <><span className="text-[rgba(255,255,255,0.5)]">Компаньоны: </span><span className="neon-text-magenta">{selectedCategory}</span></>
                : <><span className="text-white">Наши </span><span className="neon-text-cyan">компаньоны</span></>
              }
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="card-neon rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-72 bg-[rgba(0,245,255,0.05)]"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-[rgba(255,255,255,0.05)] rounded w-1/2"></div>
                    <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded w-3/4"></div>
                    <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanions.map((companion, idx) => (
                <div
                  key={companion.id}
                  className="card-neon rounded-2xl overflow-hidden cursor-pointer group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                  onClick={() => setSelectedCompanion(companion)}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={companion.photo_url}
                      alt={companion.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background: 'linear-gradient(135deg, rgba(0,245,255,0.05), rgba(255,0,170,0.05))'}}></div>

                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{background: 'rgba(5,5,16,0.85)', border: '1px solid rgba(0,245,255,0.3)', backdropFilter: 'blur(8px)'}}>
                      <Star className="w-3.5 h-3.5 text-[#00f5ff] fill-[#00f5ff]" />
                      <span className="text-[#00f5ff]">{companion.rating}</span>
                    </div>

                    {/* Category tags */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 flex-wrap">
                      {companion.categories.slice(0, 3).map(cat => (
                        <span key={cat} className="px-2 py-0.5 text-xs rounded-full" style={{background: 'rgba(255,0,170,0.2)', border: '1px solid rgba(255,0,170,0.4)', color: '#ff00aa', backdropFilter: 'blur(8px)'}}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white tracking-wide">{companion.name}, {companion.age}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[rgba(0,245,255,0.5)]" />
                      <span className="text-xs text-[rgba(255,255,255,0.4)]">{companion.location}</span>
                    </div>
                    <p className="text-sm text-[rgba(255,255,255,0.45)] line-clamp-2 mb-4 leading-relaxed">{companion.bio}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.06)]">
                      <div>
                        <span className="text-lg font-bold neon-text-cyan">{companion.hourly_rate.toLocaleString()} ₽</span>
                        <span className="text-xs text-[rgba(255,255,255,0.3)]">/час</span>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          setSelectedCompanion(companion)
                          setShowBookingModal(true)
                        }}
                        className="px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wider neon-btn"
                      >
                        Выбрать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24 border-t border-[rgba(0,245,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs text-[rgba(255,0,170,0.7)] uppercase tracking-[0.3em] mb-4">О сервисе</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Платоническое сопровождение —<br />
                <span className="shimmer-text">легально и достойно</span>
              </h2>
              <p className="text-[rgba(255,255,255,0.5)] mb-8 leading-relaxed">
                Мы предоставляем услуги платонического сопровождения для тех случаев,
                когда вам нужна хорошая компания.
              </p>
              <ul className="space-y-4">
                {[
                  'Светские мероприятия и деловые ужины',
                  'Театр, кино, выставки и музеи',
                  'Прогулки, шопинг и поездки за город',
                  'Бассейн, спорт и активный отдых',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{border: '1px solid #00f5ff', boxShadow: '0 0 8px rgba(0,245,255,0.4)'}}>
                      <span className="text-[#00f5ff] text-xs">✓</span>
                    </div>
                    <span className="text-[rgba(255,255,255,0.7)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '500+', label: 'Довольных клиентов', color: '#00f5ff' },
                { value: '50+', label: 'Компаньонов', color: '#ff00aa' },
                { value: '4.9', label: 'Средний рейтинг', color: '#bf00ff' },
                { value: '24/7', label: 'Поддержка', color: '#00ff9f' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl"
                  style={{background: 'rgba(10,10,26,0.8)', border: `1px solid ${stat.color}22`, boxShadow: `0 0 20px ${stat.color}10`}}
                >
                  <div className="text-4xl font-bold mb-2" style={{color: stat.color, textShadow: `0 0 20px ${stat.color}`}}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-[rgba(255,255,255,0.4)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 border-t border-[rgba(0,245,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-[rgba(0,245,255,0.5)] uppercase tracking-[0.3em] mb-3">Контакты</p>
            <h2 className="text-3xl font-bold text-white mb-3">Свяжитесь с нами</h2>
            <p className="text-[rgba(255,255,255,0.4)]">Ответим в течение 15 минут</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Phone, label: 'Телефон', value: '+7 (999) 123-45-67', color: '#ff00aa' },
              { icon: Mail, label: 'Email', value: 'info@companiongo.ru', color: '#00f5ff' },
              { icon: Clock, label: 'Режим работы', value: 'Ежедневно 9:00–21:00', color: '#00ff9f' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-6 rounded-2xl"
                style={{background: 'rgba(10,10,26,0.8)', border: `1px solid ${color}20`, boxShadow: `0 0 20px ${color}08`}}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background: `${color}15`, border: `1px solid ${color}40`}}>
                  <Icon className="w-5 h-5" style={{color}} />
                </div>
                <div>
                  <div className="text-xs text-[rgba(255,255,255,0.35)] uppercase tracking-wider mb-1">{label}</div>
                  <div className="font-semibold text-white">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-[rgba(0,245,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{border: '1px solid rgba(0,245,255,0.3)', boxShadow: '0 0 10px rgba(0,245,255,0.2)'}}>
                <Zap className="w-4 h-4 text-[#00f5ff]" />
              </div>
              <span className="font-bold tracking-wider">
                <span className="neon-text-cyan">COMPANION</span><span className="neon-text-magenta">GO</span>
              </span>
            </div>
            <p className="text-xs text-[rgba(255,255,255,0.2)] tracking-wide">
              © 2024 CompanionGo. Платоническое сопровождение.
            </p>
          </div>
        </div>
      </footer>

      {/* Companion Detail Modal */}
      {selectedCompanion && !showBookingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(12px)'}}
          onClick={() => setSelectedCompanion(null)}
        >
          <div
            className="max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{background: '#0a0a1a', border: '1px solid rgba(0,245,255,0.2)', boxShadow: '0 0 60px rgba(0,245,255,0.1)'}}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img src={selectedCompanion.photo_url} alt={selectedCompanion.name} className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent"></div>
              <button
                onClick={() => setSelectedCompanion(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{background: 'rgba(10,10,26,0.8)', border: '1px solid rgba(0,245,255,0.3)', backdropFilter: 'blur(8px)'}}
              >
                <X className="w-4 h-4 text-[#00f5ff]" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedCompanion.name}, {selectedCompanion.age}</h3>
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <span className="flex items-center gap-1.5 text-sm text-[rgba(255,255,255,0.4)]">
                  <MapPin className="w-4 h-4 text-[rgba(0,245,255,0.5)]" />
                  {selectedCompanion.location}
                </span>
                <span className="flex items-center gap-1.5 text-sm">
                  <Star className="w-4 h-4 text-[#00f5ff] fill-[#00f5ff]" />
                  <span className="text-[#00f5ff] font-medium">{selectedCompanion.rating}</span>
                  <span className="text-[rgba(255,255,255,0.3)]">({selectedCompanion.reviews_count} отзывов)</span>
                </span>
              </div>

              <p className="text-[rgba(255,255,255,0.55)] mb-6 leading-relaxed">{selectedCompanion.bio}</p>

              <div className="mb-5">
                <p className="text-xs text-[rgba(0,245,255,0.5)] uppercase tracking-widest mb-3">Специализация</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCompanion.categories.map(cat => (
                    <span key={cat} className="px-3 py-1 rounded-full text-sm" style={{background: 'rgba(255,0,170,0.1)', border: '1px solid rgba(255,0,170,0.3)', color: '#ff00aa'}}>
                      {categoryIcons[cat]} {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6 flex items-center gap-2">
                <Languages className="w-4 h-4 text-[rgba(0,245,255,0.4)]" />
                <span className="text-sm text-[rgba(255,255,255,0.5)]">{selectedCompanion.languages.join(' · ')}</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl mb-0" style={{background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.15)'}}>
                <div>
                  <div className="text-xs text-[rgba(255,255,255,0.35)] uppercase tracking-wider mb-1">Тариф</div>
                  <div className="text-2xl font-bold neon-text-cyan">{selectedCompanion.hourly_rate.toLocaleString()} <span className="text-lg">₽/час</span></div>
                </div>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="neon-btn px-6 py-3 rounded-xl font-medium uppercase tracking-wider text-sm"
                >
                  Забронировать
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedCompanion && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{background: 'rgba(5,5,16,0.9)', backdropFilter: 'blur(16px)'}}
          onClick={() => !bookingSuccess && setShowBookingModal(false)}
        >
          <div
            className="max-w-md w-full max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{background: '#0a0a1a', border: '1px solid rgba(255,0,170,0.2)', boxShadow: '0 0 60px rgba(255,0,170,0.1)'}}
            onClick={e => e.stopPropagation()}
          >
            {bookingSuccess ? (
              <div className="p-10 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{border: '2px solid #00f5ff', boxShadow: '0 0 30px rgba(0,245,255,0.4)'}}>
                  <span className="text-4xl neon-text-cyan">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Заявка отправлена!</h3>
                <p className="text-[rgba(255,255,255,0.4)]">Мы свяжемся с вами в течение 15 минут для подтверждения.</p>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-[rgba(255,255,255,0.06)]">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-white tracking-wider uppercase">Бронирование</h3>
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,245,255,0.3)] transition"
                    >
                      <X className="w-4 h-4 text-[rgba(255,255,255,0.4)]" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl" style={{background: 'rgba(255,0,170,0.05)', border: '1px solid rgba(255,0,170,0.15)'}}>
                    <img src={selectedCompanion.photo_url} alt={selectedCompanion.name} className="w-11 h-11 rounded-full object-cover border border-[rgba(255,0,170,0.3)]" />
                    <div>
                      <div className="font-semibold text-white text-sm">{selectedCompanion.name}</div>
                      <div className="text-xs neon-text-magenta">{selectedCompanion.hourly_rate.toLocaleString()} ₽/час</div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmitBooking} className="p-6 space-y-4">
                  <div>
                    <label className={labelClass}>Ваше имя *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(0,245,255,0.4)]" />
                      <input
                        type="text"
                        required
                        value={formData.client_name}
                        onChange={e => setFormData({...formData, client_name: e.target.value})}
                        className={`${inputClass} pl-10 pr-4`}
                        placeholder="Иван Иванов"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Телефон *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(0,245,255,0.4)]" />
                      <input
                        type="tel"
                        required
                        value={formData.client_phone}
                        onChange={e => setFormData({...formData, client_phone: e.target.value})}
                        className={`${inputClass} pl-10 pr-4`}
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(0,245,255,0.4)]" />
                      <input
                        type="email"
                        value={formData.client_email}
                        onChange={e => setFormData({...formData, client_email: e.target.value})}
                        className={`${inputClass} pl-10 pr-4`}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Тип мероприятия *</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.activity_type}
                        onChange={e => setFormData({...formData, activity_type: e.target.value})}
                        className={`${inputClass} px-4 appearance-none`}
                      >
                        <option value="" className="bg-[#0a0a1a]">Выберите...</option>
                        {selectedCompanion.categories.map(cat => (
                          <option key={cat} value={cat} className="bg-[#0a0a1a]">{cat}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(0,245,255,0.4)] pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Дата *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(0,245,255,0.4)]" />
                        <input
                          type="date"
                          required
                          value={formData.preferred_date}
                          onChange={e => setFormData({...formData, preferred_date: e.target.value})}
                          className={`${inputClass} pl-10 pr-2`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Время *</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(0,245,255,0.4)]" />
                        <input
                          type="time"
                          required
                          value={formData.preferred_time}
                          onChange={e => setFormData({...formData, preferred_time: e.target.value})}
                          className={`${inputClass} pl-10 pr-2`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Длительность</label>
                    <select
                      value={formData.duration_hours}
                      onChange={e => setFormData({...formData, duration_hours: parseInt(e.target.value)})}
                      className={`${inputClass} px-4`}
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 12].map(h => (
                        <option key={h} value={h} className="bg-[#0a0a1a]">{h} {h === 1 ? 'час' : h < 5 ? 'часа' : 'часов'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Комментарий</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[rgba(0,245,255,0.4)]" />
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={e => setFormData({...formData, notes: e.target.value})}
                        className={`${inputClass} pl-10 pr-4 resize-none`}
                        placeholder="Дополнительная информация..."
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl" style={{background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.12)'}}>
                    <div className="flex justify-between text-sm text-[rgba(255,255,255,0.4)] mb-2">
                      <span>Тариф:</span>
                      <span>{selectedCompanion.hourly_rate.toLocaleString()} ₽ × {formData.duration_hours} ч.</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[rgba(255,255,255,0.4)]">Итого:</span>
                      <span className="text-xl font-bold neon-text-cyan">{(selectedCompanion.hourly_rate * formData.duration_hours).toLocaleString()} ₽</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold uppercase tracking-widest text-sm relative overflow-hidden group"
                    style={{background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(255,0,170,0.15))', border: '1px solid rgba(0,245,255,0.4)', color: 'white', boxShadow: '0 0 20px rgba(0,245,255,0.15)'}}
                  >
                    <span className="relative z-10 bg-gradient-to-r from-[#00f5ff] to-[#ff00aa] bg-clip-text text-transparent">Отправить заявку</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00f5ff] to-[#ff00aa] opacity-0 group-hover:opacity-15 transition-opacity"></div>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
