# Design Document: Portfolio Modernization

## Overview

The portfolio modernization transforms a basic React + Vite portfolio into a production-ready showcase featuring modern UI patterns, comprehensive accessibility, and performance optimizations. This design focuses on frontend-only implementation using mock data, eliminating backend dependencies while demonstrating full-stack architectural thinking through well-structured data layers and API-ready patterns.

### Core Design Principles

1. **Frontend-First Architecture**: All data sourced from mock modules with API-ready structure
2. **Progressive Enhancement**: Core content accessible without JavaScript, enhanced with animations
3. **Performance by Default**: Lazy loading, code splitting, and optimized rendering paths
4. **Accessibility First**: WCAG AA compliance built into every component
5. **Theme Flexibility**: Dark/light mode support with system preference detection

### Technology Stack

- **Framework**: React 19.2 with React Router 7.11
- **Styling**: Tailwind CSS 4.1 with CSS custom properties for theming
- **Animation**: GSAP 3.14 with @gsap/react for declarative animations
- **3D Graphics**: Three.js for hero section interactive elements
- **State Management**: React Query 5.90 for data fetching patterns (mock data)
- **Build Tool**: Vite 7.2 with code splitting and optimization
- **Icons**: Lucide React for consistent iconography

## Architecture

### Component Hierarchy

```
App (Theme Provider + Router)
├── Layout
│   ├── Header (Sticky, Theme Toggle, Navigation)
│   ├── ScrollProgress
│   └── ScrollToTop
├── Pages
│   ├── Home
│   │   ├── HeroSection (3D Three.js)
│   │   ├── ProjectsSection (Bento Grid)
│   │   ├── TestimonialsSection
│   │   └── ContactSection
│   ├── About
│   ├── Skills
│   └── Contact (Standalone Form)
└── Shared Components
    ├── BentoGrid
    ├── ProjectCard
    ├── TestimonialCard
    ├── ContactForm
    ├── ThemeToggle
    ├── CustomCursor
    ├── MagneticButton
    └── Toast
```

### Data Layer Architecture


Mock data modules simulate backend API structure for easy migration:

```
src/data/
├── projects.js          // Mock project data with full schema
├── testimonials.js      // Mock testimonial data
├── skills.js           // Skills and tech stack data
└── github.js           // Mock GitHub data (repositories, contributions)
```

Each mock module exports data matching the expected API response shape, making future backend integration a simple swap of import statements.

### State Management Strategy

**React Query for Data Fetching Patterns**:
- Mock data wrapped in React Query hooks for consistent loading/error states
- Simulates API behavior with artificial delays for realistic UX
- Provides caching, refetching, and stale-while-revalidate patterns
- Easy migration path: replace mock functions with actual API calls

**Local State with React Hooks**:
- Theme preference (localStorage + context)
- Form state (controlled components)
- Animation states (GSAP refs and timelines)
- UI state (modals, toasts, menu open/closed)

### Routing Strategy

React Router 7.11 with lazy-loaded route components:

```javascript
const routes = [
  { path: '/', element: lazy(() => import('./pages/Home')) },
  { path: '/about', element: lazy(() => import('./pages/About')) },
  { path: '/skills', element: lazy(() => import('./pages/Skills')) },
  { path: '/contact', element: lazy(() => import('./pages/Contact')) }
]
```

Page transitions handled by GSAP with fade + slide effects.

## Components and Interfaces

### 1. Theme System

**ThemeProvider Component**:
```typescript
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  systemTheme: 'light' | 'dark';
}
```

**Implementation Details**:
- Detects system preference via `matchMedia('(prefers-color-scheme: dark)')`
- Persists user choice in `localStorage` under key `portfolio-theme`
- Applies theme via `class="dark"` on `<html>` element for Tailwind dark mode
- Smooth transitions using CSS custom properties with 300ms duration
- Listens for system theme changes and updates if no manual override

