export interface FontAwesomeIconItem {
  id: string;
  name: string;
  exportName: string;
  library: 'solid' | 'brands';
  category: 'brands' | 'motion' | 'media' | 'analytics' | 'commerce';
  keywords: string[];
}

export const FONTAWESOME_ICONS: FontAwesomeIconItem[] = [
  // Social & Tech Brands (Essential for Remotion promo videos & kinetic overlays)
  { id: 'fa-youtube', name: 'YouTube', exportName: 'faYoutube', library: 'brands', category: 'brands', keywords: ['video', 'social', 'streaming', 'red'] },
  { id: 'fa-tiktok', name: 'TikTok', exportName: 'faTiktok', library: 'brands', category: 'brands', keywords: ['shorts', 'reels', 'viral', 'music'] },
  { id: 'fa-instagram', name: 'Instagram', exportName: 'faInstagram', library: 'brands', category: 'brands', keywords: ['photo', 'social', 'reels', 'story'] },
  { id: 'fa-x-twitter', name: 'X (Twitter)', exportName: 'faXTwitter', library: 'brands', category: 'brands', keywords: ['tweet', 'social', 'microblog', 'news'] },
  { id: 'fa-github', name: 'GitHub', exportName: 'faGithub', library: 'brands', category: 'brands', keywords: ['code', 'developer', 'open source', 'git'] },
  { id: 'fa-discord', name: 'Discord', exportName: 'faDiscord', library: 'brands', category: 'brands', keywords: ['community', 'chat', 'gaming', 'voice'] },
  { id: 'fa-linkedin', name: 'LinkedIn', exportName: 'faLinkedin', library: 'brands', category: 'brands', keywords: ['professional', 'b2b', 'career', 'network'] },
  { id: 'fa-twitch', name: 'Twitch', exportName: 'faTwitch', library: 'brands', category: 'brands', keywords: ['gaming', 'stream', 'live', 'broadcast'] },
  { id: 'fa-spotify', name: 'Spotify', exportName: 'faSpotify', library: 'brands', category: 'brands', keywords: ['music', 'audio', 'podcast', 'playlist'] },
  { id: 'fa-apple', name: 'Apple', exportName: 'faApple', library: 'brands', category: 'brands', keywords: ['mac', 'ios', 'iphone', 'minimal'] },
  { id: 'fa-google', name: 'Google', exportName: 'faGoogle', library: 'brands', category: 'brands', keywords: ['search', 'cloud', 'android', 'ai'] },
  { id: 'fa-facebook', name: 'Facebook', exportName: 'faFacebook', library: 'brands', category: 'brands', keywords: ['meta', 'social', 'network', 'connect'] },
  { id: 'fa-stripe', name: 'Stripe', exportName: 'faStripe', library: 'brands', category: 'brands', keywords: ['payment', 'fintech', 'checkout', 'billing'] },
  { id: 'fa-reddit', name: 'Reddit', exportName: 'faReddit', library: 'brands', category: 'brands', keywords: ['forum', 'community', 'upvote', 'discussion'] },
  { id: 'fa-telegram', name: 'Telegram', exportName: 'faTelegram', library: 'brands', category: 'brands', keywords: ['chat', 'message', 'fast', 'secure'] },

  // Motion, Energy & Action (Essential for energetic springs and stingers)
  { id: 'fa-rocket', name: 'Rocket Launch', exportName: 'faRocket', library: 'solid', category: 'motion', keywords: ['launch', 'fast', 'growth', 'startup'] },
  { id: 'fa-fire', name: 'Fire / Flame', exportName: 'faFire', library: 'solid', category: 'motion', keywords: ['hot', 'trend', 'viral', 'energy'] },
  { id: 'fa-bolt', name: 'Lightning Bolt', exportName: 'faBolt', library: 'solid', category: 'motion', keywords: ['fast', 'turbo', 'power', 'electric'] },
  { id: 'fa-star', name: 'Star Rating', exportName: 'faStar', library: 'solid', category: 'motion', keywords: ['favorite', 'review', 'gold', 'quality'] },
  { id: 'fa-heart', name: 'Heart Like', exportName: 'faHeart', library: 'solid', category: 'motion', keywords: ['love', 'like', 'reaction', 'social'] },
  { id: 'fa-trophy', name: 'Trophy / Winner', exportName: 'faTrophy', library: 'solid', category: 'motion', keywords: ['award', 'winner', 'success', 'first'] },
  { id: 'fa-crown', name: 'Crown / VIP', exportName: 'faCrown', library: 'solid', category: 'motion', keywords: ['king', 'premium', 'luxury', 'elite'] },
  { id: 'fa-sparkles', name: 'Magic Sparkles', exportName: 'faWandMagicSparkles', library: 'solid', category: 'motion', keywords: ['ai', 'magic', 'shine', 'glow'] },
  { id: 'fa-bomb', name: 'Impact Bomb', exportName: 'faBomb', library: 'solid', category: 'motion', keywords: ['explosion', 'impact', 'drop', 'loud'] },
  { id: 'fa-burst', name: 'Burst Punch', exportName: 'faBurst', library: 'solid', category: 'motion', keywords: ['pop', 'accent', 'shockwave', 'splash'] },

  // Video, Media & Audio
  { id: 'fa-play', name: 'Play Button', exportName: 'faPlay', library: 'solid', category: 'media', keywords: ['start', 'video', 'player', 'action'] },
  { id: 'fa-pause', name: 'Pause Button', exportName: 'faPause', library: 'solid', category: 'media', keywords: ['stop', 'hold', 'player', 'wait'] },
  { id: 'fa-film', name: 'Film Strip', exportName: 'faFilm', library: 'solid', category: 'media', keywords: ['cinema', 'movie', 'video', 'production'] },
  { id: 'fa-video', name: 'Camera Video', exportName: 'faVideo', library: 'solid', category: 'media', keywords: ['record', 'stream', 'camera', 'visual'] },
  { id: 'fa-microphone', name: 'Microphone', exportName: 'faMicrophone', library: 'solid', category: 'media', keywords: ['podcast', 'voice', 'audio', 'sound'] },
  { id: 'fa-volume-high', name: 'Volume Audio', exportName: 'faVolumeHigh', library: 'solid', category: 'media', keywords: ['sound', 'loud', 'speaker', 'audio'] },
  { id: 'fa-headphones', name: 'Headphones', exportName: 'faHeadphones', library: 'solid', category: 'media', keywords: ['music', 'listen', 'beat', 'audio'] },
  { id: 'fa-compact-disc', name: 'Audio Disc', exportName: 'faCompactDisc', library: 'solid', category: 'media', keywords: ['music', 'vinyl', 'album', 'record'] },

  // Analytics, Tech & Code
  { id: 'fa-chart-line', name: 'Growth Chart', exportName: 'faChartLine', library: 'solid', category: 'analytics', keywords: ['growth', 'metric', 'revenue', 'arr'] },
  { id: 'fa-chart-pie', name: 'Pie Chart', exportName: 'faChartPie', library: 'solid', category: 'analytics', keywords: ['data', 'percentage', 'breakdown', 'stats'] },
  { id: 'fa-gauge-high', name: 'High Speed Gauge', exportName: 'faGaugeHigh', library: 'solid', category: 'analytics', keywords: ['speed', 'performance', 'meter', 'fast'] },
  { id: 'fa-microchip', name: 'GPU / CPU Microchip', exportName: 'faMicrochip', library: 'solid', category: 'analytics', keywords: ['hardware', 'processor', 'tech', 'ai'] },
  { id: 'fa-code', name: 'Code Brackets', exportName: 'faCode', library: 'solid', category: 'analytics', keywords: ['developer', 'programming', 'software', 'api'] },
  { id: 'fa-terminal', name: 'Terminal Shell', exportName: 'faTerminal', library: 'solid', category: 'analytics', keywords: ['cli', 'bash', 'command', 'system'] },
  { id: 'fa-server', name: 'Cloud Server', exportName: 'faServer', library: 'solid', category: 'analytics', keywords: ['database', 'backend', 'cloud', 'hosting'] },
  { id: 'fa-shield-halved', name: 'Security Shield', exportName: 'faShieldHalved', library: 'solid', category: 'analytics', keywords: ['protect', 'security', 'safe', 'trust'] },

  // Commerce & Conversion
  { id: 'fa-cart-shopping', name: 'Shopping Cart', exportName: 'faCartShopping', library: 'solid', category: 'commerce', keywords: ['shop', 'ecommerce', 'checkout', 'buy'] },
  { id: 'fa-bag-shopping', name: 'Shopping Bag', exportName: 'faBagShopping', library: 'solid', category: 'commerce', keywords: ['store', 'retail', 'brand', 'product'] },
  { id: 'fa-tag', name: 'Price Tag Discount', exportName: 'faTag', library: 'solid', category: 'commerce', keywords: ['sale', 'offer', 'deal', 'promo'] },
  { id: 'fa-bell', name: 'Notification Bell', exportName: 'faBell', library: 'solid', category: 'commerce', keywords: ['alert', 'subscribe', 'ping', 'reminder'] },
  { id: 'fa-check-circle', name: 'Verified Checkmark', exportName: 'faCircleCheck', library: 'solid', category: 'commerce', keywords: ['success', 'done', 'approved', 'verified'] },
];
