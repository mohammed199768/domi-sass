# domi SaaS Landing Page

A fully responsive, bilingual (English/Arabic) landing page for **domi** - Digital Optimization and Management Intelligence SaaS platform.

## 🚀 Features

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS 4** for styling with custom theme
- **Framer Motion** for smooth animations
- **Bilingual Support** - English and Arabic with RTL support
- **Fully Responsive** - Mobile-first design
- **Optimized Images** with Next.js Image component
- **Modern UI/UX** with premium aesthetics

## 🎨 Design System

### Brand Colors
- **Primary** (#0D3B66) - Dark Blue for trust and stability
- **Secondary** (#F4D35E) - Soft Yellow for highlights
- **Accent** (#EE964B) - Bright Orange for CTAs
- **Background** (#F7F9FC) - Light Gray for sections

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)

## 📂 Project Structure

```
domi-saas/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Tailwind config & global styles
├── components/
│   ├── Hero.tsx            # Hero section
│   ├── ProblemSection.tsx  # Problem/pain point section
│   ├── SolutionSection.tsx # Solution with benefits
│   ├── FeaturesSection.tsx # Feature cards
│   ├── SocialProof.tsx     # Testimonials & logos
│   ├── FinalCTA.tsx        # Final call-to-action
│   ├── Footer.tsx          # Footer with links
│   ├── LanguageToggle.tsx  # Language switch button
│   └── LanguageContext.tsx # Language state management
├── lib/
│   └── content.ts          # Bilingual content strings
├── public/
│   └── images/
│       ├── hero.jpg        # Hero image
│       ├── problem.jpg     # Problem image
│       └── solution.jpg    # Solution image
└── package.json
```

## 🛠 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd domi-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🌍 Bilingual Support

The landing page supports both English and Arabic:

- Click the language toggle button (top-right corner) to switch languages
- Arabic text automatically displays with RTL (right-to-left) layout
- All content is stored in `lib/content.ts` for easy management

## 📱 Responsive Design

The page is fully responsive with breakpoints:
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (2 column layout)
- **Desktop**: > 1024px (full multi-column layout)

## 🎯 Page Sections

1. **Hero Section** - Headline, value proposition, and primary CTAs
2. **Problem Section** - Pain points and current challenges
3. **Solution Section** - How domi solves the problems with key benefits
4. **Features Section** - Detailed feature cards
5. **Social Proof** - Company logos and testimonials
6. **Final CTA** - Last conversion opportunity
7. **Footer** - Links and copyright

## 🎭 Animations

Subtle animations powered by Framer Motion:
- Fade-in and slide-up effects on scroll
- Hover effects on buttons and cards
- Smooth transitions between states

## 📝 Content Management

All text content is centralized in `lib/content.ts`:
- Easy to update copy
- Supports multiple languages
- Type-safe with TypeScript

## 🔧 Customization

### Update Colors
Edit `app/globals.css`:
```css
@theme {
  --color-primary: #0D3B66;
  --color-secondary: #F4D35E;
  --color-accent: #EE964B;
  --color-background-light: #F7F9FC;
}
```

### Update Content
Edit `lib/content.ts` to change any text on the page

### Add New Languages
1. Add new language object to `lib/content.ts`
2. Update `LanguageContext.tsx` to support new language
3. Add font support if needed

## 📦 Dependencies

- **next**: 16.0.10
- **react**: 19.2.1
- **framer-motion**: ^12.23.26
- **lucide-react**: ^0.561.0 (icons)
- **clsx**: ^2.1.1
- **tailwind-merge**: ^3.4.0
- **tailwindcss**: ^4

## 🚢 Deployment

This Next.js app can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **Cloudflare Pages**
- Any Node.js hosting platform

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## 📄 License

© 2025 Domi, Inc.

## 🤝 Support

For questions or issues, please contact the development team.

---

Built with ❤️ using Next.js, React, and Tailwind CSS
