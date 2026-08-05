# Architecture Events V2 Requirements

## Document Purpose

This file is the persistent project reference for converting the `Architecture Events v2.html` prototype into a production-ready Next.js platform. Future work should begin by reading this file first.

## Source Inputs

This document merges requirements from:

1. `src/app/all-projects/Architecture Events v2.html`
2. Business/project requirements provided by the stakeholder

## Project Objective

Rebuild Architecture Events into a fast, SEO-optimized platform on Next.js that keeps attendees, organizers, and leads on the platform instead of losing them to third-party sites, while giving Kim complete structured control over events, payments, and communications.

## Target Platform Goals

- Deliver a clean, mobile-first, SEO-optimized public website.
- Allow attendees to discover events confidently by category and location.
- Support lead capture before redirecting users to external registration when needed.
- Support native account creation and repaired Google sign-in.
- Give organizers a dashboard to submit and manage listings.
- Give admin full control over approvals, payments, communications, and reporting.
- Preserve existing SEO value and existing platform data where possible.

## Planned Tech Stack

- Next.js 16 App Router
- TypeScript
- React 19
- Tailwind CSS 4
- Node.js backend capabilities inside Next.js app
- PostgreSQL
- AWS deployment/infrastructure
- Stripe integration
- SendGrid integration

## Current Repository State

- Existing app is a fresh Next.js starter.
- App router is under `src/app`.
- Tailwind 4 is configured through `src/app/globals.css`.
- Existing prototype HTML files are stored in `src/app/all-projects/`.

## Important Next.js Constraints

This repo uses Next.js `16.3.0`. Work must follow the local docs in `node_modules/next/dist/docs/` and use current App Router conventions, not outdated Next.js patterns.

## Prototype Analysis Summary

`Architecture Events v2.html` is not a single page. It is a bundled prototype containing multiple views and UI states in one artifact.

The prototype includes:

- Homepage
- Browse Events view
- Event Detail view
- Submit Event flow
- Advertise page
- About page
- Contact page
- Login screen
- Signup screen
- Shared header/footer/navigation

## Product Areas

The rebuilt platform should be split into these main areas:

1. Public Website
2. Attendee Account and Discovery Flow
3. Organizer Dashboard
4. Admin Dashboard
5. Integrations and Platform Services

## Public Website Requirements

### Homepage

Required content and behavior inferred from the prototype and business input:

- Hero section with Architecture Events positioning
- Event discovery messaging
- Organizer and attendee CTAs
- Search/filter entry point
- Popular search terms
- Brand spotlight section
- Featured events section
- Platform value proposition section
- Newsletter signup section
- Footer with platform navigation and company links

Business alignment requirements:

- Strong SEO structure
- Mobile-first layout
- Clear mission communication
- Confidence-building UX
- Fast loading
- Conversion points for attendee discovery and organizer submissions

### About Page

- Organization history and purpose
- Founder/community story
- Mission
- Vision
- Community values

### FAQ Page

- Attendee questions
- Organizer questions
- Listing types
- Submission timing
- Featured listing explanation
- Upgrade path explanation

### Contact Page

- Inquiry form
- Contact details
- Advertising inquiry path
- Event submission help path

### Public Event Discovery

- Browse events
- Filter by category
- Filter by location
- Filter by date
- Filter by event type
- Filter by price
- Support map-based discovery
- Event cards
- Event details pages

## Attendee Requirements

### Authentication

- Email/password signup
- Email/password login
- Session management
- Repaired and tested Google sign-in

### Discovery and Registration Flow

1. Browse/filter events by category and location
2. View event details including map location, images, and video
3. Select professional identity
4. Register natively, or opt in before external redirect
5. Capture lead in either case

### Attendee Features

- Save events
- Personal saved list
- Reminder-oriented account value
- Newsletter opt-in
- Recommendations later based on preferences

## Organizer Dashboard Requirements

- Organizer login
- Organizer profile/contact details
- Dashboard listing all submitted events
- Event name, submission date, and approval status visibility
- Draft/submitted/review/published status tracking
- Full listing editor
- Description editing
- Google Map location input
- Internal notes
- Multiple image uploads
- Multiple video uploads
- Thumbnail selection
- Featured listing option
- Brand spotlight application option
- Submit for review flow
- Immediate confirmation email after submission
- Public page link after publish
- Partnership request option for native tracked registration

