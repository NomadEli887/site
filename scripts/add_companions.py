#!/usr/bin/env python3
"""
Скрипт для добавления компаньонов в базу данных Supabase.

ВАЖНО: Для таблицы companions нужна политика INSERT или SERVICE_ROLE_KEY!
Сейчас RLS разрешает только SELECT. Обновите миграцию или используйте service role.

Установка зависимостей:
  pip install supabase

Вариант 1 — с SERVICE_ROLE_KEY (обходит RLS, только для админских скриптов):
  export SUPABASE_SERVICE_ROLE_KEY="eyJ..."  # из Supabase Dashboard > Settings > API
  python add_companions.py --service-role

Вариант 2 — с ANON_KEY (нужна политика INSERT):
  python add_companions.py --anon
"""

import os
import sys
from supabase import create_client, Client

# ===== НАСТРОЙКИ =====
SUPABASE_URL = "https://jpxdmxmysrfnzxhfdgls.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpweGRteG15c3Jmbnp4aGZkZ2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1ODE0OTEsImV4cCI6MjA5NzE1NzQ5MX0.CA5-Mz6k5n2G0TulQ3nvQs7qek08cxfxF-zk-HLqpIs"

# Определяем режим работы
use_service_role = "--service-role" in sys.argv

if use_service_role:
    SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not SUPABASE_KEY:
        print("ОШИБКА: Установите переменную SUPABASE_SERVICE_ROLE_KEY")
        print("Пример: export SUPABASE_SERVICE_ROLE_KEY='eyJ...'")
        print("Получить ключ: Supabase Dashboard > Settings > API > service_role")
        sys.exit(1)
else:
    SUPABASE_KEY = SUPABASE_ANON_KEY

# Создаём клиент
supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_KEY,
    options={"auto_refresh_token": False, "persist_session": False} if use_service_role else {}
)

print(f"Режим: {'SERVICE_ROLE (обходит RLS)' if use_service_role else 'ANON (нужна политика INSERT)'}")

# ===== ДАННЫЕ ДЛЯ ДОБАВЛЕНИЯ =====
companions_to_add = [
    {
        "name": "Анна",
        "age": 24,
        "bio": "Модель, люблю искусство и путешествия. Работала на выставках в Европе.",
        "photo_url": "https://images.pexels.com/photos/1339291/pexels-photo-1339291.jpeg?auto=compress&cs=tinysrgb&w=400",
        "location": "Москва",
        "rating": 4.9,
        "reviews_count": 128,
        "hourly_rate": 5000,
        "categories": ["Мероприятия", "Театр", "Рестораны"],
        "languages": ["Русский", "Английский"],
        "is_available": True
    },
    {
        "name": "Виктория",
        "age": 26,
        "bio": "Профессиональный гид, знаю 4 языка. Организую экскурсии и поездки.",
        "photo_url": "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
        "location": "Санкт-Петербург",
        "rating": 4.8,
        "reviews_count": 95,
        "hourly_rate": 4800,
        "categories": ["Прогулки", "Поездки", "Музеи"],
        "languages": ["Русский", "Английский", "Французский", "Итальянский"],
        "is_available": True
    },
    {
        "name": "София",
        "age": 23,
        "bio": "Актриса театра, обожаю кинематограф и светские вечера.",
        "photo_url": "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
        "location": "Москва",
        "rating": 4.7,
        "reviews_count": 82,
        "hourly_rate": 5200,
        "categories": ["Кино", "Театр", "Мероприятия"],
        "languages": ["Русский", "Английский"],
        "is_available": True
    },
    {
        "name": "Екатерина",
        "age": 27,
        "bio": "Спортсменка, мастер йоги. Люблю активный отдых и бассейн.",
        "photo_url": "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=400",
        "location": "Казань",
        "rating": 4.6,
        "reviews_count": 67,
        "hourly_rate": 4500,
        "categories": ["Спорт", "Бассейн", "Прогулки"],
        "languages": ["Русский", "Английский"],
        "is_available": True
    },
    {
        "name": "Алисия",
        "age": 25,
        "bio": "Дизайнер интерьеров, знаю все модные места. Проведу по лучшим ресторанам.",
        "photo_url": "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=400",
        "location": "Москва",
        "rating": 4.9,
        "reviews_count": 203,
        "hourly_rate": 5500,
        "categories": ["Рестораны", "Шопинг", "Мероприятия"],
        "languages": ["Русский", "Английский", "Испанский"],
        "is_available": True
    },
    {
        "name": "Милана",
        "age": 22,
        "bio": "Студентка искусствоведения. Расскажу о каждом экспонате в музее.",
        "photo_url": "https://images.pexels.com/photos/1499328/pexels-photo-1499328.jpeg?auto=compress&cs=tinysrgb&w=400",
        "location": "Санкт-Петербург",
        "rating": 4.5,
        "reviews_count": 54,
        "hourly_rate": 4000,
        "categories": ["Музеи", "Прогулки", "Кино"],
        "languages": ["Русский", "Английский"],
        "is_available": True
    }
]

# ===== ВЫПОЛНЯЕМ ДОБАВЛЕНИЕ =====
print("Начинаем добавление компаньонов...")
print("=" * 50)

success_count = 0
error_count = 0

for companion in companions_to_add:
    try:
        # Проверяем, не существует ли уже компаньон с таким именем
        existing = supabase.table('companions').select('id').eq('name', companion['name']).execute()

        if existing.data and len(existing.data) > 0:
            print(f"ПРОПУСК: {companion['name']} уже существует")
            continue

        response = supabase.table('companions').insert(companion).execute()

        if response.data:
            success_count += 1
            print(f"OK: {companion['name']} (ID: {response.data[0]['id']})")
        else:
            error_count += 1
            print(f"ОШИБКА: {companion['name']}")
            if hasattr(response, 'error') and response.error:
                print(f"   Детали: {response.error}")
    except Exception as e:
        error_count += 1
        print(f"ОШИБКА: {companion['name']} - {e}")

print("=" * 50)
print(f"Итог: добавлено {success_count}, ошибок {error_count}")