**Theme Toggle Component**:
- Animated sun/moon icon transition using GSAP
- Accessible button with ARIA label "Toggle theme"
- Keyboard accessible (Enter/Space)
- Visual focus indicator

### 2. Bento Grid System

**BentoGrid Component**:
```typescript
interface BentoGridProps {
  items: BentoItem[];
  columns?: { mobile: number; tablet: number; desktop: number };
  gap?: number;
}

interface BentoItem {
  id: string;
  span: { mobile: [number, number]; tablet: [number, number]; desktop: [number, number] };
  content: ReactNode;
  priority?: 'high' | 'normal' | 'low';
}
```

**Layout Algorithm**:
- CSS Grid with `grid-template-columns: repeat(12, 1fr)` on desktop
- Items use `grid-column: span X` and `grid-row: span Y` for sizing
- Responsive breakpoints adjust column count: 4 (mobile), 6 (tablet), 12 (desktop)
- Auto-placement with `grid-auto-flow: dense` for optimal space usage
- Gap spacing: 16px (1rem) consistent across breakpoints

**Card Sizing Strategy**:
- Featured projects: 2x2 span (desktop), 2x1 (tablet), 1x1 (mobile)
- Standard projects: 1x1 span across all breakpoints
- Testimonials: 1x1 span, grouped in dedicated grid section
- Priority prop influences visual hierarchy (larger cards, prominent placement)

### 3. 3D Hero Section

**HeroThreeJS Component**:
```typescript
interface HeroThreeJSProps {
  objectCount?: number;
  parallaxIntensity?: number;
  animationSpeed?: number;
  reducedMotion?: boolean;
}
```

**Three.js Architecture**:
- Scene setup: PerspectiveCamera, WebGLRenderer with alpha transparency
- Lighting: AmbientLight + 2 PointLights for depth
- Geometry: 3 floating objects (Torus, Icosahedron, Octahedron)
- Materials: MeshStandardMaterial with metalness and roughness
- Animation loop: requestAnimationFrame with rotation and floating motion

**Parallax Implementation**:
- Mouse move listener tracks cursor position (normalized -1 to 1)
- Camera position updates based on cursor: `camera.position.x = mouseX * parallaxIntensity`
- Smooth interpolation using lerp: `current + (target - current) * 0.05`
- Objects rotate at different speeds for depth perception

**Performance Optimizations**:
- Renderer pixel ratio capped at 2 for high-DPI displays
- Dispose geometry and materials on unmount to prevent memory leaks
- Reduced complexity on mobile: fewer objects, simpler geometry
- Fallback to 2D gradient background if WebGL not supported
- Pause animation when tab not visible using Page Visibility API

### 4. Project Card Component

**ProjectCard Interface**:
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  techStack: string[];
  integrations?: ('Stripe' | 'AWS' | 'Twilio' | 'Webinar')[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  completedDate: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';
  lazyLoad?: boolean;
}
```

**Visual Design**:
- Glassmorphism card: `backdrop-blur-md`, `bg-white/70` (light), `bg-gray-900/70` (dark)
- Border gradient: `border-image` with theme-aware colors
- Hover effect: `translateY(-8px)` + shadow elevation increase
- Image aspect ratio: 16:9 with object-fit cover
- Tech stack tags: Pill-shaped badges with icon + label

**Interaction States**:
- Hover: Card lifts, shadow deepens, image scales 1.05
- Focus: 2px outline with theme accent color
- Active: Slight scale down (0.98) for tactile feedback

### 5. Contact Form Component

**ContactForm Interface**:
```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}
```

**Validation Rules**:
- Name: Required, min 2 characters, max 100 characters
- Email: Required, valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Subject: Required, min 5 characters, max 200 characters
- Message: Required, min 10 characters, max 2000 characters

**Form States**:
- Idle: Default state, all fields enabled
- Validating: Client-side validation on blur
- Submitting: Loading spinner, fields disabled, submit button shows "Sending..."
- Success: Green toast notification, form resets after 2 seconds
- Error: Red toast notification with error message, retry enabled

**Accessibility Features**:
- Labels associated with inputs via `htmlFor` and `id`
- Error messages announced via ARIA live region
- Required fields marked with asterisk and `aria-required="true"`
- Submit button disabled during submission with `aria-busy="true"`

### 6. Animation System

**GSAP Animation Hooks**:
```typescript
// Scroll-triggered animations
useScrollReveal(selector: string, options?: {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
  markers?: boolean;
})

