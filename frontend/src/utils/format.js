/**
 * Format a number as Nigerian Naira
 */
export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount)

/**
 * Truncate text to a max length
 */
export const truncate = (text, max = 80) =>
  text?.length > max ? text.slice(0, max).trimEnd() + '…' : text

/**
 * Generate a URL-friendly slug
 */
export const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/**
 * Format a date string nicely
 */
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
