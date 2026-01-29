# GameVault - Gaming E-Commerce Platform

## Overview

GameVault is a fully-featured gaming e-commerce frontend built with Next.js 15, React 19, and Tailwind CSS v4. The platform supports multiple languages (Georgian, English, Russian), uses Georgian Lari (GEL/₾) as the currency, and features a dark cyberpunk theme with neon accents.

**Tech Stack:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Client-side state management with React Context

---

## Project Structure

```
├── app/
│   ├── admin/                    # Admin Panel
│   │   ├── layout.tsx           # Admin layout with sidebar
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── games/page.tsx       # Games CRUD management
│   │   ├── gift-cards/page.tsx  # Gift cards management
│   │   ├── users/page.tsx       # Users management
│   │   └── orders/page.tsx      # Orders management
│   │
│   ├── dashboard/               # User Dashboard
│   │   ├── layout.tsx           # Dashboard layout with sidebar
│   │   ├── page.tsx             # User profile overview
│   │   ├── purchases/page.tsx   # Purchase history
│   │   ├── wishlist/page.tsx    # User wishlist
│   │   └── referral/page.tsx    # Referral program
│   │
│   ├── catalog/page.tsx         # Products catalog with filters
│   ├── cart/page.tsx            # Shopping cart
│   ├── wishlist/page.tsx        # Public wishlist page
│   ├── product/[id]/page.tsx    # Product detail page
│   ├── login/page.tsx           # Login page
│   ├── register/page.tsx        # Registration page
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout with providers
│   └── globals.css              # Global styles & theme
│
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── header.tsx               # Site header with nav
│   ├── footer.tsx               # Site footer
│   ├── hero-section.tsx         # Animated hero carousel
│   ├── trending-slider.tsx      # Horizontal trending games slider
│   ├── platform-tabs.tsx        # PS4/PS5/Xbox platform filter tabs
│   ├── gift-card-banner.tsx     # Digital gift cards promo banner
│   ├── product-card.tsx         # Game product card with wishlist/cart
│   ├── category-filter.tsx      # Category filter buttons
│   ├── language-switcher.tsx    # KA/EN/RU language switcher
│   ├── dashboard-sidebar.tsx    # User dashboard navigation
│   ├── admin-sidebar.tsx        # Admin panel navigation
│   ├── ai-assistant.tsx         # Floating AI chat widget
│   └── skeleton-loaders.tsx     # Loading skeleton components
│
├── contexts/
│   ├── language-context.tsx     # i18n state (ka, en, ru)
│   ├── auth-context.tsx         # Authentication state
│   ├── user-context.tsx         # User data, purchases, referrals
│   ├── wishlist-context.tsx     # Wishlist state (localStorage)
│   ├── cart-context.tsx         # Shopping cart state
│   ├── admin-context.tsx        # Admin panel state
│   └── toast-context.tsx        # Toast notifications
│
├── lib/
│   ├── translations.ts          # All UI translations (KA/EN/RU)
│   ├── mock-data.ts             # Mock products, categories, gift cards
│   └── utils.ts                 # Utility functions (cn, formatPrice)
│
└── public/
    └── games/                   # Generated game cover images
```

---

## Features Implemented

### 1. Core E-Commerce

- **Homepage**
  - Cinematic hero carousel with 3 rotating featured games
  - "Trending Now" horizontal slider with navigation arrows
  - Platform tabs (PS4, PS5, Xbox) for filtering
  - Digital Gift Cards promotional banner
  - Featured Games, New Releases, Discounted Games sections
  - Full catalog grid with "View All" links

- **Catalog Page** (`/catalog`)
  - Search functionality
  - Sidebar filters: Platform, Genre, Price Range
  - Sort options: Price Low/High, Name A-Z/Z-A, Newest
  - Grid/List view toggle
  - Active filters badges with remove option

- **Product Detail Page** (`/product/[id]`)
  - Image gallery with thumbnail navigation
  - "Instant Digital Delivery" badge
  - Platform badges display
  - Price with referral discount (if applicable)
  - Add to Cart / Buy Now buttons
  - Wishlist toggle
  - Related products section
  - Feature icons (instant delivery, secure payment, download)