// Magnetic button effect
useMagneticHover(ref: RefObject<HTMLElement>, options?: {
  strength?: number;
  speed?: number;
})

// Custom cursor
useCustomCursor(options?: {
  enabled?: boolean;
  hoverScale?: number;
  clickScale?: number;
})
```

**Animation Patterns**:

1. **Page Load Sequence**:
   - Hero content: Fade in + slide up, stagger 0.1s
   - 3D objects: Scale from 0 to 1, rotate in
   - Navigation: Slide down from top
   - Total duration: 1.2s with ease-out

2. **Scroll Reveal**:
   - Trigger: Element enters viewport (start: "top 80%")
   - Effect: Fade in (opacity 0 to 1) + slide up (y: 50 to 0)
   - Duration: 0.8s with ease-out
   - Stagger: 0.12s for grouped elements

3. **Magnetic Buttons**:
   - Mouse proximity detection (within 100px radius)
   - Button translates toward cursor: `x: (mouseX - buttonX) * 0.3`
   - Smooth return animation when mouse leaves
   - Duration: 0.3s with elastic ease

4. **Custom Cursor**:
   - Desktop only (hidden on touch devices)
   - Follows mouse with slight delay (lerp 0.15)
   - Scales up on hover over interactive elements
   - Shrinks on click for tactile feedback

5. **Page Transitions**:
   - Exit: Fade out + slide left (200ms)
   - Enter: Fade in + slide right (400ms)
   - Overlap: 100ms for smooth handoff

**Reduced Motion Support**:
- Detects `prefers-reduced-motion: reduce` media query
- Disables parallax, magnetic effects, and custom cursor
- Reduces animation duration to 0.01s (instant but maintains timing)
- Maintains layout shifts for accessibility

### 7. Testimonial Component

**TestimonialCard Interface**:
```typescript
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  avatar?: string;
  text: string;
  rating?: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'card' | 'quote';
}
```

**Layout Variants**:
- **Card variant**: Avatar top, text center, company logo bottom
- **Quote variant**: Large quote marks, text left-aligned, attribution right

**Visual Design**:
- Glassmorphism background matching project cards
- Avatar: 64px circle with border
- Company logo: 120px width, grayscale filter, color on hover
- Quote text: Italic, larger font size (18px)
- Rating: Star icons (filled/outlined) if provided

### 8. GitHub Integration Component

**GitHubSection Interface**:
```typescript
interface GitHubRepository {
  id: string;
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
}

interface GitHubSectionProps {
  repositories: GitHubRepository[];
  contributionData?: ContributionData;
  maxRepos?: number;
}
```

**Mock Data Strategy**:
- Static repository data in `src/data/github.js`
- Contribution graph: SVG heatmap with mock activity data
- Simulates GitHub API response structure for easy migration
- Includes loading skeleton for realistic UX

**Contribution Graph**:
- 52 weeks × 7 days grid (364 cells)
- Color intensity based on contribution count (5 levels)
- Tooltip on hover showing date and count
- Responsive: Scales down on mobile, maintains readability

### 9. Toast Notification System

**Toast Interface**:
```typescript
interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
  dismissible?: boolean;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}
