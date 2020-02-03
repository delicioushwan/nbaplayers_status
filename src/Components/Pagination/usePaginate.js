import React, { useState } from 'react';

export default function() {
  const [currentPage, setPage] = useState(1);

  return [currentPage, setPage];
}
