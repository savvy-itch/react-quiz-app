import React from 'react';
import "./Loading.css";

export default function Loading() {
  return (
    <svg className="position-absolute top-50 start-50 translate-middle preloader" viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
  )
}