```

**Toast Behavior**:
- Appears top-right corner (desktop) or top-center (mobile)
- Auto-dismiss after duration (default 5000ms)
- Slide in from right with fade
- Stack multiple toasts with 8px gap
- Swipe to dismiss on touch devices
- ARIA live region for screen reader announcements

### 10. Scroll Progress Indicator

**ScrollProgress Component**:
```typescript
interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}
```

**Implementation**:
- Fixed position bar at top of viewport
- Width: `(scrollY / (documentHeight - windowHeight)) * 100%`
- Smooth transition using CSS transform (translateX)
- Updates on scroll with throttled event listener (16ms)
- Gradient color matching theme accent

## Data Models

### Project Data Model

```typescript
interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: 'web-app' | 'landing-page' | 'dashboard' | 'e-commerce' | 'other';
  techStack: TechStackItem[];
  integrations: Integration[];
  image: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  completedDate: string;
  featured: boolean;
  company: '97 Solutions' | 'Zaap' | 'Personal';
  metrics?: ProjectMetrics;
}

interface TechStackItem {
  name: string;
  icon?: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
}

interface Integration {
  name: 'Stripe' | 'AWS' | 'Twilio' | 'Webinar' | string;
  icon?: string;
  description?: string;
}

interface ProjectMetrics {
  users?: number;
  performance?: number;
  uptime?: number;
}
```

### Testimonial Data Model

```typescript
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  avatar?: string;
  text: string;
  rating?: number;
  date?: string;
  projectRelated?: string;
}
```

### GitHub Data Model

```typescript
interface GitHubRepository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor?: string;
  url: string;
  topics?: string[];
  lastUpdated: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionData {
  totalContributions: number;
  weeks: ContributionDay[][];
}
```

### Theme Data Model

```typescript
interface ThemeConfig {
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    border: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Before defining properties, I need to analyze which requirements are suitable for property-based testing:


### Property Reflection

After analyzing the acceptance criteria, I've identified the following properties suitable for property-based testing. Let me review for redundancy:

**Identified Properties**:
1. Project card rendering completeness (1.2)
2. Integration badge rendering (1.3)
3. Conditional link rendering for live URL (1.4)
4. Conditional link rendering for GitHub URL (1.5)
5. Form validation for required fields (3.2)
6. Email format validation (3.3)
7. Theme persistence in localStorage (7.4)
8. Color contrast ratios (8.6)
9. ARIA labels for interactive elements (13.1)
10. Keyboard navigation support (13.2)
11. Image alt text presence (13.5)
12. Heading hierarchy validation (13.6)
13. Form label association (13.7)
14. Touch target sizing (15.3)

**Redundancy Analysis**:
- Properties 4 and 5 (live URL and GitHub URL) are similar conditional rendering patterns - can be combined into one property about conditional link rendering
- Properties 9 and 10 (ARIA labels and keyboard navigation) are both accessibility properties but test different aspects - keep separate
- Properties 11, 12, and 13 are all accessibility properties but test different aspects - keep separate

**Final Property Set** (after consolidation):
1. Project card rendering completeness
2. Integration badge rendering
3. Conditional link rendering (combines live URL and GitHub URL)
4. Form validation for required fields
5. Email format validation
6. Theme persistence in localStorage
7. Color contrast ratios
8. ARIA labels for interactive elements
9. Keyboard navigation support
10. Image alt text presence
11. Heading hierarchy validation
12. Form label association
13. Touch target sizing

### Property 1: Project Card Rendering Completeness

*For any* valid project object with required fields (name, description, techStack, category, completedDate), rendering the ProjectCard component SHALL include all these fields in the DOM output.

**Validates: Requirements 1.2**

### Property 2: Integration Badge Rendering

*For any* project object with an integrations array, rendering the ProjectCard component SHALL display a badge element for each integration in the array.

**Validates: Requirements 1.3**

### Property 3: Conditional Link Rendering

*For any* project object, if it contains a liveUrl or githubUrl field, the rendered ProjectCard SHALL include a corresponding clickable link element; if the field is absent or null, no link element for that type SHALL be rendered.

**Validates: Requirements 1.4, 1.5**

### Property 4: Form Validation for Required Fields

*For any* contact form data object, if any required field (name, email, subject, message) is missing or empty, form validation SHALL fail and return an error; if all required fields are present and non-empty, validation SHALL pass.

**Validates: Requirements 3.2**

### Property 5: Email Format Validation

*For any* string value in the email field, if it does not match valid email format (contains @ symbol, domain, and TLD), validation SHALL return an error; if it matches valid email format, validation SHALL pass.

**Validates: Requirements 3.3**

### Property 6: Theme Persistence

*For any* theme change (light to dark or dark to light), the Theme_Manager SHALL update localStorage with the new theme value, and on subsequent page loads, the theme SHALL match the localStorage value.

**Validates: Requirements 7.4**

### Property 7: Color Contrast Ratios

*For any* text element in the design system, the contrast ratio between text color and background color SHALL meet or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text ≥18pt or bold ≥14pt).

