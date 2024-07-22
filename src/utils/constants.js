export const WHITELIST_DOMAINS = [
  // Không cần local host nữa vì file config cors đã luôn luôn cho phép môi trường dev if (env.BUILD_MODE === 'dev')
  // 'http://localhost:5173'
];

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
};