## Admin Dashboard Requirements

- Total events overview
- Under review / approved / published counts
- Approve listing
- Reject listing
- Request changes
- Configure categories
- Configure featured listing pricing
- Configure brand spotlight pricing
- Create/manage organizer accounts
- Assign featured/priority placements
- Monitor listing activity
- Integrated inbox via SendGrid
- Live Stripe payment processing
- Event and attendee reports
- Internal payment ledger
- Invoice tracking
- Receipts visibility
- Data export
- Archive access to past events, listings, and payment history

## Integrations

### Stripe

- Featured listing payments
- Brand spotlight payments
- Advertising payments
- Admin payment visibility
- Ledger and receipt support

### SendGrid

- Organizer submission confirmations
- Admin inbox workflow
- General contact form routing
- Potential attendee transactional emails later

### Google

- Google sign-in
- Google Maps/location support

## SEO Requirements

- Public pages must be server-rendered or statically optimized as appropriate
- Strong metadata support
- Crawlable route structure
- Event detail pages optimized for search indexing
- Preserve SEO equity where possible during migration
- Clean semantic headings and content structure

## Route and Information Architecture Plan

Initial public route plan:

- `/`
- `/events`
- `/events/[slug]`
- `/about`
- `/faq`
- `/contact`
- `/advertise`
- `/login`
- `/signup`
- `/submit-event`

Planned application/dashboard route groups:

- `/attendee/...`
- `/organizer/...`
- `/admin/...`

Possible App Router organization:

- `src/app/(marketing)/...`
- `src/app/(auth)/...`
- `src/app/(dashboard)/...`

## Component Strategy

The platform should be built component-first, not page-first.

Initial shared components expected:

- Site header
- Main navigation
- Mobile navigation
- Footer
- Section wrapper
- CTA buttons
- Search/filter bar
- Event card
- Featured event card
- Brand spotlight card
- Newsletter form
- Page hero
- Stat/value cards
- Form fields
- Empty states

Likely feature component groups:

- `marketing`
- `events`
- `auth`
- `organizer`
- `admin`
- `shared/ui`

## Data Model Direction

The exact schema will be finalized later, but the platform will likely need:

- users
- attendee_profiles
- organizer_profiles
- admin_users
- events
- event_categories
- event_images
- event_videos
- event_status_history
- saved_events
- leads
- newsletter_subscribers
- featured_listings
- brand_spotlights
- payments
- invoices
- receipts
- contact_messages
- inbox_threads

## Visual Direction from Prototype

Observed design cues from the bundled HTML:

- Editorial/luxury architecture brand tone
- Serif heading font pairing with modern sans-serif body font
- Dark neutral palette with warm gold accent
- High-contrast layout blocks
- Strong emphasis on curated/industry-specific positioning

The Next.js implementation should preserve that visual identity where it supports the business goals.

## Delivery Phases

### Phase 1

- Create project requirements and worklog documents
- Convert homepage to Next.js with reusable components

### Phase 2

- Build public marketing pages:
  - About
  - FAQ
  - Contact
  - Advertise

### Phase 3

- Build event discovery flow:
  - Events listing
  - Filtering
  - Event detail page
  - Map support placeholder/integration plan

### Phase 4

- Build auth flows:
  - Signup
  - Login
  - Google sign-in

### Phase 5

- Build organizer dashboard

### Phase 6

- Build admin dashboard

### Phase 7

- Integrate payments, email, reporting, and exports

## Immediate Build Order

Work should proceed one-by-one in this order unless requirements change:

1. Requirements/worklog docs
2. Shared public site shell
3. Homepage
4. About page
5. FAQ page
6. Contact page
7. Advertise page
8. Events listing page
9. Event detail page
10. Auth flows
11. Organizer dashboard
12. Admin dashboard

## Rules for Future Work

- Always read this file before starting new implementation work.
- Update this file if major scope changes happen.
- Use the worklog file for daily progress tracking.
- Keep implementation incremental and component-based.
- Do not convert the bundled prototype into one giant page.
- Prefer App Router patterns and colocated route components.

## First Implementation Decision

The first actual code slice should be:

- shared marketing shell
- reusable homepage components
- homepage route conversion in Next.js/TypeScript

