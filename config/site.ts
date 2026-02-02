/**
 * Site Configuration
 *
 * Edit these values to customize your booking application.
 * No coding knowledge required - just change the values!
 */

export const siteConfig = {
  /**
   * SITE BRANDING
   */
  siteName: "Google Calendar Booking",
  siteDescription:
    "Book appointments with ease using our Google Calendar integration",

  /**
   * MEETING TYPES
   *
   * Define your available meeting types here.
   * Each type needs:
   * - id: unique identifier (keep it simple, no spaces)
   * - label: what users see in the dropdown
   * - duration: length in minutes
   */
  meetingTypes: [
    {
      id: "PersonalIncomeTaxes",
      label: "Personal Income Taxes",
      duration: [30, 60],
    },
    {
      id: "BusinessTaxes",
      label: "Business Taxes",
      duration: [60, 120],
    },
    {
      id: "BusinessPersonalTaxes",
      label: "Business + Personal Taxes",
      duration: [30, 60, 90, 120, 150, 180],
    },
  ],

  /**
   * PAGE TEXT CONTENT
   */
  text: {
    // Home page
    home: {
      welcomeTitle: "Welcome",
      bookingLinkText: "Book a Meeting",
    },

    // Booking page
    booking: {
      pageTitle: "Book a Meeting",
      nameLabel: "Name",
      namePlaceholder: "Your full name",
      emailLabel: "Email",
      emailPlaceholder: "your.email@example.com",
      phoneLabel: "Phone Number",
      phonePlaceholder: "123-456-7890",
      meetingTypeLabel: "Meeting Type",
      messageLabel: "Message",
      messagePlaceholder: "Please provide any additional details...",
      dateLabel: "Select Date",
      timeLabel: "Select Time",
      submitButton: "Book Appointment",
      submittingButton: "Booking...",
      successMessage: "Appointment booked successfully!",
      noTimesAvailable: "No available times for this date.",
      selectDateFirst: "Please select a date first.",
    },
  },

  /**
   * BUSINESS SETTINGS
   */
  business: {
    // Timezone for your business
    // Full list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    timezone: "America/New_York",

    // How many days ahead can users book?
    advanceBookingDays: 180,

    // Minimum notice required (in hours)
    minimumNoticeHours: 24,

    // Business hours per day (use "HH:MM" format, e.g. "09:00", "17:30")
    // Set to null for days when booking is unavailable
    schedule: {
      sunday: null,
      monday: { open: "10:00", close: "19:30" },
      tuesday: { open: "10:00", close: "19:30" },
      wednesday: { open: "10:00", close: "19:30" },
      thursday: { open: "10:00", close: "19:30" },
      friday: { open: "10:00", close: "19:30" },
      saturday: { open: "10:00", close: "16:00" },
    },

    // Email addresses to notify when a new booking is made
    // These will receive calendar invitations for each booking
    notificationEmails: ["andrew@dependableacctg.com", "sal@dependableacctg.com"],

    // business info
    businessInfo: {
      name: "Dependable Accounting", // who am i making an appointment with
      // if meeting is in person
      address: "73 Ottavio Promenade",
      city: "Staten Island, NY 10307"
    },
  },

};

// TypeScript types for autocomplete
export type SiteConfig = typeof siteConfig;
export type MeetingType = (typeof siteConfig.meetingTypes)[0];
