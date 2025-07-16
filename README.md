
# 📊 Estimation Center

Estimation Center to aplikacja webowa typu fullstack do zarządzania i analizy projektów inwestycyjnych w budownictwie. Automatyzuje proces szacowania kosztów, umożliwia ocenę ryzyka finansowego i wizualizuje dane inwestycyjne w formie interaktywnych wykresów i dashboardów.

Zbudowana z użyciem **Next.js 15, TypeScript, TailwindCSS, NextAuth, Prisma, PostgreSQL i Cloudinary**.

---

## 🚀 Funkcjonalności

✅ Rejestracja i logowanie użytkowników (NextAuth v5 – Credentials & OAuth)  
✅ Operacje CRUD dla projektów, inwestycji i pozycji kosztowych  
✅ Wizualizacja danych przy użyciu **Recharts** i **Chart.js**  
✅ Bezpieczne haszowanie haseł z **bcryptjs**  
✅ Upload plików i hosting obrazów w **Cloudinary**  
✅ Import/eksport danych do Excela (**xlsx**)  
✅ Responsywny interfejs użytkownika zbudowany w **TailwindCSS**  
✅ Integracja z bazą danych PostgreSQL przez **Prisma ORM**  
✅ Seedowanie bazy danych przy pomocy `prisma/seed.ts`  

---

## 🛠 Tech Stack

| Warstwa        | Technologia                         |
|----------------|--------------------------------------|
| Frontend       | Next.js 15, React 19, TypeScript     |
| Stylowanie     | TailwindCSS, lucide-react            |
| Backend        | API Routes (Next.js), NextAuth v5    |
| Baza danych    | PostgreSQL, Prisma ORM               |
| Pliki          | Cloudinary, next-cloudinary          |
| Wykresy        | Recharts, Chart.js                   |
| Utils          | Zod (walidacja), bcryptjs (bezpieczeństwo)|
| Deployment     | Vercel                               |

---

## 🚀 Rozpoczęcie pracy

### Wymagania wstępne

- Node.js >= 18
- Baza danych PostgreSQL
- Konto Cloudinary (dla hostingu plików)
- Git

### Instalacja

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/Rakenek/estimation_center.git
   cd estimation_center
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   ```

3. Utwórz plik `.env` w katalogu głównym i skonfiguruj zmienne środowiskowe:
   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   NEXTAUTH_SECRET=your_secret
   NEXTAUTH_URL=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Wygeneruj klienta Prisma:
   ```bash
   npx prisma generate
   ```

5. Zastosuj migracje bazy danych:
   ```bash
   npx prisma migrate dev
   ```

6. (Opcjonalnie) Zasiej dane startowe:
   ```bash
   npm run seed
   ```

7. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```

8. Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce 🚀

---

## 🗄️ Schemat bazy danych

Fragment przykładowego modelu Prisma:

```prisma
model User {
  id       String    @id @default(uuid())
  username String    @unique
  email    String    @unique
  password String
  role     Role
  image    String?
  projects Project[]
}

model Project {
  id         String      @id @default(uuid())
  name       String      @unique
  city       String
  image_url  String
  status     String
  n03_do_PUM Float
  user_id    String
  user       User        @relation(fields: [user_id], references: [id])
  parameter  Parameters? @relation
  cost       Cost?       @relation
}
```


## 🙌 Autor

👤 Kamil Otawski  

---

## 📄 Licencja

Ten projekt jest objęty licencją MIT.
