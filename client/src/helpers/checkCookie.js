// import React from 'react'

const checkCookie = (cookieName) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return true; // Cookie found
    }
  }
  return false; // Cookie not found
}

export default checkCookie