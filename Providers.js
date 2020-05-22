import React, {createContext, useState} from 'react';

import book1 from './book1'
const book = book1

export const BookContext = createContext(book)

//const BookProvider =() => {
//  return(
//      <BookContext.Provider value={book} />
//  );
//}

//export default BookProvider;