- **Shopping Cart** (`/cart`)
  - Quantity controls
  - Remove items
  - Order summary with subtotal
  - Checkout button

- **Wishlist** (`/wishlist`)
  - Persisted to localStorage
  - Quick add to cart
  - Remove from wishlist

### 2. User Authentication & Dashboard

- **Login/Register Pages**
  - Form validation
  - Mock authentication (localStorage)
  - Error handling UI

- **User Dashboard** (`/dashboard`)
  - Profile overview with stats
  - Quick stats cards (purchases, spent, wishlist, referral)
  
- **Purchase History** (`/dashboard/purchases`)
  - List of purchased games
  - Download keys with copy functionality
  - Platform and price info
  - Total savings calculation

- **Wishlist Management** (`/dashboard/wishlist`)
  - View wishlist items
  - Shows referral-adjusted prices
  - Add to cart / Remove actions

- **Referral Program** (`/dashboard/referral`)
  - Unique referral code and link
  - Copy/Share buttons
  - Statistics (invited, successful referrals)
  - 10% discount for successful referrals
  - "How It Works" guide
  - Generate new code option

### 3. Admin Panel

- **Admin Dashboard** (`/admin`)
  - Revenue, Orders, Users, Products stats cards
  - Protected admin-only access

- **Games Management** (`/admin/games`)
  - Full CRUD operations
  - Multi-language support (title/description in KA/EN/RU)
  - Platform selection (PS4, PS5, Xbox)
  - Genre selection
  - Price and discount settings
  - Image URL management
  - Search and filter games

- **Gift Cards Management** (`/admin/gift-cards`)
  - Generate gift card codes
  - Set denominations (25, 50, 100, 200 GEL)
  - Track status (active, redeemed, expired)
  - Search and filter cards

- **Users Management** (`/admin/users`)
  - View all users
  - Change user status (active, suspended, banned)
  - View registration dates and purchase counts

- **Orders Management** (`/admin/orders`)
  - View all orders
  - Update order status (completed, pending, refunded, cancelled)
  - View order details

### 4. Internationalization (i18n)

- **3 Languages:** Georgian (default), English, Russian
- **Language Switcher:** In header, persisted to localStorage
- **Translations File:** `/lib/translations.ts`
  - Navigation labels
  - Form labels
  - Button texts
  - Error messages
  - Category names
  - Dashboard labels

### 5. AI Assistant Widget

- **Floating Button:** Bottom right corner with neon glow
- **Chat Interface:**
  - Expandable/minimizable panel
  - Glassmorphism styling
  - Message history
  - Typing indicator
  - Smooth animations
- **Mock Responses:** For common queries (games, orders, refunds, payments)
- **Ready for Integration:** Prepared for n8n webhook connection

### 6. UX Enhancements

- **Skeleton Loaders:**
  - ProductCardSkeleton
  - ProductGridSkeleton
  - TableSkeleton
  - HeroSkeleton
  - StatsSkeleton

- **Toast Notifications:**
  - Success, Error, Warning, Info variants
  - Auto-dismiss after 4 seconds
  - Stacked display (max 5)

- **Animations (CSS):**
  - fadeIn - Page transitions
  - slideInFromRight/Left - Modal animations
  - pulse-neon - Button glow effect
  - shimmer - Loading effect
  - bounce-subtle - Attention grabber
  - hover-lift - Card hover effect
  - text-glow-cyan/magenta - Neon text effects

- **Micro-interactions:**
  - Toast on wishlist add/remove
  - Toast on cart add
  - Active scale on button click

---

## State Management

### Context Providers (wrapped in layout.tsx)

```tsx
<LanguageProvider>
  <ToastProvider>
    <AuthProvider>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </AuthProvider>
  </ToastProvider>
</LanguageProvider>
```

### LocalStorage Keys

| Key | Description |
|-----|-------------|
| `gamevault_language` | Selected language (ka/en/ru) |
| `gamevault_auth` | Auth state {isAuthenticated, user} |
| `gamevault_wishlist` | Array of wishlist product IDs |
| `gamevault_user_data` | User profile, purchases, referral data |

