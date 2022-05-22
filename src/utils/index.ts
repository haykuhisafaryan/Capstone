export function getToken() {
  return localStorage.getItem('token');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function isLoggedIn() {
  return !!getToken();
}

export function setToken(token: string | null) {
  localStorage.setItem('token', token || '');
}

export function setRefreshToken(token: string | null) {
  localStorage.setItem('refreshToken', token || '');
}

export function getPhotoUrl(id: string) {
  return `https://capstone-library-system-backend-4shozg2vyq-uc.a.run.app/files/${id}`
}
