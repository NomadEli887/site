-- Companions table
CREATE TABLE companions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  photo_url TEXT NOT NULL,
  bio TEXT NOT NULL,
  categories TEXT[] NOT NULL,
  languages TEXT[] NOT NULL DEFAULT '{}',
  hourly_rate INTEGER NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL(3,2) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID REFERENCES companions(id) NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_email TEXT,
  activity_type TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  duration_hours INTEGER NOT NULL DEFAULT 2,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companions (public read)
CREATE POLICY "companions_public_read" ON companions FOR SELECT
  TO public USING (true);

-- RLS Policies for bookings (public insert, no read for security)
CREATE POLICY "bookings_public_insert" ON bookings FOR INSERT
  TO public WITH CHECK (true);

-- Insert sample companions
INSERT INTO companions (name, age, photo_url, bio, categories, languages, hourly_rate, location, rating, reviews_count) VALUES
('Алиса', 26, 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', 'Элегантная и образованная компаньонка для светских мероприятий. Владею английским и французским. Отлично разбираюсь в искусстве и музыке.', ARRAY['Мероприятия', 'Музеи', 'Театр', 'Рестораны'], ARRAY['Русский', 'English', 'Français'], 3000, 'Москва, Центр', 4.9, 47),
('Мария', 24, 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400', 'Активная и позитивная. Отличный выбор для прогулок, шопинга и активного отдыха. Занимаюсь йогой и плаванием.', ARRAY['Прогулки', 'Шопинг', 'Спорт', 'Бассейн'], ARRAY['Русский', 'English'], 2500, 'Москва', 4.8, 32),
('Елена', 28, 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', 'Опытный гид по Москве и области. Знаю все лучшие рестораны и скрытые места города. Идеально для деловых встреч.', ARRAY['Мероприятия', 'Рестораны', 'Бизнес', 'Поездки'], ARRAY['Русский', 'English', 'Deutsch'], 3500, 'Москва и область', 5.0, 89),
('Анна', 25, 'https://images.pexels.com/photos/14683799/pexels-photo-14683799.jpeg?auto=compress&cs=tinysrgb&w=400', 'Люблю кино и театр. Отличная компания для культурного досуга. Работаю в сфере дизайна, могу помочь с подбором подарков.', ARRAY['Кино', 'Театр', 'Шопинг', 'Мероприятия'], ARRAY['Русский', 'English'], 2200, 'Санкт-Петербург', 4.7, 21),
('София', 27, 'https://images.pexels.com/photos/1388349/pexels-photo-1388349.jpeg?auto=compress&cs=tinysrgb&w=400', 'Путешественница с опытом. Отличный выбор для поездок за город и на природу. Фотографирую и создаю уютную атмосферу.', ARRAY['Поездки', 'Прогулки', 'Путешествия', 'Природа'], ARRAY['Русский', 'English', 'Italiano'], 4000, 'Москва', 4.9, 56),
('Дарья', 23, 'https://images.pexels.com/photos/1024310/pexels-photo-1024310.jpeg?auto=compress&cs=tinysrgb&w=400', 'Студентка, изучаю психологию. Хорошая собеседница для душевных разговоров. Люблю прогулки в парках и уютные кафе.', ARRAY['Прогулки', 'Кафе', 'Бассейн', 'Кино'], ARRAY['Русский', 'English'], 2000, 'Москва', 4.6, 15);