**Validates: Requirements 8.6**

### Property 8: ARIA Labels for Interactive Elements

*For any* interactive element (button, link, input) without visible text content, the element SHALL have an aria-label or aria-labelledby attribute providing a descriptive label.

**Validates: Requirements 13.1**

### Property 9: Keyboard Navigation Support

*For any* interactive element in the portfolio, the element SHALL be focusable via keyboard (Tab key) and SHALL respond to keyboard activation (Enter or Space key) to trigger its primary action.

**Validates: Requirements 13.2**

### Property 10: Image Alt Text Presence

*For any* img element rendered in the portfolio, the element SHALL have an alt attribute with a non-empty descriptive value.

**Validates: Requirements 13.5**

### Property 11: Heading Hierarchy Validation

*For any* page in the portfolio, heading elements SHALL follow proper hierarchical order (h1, then h2, then h3, etc.) without skipping levels, ensuring logical document structure.

**Validates: Requirements 13.6**

### Property 12: Form Label Association

*For any* form input element, there SHALL exist a corresponding label element with an htmlFor attribute matching the input's id attribute, ensuring proper form accessibility.

**Validates: Requirements 13.7**

### Property 13: Touch Target Sizing

*For any* interactive element (button, link, touch target), the computed width and height SHALL each be at least 44 pixels to ensure touch-friendly interaction on mobile devices.

**Validates: Requirements 15.3**

## Error Handling

### Form Validation Errors

**Client-Side Validation**:
- Display inline error messages below each invalid field
- Error message format: "{Field name} {error description}" (e.g., "Email must be a valid email address")
- Prevent form submission until all validation errors are resolved
- Clear error messages when user corrects the field

**Submission Errors**:
- Network errors: "Unable to send message. Please check your connection and try again."
- Rate limit errors: "Too many requests. Please wait {X} seconds before trying again."
- Generic errors: "Something went wrong. Please try again later."
- Display errors in toast notification with error icon and red color scheme

### Theme Loading Errors

**localStorage Access Errors**:
- If localStorage is unavailable (private browsing), fall back to system preference
- If localStorage contains invalid theme value, reset to system preference
- Log errors to console for debugging but don't show user-facing errors

### 3D Rendering Errors

**WebGL Not Supported**:
- Detect WebGL support on component mount
- If not supported, render 2D gradient background fallback
- No error message shown to user (graceful degradation)

**Three.js Initialization Errors**:
- Catch errors during scene setup
- Fall back to 2D background
- Log error to console for debugging

### Data Loading Errors

**Mock Data Loading**:
- If mock data module fails to import, display empty state with message
- Empty state message: "No {content type} available at this time"
- Provide retry button that re-attempts data fetch

**Image Loading Errors**:
- Use onError handler to replace failed images with placeholder
- Placeholder: Gradient background with icon indicating missing image
- Alt text still displayed for accessibility

### Animation Errors

**GSAP Initialization Errors**:
- Wrap GSAP calls in try-catch blocks
- If animation fails, element still renders in final state
- Log error to console but don't disrupt user experience