---

## Design System

### Theme Colors (globals.css)

| Token | Usage |
|-------|-------|
| `--background` | Dark background (#0a0a0f) |
| `--foreground` | Light text |
| `--primary` | Cyan neon accent |
| `--accent` | Magenta neon accent |
| `--secondary` | Dark surface |
| `--muted` | Subtle backgrounds |
| `--destructive` | Error/delete actions |
| `--glass-*` | Glassmorphism effects |
| `--neon-*` | Neon glow effects |

### CSS Classes

| Class | Effect |
|-------|--------|
| `.glass-card` | Glassmorphism card style |
| `.neon-glow` | Cyan neon shadow |
| `.neon-glow-accent` | Magenta neon shadow |
| `.hover-lift` | Lift on hover |
| `.animate-shimmer` | Loading shimmer |
| `.text-glow-cyan` | Cyan text glow |
| `.scrollbar-hide` | Hide scrollbars |

---

## Mock Data Structure

### Product (Game)

```typescript
interface Product {
  id: string
  title: { ka: string; en: string; ru: string }
  description: { ka: string; en: string; ru: string }
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  platform: ('PS4' | 'PS5' | 'Xbox')[]
  rating: number
  releaseDate: string
  isFeatured?: boolean
  isNewRelease?: boolean
  isTrending?: boolean
}
```

### Gift Card

```typescript
interface GiftCard {
  id: string
  code: string
  amount: number
  status: 'active' | 'redeemed' | 'expired'
  createdAt: string
  redeemedAt?: string
}
```

---

## Routes Summary

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Homepage | No |
| `/catalog` | Product catalog | No |
| `/product/[id]` | Product details | No |
| `/cart` | Shopping cart | No |
| `/wishlist` | Wishlist page | No |
| `/login` | Login page | No |
| `/register` | Registration page | No |
| `/dashboard` | User profile | Yes |
| `/dashboard/purchases` | Purchase history | Yes |
| `/dashboard/wishlist` | User wishlist | Yes |
| `/dashboard/referral` | Referral program | Yes |
| `/admin` | Admin dashboard | Admin |
| `/admin/games` | Manage games | Admin |
| `/admin/gift-cards` | Manage gift cards | Admin |
| `/admin/users` | Manage users | Admin |
| `/admin/orders` | Manage orders | Admin |

---

## Future Integration Points

### Backend API

Replace mock data in these files:
- `/lib/mock-data.ts` - Connect to products/games API
- `/contexts/auth-context.tsx` - Connect to auth API
- `/contexts/user-context.tsx` - Connect to user API
- `/contexts/admin-context.tsx` - Connect to admin API

### AI Assistant (n8n)

In `/components/ai-assistant.tsx`, replace mock response with:

```typescript
const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userMessage })
})
const data = await response.json()
```

### Payment Integration

Add payment flow in:
- `/app/cart/page.tsx` - Checkout button
- Create `/app/checkout/page.tsx` - Payment form
- Integrate Stripe/PayPal/Local payment providers

### Database

Recommended: Supabase or Neon PostgreSQL
- Products table
- Users table
- Orders table
- Purchases table
- Gift cards table
- Referrals table

---

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

---

## Notes for AI Assistants

1. **Language files:** All UI text is in `/lib/translations.ts`. Add new keys to all 3 languages (ka, en, ru).

2. **Adding new pages:** Follow existing patterns - use contexts for state, wrap with appropriate providers.

3. **Styling:** Use Tailwind CSS v4 with design tokens defined in `globals.css`. Maintain dark theme aesthetic.

4. **Components:** Prefer shadcn/ui components from `/components/ui/`. Create custom components in `/components/`.

5. **Mock data:** Currently all data is mocked. Backend integration requires replacing localStorage operations with API calls.

6. **Currency:** Georgian Lari (GEL/₾). Format using `formatPrice()` from `/lib/utils.ts`.

7. **Platforms supported:** PS4, PS5, Xbox. Can be extended in mock-data.ts.

8. **Admin access:** Currently no auth check - add proper admin role verification when integrating backend.