**Reduced Motion Preference**:
- Not an error, but handle as special case
- Detect prefers-reduced-motion media query
- Disable or significantly reduce all animations
- Maintain layout and functionality without motion

## Testing Strategy

### Unit Testing Approach

**Component Testing with React Testing Library**:
- Test component rendering with various prop combinations
- Test user interactions (clicks, form submissions, keyboard navigation)
- Test accessibility features (ARIA labels, focus management)
- Mock external dependencies (Three.js, GSAP, localStorage)

**Example Unit Tests**:
- ProjectCard renders all required fields
- ContactForm validates email format correctly
- ThemeToggle updates theme state on click
- BentoGrid applies correct CSS classes for different breakpoints

### Property-Based Testing with fast-check

**Property Test Configuration**:
- Minimum 100 iterations per property test
- Use fast-check library for JavaScript/TypeScript
- Generate random test data matching component prop types
- Tag each test with feature name and property number

**Property Test Examples**:

```javascript
// Property 1: Project Card Rendering Completeness
test('Feature: portfolio-modernization, Property 1: For any valid project, all required fields appear in rendered output', () => {
  fc.assert(
    fc.property(
      fc.record({
        id: fc.string(),
        name: fc.string({ minLength: 1 }),
        description: fc.string({ minLength: 1 }),
        techStack: fc.array(fc.string(), { minLength: 1 }),
        category: fc.constantFrom('web-app', 'landing-page', 'dashboard'),
        completedDate: fc.date().map(d => d.toISOString())
      }),
      (project) => {
        const { container } = render(<ProjectCard project={project} />);
        expect(container).toHaveTextContent(project.name);
        expect(container).toHaveTextContent(project.description);
        expect(container).toHaveTextContent(project.category);
        project.techStack.forEach(tech => {
          expect(container).toHaveTextContent(tech);
        });
      }
    ),
    { numRuns: 100 }
  );
});

// Property 5: Email Format Validation
test('Feature: portfolio-modernization, Property 5: Invalid emails fail validation, valid emails pass', () => {
  fc.assert(
    fc.property(
      fc.emailAddress(),
      (validEmail) => {
        const result = validateEmail(validEmail);
        expect(result.isValid).toBe(true);
      }
    ),
    { numRuns: 100 }
  );

  fc.assert(
    fc.property(
      fc.string().filter(s => !s.includes('@')),
      (invalidEmail) => {
        const result = validateEmail(invalidEmail);
        expect(result.isValid).toBe(false);
      }
    ),
    { numRuns: 100 }
  );
});

// Property 10: Image Alt Text Presence
test('Feature: portfolio-modernization, Property 10: All images have non-empty alt text', () => {
  fc.assert(
    fc.property(
      fc.array(fc.record({
        src: fc.webUrl(),
        alt: fc.string({ minLength: 1 })
      }), { minLength: 1 }),
      (images) => {
        const { container } = render(<ImageGallery images={images} />);
        const imgElements = container.querySelectorAll('img');
        imgElements.forEach(img => {
          expect(img).toHaveAttribute('alt');
          expect(img.getAttribute('alt')).not.toBe('');
        });
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

**End-to-End Tests with Playwright**:
- Test complete user flows (navigation, form submission, theme switching)
- Test responsive behavior at different viewport sizes
- Test animations and interactions
- Test accessibility with axe-core

**Integration Test Scenarios**:
- User navigates through all pages successfully
- User submits contact form and sees success message
- User toggles theme and preference persists on reload
- User scrolls page and sees scroll progress indicator update
- User hovers over project card and sees animation
- User on mobile can tap all interactive elements

### Visual Regression Testing

**Snapshot Testing**:
- Capture screenshots of key pages in light and dark themes
- Compare screenshots across code changes to detect visual regressions
- Test at mobile, tablet, and desktop breakpoints
- Use Percy or Chromatic for visual diff tracking

### Accessibility Testing

**Automated Accessibility Audits**:
- Run axe-core in integration tests
- Run Lighthouse accessibility audit in CI/CD
- Target WCAG AA compliance (score ≥ 90)

**Manual Accessibility Testing**:
- Keyboard navigation testing (Tab, Enter, Space, Arrow keys)
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Color contrast verification with tools
- Focus indicator visibility testing

### Performance Testing

**Lighthouse Performance Audits**:
- Target performance score ≥ 90
- Monitor First Contentful Paint (FCP) < 1.5s
- Monitor Largest Contentful Paint (LCP) < 2.5s
- Monitor Total Blocking Time (TBT) < 300ms
- Monitor Cumulative Layout Shift (CLS) < 0.1

**Animation Performance**:
- Use Chrome DevTools Performance panel
- Verify animations maintain 60fps
- Check for layout thrashing
- Monitor memory usage during 3D rendering

### Test Coverage Goals

- Unit test coverage: ≥ 80% for components and utilities
- Property test coverage: All 13 defined properties
- Integration test coverage: All critical user flows
- Accessibility test coverage: All interactive components
- Visual regression coverage: All pages in both themes

## Implementation Phases

### Phase 1: Foundation (Week 1)

**Design System Setup**:
- Configure Tailwind with custom theme tokens
- Implement CSS custom properties for theming
- Set up Inter Variable font
- Create color palette for light and dark modes
- Define spacing, typography, and shadow scales

**Theme System**:
- Implement ThemeProvider context
- Create ThemeToggle component
- Add system preference detection
- Implement localStorage persistence
- Add smooth theme transitions

**Layout Components**:
- Create responsive Header with sticky behavior
- Implement ScrollProgress component
- Create ScrollToTop button
- Set up page layout structure

### Phase 2: Core Components (Week 2)

**Bento Grid System**:
- Implement BentoGrid component with responsive columns
- Create grid item sizing logic
- Add gap spacing and responsive behavior
- Test layout at all breakpoints

**Project Components**:
- Create ProjectCard component with glassmorphism
- Implement tech stack badge rendering
- Add integration badge display
- Implement hover animations
- Add lazy loading for images

**Mock Data Layer**:
- Create projects.js mock data (6+ projects)
- Create testimonials.js mock data (4+ testimonials)
- Create github.js mock data
- Structure data to match API response format

### Phase 3: Interactive Features (Week 3)

**3D Hero Section**:
- Set up Three.js scene with camera and renderer
- Create 3D floating objects (Torus, Icosahedron, Octahedron)
- Implement parallax mouse tracking
- Add animation loop with rotation and floating
- Optimize for performance (60fps target)
- Add WebGL fallback for unsupported browsers

**Contact Form**:
- Create ContactForm component with all fields
- Implement client-side validation
- Add email format validation
- Create success/error toast notifications
- Implement form reset after submission
- Add loading states

### Phase 4: Animations (Week 4)

**GSAP Animation System**:
- Create useScrollReveal hook for scroll animations
- Implement useMagneticHover hook for button effects
- Create useCustomCursor hook (desktop only)
- Add page transition animations
- Implement text reveal animations
- Add counter animations for statistics
- Ensure reduced motion support

**Micro-interactions**:
- Add hover effects to all interactive elements
- Implement button active states
- Add form input focus animations
- Create loading skeleton animations

### Phase 5: Additional Sections (Week 5)

**Testimonials Section**:
- Create TestimonialCard component
- Implement carousel or grid layout
- Add company logos
- Integrate with mock data

**GitHub Integration**:
- Create GitHubSection component
- Display repository cards with stats
- Implement contribution graph (SVG heatmap)
- Add loading states

**About and Skills Pages**:
- Create About page layout
- Implement Skills page with tech stack display
- Add animations and transitions

### Phase 6: Accessibility & Performance (Week 6)

**Accessibility Implementation**:
- Add ARIA labels to all interactive elements
- Implement keyboard navigation
- Add visible focus indicators
- Create "Skip to content" link
- Ensure proper heading hierarchy
- Add alt text to all images
- Associate labels with form inputs
- Implement ARIA live regions for dynamic content

**Performance Optimization**:
- Implement lazy loading for images
- Convert images to WebP with JPEG fallback
- Add code splitting for routes
- Optimize GSAP animations with GPU acceleration
- Implement resource preloading
- Minify and compress bundles
- Add service worker for caching

### Phase 7: Testing & Polish (Week 7)

**Testing Implementation**:
- Write unit tests for all components
- Implement property-based tests for 13 properties
- Create integration tests for user flows
- Run accessibility audits
- Perform visual regression testing
- Run Lighthouse performance audits

**Polish and Refinement**:
- Fix any bugs found during testing
- Optimize animations based on performance testing
- Refine responsive behavior
- Improve error handling
- Add loading states where missing
- Final accessibility review

### Phase 8: Documentation & Deployment (Week 8)

**Documentation**:
- Document component APIs
- Create usage examples
- Document theme customization
- Write deployment guide

**Deployment Preparation**:
- Configure build optimization
- Set up environment variables
- Create production build
- Test production build locally
- Deploy to hosting platform

## Success Metrics

### Performance Metrics

- Lighthouse Performance Score: ≥ 90
- First Contentful Paint (FCP): < 1.5 seconds
- Largest Contentful Paint (LCP): < 2.5 seconds
- Total Blocking Time (TBT): < 300ms
- Cumulative Layout Shift (CLS): < 0.1
- Animation frame rate: 60fps maintained

### Accessibility Metrics

- Lighthouse Accessibility Score: ≥ 90
- WCAG AA Compliance: 100%
- Keyboard navigation: All interactive elements accessible
- Screen reader compatibility: Tested with NVDA, JAWS, VoiceOver
- Color contrast: All text meets 4.5:1 (normal) or 3:1 (large) ratio

### Code Quality Metrics

- Unit test coverage: ≥ 80%
- Property tests: 13/13 passing with 100 iterations each
- Integration tests: All critical flows covered
- ESLint errors: 0
- TypeScript errors: 0 (if using TypeScript)

### User Experience Metrics

- Mobile responsiveness: Tested on iOS Safari, Chrome Mobile, Samsung Internet
- Touch targets: All ≥ 44x44px
- Form validation: Clear error messages for all validation rules
- Loading states: Present for all async operations
- Error handling: Graceful fallbacks for all error scenarios

### Feature Completeness

- Real projects: 6+ displayed with complete information
- Testimonials: 4+ displayed with company logos
- Contact form: Fully functional with validation
- Theme system: Dark/light mode with persistence
- 3D hero: Interactive with parallax effects
- Animations: Smooth with reduced motion support
- GitHub integration: Repositories and contribution graph displayed
- Bento grid: Responsive with mixed card sizes

## Future Enhancements

### Backend Integration

When ready to add real backend:
1. Replace mock data imports with API calls
2. Update React Query hooks to use actual endpoints
3. Implement authentication for admin features
4. Add real email sending for contact form
5. Connect to real GitHub API with rate limiting

### Additional Features

- Blog section with markdown support
- Case studies with detailed project breakdowns
- Resume download functionality
- Multi-language support (i18n)
- Analytics integration (privacy-focused)
- Search functionality for projects
- Filtering and sorting for project showcase
- Admin panel for content management

### Advanced Animations

- Scroll-triggered animations with GSAP ScrollTrigger
- SVG path animations for illustrations
- Particle effects for hero section
- Morphing shapes and transitions
- Interactive 3D models for project showcases

### Performance Optimizations

- Image CDN integration
- Progressive Web App (PWA) features
- Offline support with service worker
- Prefetching for route transitions
- Virtual scrolling for large lists
- WebP with AVIF fallback

